import { TripDetails } from "@/types/itinerary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plane, Calendar, Moon, MapPin, Users } from "lucide-react";

interface TripDetailsFormProps {
  data: TripDetails;
  onChange: (data: TripDetails) => void;
}

export const TripDetailsForm = ({ data, onChange }: TripDetailsFormProps) => {
  const handleChange = (field: keyof TripDetails, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="form-section animate-fade-in">
      <h3 className="form-section-title">
        <Plane className="w-5 h-5 text-accent" />
        تفاصيل الرحلة
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="tripName">اسم الرحلة</Label>
          <Input
            id="tripName"
            value={data.tripName}
            onChange={(e) => handleChange('tripName', e.target.value)}
            placeholder="مثال: رحلة تركيا الساحرة"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="destination" className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            الوجهة
          </Label>
          <Input
            id="destination"
            value={data.destination}
            onChange={(e) => handleChange('destination', e.target.value)}
            placeholder="مثال: إسطنبول، كابادوكيا، أنطاليا"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="travelers" className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            عدد المسافرين
          </Label>
          <Input
            id="travelers"
            value={data.travelers}
            onChange={(e) => handleChange("travelers", e.target.value)}
            placeholder="مثال: 2 بالغين و 1 طفل"
          />
        </div>

        <div>
          <Label htmlFor="departure" className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            تاريخ المغادرة
          </Label>
          <Input
            id="departure"
            type="date"
            value={data.departure}
            onChange={(e) => handleChange('departure', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="returnDate" className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            تاريخ العودة
          </Label>
          <Input
            id="returnDate"
            type="date"
            value={data.returnDate}
            onChange={(e) => handleChange('returnDate', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="airline" className="flex items-center gap-1">
            <Plane className="w-3.5 h-3.5" />
            شركة الطيران
          </Label>
          <Input
            id="airline"
            value={data.airline}
            onChange={(e) => handleChange('airline', e.target.value)}
            placeholder="مثال: الخطوط الجوية التركية"
          />
        </div>

        <div>
          <Label htmlFor="nights" className="flex items-center gap-1">
            <Moon className="w-3.5 h-3.5" />
            عدد الليالي
          </Label>
          <Input
            id="nights"
            type="number"
            min="1"
            value={data.nights}
            onChange={(e) => handleChange('nights', parseInt(e.target.value) || 0)}
          />
        </div>

        <div>
          <Label htmlFor="price" className="flex items-center gap-1">
            سعر الباقة (ريال)
          </Label>
          <Input
            id="price"
            value={data.price}
            onChange={(e) => handleChange('price', e.target.value)}
            placeholder="مثال: 5,999"
          />
        </div>

        <div>
          <Label htmlFor="price_description" className="flex items-center gap-1">
            وصف السعر
          </Label>
          <Input
            id="price_description"
            value={data.price_description}
            onChange={(e) => handleChange('price_description', e.target.value)}
            placeholder="مثال: للشخص الواحد"
          />
        </div>
      </div>
    </div>
  );
};