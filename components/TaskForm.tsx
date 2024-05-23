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
import {addTask} from "@/actions/task"
import { Textarea } from "./ui/textarea"

const formSchema = z.object({
    task: z.string().min(2, {
        message: "Task must be at least 2 characters.",
    }),
    description: z.string()
})

export type FormDataType = z.infer<typeof formSchema>

export default  function TaskForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            task: "",
            description: ""
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center gap-4 flex-col" >
                    <FormField
                        control={form.control}
                        name="task"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Task</FormLabel>
                                <FormControl>
                                    <Input className="dark:text-black" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea className="dark:text-black" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button  className="w-full mt-8 dark:border-white dark:border-2" type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}
