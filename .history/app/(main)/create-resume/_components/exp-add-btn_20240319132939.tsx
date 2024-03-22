"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
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

const ExpAddBtn = () => {
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

            <div className="flex items-center gap-3 w-full">
                
                </div>
        </DialogContent>
    </Dialog>
  )
}

export default ExpAddBtn