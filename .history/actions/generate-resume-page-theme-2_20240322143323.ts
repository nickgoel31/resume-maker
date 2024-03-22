import { z } from "zod";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Education, Experience, Skill } from "@/app/(main)/create-resume/page";
import { ConvertToSvg } from "@/helpers/conver";



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

export const generateResumePDFTheme2 = async (values: z.infer<typeof formSchema>, experiences: Experience[], educations: Education[], profileUrl: string, skills: Skill[], theme?: number | 2) => {
    const profileSvg = await ConvertToSvg(profileUrl);
  
    const backgroundImage = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <image src="/bg-res.jpg" width="100%" height="100%" />
      </svg>
    `;
  
    const content = [
      // Profile picture and name section
      {
        layout: 'noBorders',
        table: {
          widths: ['auto', '*'],
          body: [
            [
              // Profile Picture
              {
                svg: profileSvg,
              },
              // Name as heading
              {
                text: values.name,
                style: "nameHeading",
                alignment: 'left',
                margin: [15, 38, 10, 16] // Adjust margin for vertical alignment
              }
            ]
          ]
        }
      },
  
      // Contact information, education, skills, experiences, and summary section
      {
        stack: [
          // Contact information
          { text: "CONTACT INFORMATION", style: "subheader" },
          { text: `${values.email}`, opacity: 0.7 },
          { text: `${values.phone}`, opacity: 0.7 },
          { text: `${values.address}`, opacity: 0.7 },
          { text: "", margin: [0, 12, 0, 0] }, // Add space between sections
  
          // Education
          ...educations.length > 0 ? [
            { text: "EDUCATION", style: "subheader" },
            ...educations.map(education => {
              return [
                { text: `${education.degree}`, bold: true, fontSize: 13 },
                { text: `${education.institution}`, bold: true, fontSize: 10 },
                { text: `${education.startDate?.getFullYear()} - ${education.endDate?.getFullYear()}`, fontSize: 10, opacity: 0.6 },
                { text: "", margin: [0, 12, 0, 0] }, // Add space between educations
              ];
            })
          ] : [],
  
          // Skills
          ...skills.length > 0 ? [
            { text: "SKILLS", style: "subheader" },
            ...skills.map(skill => {
              return [
                { text: `${skill.name}`, bold: true, fontSize: 11, opacity: 0.6 },
                { text: "", margin: [0, 8, 0, 0] }, // Add space between skills
              ];
            }),
          ] : [],
  
          // Experiences
          ...experiences.length > 0 ? [
            { text: "WORK EXPERIENCE", style: "subheader" },
            ...experiences.map(experience => {
              const startMonth = experience.startDate?.toLocaleString('default', { month: 'long' });
              const endMonth = experience.endDate?.toLocaleString('default', { month: 'long' });
              return [
                { text: `${experience.jobTitle}`, bold: true, fontSize: 13 },
                { text: `${experience.startDate?.getFullYear()}, ${startMonth} - ${experience.endDate?.getFullYear()}, ${endMonth}`, opacity: 0.7 },
                { text: `${experience.company}`, opacity: 0.7 },
                { text: `${experience.description}`, opacity: 0.7 },
                { text: "", margin: [0, 17, 0, 0] }, // Add space between experiences
              ];
            }),
          ] : [],
        ],
        alignment: 'left' // Align the entire section to the left
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
        subheader: {
          fontSize: 16,
          bold: true,
          color: "#0369A1",
          width: '100%', // Set the width to 100%
          weight: 900,
          margin: [0, 15, 0, 0] // [left, top, right, bottom]
        },
        summary: {
          fontSize: 12,
          margin: [0, 0, 0, 10] // [left, top, right, bottom]
        }
      },
      background: [
        {
          svg: backgroundImage,
          absolutePosition: { x: 0, y: 0 },
          width: 595,
          height: 842
        }
      ]
    };
  
    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.open();
  };
  