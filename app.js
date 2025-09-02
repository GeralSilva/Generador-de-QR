function generateQR() {
  const text = document.getElementById("text").value;
  const canvas = document.getElementById("qrcode");
  const size = parseInt(document.getElementById("size").value) || 256;

  QRCode.toCanvas(
    canvas,
    text || "http://127.0.0.1:8000/scan",   // 🔹 Aquí se registra el escaneo
    {
      width: size,
      margin: parseInt(document.getElementById("margin").value),
      color: {
        dark: document.getElementById("colorDark").value,
        light: document.getElementById("colorLight").value
      },
      errorCorrectionLevel: document.getElementById("ecLevel").value
    },
    function (error) {
      if (error) {
        console.error(error);
        return;
      }

      const ctx = canvas.getContext("2d");
      const logo = new Image();
      logo.src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBmOwBmeJNIY9k9MseUafoJNNDPMVAwPFHAzb7tqiLfytLx9rxe6TsCOGHcOkDb73CD989HW1qcXQCVk3DChOtNr6Us291QpLuOu8FeDsSK7IVXsgI6ZFthCDSRXT5MQNgJw0pxUyFID0cP47Bb0Xy8Z_J-Z4MWOkCK4cpOVyAvJFVAU0JlDniJmsAd4nc/s16000/Logo-SENA.png";

      logo.onload = function () {
        const logoSize = size * 0.2;
        const x = (canvas.width - logoSize) / 2;
        const y = (canvas.height - logoSize) / 2;

        const padding = 8;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          x - padding / 2,
          y - padding / 2,
          logoSize + padding,
          logoSize + padding
        );

        ctx.drawImage(logo, x, y, logoSize, logoSize);
      };
    }
  );
}

function downloadQR() {
  const canvas = document.getElementById("qrcode");

  if (!canvas || canvas.width === 0) {
    alert("Primero genera un código QR antes de descargarlo.");
    return;
  }

  try {
    // Método alternativo más compatible
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `codigo-qr-${new Date().getTime()}.png`;
    
    // Asegurar compatibilidad con diferentes navegadores
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log("✅ QR descargado exitosamente");
  } catch (error) {
    console.error("Error al descargar QR:", error);
    alert("Error al descargar el código QR. Intenta de nuevo.");
  }
}
