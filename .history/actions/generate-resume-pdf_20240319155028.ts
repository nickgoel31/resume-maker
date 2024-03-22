// Create a new PDF document
const pdfDoc = await PDFDocument.create();
const page = pdfDoc.addPage();

// Add content to the PDF page
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
// Add more fields as needed

// Serialize the PDF
const pdfBytes = await pdfDoc.save();

// Create a Blob from the PDF data
const blob = new Blob([pdfBytes], { type: "application/pdf" });

// Create a URL for the Blob
const url = URL.createObjectURL(blob);

// Open the PDF in a new tab
window.open(url, "_blank");