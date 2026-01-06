import { AgencyInfo } from "@/types/itinerary";
import { Phone, Mail, Globe, MapPin } from "lucide-react";

interface FooterSectionProps {
  agencyInfo: AgencyInfo;
}

export const FooterSection = ({ agencyInfo }: FooterSectionProps) => {
  return (
    <div className="mt-6" dir="rtl">

      {/* Agency Info */}
      <div className="bg-primary rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            {agencyInfo.logoUrl ? (
              <img src={agencyInfo.logoUrl} alt={agencyInfo.name} className="h-10 object-contain mb-3" />
            ) : (
              <h4 className="font-serif text-xl font-bold text-primary-foreground mb-3">
                {agencyInfo.name}
              </h4>
            )}
            <div className="space-y-1.5 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <span dir="ltr">{agencyInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <span dir="ltr">{agencyInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>{agencyInfo.address}</span>
              </div>
            </div>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2 text-accent mb-2">
              <Globe className="w-4 h-4" />
              <a href={agencyInfo.website} className="text-sm hover:underline" dir="ltr">
                {agencyInfo.website}
              </a>
            </div>
            <p className="text-xs text-primary-foreground/60">
              © 2026 الصفوة. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
