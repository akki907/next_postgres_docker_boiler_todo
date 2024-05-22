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
    <main className="flex flex-col items-center px-20  pt-40">
      <TaskForm />
      <TableData tasks={tasks} />
    </main>
  );
}
