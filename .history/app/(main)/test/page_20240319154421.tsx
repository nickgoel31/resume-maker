import generatePDF from '../utils/generatePDF';

const MyPage = () => {
    const handleClick = async () => {
        const pdfBytes = await generatePDF();

        // Create a Blob from the PDF data
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Open the PDF in a new tab
        window.open(url, '_blank');
    };

    return (
        <div>
            <button onClick={handleClick}>Generate PDF</button>
        </div>
    );
};

export default MyPage;
