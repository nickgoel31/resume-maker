"use client"

import { Skill } from '../page'


import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { z } from "zod"
 
import { Button } from "@/components/ui/button"

import { Input } from '@/components/ui/input'

const SkillAddBtn = ({onSkillAdd}:{onSkillAdd: (skill:Skill) => void}) => {
    const [name, setName] = useState("")
    const [level, setLevel] = useState("")
    const handleAddSkill = () => {
        const skill = {
            name: name,
            level: level
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
                    
                </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center gap-3 w-full">
                <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="" className='font-medium text-sm'>Degree</label>
                    <Input type="text" placeholder='e.g., Software Engineer Intern' onChange={(e) => setDegree(e.target.value)} />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="" className='font-medium text-sm'>School / Institute</label>
                    <Input type="text" placeholder='e.g., Software Engineer Intern' onChange={(e) => setInstitution(e.target.value)}/>
                </div>
                </div>
                <div className='flex w-full justify-end'>
                    <DialogClose>
                        <Button onClick={handleAddSkill}>Add</Button>
                    </DialogClose>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default SkillAddBtn