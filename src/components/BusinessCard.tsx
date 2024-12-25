import { Card } from "@/components/ui/card";
import { Twitter, Linkedin, MessageCircle, Send, Video, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BusinessCardProps {
  profilePic: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  tagline: string;
  linkedin: string;
  twitter: string;
  whatsapp: string;
  telegram: string;
  tiktok: string;
  specialties: string[];
  skills: string[];
  services: string[];
  ctaButtons: Array<{ text: string; link: string; color: string }>;
  otherLinks: Array<{ title: string; url: string }>;
  currentSide: number;
}

export default function BusinessCard({
  profilePic = "",
  name = "Your Name",
  title = "Your Title",
  company = "Company Name",
  email = "email@example.com",
  phone = "+1 (555) 000-0000",
  website = "website.com",
  address = "",
  tagline = "",
  linkedin = "",
  twitter = "",
  whatsapp = "",
  telegram = "",
  tiktok = "",
  specialties = [],
  skills = [],
  services = [],
  ctaButtons = [],
  otherLinks = [],
  currentSide = 0
}: BusinessCardProps) {
  const renderSide1 = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {profilePic && (
          <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
        )}
        <div className="flex-1">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            {name}
          </h2>
          <p className="text-gray-600 font-medium">{title}</p>
          <p className="text-indigo-600 font-semibold">{company}</p>
        </div>
      </div>
      {tagline && <p className="text-sm text-gray-500 italic">{tagline}</p>}
      <div className="space-y-1 text-sm">
        {email && <p className="text-gray-600">{email}</p>}
        {phone && <p className="text-gray-600">{phone}</p>}
      </div>
      <div className="flex gap-2">
        {ctaButtons.map((button, index) => (
          <a
            key={index}
            href={button.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-md text-white text-sm font-medium transition-colors ${button.color}`}
          >
            {button.text}
          </a>
        ))}
      </div>
    </div>
  );

  const renderSide2 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-indigo-600">Links</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {website && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <span>🌐</span> {website}
            </div>
          )}
          {address && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <span>📍</span> {address}
            </div>
          )}
          {linkedin && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Linkedin className="w-4 h-4" /> {linkedin}
            </div>
          )}
          {twitter && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Twitter className="w-4 h-4" /> {twitter}
            </div>
          )}
        </div>
        <div className="space-y-2">
          {whatsapp && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <MessageCircle className="w-4 h-4" /> {whatsapp}
            </div>
          )}
          {telegram && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Send className="w-4 h-4" /> {telegram}
            </div>
          )}
          {tiktok && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Video className="w-4 h-4" /> {tiktok}
            </div>
          )}
        </div>
      </div>
      {otherLinks.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-semibold text-gray-700 mb-2">Other Links</h4>
          <div className="space-y-2">
            {otherLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-600 text-sm">
                <span>🔗</span>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
                  {link.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderSide3 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-indigo-600">Professional Details</h3>
      <div>
        <h4 className="text-md font-semibold text-gray-700 mb-2">Specialties & Interests</h4>
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800">
              {specialty}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-md font-semibold text-gray-700 mb-2">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-md font-semibold text-gray-700 mb-2">Products & Services</h4>
        <div className="flex flex-wrap gap-2">
          {services.map((service, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800">
              {service}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  const sides = [renderSide1, renderSide2, renderSide3];

  return (
    <Card className="glass-card w-full aspect-video p-8 flex flex-col justify-between transform transition-all hover:scale-105">
      {sides[currentSide]()}
    </Card>
  );
}