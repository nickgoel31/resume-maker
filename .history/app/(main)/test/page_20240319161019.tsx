"use client"


import { PDFViewer } from '@react-pdf/renderer';
import { ResumeDocument } from '@/lib/pdf-file';

const TestPage = () => {
  return (
    <body className='w-full h-full'>
        <PDFViewer>
            <ResumeDocument />
        </PDFViewer>
    </body>
  )
}

export default TestPage
