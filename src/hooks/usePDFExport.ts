import { useCallback, useState } from "react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const usePDFExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = useCallback(
    async (element: HTMLElement, filename: string = "itinerary") => {
      setIsExporting(true);
      toast.info("جاري إنشاء PDF...", { duration: 10000 });

      try {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${filename}.pdf`);

        toast.success("تم تصدير PDF بنجاح!");
      } catch (error) {
        console.error("Error exporting PDF:", error);
        toast.error("فشل تصدير PDF. يرجى المحاولة مرة أخرى.");
      } finally {
        setIsExporting(false);
      }
    },
    []
  );

  return { exportToPDF, isExporting };
};
