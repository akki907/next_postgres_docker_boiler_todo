"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import addTask from "@/actions/task"

const formSchema = z.object({
    task: z.string().min(2, {
        message: "Task must be at least 2 characters.",
    }),
})

export type FormDataType = z.infer<typeof formSchema>

export default  function TaskForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            task: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await addTask(values)
        toast("Task has been created.")
        form.reset()
    }

    return (
        <div className="flex w-full flex-col items-center justify-between ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="task"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Task</FormLabel>
                                <FormControl>
                                    <Input placeholder="Task" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}
