import CreateForm from "@/components/CreateForm";
import Heading from "@/components/Heading";
import { LayoutDashboard } from "lucide-react";

const page = () => {
  return (
    <div className="p-4 flex flex-col justify-between">
      <div className="flex justify-between">
        <Heading
          title="Dashboard"
          description="Manage your form from control board"
          icon={LayoutDashboard}
          iconColor="text-white-500"
          bgColor="bg-gray-500/10"
        />
        <div className="p-1 w-56">
          <CreateForm />
        </div>
      </div>
      <div className="border-2 h-screen border-red-500">
        <p className="p-4">
          I am not getting the data properly from backend, i think the error is
          some kind of jsonForm where it give the error 'cannot read the
          properties of undefined jsonForm'it can generate the form and get the
          output in database but can't get the info on dashboard
        </p>
      </div>
    </div>
  );
};

export default page;
