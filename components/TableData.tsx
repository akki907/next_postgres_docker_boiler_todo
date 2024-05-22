"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { deleteTask, updateTask } from "@/actions/task";
import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";

type Task = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default async function TableData({ tasks }: { tasks: Task[] }) {
    const handleDelete = async (id: string) => {
        await deleteTask(id)
        toast("Task has been deleted.")
    }

    const handleTaskCompleted = async (task:Task) => {
       await updateTask(task.id, !task.completed)
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead className="w-[100px]">Title</TableHead>

                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Updated At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks.map((task) => (
                    <TableRow key={task.id}>
                        <TableCell>
                            <Checkbox
                                checked={task.completed}
                                onCheckedChange={(e) => handleTaskCompleted( task)}
                            />
                        </TableCell>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.createdAt.toDateString()}</TableCell>
                        <TableCell className="text-right">{task.updatedAt.toDateString()}</TableCell>
                        <TableCell className="text-right">
                            <button className="text-red-500" onClick={() => {
                                handleDelete(task.id)
                            }} >Delete</button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    );
}
