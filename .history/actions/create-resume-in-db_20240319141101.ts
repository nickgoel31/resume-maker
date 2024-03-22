"use server"

import { z } from "zod"
import { db } from "@/lib/db"

export const createResumeInDb = async (resume: z.infer<typeof formSchema>) => {
    
}