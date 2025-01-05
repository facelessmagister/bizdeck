import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { exportAsImage, exportAsVCard, exportAsPDF, exportAsHTML } from "../ExportUtils";
import { FormData } from "@/types/formTypes";

interface EditorExportOptionsProps {
  formData: FormData;
  setCurrentSide: (side: number) => void;
  enabledSides: number[];
}

export default function EditorExportOptions({
  formData,
  setCurrentSide,
  enabledSides,
}: EditorExportOptionsProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Export Options</h3>
      <div className="flex flex-wrap gap-3">
        <Button 
          onClick={() => exportAsImage({ formData, setCurrentSide, enabledSides })} 
          className="flex items-center gap-2"
        >
          <Download size={16} /> Export as Image
        </Button>
        <Button 
          onClick={() => exportAsPDF({ formData, setCurrentSide, enabledSides })} 
          variant="secondary" 
          className="flex items-center gap-2"
        >
          <Download size={16} /> Export as PDF
        </Button>
        <Button 
          onClick={() => exportAsVCard(formData)} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Share2 size={16} /> Export Contact
        </Button>
        <Button 
          onClick={() => exportAsHTML(formData)} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Download size={16} /> Export as HTML
        </Button>
      </div>
    </div>
  );
}