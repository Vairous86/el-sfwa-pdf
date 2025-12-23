import { AgencyInfo } from "@/types/itinerary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "./ImageUpload";
import { Building, Phone, Mail, Globe, MapPin } from "lucide-react";

interface AgencyInfoFormProps {
  data: AgencyInfo;
  onChange: (data: AgencyInfo) => void;
}

export const AgencyInfoForm = ({ data, onChange }: AgencyInfoFormProps) => {
  const handleChange = (field: keyof AgencyInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="form-section animate-fade-in">
      <h3 className="form-section-title">
        <Building className="w-5 h-5 text-accent" />
        معلومات الوكالة
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="agencyName">اسم الوكالة</Label>
          <Input
            id="agencyName"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="مثال: الصفوة للسفر والسياحة"
          />
        </div>

        <div className="col-span-2">
          <ImageUpload
            value={data.logoUrl}
            onChange={(url) => handleChange('logoUrl', url)}
            label="شعار الوكالة"
            placeholder="https://..."
          />
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" />
            الهاتف
          </Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+966 12 345 6789"
            dir="ltr"
          />
        </div>

        <div>
          <Label htmlFor="email" className="flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" />
            البريد الإلكتروني
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="info@agency.com"
            dir="ltr"
          />
        </div>

        <div>
          <Label htmlFor="website" className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            الموقع الإلكتروني
          </Label>
          <Input
            id="website"
            value={data.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="www.agency.com"
            dir="ltr"
          />
        </div>

        <div>
          <Label htmlFor="address" className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            العنوان
          </Label>
          <Input
            id="address"
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="المدينة، البلد"
          />
        </div>
      </div>
    </div>
  );
};
