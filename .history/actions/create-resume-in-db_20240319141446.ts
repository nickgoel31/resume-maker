"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import { Education, Experience } from "@/app/(main)/create-resume/page"


const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
      email: z.string().email({
          message: "Invalid email address.",
      }),
      phone: z.string().min(10, {
        message: "Phone number should have at least 10 digits.",
      }),
      address: z.string().min(5, {
        message: "Address should have at least 5 characters.",
      }),
      summary: z.string().min(10, {
        message: "Summary should have at least 10 characters.",
      }),
  })

export const createResumeInDb = async (values: z.infer<typeof formSchema>, experiences: Experience[] | null,educations:Education[] | null) => {
    const validatedFields = formSchema.safeParse(values)
    if(!validatedFields.success) {
        return {}
    }

}