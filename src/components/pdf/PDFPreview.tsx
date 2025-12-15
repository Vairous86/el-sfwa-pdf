import { forwardRef } from "react";
import { ItineraryData } from "@/types/itinerary";
import { CoverSection } from "./CoverSection";
import { HotelsSection } from "./HotelsSection";
import { DailyProgramSection } from "./DailyProgramSection";
import { BookingInstructionsSection } from "./BookingInstructionsSection";
import { NotesSection } from "./NotesSection";
import { ThankYouSection } from "./ThankYouSection";
import { FooterSection } from "./FooterSection";

interface PDFPreviewProps {
  data: ItineraryData;
}

export const PDFPreview = forwardRef<HTMLDivElement, PDFPreviewProps>(
  ({ data }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-card rounded-lg shadow-xl overflow-hidden"
        style={{ width: "595px" }}
      >
        <div className="p-0">
          <CoverSection
            coverImage={data.coverImage}
            tripDetails={data.tripDetails}
            agencyInfo={data.agencyInfo}
          />
        </div>

        <div className="">
          {data.hotels.length > 0 && (
            <div>
              <HotelsSection
                hotels={data.hotels.map((hotel) => ({
                  ...hotel,
                  imageUrl: hotel.imageUrl || "/fallback-image.png", // Use a fallback image if SVG fails
                }))}
              />
            </div>
          )}

          {data.dailyProgram.length > 0 && (
            <div>
              <DailyProgramSection dailyProgram={data.dailyProgram} />
            </div>
          )}

          <div>
            <BookingInstructionsSection />
          </div>

          {data.notes.length > 0 && (
            <div>
              <NotesSection notes={data.notes} />
            </div>
          )}

          <div>
            <ThankYouSection />
          </div>

          <div>
            <FooterSection agencyInfo={data.agencyInfo} />
          </div>
        </div>
      </div>
    );
  }
);

PDFPreview.displayName = "PDFPreview";
