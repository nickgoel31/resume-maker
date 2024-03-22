"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import { Education, Experience } from "@/app/(main)/create-resume/page"
import { auth, currentUser } from "@clerk/nextjs"
import { getResumeByUserId } from "./get-resume-by-user-id"


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
      fatherName: z.string().min(2, {
        message: "Father Name should have at least 2 characters.",
      }),
  })

export const createResumeInDb = async (values: z.infer<typeof formSchema>, experiences: Experience[],educations:Education[]) => {
    const user = await currentUser()
    if(!user) {
        return;
    }
    const validatedFields = formSchema.safeParse(values)
    if(!validatedFields.success) {
        return {error: "Something went wrong"}
    }

    const { name, email, phone, address, summary,fatherName } = values

    db.resume.create({
        data:{
            name,
            email,
            phone,
            address,
            summary,
            userId: user.id,
            fatherName
        }
    })

    return {success:"Resume Created"}

}


const createExperienceInDB = async () => {
    const user = await currentUser()
    const createdResume = await getResumeByUserId(currentUser())
}