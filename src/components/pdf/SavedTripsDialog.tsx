import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ItineraryData } from "@/types/itinerary";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { History, Trash2, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

interface SavedTrip {
    id: string;
    name: string;
    data: ItineraryData;
    created_at: string;
    updated_at: string;
}

interface SavedTripsDialogProps {
    onLoadTrip: (trip: SavedTrip) => void;
}

export const SavedTripsDialog = ({ onLoadTrip }: SavedTripsDialogProps) => {
    const [trips, setTrips] = useState<SavedTrip[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const fetchTrips = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from("trips")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setTrips(data || []);
        } catch (error) {
            console.error("Error fetching trips:", error);
            toast.error("فشل تحميل الرحلات المحفوظة");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const { error } = await supabase.from("trips").delete().eq("id", id);
            if (error) throw error;

            setTrips(trips.filter((trip) => trip.id !== id));
            toast.success("تم حذف الرحلة بنجاح");
        } catch (error) {
            console.error("Error deleting trip:", error);
            toast.error("فشل حذف الرحلة");
        }
    };

    const handleLoadTrip = (trip: SavedTrip) => {
        onLoadTrip(trip);
        setOpen(false);
        toast.success(`تم تحميل رحلة: ${trip.name}`);
    };

    useEffect(() => {
        if (open) {
            fetchTrips();
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" className="gap-2">
                    <History className="w-4 h-4" />
                    الرحلات السابقة
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl" dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">الرحلات السابقة</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[500px] pr-4">
                    {isLoading ? (
                        <div className="text-center py-8 text-muted-foreground">
                            جاري التحميل...
                        </div>
                    ) : trips.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            لا توجد رحلات محفوظة
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {trips.map((trip) => (
                                <div
                                    key={trip.id}
                                    className="border rounded-lg p-4 hover:bg-accent/50 cursor-pointer transition-colors"
                                    onClick={() => handleLoadTrip(trip)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg mb-1">{trip.name}</h3>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {trip.data.tripDetails.destination}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {trip.data.tripDetails.departure}
                                                </span>
                                                <span>
                                                    تم الحفظ:{" "}
                                                    {formatDistanceToNow(new Date(trip.created_at), {
                                                        addSuffix: true,
                                                        locale: ar,
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className=""
                                            onClick={(e) => handleDelete(trip.id, e)}
                                        >
                                            <Trash2 className="w-4 h-4 text-destructive" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
