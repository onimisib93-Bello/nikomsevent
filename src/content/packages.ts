/**
 * SAMPLE PACKAGES. Prices, inclusions and coordinator names are layout
 * placeholders until Nikoms supplies its current rate card.
 */
export type EventPackage = {
  id: string;
  name: string;
  occasions: string[];
  space: string;
  guests: number;
  day: "Weekday" | "Friday" | "Saturday" | "Sunday";
  price: number; // NGN
  coordinator: string;
  includes: string[];
};

export const packageFilters = {
  occasion: [
    { value: "wedding", label: "Wedding" },
    { value: "birthday", label: "Birthday" },
    { value: "concert", label: "Concert or show" },
    { value: "corporate", label: "Conference or launch" },
    { value: "religious", label: "Church or religious" },
    { value: "remembrance", label: "Remembrance" },
    { value: "exhibition", label: "Exhibition" },
  ],
  space: [
    { value: "Main Hall", label: "Main Hall" },
    { value: "Stage & Dance Floor", label: "Stage & Dance Floor" },
    { value: "Reception Foyer", label: "Reception Foyer" },
    { value: "Bar & Lounge", label: "Bar & Lounge" },
  ],
  guests: [
    { value: "0-150", label: "Up to 150" },
    { value: "151-400", label: "151 to 400" },
    { value: "401-700", label: "401 to 700" },
    { value: "701-1000", label: "701 to 1,000" },
  ],
  budget: [
    { value: "0-1000000", label: "Under ₦1m" },
    { value: "1000000-2500000", label: "₦1m to ₦2.5m" },
    { value: "2500000-5000000", label: "₦2.5m to ₦5m" },
    { value: "5000000-100000000", label: "Over ₦5m" },
  ],
  day: [
    { value: "Weekday", label: "Monday to Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ],
  coordinator: [
    { value: "Events desk", label: "Events desk" },
    { value: "Technical team", label: "Technical team" },
    { value: "Hospitality team", label: "Hospitality team" },
  ],
};

const base = (p: Omit<EventPackage, "id">, i: number): EventPackage => ({ id: `pkg-${i}`, ...p });

const list: Omit<EventPackage, "id">[] = [
  { name: "Saturday Reception", occasions: ["wedding"], space: "Main Hall", guests: 700, day: "Saturday", price: 3_500_000, coordinator: "Events desk", includes: ["Hall for 10 hours", "700 chairs and tables", "Stage and dressing room", "Power and security"] },
  { name: "Engagement & Reception", occasions: ["wedding"], space: "Main Hall", guests: 500, day: "Saturday", price: 4_200_000, coordinator: "Events desk", includes: ["Hall from morning to night", "Changeover between ceremonies", "Two dressing rooms"] },
  { name: "Weekday Wedding", occasions: ["wedding"], space: "Main Hall", guests: 400, day: "Weekday", price: 2_100_000, coordinator: "Events desk", includes: ["Hall for 8 hours", "400 chairs and tables", "Power and security"] },
  { name: "Milestone Birthday", occasions: ["birthday"], space: "Main Hall", guests: 350, day: "Friday", price: 1_900_000, coordinator: "Events desk", includes: ["Hall for 8 hours", "Stage for the band", "Power and security"] },
  { name: "Lounge Birthday", occasions: ["birthday"], space: "Bar & Lounge", guests: 80, day: "Friday", price: 450_000, coordinator: "Hospitality team", includes: ["Lounge for 5 hours", "Bar service", "Music system"] },
  { name: "Concert Night", occasions: ["concert"], space: "Stage & Dance Floor", guests: 1000, day: "Friday", price: 5_500_000, coordinator: "Technical team", includes: ["Full hall, standing", "House lights and PA", "Technician on duty", "Crowd security"] },
  { name: "Album Listening", occasions: ["concert", "corporate"], space: "Bar & Lounge", guests: 80, day: "Weekday", price: 600_000, coordinator: "Technical team", includes: ["Lounge for 4 hours", "Playback system", "Bar service"] },
  { name: "Conference Day", occasions: ["corporate"], space: "Main Hall", guests: 600, day: "Weekday", price: 1_600_000, coordinator: "Events desk", includes: ["Theatre seating", "Stage, lectern and mics", "Projector screen", "Tea break setup"] },
  { name: "Product Launch", occasions: ["corporate"], space: "Stage & Dance Floor", guests: 300, day: "Weekday", price: 1_400_000, coordinator: "Technical team", includes: ["Stage reveal lighting", "PA and wireless mics", "Foyer for press"] },
  { name: "Sunday Thanksgiving", occasions: ["religious"], space: "Main Hall", guests: 500, day: "Sunday", price: 1_500_000, coordinator: "Events desk", includes: ["Hall for 6 hours", "Stage for choir", "PA and mics"] },
  { name: "Convention Weekend", occasions: ["religious", "corporate"], space: "Main Hall", guests: 1000, day: "Saturday", price: 6_000_000, coordinator: "Events desk", includes: ["Hall for two days", "Full seating", "Stage, PA and lights"] },
  { name: "Remembrance Service", occasions: ["remembrance"], space: "Main Hall", guests: 400, day: "Friday", price: 1_700_000, coordinator: "Events desk", includes: ["Hall for 8 hours", "Reception for guests", "Parking and security"] },
  { name: "Wake Keeping", occasions: ["remembrance"], space: "Reception Foyer", guests: 150, day: "Weekday", price: 700_000, coordinator: "Events desk", includes: ["Foyer for the evening", "Seating", "Power and security"] },
  { name: "Trade Exhibition", occasions: ["exhibition"], space: "Main Hall", guests: 800, day: "Weekday", price: 2_400_000, coordinator: "Events desk", includes: ["Open floor for stands", "Load-in access", "Power points"] },
  { name: "Cocktail Hour", occasions: ["wedding", "birthday", "corporate"], space: "Reception Foyer", guests: 150, day: "Saturday", price: 550_000, coordinator: "Hospitality team", includes: ["Foyer for 2 hours", "Photo wall space", "Bar service"] },
];

export const packages: EventPackage[] = list.map(base);
