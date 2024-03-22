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
})

const CreateResumePage = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            summary: "",
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
    


  return (
    <body className='h-full w-full bg-slate-50 flex items-center justify-center gap-8 flex-col py-10'>
        <div className=''>
            <h1 className='font-bold text-3xl'>Create Resume</h1>
        </div>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-screen-sm">
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

                </div>
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

                <Button type="submit">Create Resume</Button>
            </form>
        </Form>
        
    </body>
  )
}

export default CreateResumePage