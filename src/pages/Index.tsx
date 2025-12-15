import { useRef, useState, useEffect } from "react";
import { ItineraryData } from "@/types/itinerary";
import { PDFPreview } from "@/components/pdf/PDFPreview";
import { TripDetailsForm } from "@/components/forms/TripDetailsForm";
import { HotelsForm } from "@/components/forms/HotelsForm";
import { DailyProgramForm } from "@/components/forms/DailyProgramForm";
import { NotesForm } from "@/components/forms/NotesForm";
import { AgencyInfoForm } from "@/components/forms/AgencyInfoForm";
import { CoverImageForm } from "@/components/forms/CoverImageForm";
import { usePDFExport } from "@/hooks/usePDFExport";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Eye, Plane, Building2, CalendarDays, AlertCircle, Building } from "lucide-react";

const STORAGE_KEY = "itinerary-data";

const defaultData: ItineraryData = {
  coverImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80",
  tripDetails: {
    tripName: "رحلة تركيا الساحرة",
    destination: "إسطنبول • كابادوكيا • أنطاليا",
    departure: "2024-04-15",
    returnDate: "2024-04-22",
    airline: "الخطوط الجوية التركية",
    nights: 7,
    price: "5,999",
  },
  hotels: [
    {
      id: "1",
      name: "جراند حياة إسطنبول",
      stars: 5,
      nights: 3,
      notes: "غرفة بإطلالة على البوسفور",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
      website: "https://www.hyatt.com/en-US/hotel/turkey/grand-hayat-istanbul/istgt"
    },
    {
      id: "2",
      name: "فندق المتحف كابادوكيا",
      stars: 5,
      nights: 2,
      notes: "جناح كهفي مع إطلالة على البالون",
      imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80",
      website: "https://www.museumhotel.com.tr/en/"
    },
  ],
  dailyProgram: [
    {
      id: "1",
      dayNumber: 1,
      date: "15 أبريل 2024",
      title: "الوصول إلى إسطنبول",
      description: "مرحباً بكم في تركيا! التحويل من المطار إلى الفندق. وقت حر لاستكشاف شوارع منطقة السلطان أحمد.",
      meals: "العشاء",
      transport: "نقل خاص",
    },
    {
      id: "2",
      dayNumber: 2,
      date: "16 أبريل 2024",
      title: "جولة إسطنبول التاريخية",
      description: "زيارة المسجد الأزرق الشهير، آيا صوفيا، وقصر توبكابي. رحلة مسائية في مضيق البوسفور.",
      meals: "الإفطار، الغداء",
      transport: "حافلة خاصة",
    },
  ],
  notes: [
    { id: "1", text: "جميع الإقامات الفندقية مع الإفطار", type: "inclusion" },
    { id: "2", text: "مرشد سياحي محترف يتحدث العربية", type: "inclusion" },
    { id: "3", text: "تذاكر الطيران الدولية", type: "exclusion" },
    { id: "4", text: "تأمين السفر", type: "exclusion" },
    { id: "5", text: "دفعة مقدمة 50% عند الحجز", type: "payment" },
    { id: "6", text: "الدفع الكامل قبل 30 يوماً من السفر", type: "payment" },
  ],
  agencyInfo: {
    name: "الصفوة",
    logoUrl: "",
    email: "info@flytofly.com",
    phone: "+966 123 456 789",
    website: "www.flytofly.com",
    address: "المملكة العربية السعودية",
  },
};

const loadFromStorage = (): ItineraryData | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }
  return null;
};

const saveToStorage = (data: ItineraryData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const Index = () => {
  const [data, setData] = useState<ItineraryData>(() => {
    return loadFromStorage() || defaultData;
  });
  const [activeTab, setActiveTab] = useState("preview");
  const previewRef = useRef<HTMLDivElement>(null);
  const { exportToPDF, isExporting } = usePDFExport();

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  const handleExport = () => {
    if (previewRef.current) {
      const filename = data.tripDetails.tripName.replace(/\s+/g, '-') || 'itinerary';
      exportToPDF(previewRef.current, filename);
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-accent" />
            <div>
              <h1 className="font-serif text-2xl font-bold">مولد برنامج الرحلات</h1>
              <p className="text-primary-foreground/70 text-sm">أنشئ وثائق PDF احترافية لعملائك</p>
            </div>
          </div>
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
          >
            <Download className="w-4 h-4" />
            {isExporting ? "جاري التصدير..." : "تصدير PDF"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6 h-12">
            <TabsTrigger value="preview" className="gap-2 text-base">
              <Eye className="w-4 h-4" />
              معاينة
            </TabsTrigger>
            <TabsTrigger value="edit" className="gap-2 text-base">
              <FileText className="w-4 h-4" />
              تعديل البيانات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-0">
            <div className="bg-muted/50 rounded-xl p-8 min-h-[800px] flex justify-center">
              <PDFPreview ref={previewRef} data={data} />
            </div>
          </TabsContent>

          <TabsContent value="edit" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Right Column - Forms (RTL) */}
              <ScrollArea className="h-[800px] pl-4 scrollbar-thin">
                <Tabs defaultValue="trip" className="w-full">
                  <TabsList className="w-full grid grid-cols-6 mb-4 h-auto py-1">
                    <TabsTrigger value="trip" className="text-xs py-2 px-1">
                      <Plane className="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger value="cover" className="text-xs py-2 px-1">
                      <Eye className="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger value="hotels" className="text-xs py-2 px-1">
                      <Building2 className="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger value="program" className="text-xs py-2 px-1">
                      <CalendarDays className="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="text-xs py-2 px-1">
                      <AlertCircle className="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger value="agency" className="text-xs py-2 px-1">
                      <Building className="w-4 h-4" />
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="trip">
                    <TripDetailsForm
                      data={data.tripDetails}
                      onChange={(tripDetails) => setData({ ...data, tripDetails })}
                    />
                  </TabsContent>

                  <TabsContent value="cover">
                    <CoverImageForm
                      coverImage={data.coverImage}
                      onChange={(coverImage) => setData({ ...data, coverImage })}
                    />
                  </TabsContent>

                  <TabsContent value="hotels">
                    <HotelsForm
                      data={data.hotels}
                      onChange={(hotels) => setData({ ...data, hotels })}
                    />
                  </TabsContent>

                  <TabsContent value="program">
                    <DailyProgramForm
                      data={data.dailyProgram}
                      onChange={(dailyProgram) => setData({ ...data, dailyProgram })}
                    />
                  </TabsContent>

                  <TabsContent value="notes">
                    <NotesForm
                      data={data.notes}
                      onChange={(notes) => setData({ ...data, notes })}
                    />
                  </TabsContent>

                  <TabsContent value="agency">
                    <AgencyInfoForm
                      data={data.agencyInfo}
                      onChange={(agencyInfo) => setData({ ...data, agencyInfo })}
                    />
                  </TabsContent>
                </Tabs>
              </ScrollArea>

              {/* Left Column - Mini Preview (RTL) */}
              <div className="bg-muted/50 rounded-xl p-4 h-[800px] overflow-auto">
                <div className="transform scale-75 origin-top-right w-[133%]">
                  <PDFPreview data={data} />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
