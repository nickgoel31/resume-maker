"use client"


import { PDFViewer } from '@react-pdf/renderer';
import { ResumeDocument } from '@/lib/pdf-file';

const TestPage = () => {
  return (
    <body c>
        <PDFViewer>
            <ResumeDocument />
        </PDFViewer>
    </body>
  )
}

export default TestPage
