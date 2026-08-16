export type Counsellor = {
  id: string;
  fullName: string;
  title: string;
  photo: string;
  licenceNumber: string;
  qualifications: string[];
  specialisations: string[];
  yearsExperience: number;
  languages: string[];
  formats: ("Online" | "In-person")[];
  bio: string;
};

export const counsellor: Counsellor = {
  id: "lead-counsellor",
  fullName: "Joseph Wahome",
  title: "Psychologist and Life Coach",
  photo: "/counsellor-photo.jpg",
  licenceNumber: "Registration in progress",
  qualifications: [],
  specialisations: [
    "Psychological wellbeing",
    "Life transitions",
    "Stress and resilience",
    "Relationships and communication",
  ],
  yearsExperience: 7,
  languages: ["English", "Kiswahili"],
  formats: ["Online", "In-person"],
  bio:
    "I work with people who want a grounded, practical space to make sense of what they are carrying, build healthier patterns, and move toward steadier day-to-day living. My approach is warm, collaborative, and honest, with a focus on helping clients feel seen while also leaving with clear next steps.",
};
