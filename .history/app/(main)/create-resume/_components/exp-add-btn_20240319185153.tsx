"use client"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { z } from "zod"
import "react-datepicker/dist/react-datepicker.css";
 
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
import DatePicker from "react-datepicker";
import { Experience } from '../page'

const ExpAddBtn = ({onExperienceAdd}:{onExperienceAdd: (experience:Experience) => void}) => {

    const [jobTitle, setJobTitle] = useState("")
    const [company, setCompany] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(new Date())

    const handleAddExperience = () => {
        const experience = {
          jobTitle: jobTitle,
          company: company,
          description: description,
          startDate: startDate,
          endDate: endDate
        };
        onExperienceAdd(experience);
        setJobTitle("")
        setCompany("")
        setDescription("")
        setStartDate(new Date())
        setEndDate(new Date())
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
                    <Input type="text" placeholder='e.g., Software Engineer Intern' onChange={(e) => setJobTitle(e.target.value)} />
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
                    <div className='flex flex-col gap-1 w-full'>
                        <label htmlFor="" className='font-medium text-sm'>Start Date</label>
                        <DatePicker selected={startDate} className='border rounded p-2 w-full px-3 text-sm font-medium' onChange={(date) => setStartDate(date)} />
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <label htmlFor="" className='font-medium text-sm'>End Date</label>
                        <DatePicker selected={endDate} className='border rounded p-2 w-full px-3 text-sm font-medium' onChange={(date) => setEndDate(date)} />
                    </div>
                </div>
                <div className='flex w-full justify-end'>
                    <DialogClose>
                        <Button onClick={handleAddExperience}>Add</Button>
                    </DialogClose>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ExpAddBtn