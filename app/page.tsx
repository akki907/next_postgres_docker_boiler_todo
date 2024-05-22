
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
    <main className="flex h-full gap-10  flex-col items-center justify-between p-24">
    <TaskForm />

      <Table>
        <TableCaption>A list of your recent Tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Task</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.completed}</TableCell>
              <TableCell>{task.createdAt.toDateString()}</TableCell>
              <TableCell className="text-right">{task.updatedAt.toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </main>
  );
}
