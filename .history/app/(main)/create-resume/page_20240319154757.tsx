"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ExpAddBtn from "./_components/exp-add-btn"
import { useState } from "react"
import { Trash2 } from "lucide-react"
import EduAddBtn from "./_components/edu-add-btn"
import { createResumeInDb } from "@/actions/create-resume-in-db"
 
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

export type Experience = {
    jobTitle: string;
    company: string;
    description: string;
    startDate: Date | null;
    endDate: Date | null; 
}

export type Education = {
    degree: string;
    institution: string;
    major: string;
    startDate: string;
    endDate: string;
}

const CreateResumePage = () => {

    let createdRes;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            summary: "",
            fatherName: ""
        },
      })
     
      // 2. Define a submit handler.
      
      if(createdRes === "Resume Created") {
          return;
        }

        
    const [experiences, setExperiences] = useState<Experience[]>([])
    
    const handleExperienceAdd = (experience:Experience) => {
        setExperiences([...experiences, experience])
    }
    const deleteExperience = (index:number) => {
        const newExperiences = experiences.filter((_, i) => i !== index)
        setExperiences(newExperiences)
    }

    const [educations, setEducations] = useState<Education[]>([])

    const handleEducationAdd = (education:Education) => {
        setEducations([...educations, education])
    }
    const deleteEducation = (index:number) => {
        const newEducation = educations.filter((_, i) => i !== index)
        setEducations(newEducation)
    }
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        const onSubmit = async (data: FormData) => {
            // Create a new PDF document
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage();
        
            // Add content to the PDF page
            page.drawText(`Name: ${data.name}`, {
              x: 50,
              y: page.getHeight() - 100,
              size: 12,
              color: rgb(0, 0, 0),
            });
            page.drawText(`Email: ${data.email}`, {
              x: 50,
              y: page.getHeight() - 120,
              size: 12,
              color: rgb(0, 0, 0),
            });
            // Add more fields as needed
        
            // Serialize the PDF
            const pdfBytes = await pdfDoc.save();
        
            // Create a Blob from the PDF data
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
        
            // Create a URL for the Blob
            const url = URL.createObjectURL(blob);
        
            // Open the PDF in a new tab
            window.open(url, "_blank");
          };
    }
    
    
    return (
    <body className='h-full w-full bg-slate-50 flex items-center justify-center gap-8 flex-col py-10 px-5'>
        <div className=''>
            <h1 className='font-bold text-3xl'>Create Resume</h1>
        </div>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-screen-sm">
                {/* SECTION 1 */}
                <div className="section-1 space-y-4">
                    <h3 className="text-semibold font-semibold text-lg">1. Basic Information</h3>
                <div className="flex items-center gap-3 w-full ">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Nabakishore Majhi" className="w-full" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="nabakishoremajhi@gmail.com" className="w-full" {...field} />
                            </FormControl>
                        </FormItem>
                    )}/>
                </div>

                <div className="flex items-center gap-3 w-full">
                <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Mobile No</FormLabel>
                        <FormControl>
                            <Input placeholder="9984234983" {...field} />
                        </FormControl>
                    </FormItem>
                )}/>
                <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                    <FormItem className="w-full"> 
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Input placeholder="Odhisa" {...field} />
                        </FormControl>
                    </FormItem>
                )}/>
                </div>

                <FormField
                control={form.control}
                name="fatherName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Father Name</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="eg- Manish Goel" {...field} />
                        </FormControl>
                    </FormItem>
                )}/>

                <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Profile Bio</FormLabel>
                        <FormControl>
                            <Textarea placeholder="describe yourself..." {...field} />
                        </FormControl>
                    </FormItem>
                )}/>
                </div>

                {/* SECTION 2 */}
                <div className="section-1 space-y-4">
                    <h3 className="text-semibold font-semibold text-lg">2. Add Experience</h3>

                    <div className="grid grid-cols-1 w-full gap-3">
                        {experiences.map((experience, index) => (
                            <div className="add-btn rounded border p-3 bg-white text-sm font-semibold flex gap-4 items-center flex-wrap justify-between">
                                <div className="line-clamp-1">
                                    {experience.jobTitle}
                                </div>
                                <div>
                                    <Trash2 size={15} onClick={() => deleteExperience(index)} className="text-red-500 cursor-pointer"/>
                                </div>
                            </div>
                        ))}
                        <ExpAddBtn onExperienceAdd={handleExperienceAdd}/>
                    </div>
                </div>

                {/* SECTION 3 */}
                <div className="section-1 space-y-4">
                    <h3 className="text-semibold font-semibold text-lg">3. Add Education</h3>

                    <div className="grid grid-cols-1 w-full gap-3">
                        {educations.map((education, index) => (
                            <div className="add-btn rounded border p-3 bg-white text-sm font-semibold flex gap-4 items-center flex-wrap justify-between">
                                <div className="line-clamp-1">
                                    {education.degree}
                                </div>
                                <div>
                                    <Trash2 size={15} onClick={() => deleteEducation(index)} className="text-red-500 cursor-pointer"/>
                                </div>
                            </div>
                        ))}
                        <EduAddBtn onEducationAdd={handleEducationAdd}/>
                    </div>
                </div>

                <Button type="submit">Generate Resume</Button>
            </form>
        </Form>
        
    </body>
  )
}

export default CreateResumePage