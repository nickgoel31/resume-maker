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
    // add profile picture
    { image: profileUrl, width: 100, height: 100, margin: [0, 0, 0, 10] },

    // Name as heading
    { text: values.name, style: "nameHeading" },

    // Personal Information
    { text: `Email: ${values.email}`, alignment: 'center' },
    { text: `Phone: ${values.phone}`, alignment: 'center' },
    { text: `Address: ${values.address}`, alignment: 'center' },
    { text: `Father's Name: ${values.fatherName}`, alignment: 'center' },

    // Summary
    { text: "Summary:", style: "subheader", alignment: 'center' },
    { text: values.summary, style: "summary", alignment: 'center' }
  ];

  // Add experiences
  if (experiences.length > 0) {
    content.push(
      { text: "Experiences:", style: "subheader", alignment: 'center' }
    );
    
    experiences.forEach(experience => {
      const startMonth = experience.startDate?.toLocaleString('default', { month: 'long' });
      const endMonth = experience.endDate?.toLocaleString('default', { month: 'long' });
      content.push(
        { text: `Job Title: ${experience.jobTitle}` },
        { text: `Company: ${experience.company}` },
        { text: `Description: ${experience.description}` },
        { text: `Start Date: ${experience.startDate?.getFullYear()}, ${startMonth}` },
        { text: `End Date: ${experience.endDate?.getFullYear()}, ${endMonth}` }
      );
    });
  }

  // Add educations
  if (educations.length > 0) {
    content.push(
      { text: "Educations:", style: "subheader", alignment: 'center' }
    );
    educations.forEach(education => {
      const startMonth = education.startDate?.toLocaleString('default', { month: 'long' });
      const endMonth = education.endDate?.toLocaleString('default', { month: 'long' });
      content.push(
        { text: `Degree: ${education.degree}` },
        { text: `Institution: ${education.institution}` },
        { text: `Major: ${education.major}` },
        { text: `Start Date: ${education.startDate?.getFullYear()}, ${startMonth}` },
        { text: `End Date: ${education.endDate?.getFullYear()}, ${endMonth}` }
      );
    });
  }

  const documentDefinition: any = {
    content,
    styles: {
      nameHeading: {
        fontSize: 24,
        bold: true,
        margin: [0, 0, 0, 10], // [left, top, right, bottom]
        alignment: 'center'
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