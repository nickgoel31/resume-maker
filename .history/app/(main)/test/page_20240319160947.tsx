"use client"


import { PDFViewer } from '@react-pdf/renderer';
import { ResumeDocument } from '@/lib/pdf-file';

const TestPage = () => {
  return (
    <PDFViewer>
        <ResumeDocument />
    </PDFViewer>
  )
}

export default TestPage
