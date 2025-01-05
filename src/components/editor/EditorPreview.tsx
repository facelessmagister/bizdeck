import { QRCodeSVG } from "qrcode.react";
import BusinessCard from "../BusinessCard";
import { FormData } from "@/types/formTypes";

interface EditorPreviewProps {
  formData: FormData;
  currentSide: number;
  enabledSides: number[];
}

export default function EditorPreview({ formData, currentSide, enabledSides }: EditorPreviewProps) {
  return (
    <div className="lg:sticky lg:top-8 space-y-6">
      <div id="business-card" className="w-full">
        <BusinessCard {...formData} currentSide={currentSide} enabledSides={enabledSides} />
      </div>
      
      {currentSide === 1 && (
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">QR Code</h3>
          <div className="flex justify-center bg-white p-4 rounded-lg">
            <QRCodeSVG
              value={`BEGIN:VCARD\nVERSION:3.0\nFN:${formData.name}\nTITLE:${formData.title}\nORG:${formData.company}\nTEL:${formData.phone}\nEMAIL:${formData.email}\nURL:${formData.website}\nEND:VCARD`}
              size={200}
              level="H"
            />
          </div>
        </div>
      )}
    </div>
  );
}