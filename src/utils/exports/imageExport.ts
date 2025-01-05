import { toPng } from "html-to-image";
import { toast } from "sonner";
import { ExportUtilsProps } from "./types";

export const exportAsImage = async ({ formData, setCurrentSide, enabledSides = [0, 1, 2] }: ExportUtilsProps) => {
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
    
    const canvas = document.createElement("canvas");
    canvas.width = sides.length * 500;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = await Promise.all(sides.map(side => {
      const img = new Image();
      img.src = side;
      return new Promise<HTMLImageElement>((resolve) => {
        img.onload = () => resolve(img);
      });
    }));

    images.forEach((img, index) => {
      ctx.drawImage(img, index * 500, 0, 500, 300);
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "business-card.png";
    link.click();
    toast.success("Business card exported as image!");
  } catch (error) {
    toast.error("Failed to export image");
  }
};