import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EditorSideSelectorProps {
  currentSide: number;
  setCurrentSide: (side: number) => void;
  enabledSides: number[];
  toggleSide: (sideIndex: number) => void;
}

export default function EditorSideSelector({
  currentSide,
  setCurrentSide,
  enabledSides,
  toggleSide,
}: EditorSideSelectorProps) {
  const sideNames = ["Basic Info", "Links", "Professional", "Experience", "Education"];

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Edit Side {currentSide + 1}</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setCurrentSide(prev => Math.max(0, prev - 1))}
            disabled={currentSide === 0}
            variant="outline"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => setCurrentSide(prev => Math.min(4, prev + 1))}
            disabled={currentSide === 4}
            variant="outline"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Enabled Sides</h3>
        <div className="flex flex-wrap gap-2">
          {sideNames.map((name, index) => (
            <Badge
              key={index}
              variant={enabledSides.includes(index) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleSide(index)}
            >
              {name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}