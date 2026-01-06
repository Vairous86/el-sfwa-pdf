import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { ItineraryData } from "@/types/itinerary";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save } from "lucide-react";

interface SaveTripDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: ItineraryData;
}

export const SaveTripDialog = ({
    open,
    onOpenChange,
    data,
}: SaveTripDialogProps) => {
    const [tripName, setTripName] = useState(data.tripDetails.tripName);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (!tripName.trim()) {
            toast.error("يرجى إدخال اسم الرحلة");
            return;
        }

        setIsSaving(true);
        try {
            // Always insert new trip
            const { error } = await supabase
                .from("trips")
                .insert([{ name: tripName, data }]);

            if (error) throw error;
            toast.success("تم حفظ الرحلة بنجاح");
            onOpenChange(false);
        } catch (error) {
            console.error("Error saving trip:", error);
            toast.error("فشل حفظ الرحلة");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl">
                <DialogHeader>
                    <DialogTitle>حفظ الرحلة في المكتبة</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="trip-name">اسم الرحلة</Label>
                        <Input
                            id="trip-name"
                            value={tripName}
                            onChange={(e) => setTripName(e.target.value)}
                            placeholder="أدخل اسم الرحلة"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSave();
                                }
                            }}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isSaving}
                    >
                        إلغاء
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                        <Save className="w-4 h-4" />
                        {isSaving ? "جاري الحفظ..." : "حفظ"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
