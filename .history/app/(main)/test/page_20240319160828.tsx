"use client"

import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import { ResumeDocument } from '@/lib/pdf-file';

cexport onst App = () => (
  <PDFViewer>
    <ResumeDocument />
  </PDFViewer>
);
