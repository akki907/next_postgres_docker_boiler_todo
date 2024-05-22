
import prisma from "@/lib/db";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TaskForm from "@/components/TaskForm";
export default async function Home() {
  const tasks = await prisma.task.findMany()

  return (
    <main className="flex flex-col items-center px-20  pt-40">
      <TaskForm />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{`${task.completed ? 'completed' : 'uncompleted'}`}</TableCell>
              <TableCell>{task.createdAt.toDateString()}</TableCell>
              <TableCell className="text-right">{task.updatedAt.toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </main>
  );
}
