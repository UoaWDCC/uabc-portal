import { SemestersList } from "@/components/admin/semesters/SemestersList";
import { NavigationBar } from "@/components/NavigationBar";

const SemestersPage = () => {
  return (
    <div className="dark relative flex px-4 min-h-dvh max-w-dvw flex-col bg-background overflow-x-hidden">
      <NavigationBar title="Semesters" />
      <div className="gap-4 flex flex-col empty:grow mb-4 empty:after:content-['No_semesters_set'] empty:after:text-tertiary empty:after:w-full empty:after:h-full empty:after:grid empty:after:place-items-center empty:after:grow empty:after:text-lg empty:after:font-medium">
        <SemestersList />
      </div>
    </div>
  );
};

export default SemestersPage;
