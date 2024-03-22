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
  drawTextWithWrap(page, `Name: ${values.name}`, 50, page.getHeight() - 100, 12, rgb(0, 0, 0));

  // Email
  drawTextWithWrap(page, `Email: ${values.email}`, 50, page.getHeight() - 120, 12, rgb(0, 0, 0));

  // Phone
  drawTextWithWrap(page, `Phone: ${values.phone}`, 50, page.getHeight() - 140, 12, rgb(0, 0, 0));

  // Address
  drawTextWithWrap(page, `Address: ${values.address}`, 50, page.getHeight() - 160, 12, rgb(0, 0, 0));

  // Father's Name
  drawTextWithWrap(page, `Father's Name: ${values.fatherName}`, 50, page.getHeight() - 180, 12, rgb(0, 0, 0));

  // Summary
  drawTextWithWrap(page, "Summary:", 50, page.getHeight() - 200, 12, rgb(0, 0, 0));

  // Add line-wrapped summary
  const summaryLines = wordWrap(values.summary, 100); // Adjust width as needed
  const summaryY = page.getHeight() - 220;
  for (let line of summaryLines) {
    drawTextWithWrap(page, line, 50, summaryY, 12, rgb(0, 0, 0));
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
    const width = page.widthOfString(currentLine + " " + word) / 1000; // Assuming font size of 12
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  lines.push(currentLine);
  return lines;
}

// Helper function to draw text with text wrapping
function drawTextWithWrap(page: PDFPage, text: string, x: number, y: number, size: number, color: any) {
  const lines = wordWrap(text, 500); // Adjust width as needed
  for (let line of lines) {
    page.drawText(line, {
      x,
      y,
      size,
      color,
    });
    y -= size + 2; // Adjust line spacing as needed
  }
}
