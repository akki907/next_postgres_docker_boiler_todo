"use server"

import { FormDataType } from "@/components/TaskForm"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addTask(form: FormDataType) {
    await prisma.task.create({
        data: {
            title: form.task,
            completed: false,
            description: form.description,
        },
    })

    revalidatePath("/")
}

export async function deleteTask(id: string) {
    await prisma.task.delete({
        where: {
            id,
        },
    })

    revalidatePath("/")
}

export async function updateTask(id: string, completed: boolean) {
    await prisma.task.update({
        where: {
            id,
        },
        data: {
            completed,
            updatedAt: new Date(),
        },
    })

    revalidatePath("/")
}