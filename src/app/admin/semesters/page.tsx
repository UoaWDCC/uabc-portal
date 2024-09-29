import SemesterCreateButton from "@/components/admin/semesters/SemesterCreateButton";
import { SemestersList } from "@/components/admin/semesters/SemestersList";
import { BackNavigationBar } from "@/components/BackNavigationBar";

export const metadata = {
  title: "Semesters - UABC Booking Portal",
};

const SemestersPage = () => {
  return (
    <div className="max-w-dvw relative flex min-h-dvh flex-col overflow-x-hidden bg-background px-4">
      <BackNavigationBar title="Semesters" pathName="/admin" className="mb-4">
        <SemesterCreateButton />
      </BackNavigationBar>
      <div className="mb-4 flex flex-col gap-4 empty:grow empty:after:grid empty:after:h-full empty:after:w-full empty:after:grow empty:after:place-items-center empty:after:text-lg empty:after:font-medium empty:after:text-tertiary empty:after:content-['No_semesters_set']">
        <SemestersList />
      </div>
    </div>
  );
};

export default SemestersPage;
