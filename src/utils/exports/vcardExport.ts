import vCard from "vcf";
import { toast } from "sonner";
import { FormData } from "@/types/formTypes";

export const exportAsVCard = (formData: FormData) => {
  try {
    const card = new vCard();
    card.add("fn", formData.name);
    card.add("title", formData.title);
    card.add("email", formData.email);
    card.add("tel", formData.phone);
    card.add("url", formData.website);
    card.add("org", formData.company);
    card.add("adr", formData.address);
    card.add("note", `Specialties: ${formData.specialties}\nServices: ${formData.services}`);
    
    const vcfData = card.toString();
    const blob = new Blob([vcfData], { type: "text/vcard" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "business-card.vcf";
    link.click();
    toast.success("Contact card exported!");
  } catch (error) {
    toast.error("Failed to export contact card");
  }
};