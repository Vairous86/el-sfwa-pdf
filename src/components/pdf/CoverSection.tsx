import { TripDetails, AgencyInfo } from "@/types/itinerary";
import { Plane, Calendar, Moon } from "lucide-react";

interface CoverSectionProps {
  coverImage: string;
  tripDetails: TripDetails;
  agencyInfo: AgencyInfo;
}

export const CoverSection = ({ coverImage, tripDetails, agencyInfo }: CoverSectionProps) => {
  return (
    <div className="relative" dir="rtl">
      {/* Header Image */}
      <div className="relative h-64 overflow-hidden rounded-t-lg">
        <img
          src={coverImage}
          alt={tripDetails.destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/70" />
        
        {/* Logo */}
        <div className="absolute top-4 right-4 bg-card/95 p-3 rounded-lg shadow-lg">
          {agencyInfo.logoUrl ? (
            <img src={agencyInfo.logoUrl} alt={agencyInfo.name} className="h-12 object-contain" />
          ) : (
            <span className="font-serif text-xl font-bold text-primary">{agencyInfo.name}</span>
          )}
        </div>

        {/* Trip Name Overlay */}
        <div className="absolute bottom-6 right-6 left-6">
          <h1 className="font-serif text-3xl font-bold text-primary-foreground drop-shadow-lg">
            {tripDetails.tripName}
          </h1>
          <p className="text-primary-foreground/90 text-lg mt-1 drop-shadow">
            {tripDetails.destination}
          </p>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-card">
        {/* Right Box - Trip Details (RTL) */}
        <div className="bg-secondary/50 rounded-lg p-4 border border-border">
          <h3 className="font-serif text-sm font-semibold text-primary mb-3 border-b border-border pb-2">
            تفاصيل الرحلة
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">المغادرة:</span>
              <span className="font-medium text-foreground">{tripDetails.departure}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">العودة:</span>
              <span className="font-medium text-foreground">{tripDetails.returnDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">الطيران:</span>
              <span className="font-medium text-foreground">{tripDetails.airline}</span>
            </div>
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">الليالي:</span>
              <span className="font-medium text-foreground">{tripDetails.nights}</span>
            </div>
          </div>
        </div>

        {/* Left Box - Price Info (RTL) */}
        <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
          <h3 className="font-serif text-sm font-semibold text-accent mb-3 border-b border-accent/30 pb-2">
            سعر الباقة
          </h3>
          <div className="flex items-center justify-center h-20">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="font-serif text-3xl font-bold text-accent">{tripDetails.price}</span>
                <span className="text-accent text-lg">ريال</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">للشخص الواحد</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
