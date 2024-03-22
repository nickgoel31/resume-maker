"use server"

import { db } from "@/lib/db"

export const getResumeByUserId = async (userId: string) => {
    const resume = await db.resume.findFirst({
        where: {
            userId
        }
    })
    return resume
}