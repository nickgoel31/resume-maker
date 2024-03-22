import { z } from "zod";
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
      fatherName: z.string().min(2, {
          message: "Father Name should have at least 2 characters.",
        }),
  })

export const generateResumePDF = (values:z.infer<typeof formSchema>) => {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Add content to the PDF page
    page.drawText(`Name: ${values.name}`, {
      x: 50,
      y: page.getHeight() - 100,
      size: 12,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Email: ${values.email}`, {
      x: 50,
      y: page.getHeight() - 120,
      size: 12,
      color: rgb(0, 0, 0),
    });
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