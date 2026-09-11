const fs = require("fs");
const { PDFParse } = require("pdf-parse");

/*
  Extract text from a PDF file.
*/
const extractPdfText = async (filePath) => {
  const fileBuffer = fs.readFileSync(filePath);

  const parser = new PDFParse({
    data: fileBuffer,
  });

  try {
    const pdfData = await parser.getText();

    return pdfData.text;
  } finally {
    await parser.destroy();
  }
};

module.exports = {
  extractPdfText,
};