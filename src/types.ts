export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface GymProgram {
  id: string;
  title: string;
  description: string;
  intensity: "Elite" | "High" | "Medium" | "Max Recovery";
  duration: string;
  image: string;
}

export interface GymTrainer {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  quote: string;
  image: string;
  socials: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface TransformationItem {
  id: string;
  clientName: string;
  duration: string;
  beforeImg: string;
  afterImg: string;
  quote: string;
  achievement: string;
  rating: number;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  isPopular: boolean;
  features: string[];
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon mapping
}

export interface ScheduleItem {
  time: string;
  monday: { activity: string; trainer: string };
  tuesday: { activity: string; trainer: string };
  wednesday: { activity: string; trainer: string };
  thursday: { activity: string; trainer: string };
  friday: { activity: string; trainer: string };
  saturday: { activity: string; trainer: string };
  sunday: { activity: string; trainer: string };
}
