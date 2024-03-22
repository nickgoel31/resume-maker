"use client"


import { PDFViewer } from '@react-pdf/renderer';
import { ResumeDocument } from '@/lib/pdf-file';

export const TestPage = () => {
  return (
    <PDFViewer>
        <ResumeDocument />
    </PDFViewer>
  )
  }
