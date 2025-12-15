import { DayProgram } from "@/types/itinerary";
import { CalendarDays, Utensils, Bus } from "lucide-react";

interface DailyProgramSectionProps {
  dailyProgram: DayProgram[];
}

export const DailyProgramSection = ({ dailyProgram }: DailyProgramSectionProps) => {
  return (
    <div className="mt-6" dir="rtl">
      {/* Section Header */}
      <div className="pdf-section-header rounded-t-lg flex items-center gap-2">
        <CalendarDays className="w-5 h-5 text-accent" />
        <span>البرنامج اليومي</span>
      </div>

      {/* Daily Program Cards */}
      <div className="bg-primary/95 p-4 rounded-b-lg space-y-3">
        {dailyProgram.map((day) => (
          <div key={day.id} className="day-card bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 border border-primary-foreground/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                اليوم {day.dayNumber}
              </div>
              <span className="text-primary-foreground/80 text-sm">{day.date}</span>
            </div>
            
            <h4 className="font-serif font-semibold text-primary-foreground mb-2">
              {day.title}
            </h4>
            
            <p className="text-primary-foreground/90 text-sm leading-relaxed mb-3">
              {day.description}
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-primary-foreground/70">
              {day.meals && (
                <div className="flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>{day.meals}</span>
                </div>
              )}
              {day.transport && (
                <div className="flex items-center gap-1">
                  <Bus className="w-3.5 h-3.5" />
                  <span>{day.transport}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
