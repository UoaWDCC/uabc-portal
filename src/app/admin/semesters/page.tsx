import SemesterCreateButton from "@/components/admin/semesters/SemesterCreateButton";
import { SemestersList } from "@/components/admin/semesters/SemestersList";
import { NavigationBar } from "@/components/NavigationBar";

const SemestersPage = () => {
  return (
    <div className="max-w-dvw relative flex min-h-dvh flex-col overflow-x-hidden bg-background px-4">
      <NavigationBar title="Semesters" className="mb-4">
        <SemesterCreateButton />
      </NavigationBar>
      <div className="mb-4 flex flex-col gap-4 empty:grow empty:after:grid empty:after:h-full empty:after:w-full empty:after:grow empty:after:place-items-center empty:after:text-lg empty:after:font-medium empty:after:text-tertiary empty:after:content-['No_semesters_set']">
        <SemestersList />
      </div>
    </div>
  );
};

export default SemestersPage;
