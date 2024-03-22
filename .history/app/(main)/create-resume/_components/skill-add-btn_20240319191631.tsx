"use client"

import { Skill } from '../page'


import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { z } from "zod"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
 
import { Button } from "@/components/ui/button"

import { Input } from '@/components/ui/input'
import { ComboboxDemo } from '@/components/ui/combobox'

const SkillAddBtn = ({onSkillAdd}:{onSkillAdd: (skill:Skill) => void}) => {
    const [name, setName] = useState("")
    const handleAddSkill = () => {
        const skill = {
            name: name,
        };
        onSkillAdd(skill) // Call the function passed from the parent with the experience object
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
                <DialogTitle>Add Skill</DialogTitle>
                <DialogDescription>
                    Add your skills here.
                </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center gap-3 w-full">
                <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="" className='font-medium text-sm'>Skill Name</label>
                    <Input type="text" placeholder='e.g. Javascript' onChange={(e) => setName(e.target.value)} />
                </div>
                {/* <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="" className='font-medium text-sm'>Skill Level</label>
                    <Select onValueChange={() => s}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose Skill Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                    </Select>

                </div> */}
                </div>
                <div className='flex w-full justify-end'>
                    <DialogClose>
                        <Button onClick={handleAddSkill}>Add</Button>
                    </DialogClose>
                </div>
        </DialogContent>
    </Dialog>
  )
}

export default SkillAddBtn