import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { TextInput } from "@/components/TextInput";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  useDialogContext,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { DialogButtonsFooter } from "@/components/ui/utils/DialogUtils";
import { weekdayEnum } from "@/lib/db/schema";
import { QUERY_KEY } from "@/lib/utils/queryKeys";
import { useSemesterContext } from "./SemestersContext";
import { compareDate, formatDateInISO, validateDate } from "./utils";

// Schema
const formSchema = z
  .object({
    startDate: z
      .string()
      .min(1, "Field is required")
      .refine(validateDate, "Invalid date"),
    endDate: z
      .string()
      .min(1, "Field is required")
      .refine(validateDate, "Invalid date"),
    breakStart: z
      .string()
      .min(1, "Field is required")
      .refine(validateDate, "Invalid date"),
    breakEnd: z
      .string()
      .min(1, "Field is required")
      .refine(validateDate, "Invalid date"),
    bookingOpenDay: z
      .string()
      .min(1, "Field is required")
      .refine(
        (value) => z.enum(weekdayEnum.enumValues).safeParse(value).success,
        { message: "Invalid day of week" }
      ),
    bookingOpenTime: z.string().min(1, "Field is required"),
  })
  .refine((data) => compareDate(data.startDate, data.breakStart) < 0, {
    message: "Start date must be before break start date",
    path: ["startDate"],
  })
  .refine((data) => compareDate(data.breakStart, data.breakEnd) < 0, {
    message: "Break start date start must be before break end date",
    path: ["breakStart"],
  })
  .refine((data) => compareDate(data.breakEnd, data.endDate) < 0, {
    message: "Break end date must be before end date",
    path: ["breakEnd"],
  });

export const EditSemesterFormDialog = () => {
  // Contexts
  const {
    name,
    startDate,
    endDate,
    breakStart,
    breakEnd,
    id: semesterId,
    bookingOpenDay,
    bookingOpenTime,
  } = useSemesterContext();
  const { handleClose: closeDialog } = useDialogContext();

  // Hook-forms
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate,
      endDate,
      breakStart,
      breakEnd,
      bookingOpenDay,
      bookingOpenTime: bookingOpenTime.slice(0, 5),
    },
  });

  const { toast } = useToast();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (body: BodyInit) => {
      const response = await fetch(`/api/semesters/${semesterId}`, {
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error((await response.json()).code);
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const body = JSON.stringify({
      name,
      bookingOpenDay: data.bookingOpenDay,
      bookingOpenTime: `${data.bookingOpenTime}:00`,
      startDate: formatDateInISO(data.startDate),
      endDate: formatDateInISO(data.endDate),
      breakStart: formatDateInISO(data.breakStart),
      breakEnd: formatDateInISO(data.breakEnd),
    });

    mutation.mutate(body, {
      onError: (e) => {
        if (e.message === "OVERLAPPING_SEMESTER") {
          toast({
            title: "Overlapping Semester",
            description:
              "The semester dates overlap with an existing semester. Please adjust the dates.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Uh oh! Something went wrong",
            description:
              "An error occurred while updating the semester. Please try again.",
            variant: "destructive",
          });
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SEMESTERS] });
        toast({
          title: "Success!",
          description: "Semester details successfully updated",
        });
        reset({
          startDate: data.startDate,
          endDate: data.endDate,
          breakStart: data.breakStart,
          breakEnd: data.breakEnd,
          bookingOpenDay: data.bookingOpenDay,
          bookingOpenTime: data.bookingOpenTime,
        });
        closeDialog();
      },
    });
  };

  return (
    <DialogContent onCloseAutoFocus={() => reset()}>
      <DialogHeader>
        <DialogTitle>Edit {name}</DialogTitle>
      </DialogHeader>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2 *:grow">
          <TextInput
            label="Booking open day"
            type="text"
            {...register("bookingOpenDay")}
            isError={!!errors.bookingOpenDay?.message}
            errorMessage={errors.bookingOpenDay?.message}
            autoComplete="off"
          />
          <TextInput
            label="Booking open time"
            type="time"
            {...register("bookingOpenTime")}
            isError={!!errors.bookingOpenTime?.message}
            errorMessage={errors.bookingOpenTime?.message}
            autoComplete="off"
          />
        </div>
        <div className="flex gap-2 *:grow">
          <TextInput
            label="Start date"
            type="text"
            {...register("startDate")}
            isError={!!errors.startDate?.message}
            errorMessage={errors.startDate?.message}
            autoComplete="off"
          />
          <TextInput
            label="End date"
            type="text"
            {...register("endDate")}
            isError={!!errors.endDate?.message}
            errorMessage={errors.endDate?.message}
            autoComplete="off"
          />
        </div>
        <div className="flex gap-2 *:grow">
          <TextInput
            label="Break start date"
            type="text"
            {...register("breakStart")}
            isError={!!errors.breakStart?.message}
            errorMessage={errors.breakStart?.message}
            autoComplete="off"
          />
          <TextInput
            label="Break end date"
            type="text"
            {...register("breakEnd")}
            isError={!!errors.breakEnd?.message}
            errorMessage={errors.breakEnd?.message}
            autoComplete="off"
          />
        </div>

        <DialogButtonsFooter
          type="submit"
          primaryText="Update"
          disabled={mutation.isPending}
        />
      </form>
    </DialogContent>
  );
};
