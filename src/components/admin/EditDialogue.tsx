import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type UserResponse = {
  startDate: string;
};

const EditDialogue = () => {
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     startDate: "asdasd",
  //   },
  // });

  // const onSubmit: SubmitHandler<UserResponse> = (data) => console.log(data);

  return (
    <DialogContent className="dark sm:max-w-[475px] max-w-[375px] rounded-lg">
      <DialogHeader className="*:stroke-foreground">
        <DialogTitle className="text-foreground">
          Edit Semester 1 (2024)
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2 *:grow ">
          <TextInput label="Start Date" type="input" />
          <TextInput label="End Date" type="input" />
        </div>
        <div className="flex gap-2 *:grow *:ring-tertiary/70">
          <TextInput label="Break start Date" type="input" />
          <TextInput label="Break start Date" type="input" />
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="text-foreground">
              Cancel
            </Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
//   return (
//     <DialogContent className="dark sm:max-w-[475px] max-w-[375px] rounded-lg">
//       <div className="fixed left-0 top-0 h-dvh grid place-items-center w-dvw bg-black/70 z-[99] pointer-events-none">
//         <Card className="bg-background w-full rounded-lg flex flex-col gap-6 pointer-events-auto">
//           <DialogHeader className="font-semibold tracking-tight text-lg">
//             Edit Semester 1 sadasd(2024)
//           </DialogHeader>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="flex gap-2 *:grow">
//               <input
//                 type="input"
//                 {...register("startDate", { required: true })}
//               />
//               <TextInput
//                 label="End Date"
//                 type="input"
//                 {...register("endDate", { required: true })}
//               />
//             </div>
//             <div className="flex gap-2 *:grow">
//               <TextInput
//                 label="Break start Date"
//                 type="input"
//                 {...register("breakStart", { required: true })}
//               />
//               <TextInput
//                 label="Break start Date"
//                 type="input"
//                 {...register("breakEnd", { required: true })}
//               />
//             </div>
//             <div className="flex justify-end gap-2">
//               <DialogClose asChild>
//                 <Button variant="outline">Cancel</Button>
//               </DialogClose>
//               <Button type="submit">Confirm</Button>
//             </div>
//           </form>
//         </Card>
//       </div>
//     </DialogContent>
//   );
// };

export default EditDialogue;
