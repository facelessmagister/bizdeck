import { Badge } from "@/components/ui/badge";

interface Side3Props {
  specialties: string[];
  skills: string[];
  services: string[];
}

export default function Side3Professional({ specialties, skills, services }: Side3Props) {
  return (
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
}