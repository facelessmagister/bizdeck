import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import BusinessCard from "./BusinessCard";
import { Download, Share2, ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { exportAsImage, exportAsVCard, exportAsPDF } from "./ExportUtils";
import { Badge } from "./ui/badge";

export default function CardEditor() {
  const [currentSide, setCurrentSide] = useState(0);
  const [formData, setFormData] = useState({
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
      { text: "", link: "", color: "bg-blue-500 hover:bg-blue-600" },
      { text: "", link: "", color: "bg-purple-500 hover:bg-purple-600" },
      { text: "", link: "", color: "bg-orange-500 hover:bg-orange-600" },
    ],
    otherLinks: [] as Array<{ title: string; url: string }>,
  });

  const [newTag, setNewTag] = useState({ type: "", value: "" });
  const [newLink, setNewLink] = useState({ title: "", url: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCtaButtonChange = (index: number, field: "text" | "link", value: string) => {
    setFormData((prev) => {
      const newButtons = [...prev.ctaButtons];
      newButtons[index] = { ...newButtons[index], [field]: value };
      return { ...prev, ctaButtons: newButtons };
    });
  };

  const handleAddTag = (type: "specialties" | "skills" | "services") => {
    if (newTag.value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], newTag.value.trim()],
      }));
      setNewTag({ type: "", value: "" });
    }
  };

  const handleRemoveTag = (type: "specialties" | "skills" | "services", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleAddOtherLink = () => {
    if (newLink.title && newLink.url) {
      setFormData((prev) => ({
        ...prev,
        otherLinks: [...prev.otherLinks, { ...newLink }],
      }));
      setNewLink({ title: "", url: "" });
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

  const formFields = {
    side1: [
      { type: "file", name: "profilePic", label: "Profile Picture" },
      { type: "text", name: "name", label: "Name" },
      { type: "text", name: "title", label: "Title" },
      { type: "text", name: "company", label: "Company" },
      { type: "text", name: "tagline", label: "Tagline" },
      { type: "email", name: "email", label: "Email" },
      { type: "tel", name: "phone", label: "Phone" },
    ],
    side2: [
      { type: "url", name: "website", label: "Website" },
      { type: "text", name: "address", label: "Address" },
      { type: "text", name: "linkedin", label: "LinkedIn" },
      { type: "text", name: "twitter", label: "Twitter" },
      { type: "text", name: "whatsapp", label: "WhatsApp" },
      { type: "text", name: "telegram", label: "Telegram" },
      { type: "text", name: "tiktok", label: "TikTok" },
    ],
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <a href="/" className="flex items-center space-x-2">
          <img src="/lovable-uploads/f873f54b-825d-46a4-b37c-ea503e9047ef.png" alt="bizel.link" className="w-12 h-12" />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            bizel.link
          </span>
        </a>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
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
                  onClick={() => setCurrentSide(prev => Math.min(2, prev + 1))}
                  disabled={currentSide === 2}
                  variant="outline"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {currentSide === 0 && (
                <>
                  {formFields.side1.map((field) => (
                    <div key={field.name}>
                      <Label htmlFor={field.name} className="capitalize text-gray-700">
                        {field.label}
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        accept={field.type === "file" ? "image/*" : undefined}
                        onChange={field.type === "file" ? handleImageUpload : handleChange}
                        className="w-full mt-1"
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700">Call to Action Buttons</h3>
                    {formData.ctaButtons.map((button, index) => (
                      <div key={index} className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Button Text"
                          value={button.text}
                          onChange={(e) => handleCtaButtonChange(index, "text", e.target.value)}
                        />
                        <Input
                          placeholder="Button Link"
                          value={button.link}
                          onChange={(e) => handleCtaButtonChange(index, "link", e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {currentSide === 1 && (
                <>
                  {formFields.side2.map((field) => (
                    <div key={field.name}>
                      <Label htmlFor={field.name} className="capitalize text-gray-700">
                        {field.label}
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name as keyof typeof formData] as string}
                        onChange={handleChange}
                        className="w-full mt-1"
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700">Other Links</h3>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Link Title"
                        value={newLink.title}
                        onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                      />
                      <Input
                        placeholder="URL"
                        value={newLink.url}
                        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                      />
                      <Button onClick={handleAddOtherLink} variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {formData.otherLinks.map((link, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span>{link.title}</span>
                          <Button
                            onClick={() => handleRemoveOtherLink(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {currentSide === 2 && (
                <div className="space-y-6">
                  {["specialties", "skills", "services"].map((type) => (
                    <div key={type} className="space-y-2">
                      <Label className="capitalize text-gray-700">{type}</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder={`Add ${type}`}
                          value={newTag.type === type ? newTag.value : ""}
                          onChange={(e) => setNewTag({ type, value: e.target.value })}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleAddTag(type as "specialties" | "skills" | "services");
                            }
                          }}
                        />
                        <Button
                          onClick={() => handleAddTag(type as "specialties" | "skills" | "services")}
                          variant="outline"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData[type as keyof typeof formData].map((tag: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1 bg-gray-100"
                          >
                            {tag}
                            <Button
                              onClick={() => handleRemoveTag(type as "specialties" | "skills" | "services", index)}
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 text-gray-500 hover:text-red-500"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Export Options</h3>
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => exportAsImage({ formData, setCurrentSide })} 
                className="flex items-center gap-2"
              >
                <Download size={16} /> Export as Image
              </Button>
              <Button 
                onClick={() => exportAsPDF({ formData, setCurrentSide })} 
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
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-8 space-y-6">
          <div id="business-card" className="w-full">
            <BusinessCard {...formData} currentSide={currentSide} />
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
      </div>
    </div>
  );
}