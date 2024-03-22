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
    // Profile Picture
    { image: profileUrl, width: 150, height: 150, margin: [0, 0, 0, 10], borderRadius: 50, alignment: 'center'},

    // Name as heading
    { text: values.name, style: "nameHeading", alignment: 'center' },

    // Flex container for contact info and experience
    {
      layout: 'noBorders',
      table: {
        widths: ['*', '*'],
        body: [
          [
            // Contact Info
            {
              stack: [
                { text: `Email: ${values.email}` },
                { text: `Phone: ${values.phone}` },
                { text: `Address: ${values.address}` },
              ],
              alignment: 'left'
            },

            // Experiences
            {
              stack: [
                { text: "Experiences:", style: "subheader", alignment: 'center' },
                ...experiences.map(experience => {
                  const startMonth = experience.startDate?.toLocaleString('default', { month: 'long' });
                  const endMonth = experience.endDate?.toLocaleString('default', { month: 'long' });
                  return [
                    { text: `Job Title: ${experience.jobTitle}` },
                    { text: `Company: ${experience.company}` },
                    { text: `Description: ${experience.description}` },
                    { text: `Start Date: ${experience.startDate?.getFullYear()}, ${startMonth}` },
                    { text: `End Date: ${experience.endDate?.getFullYear()}, ${endMonth}` },
                    { text: "", margin: [0, 10, 0, 0] }, // Add space between experiences
                  ];
                }),
              ],
              alignment: 'center'
            }
          ]
        ]
      }
    },

    // Summary
    { text: "Summary:", style: "subheader", alignment: 'center' },
    { text: values.summary, style: "summary", alignment: 'center' }
  ];

  const documentDefinition: any = {
    content,
    styles: {
      nameHeading: {
        fontSize: 24,
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
  pdfDoc.open();
};
