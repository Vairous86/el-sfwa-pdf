import { Note } from "@/types/itinerary";
import { CheckCircle2, XCircle, AlertCircle, CreditCard } from "lucide-react";

interface NotesSectionProps {
  notes: Note[];
}

const getIcon = (type: Note['type']) => {
  switch (type) {
    case 'inclusion':
      return <CheckCircle2 className="w-4 h-4 text-emerald-300" />;
    case 'exclusion':
      return <XCircle className="w-4 h-4 text-red-300" />;
    case 'condition':
      return <AlertCircle className="w-4 h-4 text-amber-300" />;
    case 'payment':
      return <CreditCard className="w-4 h-4 text-blue-300" />;
  }
};

const getTypeLabel = (type: Note['type']) => {
  switch (type) {
    case 'inclusion':
      return 'يشمل البرنامج';
    case 'exclusion':
      return 'لا يشمل البرنامج';
    case 'condition':
      return 'ملاحظات مهمة';
    case 'payment':
      return 'شروط الدفع';
  }
};

export const NotesSection = ({ notes }: NotesSectionProps) => {
  const groupedNotes = notes.reduce((acc, note) => {
    if (!acc[note.type]) acc[note.type] = [];
    acc[note.type].push(note);
    return acc;
  }, {} as Record<Note['type'], Note[]>);

  return (
    <div className="mt-6" dir="rtl">
      {/* Section Header */}
      <div className="pdf-section-header rounded-t-lg flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-accent" />
        <span>ملاحظات وتعليمات مهمة</span>
      </div>

      {/* Notes Content */}
      <div className="pdf-notes-box rounded-b-lg">
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(groupedNotes).map(([type, typeNotes]) => (
            <div key={type} className="note-group">
              <h4 className="text-accent font-semibold text-sm mb-3 flex items-center gap-2">
                {getIcon(type as Note['type'])}
                {getTypeLabel(type as Note['type'])}
              </h4>
              <ul className="space-y-2">
                {typeNotes.map((note) => (
                  <li key={note.id} className="flex items-start gap-2 text-sm text-primary-foreground/90">
                    <span className="text-accent mt-1">•</span>
                    <span>{note.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
