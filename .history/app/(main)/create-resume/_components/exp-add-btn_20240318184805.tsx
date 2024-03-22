

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
                <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                            <Input placeholder="Google" {...field} />
                        </FormControl>
                    </FormItem>
                )}/>
                <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                            <Input placeholder="Software Developer" {...field} />
                        </FormControl>
                    </FormItem>
                )}/>
        </DialogContent>
    </Dialog>
  )
}

export default ExpAddBtn