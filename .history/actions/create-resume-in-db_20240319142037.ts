"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import { Education, Experience } from "@/app/(main)/create-resume/page"
import { auth, currentUser } from "@clerk/nextjs"


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

export const createResumeInDb = async (values: z.infer<typeof formSchema>, experiences: Experience[] | null,educations:Education[] | null) => {
    const user = await currentUser()
    if(!user) {
        return;
    }
    const validatedFields = formSchema.safeParse(values)
    if(!validatedFields.success) {
        return {error: "Something went wrong"}
    }

    const { name, email, phone, address, summary,fatherName } = values

    const createdResume = await db.resume.create({
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
    if(experiences){
        
    }

    for(let i=0;i<experiences?.length;i++) {
        const experience = experiences[i]
        db.experience.create({
            data:{
                title: experience.jobTitle,
                company: experience.company,
                description: experience.description,
                startDate: experience.startDate,
                endDate: experience.endDate,
                resumeId: createdResume.id
            }
        })
    }

}