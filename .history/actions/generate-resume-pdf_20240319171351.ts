import { z } from "zod";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Education, Experience } from "@/app/(main)/create-resume/page";

// Register fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

export const generateResumePDF = (values: z.infer<typeof formSchema>, experiences: Experience[], educations: Education[], profileUrl: string) => {
  const content = [
    // add profilepicture
    { image: profileUrl, width: 100, height: 100, margin: [0, 0, 0, 10] },
    { text: "Resume", style: "header" },
    { text: `Name: ${values.name}` },
    { text: `Email: ${values.email}` },
    { text: `Phone: ${values.phone}` },
    { text: `Address: ${values.address}` },
    { text: `Father's Name: ${values.fatherName}` },
    { text: "Summary:", style: "subheader" },
    { text: values.summary, style: "summary" }
  ];

  // Add experiences
  if (experiences.length > 0) {
    content.push(
      { text: "Experiences:", style: "subheader" }
    );
    experiences.forEach(experience => {
      content.push(
        { text: `Job Title: ${experience.jobTitle}` },
        { text: `Company: ${experience.company}` },
        { text: `Description: ${experience.description}` },
        { text: `Start Date: ${experience.startDate?.getFullYear}, ${experience.}` },
        { text: `End Date: ${experience.endDate?.getFullYear}` }
      );
    });
  }

  // Add educations
  if (educations.length > 0) {
    content.push(
      { text: "Educations:", style: "subheader" }
    );
    educations.forEach(education => {
      content.push(
        { text: `Degree: ${education.degree}` },
        { text: `Institution: ${education.institution}` },
        { text: `Major: ${education.major}` },
        { text: `Start Date: ${education.startDate}` },
        { text: `End Date: ${education.endDate}` }
      );
    });
  }

  const documentDefinition: any = {
    content,
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

