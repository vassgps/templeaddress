import { redirect } from "next/navigation";

const page = () => {
  return redirect("/admin/users/");
};

export default page;
