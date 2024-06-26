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
import { Loader2, Trash } from "lucide-react"
import { format } from "date-fns";
import { dateFormat } from "@/lib/constants";

type Task = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
}

export default function TableData({ tasks }: { tasks: Task[] }) {
    const [loading, setloading] = useState(false)
    const handleDelete = (id: string) => {
        setloading(true)
        deleteTask(id)
        toast("Task has been deleted.")
        setloading(false)
    }

    const handleTaskCompleted = (task: Task) => {
        setloading(true)
        updateTask(task.id, !task.completed)
        setloading(false)
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead >Title</TableHead>
                    <TableHead >Description</TableHead>

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
                        <TableCell className={`transition ${task.completed && 'line-through'}`}>{task.title}</TableCell>
                        <TableCell>{task.description}</TableCell>

                        <TableCell className="text-right">
                            <Button disabled={loading} variant={'destructive'} onClick={() => {
                                handleDelete(task.id)
                            }} >
                                {!loading ? <Trash className="h-4 w-4" /> : <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    );
}
