import { Hotel } from "@/types/itinerary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";
import { Building2, Plus, Trash2, Star, Globe } from "lucide-react";

interface HotelsFormProps {
  data: Hotel[];
  onChange: (data: Hotel[]) => void;
}

export const HotelsForm = ({ data, onChange }: HotelsFormProps) => {
  const addHotel = () => {
    const newHotel: Hotel = {
      id: crypto.randomUUID(),
      name: '',
      stars: 4,
      nights: 1,
      notes: '',
      imageUrl: '',
      website: ''
    };
    onChange([...data, newHotel]);
  };

  const removeHotel = (id: string) => {
    onChange(data.filter(h => h.id !== id));
  };

  const updateHotel = (id: string, field: keyof Hotel, value: string | number) => {
    onChange(data.map(h => h.id === id ? { ...h, [field]: value } : h));
  };

  return (
    <div className="form-section animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="form-section-title mb-0">
          <Building2 className="w-5 h-5 text-accent" />
          الفنادق
        </h3>
        <Button onClick={addHotel} size="sm" variant="outline" className="gap-1">
          <Plus className="w-4 h-4" />
          إضافة فندق
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((hotel, index) => (
          <div key={hotel.id} className="bg-secondary/30 rounded-lg p-4 border border-border relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 left-2 h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => removeHotel(hotel.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label>اسم الفندق</Label>
                <Input
                  value={hotel.name}
                  onChange={(e) => updateHotel(hotel.id, 'name', e.target.value)}
                  placeholder="مثال: جراند حياة إسطنبول"
                />
              </div>

              <div>
                <Label className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  النجوم
                </Label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={hotel.stars}
                  onChange={(e) => updateHotel(hotel.id, 'stars', parseInt(e.target.value) || 0)}
                />
              </div>

              <div>
                <Label>عدد الليالي</Label>
                <Input
                  type="number"
                  min="1"
                  value={hotel.nights}
                  onChange={(e) => updateHotel(hotel.id, 'nights', parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="col-span-2">
                <Label className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" />
                  رابط الفندق
                </Label>
                <Input
                  value={hotel.website || ''}
                  onChange={(e) => updateHotel(hotel.id, 'website', e.target.value)}
                  placeholder="https://example-hotel.com"
                  dir="ltr"
                />
              </div>

              <div className="col-span-2">
                <ImageUpload
                  value={hotel.imageUrl}
                  onChange={(url) => updateHotel(hotel.id, 'imageUrl', url)}
                  label="صورة الفندق"
                  placeholder="https://..."
                />
              </div>

              <div className="col-span-2">
                <Label>ملاحظات</Label>
                <Textarea
                  value={hotel.notes}
                  onChange={(e) => updateHotel(hotel.id, 'notes', e.target.value)}
                  placeholder="أي ملاحظات إضافية عن الفندق..."
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Building2 className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p>لم تتم إضافة فنادق بعد</p>
            <p className="text-sm">اضغط "إضافة فندق" للبدء</p>
          </div>
        )}
      </div>
    </div>
  );
};
