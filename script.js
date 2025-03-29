document.getElementById("pdfForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const company = document.getElementById("company").value;
  const address1 = document.getElementById("address1").value;
  const address2 = document.getElementById("address2").value;
  const wasteType = document.getElementById("wasteType").value;
  const printNumber = document.getElementById("printNumber").value;
  const printCompany = document.getElementById("printCompany").value;
  const year = document.getElementById("year").value;
  const idFrom = parseInt(document.getElementById("idFrom").value);
  const count = parseInt(document.getElementById("count").value);

  // Create new jsPDF instance with Russian font support
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "mm", "a4");

  doc.addFileToVFS("Roboto-Regular.ttf", robotoBase64);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto");

  // Calculate pages needed
  const ticketsPerPage = 9;
  const totalTickets = count * 3;

  let currentPage = 1;
  // let currentY = 10;

  for (let i = 0; i < count; i++) {
    const currentId = (idFrom + i).toString().padStart(4, "0");
    const titles = [
      "Экземпляр заказчика",
      "Экземпляр перевозчика",
      "Экземпляр полигона",
    ];

    for (let j = 0; j < 3; j++) {
      // Check if we need a new page
      if (i * 3 + j > 0 && (i * 3 + j) % ticketsPerPage === 0) {
        doc.addPage();
        // ty = 10;
        currentPage++;
      }

      const tx = 10 + j * 65;
      const ty = 10 + Math.floor(((i * 3 + j) % ticketsPerPage) / 3) * 90;

      let y = 5;

      function writeText(text, size = 6) {
        doc.setFontSize(size);
        doc.text(text, tx + 2, ty + y);
        y += 5;
      }

      // Draw border
      doc.rect(tx, ty, 60, 85);

      writeText("Талон № " + currentId, 12);

      writeText(titles[j]);

      writeText("");

      writeText(company);

      const splitAddress1 = doc.splitTextToSize(address1, 56);
      splitAddress1.forEach((line) => {
        writeText(line);
      });

      const splitAddress2 = doc.splitTextToSize(address2, 56);
      splitAddress2.forEach((line) => {
        writeText(line);
      });

      writeText("");

      writeText("Вид отхода: " + wasteType);

      writeText("Объём: _______________");

      writeText("Марка Т/С: _______________");

      writeText("Гос. номер: _______________");

      writeText("");

      writeText(`_______________ ${year} г.`);

      writeText(printNumber + " " + printCompany);
    }
  }

  // Save the PDF
  doc.save("talons.pdf");
});
