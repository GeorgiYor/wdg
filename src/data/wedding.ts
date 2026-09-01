/**
 * PLACEHOLDER WEDDING DATA — replace these values with the real details.
 * Everything the site displays comes from this single file.
 */
export const wedding = {
  bride: "Симона",
  groom: "Георги",
  dateISO: "2027-08-21T04:00:00+07:00",
  dateLong: "21 Август, 2027",
  dateShort: "21.08.2027",
  invitation:
    "",
  story: {
    paragraphs: [
      "It began with a rainy evening in September, a shared umbrella and a conversation that refused to end. Neither of us planned it — and somehow, everything since has felt inevitable.",
      "Seven years, three cities and countless small mornings later, we are still choosing the same person. Now we would love nothing more than to be surrounded by the people who shaped us as we promise to keep choosing each other.",
    ],
    milestones: [
      { year: "2019", label: "The first evening" },
      { year: "2021", label: "Our first home" },
      { year: "2024", label: "The proposal in Positano" },
      { year: "2027", label: "Forever" },
    ],
  },
  ceremony: {
    title: "Церемония",
    date: "Събота, 21 Август, 2027",
    time: "16:00",
    venue: "Градски парк, Силистра",
    address: "14 Vasil Levski Blvd, Sofia, Bulgaria",
  },
  reception: {
    title: "Празнество",
    date: "Събота, 21 Август, 2027",
    time: "18:30",
    venue: "Хотел Queen, Айдемир",
    address: "ул.София 6, кв. Деленките, 7538 Айдемир",
  },
  timeline: [
    { time: "15:00", label: "Guest Arrival", note: "Welcome drinks in the rose garden" },
    { time: "16:00", label: "Ceremony", note: "Vows beneath the olive arch" },
    { time: "17:00", label: "Photographs", note: "Golden hour by the fountain" },
    { time: "18:30", label: "Reception", note: "Champagne on the grand terrace" },
    { time: "20:00", label: "Dinner", note: "A long table under the stars" },
    { time: "22:00", label: "First Dance", note: "The song we never named" },
    { time: "23:00", label: "Party", note: "Until the candles burn out" },
  ],
  location: {
    venue: "Хотел Queen",
    address: "ул.София 6, кв. Деленките, 7538 Айдемир",
    note: "",
    mapsQuery: "Хотел Queen Силистра",
    embedQuery: "Хотел Queen Силистра",
  },
  dressCode: {
    label: "Black Tie Optional",
    note: "Long gowns and dinner jackets. We would love to see soft blues, ivory and champagne — please leave white for the bride.",
  },
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  wedding.location.mapsQuery,
)}`;

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  wedding.location.embedQuery,
)}&output=embed`;
