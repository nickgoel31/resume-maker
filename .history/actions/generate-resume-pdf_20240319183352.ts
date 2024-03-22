import { z } from "zod";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Education, Experience } from "@/app/(main)/create-resume/page";

// Register fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const customFont = {
  OpenSans: {
    normal: `/fonts/opensans.ttf`,
    bold: `/fonts/opensans-bold.ttf`,
    italics: `/fonts/opensans-italic.ttf`,
    bolditalics: `/fonts/opensans-bolditalic.ttf`
  }
}

// pdfMake.fonts = {
//   ...pdfMake.fonts,
//   customFont
// };

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
    // Flex container for profile picture and name
    {
      layout: 'noBorders',
      table: {
        widths: ['auto', '*'],

        body: [
          [
            // Profile Picture
            {
              image: profileUrl,
              width: 100,
              height: 100,
              margin: [0, 0, 10, 0], // Add margin to separate from the name
              alignment: 'center',
              fit: [100, 100], // Make the image circular
              style: 'profileImage'
            },
            // Name as heading
            {
              text: values.name,
              style: "nameHeading",
              alignment: 'left',
              margin: [0, 40, 0, 10] // Adjust margin for vertical alignment
            }
          ]
        ]
      }
    },

    // Flex container for contact info, experience, and summary
    {
      layout: 'noBorders',
      table: {
        widths: ['40%', '60%'], // Adjust widths as needed
        body: [
          [
            {
              stack: [
                //contact info
                { text: "CONTACT INFORMATION", style: "subheader" },
                { text: `Email: ${values.email}` },
                { text: `Phone: ${values.phone}` },
                { text: `Address: ${values.address}` },
                { text: "", margin: [0, 12, 0, 0] }, 

                // Education
                { text: "EDUCATION", style: "subheader" },
                ...educations.map(education => {
                  return [
                    { text: "", margin: [0, 4, 0, 0] }, 
                    { text: `${education.degree}`, bold: true, fontSize: 13, margin: [0, 1, 0, 0]},
                    { text: `${education.institution}`,bold: true, fontSize: 10 margin: [0, 1, 0, 0],
                    // { text: `Description: ${education.major}` },
                    { text: `${education.startDate?.getFullYear()} - ${education.endDate?.getFullYear()}` },
                    { text: "", margin: [0, 10, 0, 0] }, // Add space between educations
                  ];
                }),
              ],
              alignment: 'left'
            },

            // Experiences and Summary
            {
              stack: [
                // Summary
                { text: "ABOUT ME", style: "subheader" },
                { text: values.summary, style: "summary", alignment: 'justify' },

                // Experiences
                { text: "WORK EXPERIENCE", style: "subheader" },
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
            }
          ]
        ]
      }
    }
  ];

  const documentDefinition: any = {
    content,
    styles: {
      nameHeading: {
        fontSize: 24,
        bold: true,
        margin: [0, 0, 0, 10] // [left, top, right, bottom]
      },
      profileImage: {
        borderRadius: 50, // Make the image circular
      },
      subheader: {
        fontSize: 16,
        bold: true,
        weight: 900,
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

  // Open the PDF in a new window
  pdfDoc.open();
};


