import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { toast } from "sonner";
import { ExportUtilsProps } from "./types";

export const exportAsPDF = async ({ formData, setCurrentSide, enabledSides = [0, 1, 2] }: ExportUtilsProps) => {
  try {
    const sides = [];
    for (const sideIndex of enabledSides) {
      setCurrentSide(sideIndex);
      // Wait for the state to update
      await new Promise(resolve => setTimeout(resolve, 100));
      const cardElement = document.getElementById("business-card");
      if (!cardElement) continue;
      const imageData = await toPng(cardElement);
      sides.push(imageData);
    }

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [300, sides.length * 500],
    });

    sides.forEach((side, index) => {
      if (index > 0) pdf.addPage();
      pdf.addImage(side, "PNG", 0, 0, 500, 300);
    });

    pdf.save("business-card.pdf");
    toast.success("Business card exported as PDF!");
  } catch (error) {
    toast.error("Failed to export PDF");
  }
};