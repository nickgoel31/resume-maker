import { z } from "zod";
import { PDFDocument, rgb } from "pdf-lib";
import { ThemeOne } from "./themes/pdf-theme-1";
import ReactPDF from '@react-pdf/renderer';

export const formSchema = z.object({
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

export const generateResumePDF = async (values:z.infer<typeof formSchema>) => {
    

    ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
}