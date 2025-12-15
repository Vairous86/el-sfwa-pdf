export interface TripDetails {
  departure: string;
  returnDate: string;
  airline: string;
  nights: number;
  price: string;
  tripName: string;
  destination: string;
}

export interface Hotel {
  id: string;
  name: string;
  stars: number;
  nights: number;
  notes: string;
  imageUrl: string;
  website: string; // Added website property to the Hotel interface
}

export interface DayProgram {
  id: string;
  dayNumber: number;
  date: string;
  title: string;
  description: string;
  meals: string;
  transport: string;
}

export interface Note {
  id: string;
  text: string;
  type: "inclusion" | "exclusion" | "condition" | "payment";
}

export interface AgencyInfo {
  name: string;
  logoUrl: string;
  email: string;
  phone: string;
  website: string;
  address: string;
}

export interface ItineraryData {
  coverImage: string;
  tripDetails: TripDetails;
  hotels: Hotel[];
  dailyProgram: DayProgram[];
  notes: Note[];
  agencyInfo: AgencyInfo;
}
