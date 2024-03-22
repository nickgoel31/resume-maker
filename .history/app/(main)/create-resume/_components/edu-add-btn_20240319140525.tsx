"use client"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DatePicker } from '@/components/ui/date-picker'
import { Education, Experience } from '../page'

const EduAddBtn = ({onEducationAdd}:{onEducationAdd: (education:Education) => void}) => {

    const [degree, setDegree] = useState("")
    const [institution, setInstitution] = useState("")
    const [major, setMajor] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const handleAddEducation = () => {
        const education = {
            degree: degree,
            institution: institution,
            major: major,
            startDate: startDate,
            endDate: endDate
        };
        onEducationAdd(education); // Call the function passed from the parent with the experience object
    }


  return (
    <Dialog>
        <DialogTrigger>
            <div className="add-btn rounded border p-3 bg-white text-sm font-semibold flex items-center justify-center">
                + Add
            </div>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Experience</DialogTitle>
                <DialogDescription>
                    Add your work experience, internships, etc.
                </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center gap-3 w-full">
                <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="" className='font-medium text-sm'>Job title</label>
                    <Input type="text" placeholder='e.g., Software Engineer Intern' onChange={(e) => setDegree(e.target.value)} />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="" className='font-medium text-sm'>Company</label>
                    <Input type="text" placeholder='e.g., Software Engineer Intern' onChange={(e) => setCompany(e.target.value)}/>
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="" className='font-medium text-sm'>Description</label>
                    <Textarea placeholder='e.g., Software Engineer Intern' onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='flex items-center gap-3 w-full'>
                    {/* <div className='flex flex-col gap-1 w-full'>
                        <label htmlFor="" className='font-medium text-sm'>Start Date</label>
                        <DatePicker />
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <label htmlFor="" className='font-medium text-sm'>End Date</label>
                        <DatePicker onChange={(e) => setJobTitle(e.target.value)}/>
                    </div> */}
                </div>
                <div className='flex w-full justify-end'>
                    <DialogClose>
                        <Button onClick={handleAddEducation}>Add</Button>
                    </DialogClose>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default EduAddBtn