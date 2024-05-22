"use server"

import { FormDataType } from "@/components/TaskForm"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export default async function addTask(form: FormDataType) {
    await prisma.task.create({
        data: {
            title: form.task,
            completed: false,
        },
    })

    revalidatePath("/")
}