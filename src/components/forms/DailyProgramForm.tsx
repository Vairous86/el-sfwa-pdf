import { DayProgram } from "@/types/itinerary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Plus, Trash2, Utensils, Bus } from "lucide-react";

interface DailyProgramFormProps {
  data: DayProgram[];
  onChange: (data: DayProgram[]) => void;
}

export const DailyProgramForm = ({ data, onChange }: DailyProgramFormProps) => {
  const addDay = () => {
    const newDay: DayProgram = {
      id: crypto.randomUUID(),
      dayNumber: data.length + 1,
      date: '',
      title: '',
      description: '',
      meals: '',
      transport: ''
    };
    onChange([...data, newDay]);
  };

  const removeDay = (id: string) => {
    const filtered = data.filter(d => d.id !== id);
    // Renumber days
    const renumbered = filtered.map((d, i) => ({ ...d, dayNumber: i + 1 }));
    onChange(renumbered);
  };

  const updateDay = (id: string, field: keyof DayProgram, value: string | number) => {
    onChange(data.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  return (
    <div className="form-section animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="form-section-title mb-0">
          <CalendarDays className="w-5 h-5 text-accent" />
          البرنامج اليومي
        </h3>
        <Button onClick={addDay} size="sm" variant="outline" className="gap-1">
          <Plus className="w-4 h-4" />
          إضافة يوم
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((day) => (
          <div key={day.id} className="bg-secondary/30 rounded-lg p-4 border border-border relative">
            <div className="absolute top-2 left-2 flex items-center gap-2">
              <span className="bg-accent text-accent-foreground px-2 py-0.5 rounded-full text-xs font-semibold">
                اليوم {day.dayNumber}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => removeDay(day.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div>
                <Label>التاريخ</Label>
                <Input
                  value={day.date}
                  onChange={(e) => updateDay(day.id, 'date', e.target.value)}
                  placeholder="مثال: 15 أبريل 2024"
                />
              </div>

              <div>
                <Label>العنوان</Label>
                <Input
                  value={day.title}
                  onChange={(e) => updateDay(day.id, 'title', e.target.value)}
                  placeholder="مثال: الوصول إلى إسطنبول"
                />
              </div>

              <div className="col-span-2">
                <Label>الوصف</Label>
                <Textarea
                  value={day.description}
                  onChange={(e) => updateDay(day.id, 'description', e.target.value)}
                  placeholder="وصف أنشطة اليوم..."
                  rows={3}
                />
              </div>

              <div>
                <Label className="flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5" />
                  الوجبات
                </Label>
                <Input
                  value={day.meals}
                  onChange={(e) => updateDay(day.id, 'meals', e.target.value)}
                  placeholder="مثال: الإفطار، الغداء، العشاء"
                />
              </div>

              <div>
                <Label className="flex items-center gap-1">
                  <Bus className="w-3.5 h-3.5" />
                  وسيلة النقل
                </Label>
                <Input
                  value={day.transport}
                  onChange={(e) => updateDay(day.id, 'transport', e.target.value)}
                  placeholder="مثال: حافلة خاصة، رحلة جوية"
                />
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <CalendarDays className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p>لم تتم إضافة أيام بعد</p>
            <p className="text-sm">اضغط "إضافة يوم" لبناء برنامجك</p>
          </div>
        )}
      </div>
    </div>
  );
};
