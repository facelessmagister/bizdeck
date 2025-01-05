import { useState } from "react";
import { FormData } from "@/types/formTypes";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import EditorForm from "./editor/EditorForm";
import EditorPreview from "./editor/EditorPreview";
import EditorSideSelector from "./editor/EditorSideSelector";
import EditorExportOptions from "./editor/EditorExportOptions";

export default function CardEditor() {
  const [currentSide, setCurrentSide] = useState(0);
  const [enabledSides, setEnabledSides] = useState([0, 1, 2]);
  const [formData, setFormData] = useState<FormData>({
    profilePic: "",
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    tagline: "",
    linkedin: "",
    twitter: "",
    whatsapp: "",
    telegram: "",
    tiktok: "",
    specialties: [] as string[],
    skills: [] as string[],
    services: [] as string[],
    ctaButtons: [
      { text: "", link: "", color: "bg-blue-500 hover:bg-blue-600", enabled: true },
      { text: "", link: "", color: "bg-purple-500 hover:bg-purple-600", enabled: false },
      { text: "", link: "", color: "bg-orange-500 hover:bg-orange-600", enabled: false },
    ],
    otherLinks: [] as Array<{ title: string; url: string }>,
    experiences: [] as Array<{
      jobTitle: string;
      organization: string;
      startDate: string;
      endDate: string;
      currentlyWorking: boolean;
      responsibilities: string;
    }>,
    education: [] as Array<{
      degree: string;
      institution: string;
      startDate: string;
      graduationDate: string;
      achievements: string;
    }>,
    displaySections: {
      specialties: true,
      skills: true,
      services: true,
    }
  });

  const handleAddTag = (type: keyof Pick<FormData, "specialties" | "skills" | "services">) => {
    const value = (document.querySelector(`input[placeholder="Add ${type}"]`) as HTMLInputElement)?.value.trim();
    if (value) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], value],
      }));
      (document.querySelector(`input[placeholder="Add ${type}"]`) as HTMLInputElement).value = "";
    }
  };

  const handleRemoveTag = (type: keyof Pick<FormData, "specialties" | "skills" | "services">, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleAddOtherLink = () => {
    const titleInput = document.querySelector('input[placeholder="Link Title"]') as HTMLInputElement;
    const urlInput = document.querySelector('input[placeholder="URL"]') as HTMLInputElement;
    
    if (titleInput?.value && urlInput?.value) {
      setFormData((prev) => ({
        ...prev,
        otherLinks: [...prev.otherLinks, { title: titleInput.value, url: urlInput.value }],
      }));
      titleInput.value = "";
      urlInput.value = "";
    }
  };

  const handleRemoveOtherLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      otherLinks: prev.otherLinks.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profilePic: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddExperience = () => {
    const jobTitleInput = document.querySelector('input[placeholder="Job Title"]') as HTMLInputElement;
    const organizationInput = document.querySelector('input[placeholder="Organization"]') as HTMLInputElement;
    const startDateInput = document.querySelector('input[placeholder="Start Date"]') as HTMLInputElement;
    const endDateInput = document.querySelector('input[placeholder="End Date"]') as HTMLInputElement;
    const currentlyWorkingInput = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
    const responsibilitiesInput = document.querySelector('textarea[placeholder="Responsibilities/Accomplishments"]') as HTMLTextAreaElement;
    
    if (jobTitleInput?.value && organizationInput?.value) {
      setFormData((prev) => ({
        ...prev,
        experiences: [...prev.experiences, {
          jobTitle: jobTitleInput.value,
          organization: organizationInput.value,
          startDate: startDateInput?.value || "",
          endDate: endDateInput?.value || "",
          currentlyWorking: currentlyWorkingInput?.checked || false,
          responsibilities: responsibilitiesInput?.value || "",
        }],
      }));
      
      jobTitleInput.value = "";
      organizationInput.value = "";
      startDateInput.value = "";
      endDateInput.value = "";
      currentlyWorkingInput.checked = false;
      responsibilitiesInput.value = "";
    }
  };

  const handleAddEducation = () => {
    const degreeInput = document.querySelector('input[placeholder="Degree/Qualification"]') as HTMLInputElement;
    const institutionInput = document.querySelector('input[placeholder="Institution"]') as HTMLInputElement;
    const startDateInput = document.querySelector('input[placeholder="Start Date"]') as HTMLInputElement;
    const graduationDateInput = document.querySelector('input[placeholder="Graduation Date"]') as HTMLInputElement;
    const achievementsInput = document.querySelector('textarea[placeholder="Achievements/Activities (Optional)"]') as HTMLTextAreaElement;
    
    if (degreeInput?.value && institutionInput?.value) {
      setFormData((prev) => ({
        ...prev,
        education: [...prev.education, {
          degree: degreeInput.value,
          institution: institutionInput.value,
          startDate: startDateInput?.value || "",
          graduationDate: graduationDateInput?.value || "",
          achievements: achievementsInput?.value || "",
        }],
      }));
      
      degreeInput.value = "";
      institutionInput.value = "";
      startDateInput.value = "";
      graduationDateInput.value = "";
      achievementsInput.value = "";
    }
  };

  const handleRemoveExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const toggleSide = (sideIndex: number) => {
    setEnabledSides((prev) => {
      if (prev.includes(sideIndex)) {
        return prev.filter((side) => side !== sideIndex);
      }
      return [...prev, sideIndex].sort();
    });
  };

  const handleCtaButtonChange = (index: number, field: "text" | "link", value: string) => {
    setFormData((prev) => {
      const newButtons = [...prev.ctaButtons];
      newButtons[index] = { ...newButtons[index], [field]: value };
      return { ...prev, ctaButtons: newButtons };
    });
  };

  const handleCtaButtonToggle = (index: number) => {
    setFormData(prev => {
      const newButtons = [...prev.ctaButtons];
      newButtons[index] = { ...newButtons[index], enabled: !newButtons[index].enabled };
      return { ...prev, ctaButtons: newButtons };
    });
  };

  const handleSectionToggle = (section: keyof typeof formData.displaySections) => {
    setFormData(prev => ({
      ...prev,
      displaySections: {
        ...prev.displaySections,
        [section]: !prev.displaySections[section]
      }
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Header />
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <EditorSideSelector
            currentSide={currentSide}
            setCurrentSide={setCurrentSide}
            enabledSides={enabledSides}
            toggleSide={toggleSide}
          />
          
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
            <EditorForm
              currentSide={currentSide}
              formData={formData}
              setFormData={setFormData}
              handleAddTag={handleAddTag}
              handleRemoveTag={handleRemoveTag}
              handleAddOtherLink={handleAddOtherLink}
              handleRemoveOtherLink={handleRemoveOtherLink}
              handleImageUpload={handleImageUpload}
              handleAddExperience={handleAddExperience}
              handleRemoveExperience={handleRemoveExperience}
              handleAddEducation={handleAddEducation}
              handleRemoveEducation={handleRemoveEducation}
              handleCtaButtonChange={handleCtaButtonChange}
              handleCtaButtonToggle={handleCtaButtonToggle}
              handleSectionToggle={handleSectionToggle}
            />
          </div>

          <EditorExportOptions
            formData={formData}
            setCurrentSide={setCurrentSide}
            enabledSides={enabledSides}
          />
        </div>

        <EditorPreview
          formData={formData}
          currentSide={currentSide}
          enabledSides={enabledSides}
        />
      </div>

      <Footer />
    </div>
  );
}