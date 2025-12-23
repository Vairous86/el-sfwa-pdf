import { AlertCircle } from "lucide-react";

interface BookingInstructionsSectionProps {
  instructions: string[];
}

export const BookingInstructionsSection = ({ instructions }: BookingInstructionsSectionProps) => {
  return (
    <div className="mt-6" dir="rtl">
      <div className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-t-lg">
        <AlertCircle className="w-5 h-5" />
        <h3 className="font-serif text-lg font-semibold">
          تعليمات وإرشادات مهمة قبل الحجز
        </h3>
      </div>
      <div className="bg-muted/50 border border-border rounded-b-lg p-4">
        <ul className="space-y-2">
          {Array.isArray(instructions) && instructions.map((instruction, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-foreground">
              <span className="text-accent mt-0.5">🔸</span>
              <span>{instruction}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};