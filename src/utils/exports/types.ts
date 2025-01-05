import { FormData } from "@/types/formTypes";

export interface ExportUtilsProps {
  formData: FormData;
  setCurrentSide: (side: number) => void;
  enabledSides?: number[];
}