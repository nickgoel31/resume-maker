import { z } from "zod";
import { PDFDocument, rgb } from "pdf-lib";
import { ResumeDocument } from "@/lib/pdf-file";
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
    
  import { z } from "zod";
  import pdfMake from "pdfmake/build/pdfmake";
  import pdfFonts from "pdfmake/build/vfs_fonts";
  
  // Register fonts
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  
  export const generatePDF = (values: z.infer<typeof formSchema>) => {
    const documentDefinition = {
      content: [
        { text: "Resume", style: "header" },
        { text: `Name: ${values.name}` },
        { text: `Email: ${values.email}` },
        { text: `Phone: ${values.phone}` },
        { text: `Address: ${values.address}` },
        { text: `Father's Name: ${values.fatherName}` },
        { text: "Summary:", style: "subheader" },
        { text: values.summary, style: "summary" }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10] // [left, top, right, bottom]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5] // [left, top, right, bottom]
        },
        summary: {
          fontSize: 12,
          margin: [0, 0, 0, 10] // [left, top, right, bottom]
        }
      }
    };
  
    // Create PDF document
    const pdfDoc = pdfMake.createPdf(documentDefinition);
  
    // Download the PDF
    pdfDoc.download("resume.pdf");
  };
  
}