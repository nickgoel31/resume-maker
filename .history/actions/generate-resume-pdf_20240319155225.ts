import { z } from "zod";
import { PDFDocument, rgb } from "pdf-lib";



export const generateResumePDF = async (values:z.infer<typeof formSchema>) => {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Add content to the PDF page
    
    // Add more fields as needed

    // Serialize the PDF
    const pdfBytes = await pdfDoc.save();

    // Create a Blob from the PDF data
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Open the PDF in a new tab
    window.open(url, "_blank");
}