document.getElementById("pdfForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  // Create new jsPDF instance
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add content to PDF
  doc.setFontSize(20);
  doc.text("Form Submission Details", 20, 20);

  doc.setFontSize(12);
  doc.text("Generated on: " + new Date().toLocaleString(), 20, 30);

  doc.setFontSize(14);
  doc.text("Personal Information:", 20, 45);

  doc.setFontSize(12);
  doc.text("Name: " + name, 20, 55);
  doc.text("Email: " + email, 20, 65);
  doc.text("Phone: " + phone, 20, 75);

  doc.setFontSize(14);
  doc.text("Message:", 20, 90);

  // Split message into multiple lines if too long
  const splitMessage = doc.splitTextToSize(message, 170);
  doc.setFontSize(12);
  doc.text(splitMessage, 20, 100);

  // Save the PDF
  doc.save("form-submission.pdf");
});
