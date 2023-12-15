const pdfjsLib = window["pdfjs-dist/build/pdf"];

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js";

let coverScale = 0.4; // Adjust as needed
let pageScale = 1; // Adjust as needed
let intervalInSeconds = 1; // Interval to switch PDFs in seconds

let currentPdfIndex = 0;
let watchDog = 0

async function renderCoverPage(pdfDoc, canvas) {
  let firstPage = await pdfDoc.getPage(1);
  let viewport = firstPage.getViewport({ scale: coverScale });

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  let context = canvas.getContext("2d");

  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  firstPage.render({
    canvasContext: context,
    viewport: viewport,
  });
}

async function renderPdfPage(pdfDoc, canvas, pageNumber) {
  let page = await pdfDoc.getPage(pageNumber);
  let viewport = page.getViewport({ scale: pageScale });

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  let context = canvas.getContext("2d");

  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  page.render({
    canvasContext: context,
    viewport: viewport,
  });
}

async function switchPdf(coverPdf) {
  let canvas = document.getElementById("pdf-cover");

  $("#writeId").text(data[currentPdfIndex].WRITER_NO);
  $("#title").text(data[currentPdfIndex].TITLE);
  $("#writer").text(data[currentPdfIndex].NAME);
  $("#affilication").text(data[currentPdfIndex].AFFILIATION);
  $("#grade").text(data[currentPdfIndex].GRADE);

  await renderCoverPage(coverPdf, canvas);
}

let currentPage = 0;
async function switchPdfPage(data) {
  let l_pdfUrl = document.location.origin + "/uploads/" + data[currentPdfIndex].FILENAME;
  let l_even_canvas = document.getElementById("pdf-page");

  let pdfDoc = await pdfjsLib.getDocument(l_pdfUrl).promise;

  if (currentPage >= pdfDoc.numPages) {
    if ((currentPdfIndex + 1) != data.length){
      currentPdfIndex = (currentPdfIndex + 1) % data.length; // Move to the next PDF file
    } else {
      if (watchDog < 10) {
        currentPdfIndex = (currentPdfIndex + 1) % data.length; // Move to the next PDF file
        watchDog += 1
      } else {
        location.reload();
      }
    }
    l_pdfUrl = document.location.origin + "/uploads/" + data[currentPdfIndex].FILENAME;
    pdfDoc = await pdfjsLib.getDocument(l_pdfUrl).promise;
    await switchPdf(pdfDoc);

    currentPage = 1;
  } else {
    currentPage++;
  }

  renderPdfPage(pdfDoc, l_even_canvas, currentPage); // Display the second page (change '2' to display other pages if needed)
}

async function showPDF(data) {
  let pdfUrl = document.location.origin + "/uploads/" + data[currentPdfIndex].FILENAME;
  let coverPdf = await pdfjsLib.getDocument(pdfUrl).promise;

  switchPdf(coverPdf);
  switchPdfPage(data);

  setInterval(async () => {
    switchPdfPage(data);
  }, intervalInSeconds * 1000);
}