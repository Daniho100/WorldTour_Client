import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { useSummaryData } from '../utils/summaryHelpers';
;

export const generateCertificate = async (formData, countryZones) => {

  try {
    // Ensure correct URL or hosting for the PDF template
    const existingPdfUrl = '/sampleCertificate.pdf'; // Correct path to the PDF template
    const existingPdfBytes = await fetch(existingPdfUrl).then(res => res.arrayBuffer());

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { height } = firstPage.getSize();

    // Embed font for text drawing
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const labelFontSize = 9;

    // Get the summary data including age and duration
    const { reference, age, duration } = useSummaryData(formData, countryZones); // Pass countryZones here

    // Fill the certificate with data
    firstPage.drawText(`Reference No. ${reference}`, { x: 80, y: height - 215, size: labelFontSize, font: boldFont, color: rgb(0, 0, 0) });
    firstPage.drawText(`Certificate No. ${formData.reference}`, { x: 80, y: height - 227, size: labelFontSize, font: boldFont, color: rgb(0, 0, 0) });
    firstPage.drawText(`Insured Name. ${formData.personalData.surname} ${formData.personalData.other_names}`, { x: 80, y: height - 239, size: labelFontSize, font: boldFont, color: rgb(0, 0, 0) });
    firstPage.drawText(`Date of Birth. ${formData.personalData.dob}`, { x: 80, y: height - 251, size: labelFontSize, font: boldFont, color: rgb(0, 0, 0) });
    firstPage.drawText(`Age. ${age}`, { x: 80, y: height - 263, size: labelFontSize, font: boldFont, color: rgb(0, 0, 0) });
    firstPage.drawText(`Nationality. ${formData.personalData.nationality}`, { x: 80, y: height - 275, size: labelFontSize, font: boldFont, color: rgb(0, 0, 0) });
    firstPage.drawText(`Country of Residence. ${formData.personalData.state_residence}`, { x: 80, y: height - 287, size: labelFontSize, font: boldFont, color: rgb(0, 0, 0) });

    // Left side details
    firstPage.drawText(`Start Date. ${formData.coverDestination.startDate}`, { x: 303, y: height - 215, size: labelFontSize, font: boldFont, color: rgb(0, 0, 0) });
    firstPage.drawText(`End Date. ${formData.coverDestination.endDate}`, { x: 303, y: height - 227, size: labelFontSize, font: boldFont, color: rgb(0, 0, 0) });
    firstPage.drawText(`Passport No. ${formData.coverDestination.passportNo}`, { x: 303, y: height - 239, size: labelFontSize, font: boldFont, color: rgb(0, 0, 0) });
    firstPage.drawText(`Region. ${formData.personalData.stateOfOrigin}`, { x: 303, y: height - 251, size: labelFontSize, font: boldFont, color: rgb(0, 0, 0) });
    firstPage.drawText(`Destination. ${formData.coverDestination.destination}`, { x: 303, y: height - 263, size: labelFontSize, font: boldFont, color: rgb(0, 0, 0) });
    firstPage.drawText(`Duration. ${duration}`, { x: 303, y: height - 275, size: labelFontSize, font: boldFont, color: rgb(0, 0, 0) });

    // Add a footer or date of issue
    const issueDate = new Date().toLocaleDateString();
    firstPage.drawText(`Date of Issue: ${issueDate}`, { x: 50, y: 50, size: labelFontSize, font: boldFont, color: rgb(0, 0, 0) });

    // Save the modified PDF document
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Trigger the file download
    saveAs(blob, 'Filled_Certificate.pdf');
    
  } catch (error) {
    console.error('Error generating certificate:', error);
  }
};
