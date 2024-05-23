import prisma from "@/lib/db";
import TaskForm from "@/components/TaskForm";
import TableData from "@/components/TableData";
export default async function Home() {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: 'asc',  
    },
  });

  return (
    <main className="flex flex-col items-center sm:px-28 sm:pt-40 px-2  gap-10 pt-10">
      <TaskForm />
      <TableData tasks={tasks} />
    </main>
  );
}
