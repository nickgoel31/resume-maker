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
