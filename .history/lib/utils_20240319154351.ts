import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { PDFDocument, rgb } from 'pdf-lib';

const generatePDF = async () => {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]);

    // Add content to the PDF page
    const { width, height } = page.getSize();
    page.drawText('Hello, World!', {
        x: 50,
        y: height - 100,
        size: 30,
        color: rgb(0, 0, 0),
    });

    // Save the PDF to a Uint8Array
    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
}

export default generatePDF;
