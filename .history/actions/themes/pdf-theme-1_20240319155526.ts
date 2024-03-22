import { z } from "zod";
import { PDFDocument, PDFPage, rgb } from "pdf-lib";
import { formSchema } from "../generate-resume-pdf";

export const ThemeOne = async (values:z.infer<typeof formSchema>,page:PDFPage) => {
    import { z } from "zod";
import { PDFPage, rgb } from "pdf-lib";

export const ThemeOne = async (values: z.infer<typeof formSchema>, page: PDFPage) => {
  // Title
  page.drawText("Resume", {
    x: 50,
    y: page.getHeight() - 50,
    size: 18,
    color: rgb(0, 0, 0),
  });

  // Name
  page.drawText(`Name: ${values.name}`, {
    x: 50,
    y: page.getHeight() - 100,
    size: 12,
    color: rgb(0, 0, 0),
  });

  // Email
  page.drawText(`Email: ${values.email}`, {
    x: 50,
    y: page.getHeight() - 120,
    size: 12,
    color: rgb(0, 0, 0),
  });

  // Phone
  page.drawText(`Phone: ${values.phone}`, {
    x: 50,
    y: page.getHeight() - 140,
    size: 12,
    color: rgb(0, 0, 0),
  });

  // Address
  page.drawText(`Address: ${values.address}`, {
    x: 50,
    y: page.getHeight() - 160,
    size: 12,
    color: rgb(0, 0, 0),
  });

  // Father's Name
  page.drawText(`Father's Name: ${values.fatherName}`, {
    x: 50,
    y: page.getHeight() - 180,
    size: 12,
    color: rgb(0, 0, 0),
  });

  // Summary
  page.drawText("Summary:", {
    x: 50,
    y: page.getHeight() - 200,
    size: 12,
    color: rgb(0, 0, 0),
  });

  // Add line-wrapped summary
  const summaryLines = wordWrap(values.summary, 100); // Adjust width as needed
  const summaryY = page.getHeight() - 220;
  for (let line of summaryLines) {
    page.drawText(line, {
      x: 50,
      y: summaryY,
      size: 12,
      color: rgb(0, 0, 0),
    });
    summaryY -= 20; // Adjust line spacing as needed
  }
};

// Helper function to wrap text to fit within a specified width
function wordWrap(text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = PDFPage.getFontStringWidth(word) * 12 / 1000; // Assuming font size of 12
    if (PDFPage.getFontStringWidth(currentLine + " " + word) < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  lines.push(currentLine);
  return lines;
}

}