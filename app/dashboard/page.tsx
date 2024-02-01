import { createClient } from "@/app/lib/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { fetchTasks } from "@/app/features/tasks/actions/fetchTasks";

import { Sidebar } from "@/app/components/Sidebar";
import { Tasks } from "@/app/features/tasks/components/Tasks";

type searchParams = {
  category: "myTasks" | "sharedByOthers" | "sharedWithMe";
  search: "important" | "completed" | "uncompleted";
};

export default async function DashboardIndex({
  searchParams,
}: {
  searchParams: searchParams;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const { category, search } = searchParams;

  const tasks = await fetchTasks();

  const categorizedTasks =
    category === "myTasks" ? tasks.myTasks : category === "sharedByOthers" ? tasks.sharedByOthers : tasks.sharedWithMe;
  const searchedTasks =
    search === "important"
      ? categorizedTasks.filter((task) => task.priority === "High")
      : search === "completed"
        ? categorizedTasks.filter((task) => task.status === "Done")
        : categorizedTasks.filter((task) => task.status !== "Done");

  return (
    <div className="grid grid-cols-9 h-screen max-h-[calc(100vh-64px)]">
      <Sidebar tasks={tasks} />
      <Tasks tasks={searchedTasks} search={search} />
    </div>
  );
}
