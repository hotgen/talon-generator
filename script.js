document.getElementById("pdfForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const company = document.getElementById("company").value;
  const address = document.getElementById("address").value;
  const wasteType = document.getElementById("wasteType").value;
  const volume = document.getElementById("volume").value;
  const marka = document.getElementById("marka").value;
  const gosNomer = document.getElementById("gosNomer").value;
  const printNumber = document.getElementById("printNumber").value;
  const printCompany = document.getElementById("printCompany").value;
  const idFrom = parseInt(document.getElementById("idFrom").value);
  const count = parseInt(document.getElementById("count").value);

  // Create new jsPDF instance
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Set font
  doc.setFont("helvetica");

  // Calculate pages needed
  const ticketsPerPage = 9;
  const totalTickets = count * 3;

  let currentPage = 1;
  let currentY = 10;

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
        currentY = 10;
        currentPage++;
      }

      const x = 10 + j * 65;
      currentY = 10 + Math.floor(((i * 3 + j) % ticketsPerPage) / 3) * 90;

      // Draw border
      doc.rect(x, currentY, 60, 85);

      // Company name and ТАЛОН
      doc.setFontSize(8);
      doc.text(company, x + 2, currentY + 5);
      doc.setFontSize(12);
      doc.text("ТАЛОН", x + 25, currentY + 10);

      // Ticket number
      doc.setFontSize(8);
      doc.text("№ " + currentId, x + 2, currentY + 15);

      // Address
      doc.setFontSize(6);
      const splitAddress = doc.splitTextToSize(address, 56);
      doc.text(splitAddress, x + 2, currentY + 20);

      // Title
      doc.text(titles[j], x + 2, currentY + 30);

      // Waste info
      doc.text("Вид отхода: " + wasteType, x + 2, currentY + 35);
      doc.text("Объём: " + volume, x + 2, currentY + 40);
      doc.text("Марка Т/С: " + marka, x + 2, currentY + 45);
      doc.text("Гос. номер: " + gosNomer, x + 2, currentY + 50);

      // MP and date
      doc.text("МП", x + 2, currentY + 60);
      doc.text('"___"________ 2025 г.', x + 2, currentY + 65);

      // Print number and company
      doc.setFontSize(5);
      doc.text(printNumber + " " + printCompany, x + 2, currentY + 70);
    }
  }

  // Save the PDF
  doc.save("talons.pdf");
});
