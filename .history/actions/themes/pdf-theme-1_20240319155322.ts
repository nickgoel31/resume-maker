import { z } from "zod";
import { PDFDocument, PDFPage, rgb } from "pdf-lib";
import { formSchema } from "../generate-resume-pdf";

export const ThemeOne = async (values:z.infer<typeof formSchema>,page:PDFPage) => {
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
}