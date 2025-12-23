import { Note } from "@/types/itinerary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Plus, Trash2, CheckCircle2, XCircle, CreditCard } from "lucide-react";

interface NotesFormProps {
  data: Note[];
  onChange: (data: Note[]) => void;
}

export const NotesForm = ({ data, onChange }: NotesFormProps) => {
  const addNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      text: '',
      type: 'inclusion'
    };
    onChange([...data, newNote]);
  };

  const removeNote = (id: string) => {
    onChange(data.filter(n => n.id !== id));
  };

  const updateNote = (id: string, field: keyof Note, value: string) => {
    onChange(data.map(n => n.id === id ? { ...n, [field]: value } : n));
  };

  const getTypeIcon = (type: Note['type']) => {
    switch (type) {
      case 'inclusion': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'exclusion': return <XCircle className="w-4 h-4 text-destructive" />;
      case 'condition': return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'payment': return <CreditCard className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="form-section animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="form-section-title mb-0">
          <AlertCircle className="w-5 h-5 text-accent" />
          الملاحظات والتعليمات
        </h3>
        <Button onClick={addNote} size="sm" variant="outline" className="gap-1">
          <Plus className="w-4 h-4" />
          إضافة ملاحظة
        </Button>
      </div>

      <div className="space-y-3">
        {data.map((note) => (
          <div key={note.id} className="flex items-start gap-3 bg-secondary/30 rounded-lg p-3 border border-border">
            <div className="flex-shrink-0 mt-1">
              {getTypeIcon(note.type)}
            </div>
            
            <div className="flex-1 space-y-2">
              <Select
                value={note.type}
                onValueChange={(value) => updateNote(note.id, 'type', value)}
              >
                <SelectTrigger className="w-40 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inclusion">يشمل</SelectItem>
                  <SelectItem value="exclusion">لا يشمل</SelectItem>
                  <SelectItem value="condition">مهم</SelectItem>
                  <SelectItem value="payment">الدفع</SelectItem>
                </SelectContent>
              </Select>
              
              <Input
                value={note.text}
                onChange={(e) => updateNote(note.id, 'text', e.target.value)}
                placeholder="أدخل نص الملاحظة..."
                className="text-sm"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-destructive"
              onClick={() => removeNote(note.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p>لم تتم إضافة ملاحظات بعد</p>
            <p className="text-sm">أضف ما يشمله البرنامج وما لا يشمله والملاحظات المهمة</p>
          </div>
        )}
      </div>
    </div>
  );
};
