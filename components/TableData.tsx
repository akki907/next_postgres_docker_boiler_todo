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
import { useState } from "react";
import { Button } from "./ui/button";
import { Delete, Loader2, Trash } from "lucide-react"

type Task = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default async function TableData({ tasks }: { tasks: Task[] }) {
    const [loading, setloading] = useState(false)
    const handleDelete = async (id: string) => {
        setloading(true)
        await deleteTask(id)
        toast("Task has been deleted.")
        setloading(false)
    }

    const handleTaskCompleted = async (task: Task) => {
        setloading(true)
        await updateTask(task.id, !task.completed)
        setloading(false)
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
                                disabled={loading}
                                checked={task.completed}
                                onCheckedChange={(e) => handleTaskCompleted(task)}
                            />
                        </TableCell>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.createdAt.toDateString()}</TableCell>
                        <TableCell className="text-right">{task.updatedAt.toDateString()}</TableCell>
                        <TableCell className="text-right">
                            <Button disabled={loading} variant={'destructive'} onClick={() => {
                                handleDelete(task.id)
                            }} >
                                {!loading ?<Trash className="h-4 w-4" />: <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    );
}
