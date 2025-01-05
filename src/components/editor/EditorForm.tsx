import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { FormData } from "@/types/formTypes";
import { formFields } from "./formFields";

interface EditorFormProps {
  currentSide: number;
  formData: FormData;
  setFormData: (data: FormData) => void;
  handleAddTag: (type: keyof Pick<FormData, "specialties" | "skills" | "services">) => void;
  handleRemoveTag: (type: keyof Pick<FormData, "specialties" | "skills" | "services">, index: number) => void;
  handleAddOtherLink: () => void;
  handleRemoveOtherLink: (index: number) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddExperience: () => void;
  handleRemoveExperience: (index: number) => void;
  handleAddEducation: () => void;
  handleRemoveEducation: (index: number) => void;
  handleCtaButtonChange: (index: number, field: "text" | "link", value: string) => void;
  handleCtaButtonToggle: (index: number) => void;
  handleSectionToggle: (section: keyof typeof formData.displaySections) => void;
}

export default function EditorForm({
  currentSide,
  formData,
  setFormData,
  handleAddTag,
  handleRemoveTag,
  handleAddOtherLink,
  handleRemoveOtherLink,
  handleImageUpload,
  handleAddExperience,
  handleRemoveExperience,
  handleAddEducation,
  handleRemoveEducation,
  handleCtaButtonChange,
  handleCtaButtonToggle,
  handleSectionToggle,
}: EditorFormProps) {
  const [newTag, setNewTag] = useState({ type: "", value: "" });
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [newExperience, setNewExperience] = useState({
    jobTitle: "",
    organization: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    responsibilities: "",
  });
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    startDate: "",
    graduationDate: "",
    achievements: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
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
                <div className="col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={button.enabled}
                    onChange={() => handleCtaButtonToggle(index)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600">Enable Button {index + 1}</span>
                </div>
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
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">Display Sections</h3>
            {Object.entries(formData.displaySections).map(([section, enabled]) => (
              <div key={section} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() => handleSectionToggle(section as keyof typeof formData.displaySections)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-600 capitalize">{section}</span>
              </div>
            ))}
          </div>
          {["specialties", "skills", "services"].map((type) => (
            <div key={type} className="space-y-2">
              <Label className="capitalize text-gray-700">{type}</Label>
              <div className="flex flex-wrap gap-2">
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
                {(formData[type as keyof Pick<FormData, "specialties" | "skills" | "services">] as string[]).map((tag: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1 bg-gray-100"
                  >
                    {tag}
                    <Button
                      onClick={() => handleRemoveTag(type as keyof Pick<FormData, "specialties" | "skills" | "services">, index)}
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

      {currentSide === 3 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700">Work Experience</h3>
          <div className="grid gap-2">
            <Input
              placeholder="Job Title"
              value={newExperience.jobTitle}
              onChange={(e) => setNewExperience({ ...newExperience, jobTitle: e.target.value })}
            />
            <Input
              placeholder="Organization"
              value={newExperience.organization}
              onChange={(e) => setNewExperience({ ...newExperience, organization: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                placeholder="Start Date"
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
              />
              <Input
                type="date"
                placeholder="End Date"
                value={newExperience.endDate}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                disabled={newExperience.currentlyWorking}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newExperience.currentlyWorking}
                onChange={(e) => setNewExperience({ ...newExperience, currentlyWorking: e.target.checked })}
              />
              <span className="text-sm text-gray-600">Currently Working Here</span>
            </div>
            <Textarea
              placeholder="Responsibilities/Accomplishments"
              value={newExperience.responsibilities}
              onChange={(e) => setNewExperience({ ...newExperience, responsibilities: e.target.value })}
            />
            <Button onClick={handleAddExperience} variant="outline">
              <Plus className="w-4 h-4" /> Add Experience
            </Button>
          </div>
          <div className="space-y-2">
            {formData.experiences.map((exp, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span>{exp.jobTitle} at {exp.organization}</span>
                <Button
                  onClick={() => handleRemoveExperience(index)}
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
      )}

      {currentSide === 4 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700">Education</h3>
          <div className="grid gap-2">
            <Input
              placeholder="Degree/Qualification"
              value={newEducation.degree}
              onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
            />
            <Input
              placeholder="Institution"
              value={newEducation.institution}
              onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                placeholder="Start Date"
                value={newEducation.startDate}
                onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
              />
              <Input
                type="date"
                placeholder="Graduation Date"
                value={newEducation.graduationDate}
                onChange={(e) => setNewEducation({ ...newEducation, graduationDate: e.target.value })}
              />
            </div>
            <Textarea
              placeholder="Achievements/Activities (Optional)"
              value={newEducation.achievements}
              onChange={(e) => setNewEducation({ ...newEducation, achievements: e.target.value })}
            />
            <Button onClick={handleAddEducation} variant="outline">
              <Plus className="w-4 h-4" /> Add Education
            </Button>
          </div>
          <div className="space-y-2">
            {formData.education.map((edu, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span>{edu.degree} at {edu.institution}</span>
                <Button
                  onClick={() => handleRemoveEducation(index)}
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
      )}
    </div>
  );
}