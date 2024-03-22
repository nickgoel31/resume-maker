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
import { useEffect, useRef, useState } from "react"
import { Check, Trash2 } from "lucide-react"
import EduAddBtn from "./_components/edu-add-btn"
import { createResumeInDb } from "@/actions/create-resume-in-db"
import { PDFDocument, rgb } from "pdf-lib";
import { generateResumePDF } from "@/actions/generate-resume-pdf"
import SkillAddBtn from "./_components/skill-add-btn"
import Image from "next/image"
import { generateResumePDFTheme2 } from "@/actions/generate-resume-page-theme-2"
 
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
    startDate: Date | null;
    endDate: Date | null; 
}

export type Skill = {
    name: string;
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

    const [skills, setSkills] = useState<Skill[]>([])

    const handleSkillAdd = (skill:Skill) => {
        setSkills([...skills, skill])
    }
    const deleteSkill = (index:number) => {
        const newSkills = skills.filter((_, i) => i !== index)
        setSkills(newSkills)
    }

    const profilePic = useRef<HTMLInputElement>(null);

    const [selectedTheme, setSelectedTheme] = useState<number>(1);
    
    function onSubmit(values: z.infer<typeof formSchema>) {

        const selectedFile = profilePic?.current?.files?.[0];
        if (selectedFile) {
            const fr = new FileReader();
            fr.readAsDataURL(selectedFile);

            // Wait for FileReader to load the file
            fr.onload = () => {
                // Access the result here if needed
                const profileUrl = fr.result as string;
                

                // Call generateResumePDF inside the onload function
                // generateResumePDF(values, experiences, educations, profileUrl, skills);

                generateResumePDFTheme2(values, experiences, educations, profileUrl, skills);
                // setEducations([])
                // setExperiences([])
            };
        } else {
            console.log("No file selected");
            // Call generateResumePDF here if needed
            // generateResumePDF(values, experiences, educations);
        }

    };

    
    
    return (
    <body className='h-full w-full bg-slate-50 flex items-center justify-center gap-8 flex-col py-10 px-5'>
        <div className=''>
            <h1 className='font-bold text-3xl'>Resume Generator</h1>
        </div>

        <div className="w-full max-w-screen-sm space-y-4">
            <h3 className="text-semibold font-semibold text-lg">Profile Picture</h3>
            <div className="flex items-center gap-3 w-full ">
                <input type="file" accept=".jpeg,.png,.webp,.jpg" id="#profilepic" ref={profilePic}/> 
            </div>
            
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

                {/* SECTION 4 */}
                <div className="section-1 space-y-4">
                    <h3 className="text-semibold font-semibold text-lg">4. Add Skills</h3>

                    <div className="grid grid-cols-1 w-full gap-3">
                        {skills.map((skill, index) => (
                            <div className="add-btn rounded border p-3 bg-white text-sm font-semibold flex gap-4 items-center flex-wrap justify-between">
                                <div className="line-clamp-1">
                                    {skill.name}
                                </div>
                                <div>
                                    <Trash2 size={15} onClick={() => deleteSkill(index)} className="text-red-500 cursor-pointer"/>
                                </div>
                            </div>
                        ))}
                        <SkillAddBtn onSkillAdd={handleSkillAdd}/>
                    </div>
                </div>

                {/* SECTION 5 */}
                <div className="section-1 space-y-4">
                    <h3 className="text-semibold font-semibold text-lg">5. Select Theme</h3>

                    <div className="flex gap-5 w-full gap-3items-center">
                        <div  className="flex items-center justify-start overflow-hidden h-40 w-28 cursor-pointer relative">
                            <Image src={"/theme1.jpg"} alt="Theme 1" width={1000} height={1000} className="h-full w-full"/>
                            {selectedTheme === 1 && <span className="w-full h-full absolute z-[2] bg-black/30 flex items-center justify-center">
                                <Check className="text-white" size={35}/>
                            </span>}
                        </div> 

                        <div  className="flex items-center justify-start overflow-hidden h-40 w-28 cursor-pointer relative" onClick={() => {
                            setSelectedTheme(2)
                        }}>
                            <Image src={"/theme2.jpg"} alt="Theme 2" width={1000} height={1000} className="h-full w-full"/>
                            {selectedTheme === 2 && <span className="w-full h-full absolute z-[2] bg-black/30 flex items-center justify-center">
                                <Check className="text-white" size={35}/>
                            </span>}
                        </div> 
                    </div>
                </div>


                <Button type="submit">Generate Resume</Button>
            </form>
        </Form>
        
    </body>
  )
}

export default CreateResumePage