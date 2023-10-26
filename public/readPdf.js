const pdfjsLib = window["pdfjs-dist/build/pdf"];

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js";

const coverScale = 0.4; // Adjust as needed
const pageScale = 1; // Adjust as needed
const intervalInSeconds = 2; // Interval to switch PDFs in seconds

let currentPdfIndex = 0;

async function renderCoverPage(pdfUrl, canvas) {
  const pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
  const firstPage = await pdfDoc.getPage(1);
  const viewport = firstPage.getViewport({ scale: coverScale });

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const context = canvas.getContext("2d");

  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  firstPage.render({
    canvasContext: context,
    viewport: viewport,
  });
}

async function renderPdfPage(pdfUrl, canvas, pageNumber) {
  const pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
  const page = await pdfDoc.getPage(pageNumber);
  const viewport = page.getViewport({ scale: pageScale });

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const context = canvas.getContext("2d");

  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  page.render({
    canvasContext: context,
    viewport: viewport,
  });
}

async function clearPdfPage(canvas) {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}

async function switchPdf(data) {
  const rootPath = document.location.origin;
  const pdfUrl = rootPath + "/uploads/" + data[currentPdfIndex].FILENAME;
  const canvas = document.getElementById("pdf-cover-canvas");

  $("#title").text(data[currentPdfIndex].TITLE);
  $("#writer").text(data[currentPdfIndex].WRITER);

  await renderCoverPage(pdfUrl, canvas);
}

let currentPage = 0;
async function switchPdfPage(data) {
  const rootPath = document.location.origin;
  var l_pdfUrl = rootPath + "/uploads/" + data[currentPdfIndex].FILENAME;
  data[currentPdfIndex]

  var l_even_canvas = document.getElementById("pdf-canvas-even");
  //var l_odd_canvas = document.getElementById("pdf-canvas-odd");
  const pdfDoc = await pdfjsLib.getDocument(l_pdfUrl).promise;

  if (currentPage >= pdfDoc.numPages) {
    currentPdfIndex = (currentPdfIndex + 1) % data.length; // Move to the next PDF file
    await switchPdf(data);
    l_pdfUrl = rootPath + "/uploads/" + data[currentPdfIndex].FILENAME;

    currentPage = 1;
  } else {
    currentPage++;
  }

  renderPdfPage(l_pdfUrl, l_even_canvas, currentPage); // Display the second page (change '2' to display other pages if needed)
}

async function showPDF(data) {
  await switchPdf(data);
  await switchPdfPage(data);

  setInterval(async () => {
    switchPdfPage(data);
  }, intervalInSeconds * 1000);
}