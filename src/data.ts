import { GymProgram, GymTrainer, TransformationItem, MembershipPlan, FeatureItem, ScheduleItem } from "./types";

export const PROGRAMS: GymProgram[] = [
  {
    id: "prog-1",
    title: "Weight Training",
    description: "Sculpt dense muscle fibers, optimize neural recruitment, and master compound movements under high mechanical tension.",
    intensity: "Elite",
    duration: "60 Mins",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "prog-2",
    title: "Fat Loss & Conditioning",
    description: "High-octane metabolic burn combining athletic intervals with lactic acid accumulation techniques to maximize post-workout burn.",
    intensity: "High",
    duration: "45 Mins",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "prog-3",
    title: "Strength & Powerlifting",
    description: "Power progression targeting the Big 3. Perfect for developing maximal explosive force and structural density.",
    intensity: "Elite",
    duration: "75 Mins",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "prog-4",
    title: "Cardio Fitness",
    description: "Advanced anaerobic endurance runs, assault bikes, and personalized heart rate zone tuning to boost cardiovascular threshold.",
    intensity: "Medium",
    duration: "50 Mins",
    image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "prog-5",
    title: "CrossFit Elite",
    description: "Unpredictable daily combat combining metabolic runs, gymnastics, Olympic lifts, and high-frequency functional workouts.",
    intensity: "High",
    duration: "60 Mins",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "prog-6",
    title: "Bespoke Personal Training",
    description: "One-on-one direct coaching with customized biometric metrics, nutrition macros, and scientific periodized hypertrophy.",
    intensity: "Elite",
    duration: "60 Mins",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600"
  }
];

export const TRAINERS: GymTrainer[] = [
  {
    id: "tr-1",
    name: "Marcus \"Iron\" Vance",
    specialty: "Hypertrophy & Biomechanics",
    experience: "12 Years Elite",
    quote: "Steel does not lie. It is the absolute mirror of your discipline. Respect the load, dictate the form.",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=400",
    socials: { instagram: "@iron_vance", twitter: "@vance_marcus" }
  },
  {
    id: "tr-2",
    name: "Elena Nova Rostova",
    specialty: "Metabolic Conditioning & CrossFit",
    experience: "8 Years Collegiate",
    quote: "Your body is an integrated machine. Speed, power, and metabolic resilience are forged when you refuse to touch the floor.",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=400",
    socials: { instagram: "@elena_nova", facebook: "elena.nova.fit" }
  },
  {
    id: "tr-3",
    name: "Viktor Goliath Petrov",
    specialty: "Powerlifting & CNS Peak",
    experience: "15 Years Competitive",
    quote: "Limits are sensory feedback loops. Program the nervous system, override the mental blockade, and lift heavy.",
    image: "https://images.unsplash.com/photo-1505021801723-34611591c760?auto=format&fit=crop&q=80&w=400",
    socials: { instagram: "@viktor_goliath", twitter: "@goliath_power" }
  },
  {
    id: "tr-4",
    name: "Sarah Zephyr Vance",
    specialty: "Functional Movement & Athletics",
    experience: "7 Years Professional",
    quote: "Aesthetics must be supported by absolute utility. Move with absolute grace under stress.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
    socials: { instagram: "@sarah_zephyr" }
  }
];

export const TRANSFORMATION_GALLERY: TransformationItem[] = [
  {
    id: "trans-1",
    clientName: "Jonathan Cole",
    duration: "12 Weeks Elite Hypertrophy",
    beforeImg: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=400",
    afterImg: "https://images.unsplash.com/photo-1503051935964-b38156dbd294?auto=format&fit=crop&q=80&w=400",
    quote: "KRONOS provided the structure I lacked. The science behind Marcus's programming completely rebuilt my physique. Down 4% body fat, added 12kg on my power lifts.",
    achievement: "Body Fat: 18% ➔ 9.5% | Lean Muscle Gains +6.5kg",
    rating: 5
  },
  {
    id: "trans-2",
    clientName: "Nadia Romanov",
    duration: "16 Weeks Athletic Conditioning",
    beforeImg: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&q=80&w=400",
    afterImg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400",
    quote: "Between the strict diet macro coaching and Elena's high-frequency intervals, my athletic speed and core stability have hit unprecedented heights.",
    achievement: "Squat Depth: +35kg | Core VO2 Max Boosted +18%",
    rating: 5
  }
];

export const PLANS: MembershipPlan[] = [
  {
    id: "plan-starter",
    name: "Starter Key",
    price: "150",
    period: "month",
    description: "The fundamental access code to high-perf gym architecture.",
    isPopular: false,
    features: [
      "Access to standard open floor cardio & weight racks",
      "Full locker room with premium security locks",
      "Complimentary recovery towel service",
      "Biometric key fob entrance access",
      "High-speed luxury changing rooms & showers"
    ]
  },
  {
    id: "plan-pro",
    name: "Pro Protocol",
    price: "290",
    period: "month",
    description: "The targeted system. Maximizes progress with premium recovery therapies and live masterclasses.",
    isPopular: true,
    features: [
      "All Starter key privileges included",
      "Unlimited premium group masterclasses & HIIT",
      "Full access to Steam Room & Recovery Area",
      "1 Monthly Elite Coach strategy audit",
      "Organic Protein Bar complimentary shake daily",
      "Active recovery and structural alignment drills"
    ]
  },
  {
    id: "plan-elite",
    name: "Elite Absolute",
    price: "490",
    period: "month",
    description: "No compromise. Complete elite programming, customized medical-grade biometric audits, and personal coaches.",
    isPopular: false,
    features: [
      "All Pro Protocol privileges included",
      "Unlimited 1-on-1 VIP Personal Coaching slots",
      "Continuous custom meal prep & dietary guidance",
      "24/7 Priority biometric access & private suites",
      "Private VIP locker with dedicated dry-cleaning",
      "Custom nutrition and supplement hydration sheets"
    ]
  }
];

export const FEATURES: FeatureItem[] = [
  {
    id: "feat-1",
    title: "Smart Biometric Equipment",
    description: "Intelligent machines loaded with instant tension profiling, real-time load feedback, and visual neural force vectors.",
    iconName: "Cpu"
  },
  {
    id: "feat-2",
    title: "Luxurious Steam Therapy",
    description: "High-temperature herbal-infused mist chambers configured for complete toxic release, respiratory clearing, and muscle softness.",
    iconName: "Flame"
  },
  {
    id: "feat-3",
    title: "Extreme Cryo-Recovery Area",
    description: "Precision ice immersion chambers, high-intensity cold plunge pools and hyperbaric suites to trigger immediate cellular recovery.",
    iconName: "Snowflake"
  },
  {
    id: "feat-4",
    title: "Biochemical Nutrition Support",
    description: "Hormone-optimized nutrient profiling, professional macro calculations, and custom supplement configurations for supreme performance.",
    iconName: "Apple"
  },
  {
    id: "feat-5",
    title: "Organic Fuel & Protein Bar",
    description: "Pre-assembled post-workout amino shakes, premium whey, raw proteins, and cold-pressed recovery fuel formulated to spike protein synthesis.",
    iconName: "GlassWater"
  },
  {
    id: "feat-6",
    title: "High-Octane Group Classes",
    description: "Acoustically tuned, laser-lit, blood-pumping environments for extreme athletic community intervals under elite command.",
    iconName: "TrendingUp"
  }
];

export const GALLERY_MOCK_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800",
    span: "md:col-span-2 md:row-span-2",
    label: "Main Absolute Strength Zone"
  },
  {
    url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
    span: "md:col-span-1 md:row-span-1",
    label: "Barbell Precision Platform"
  },
  {
    url: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800",
    span: "md:col-span-1 md:row-span-2",
    label: "Metabolic Battle Ropes"
  },
  {
    url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800",
    span: "md:col-span-1 md:row-span-1",
    label: "Advanced Olympic Racks"
  },
  {
    url: "https://images.unsplash.com/photo-1605296867304-46d5465a25f1?auto=format&fit=crop&q=80&w=800",
    span: "md:col-span-2 md:row-span-1",
    label: "Recovery and Hydrotherapy Area"
  }
];

export const WEEKLY_SCHEDULE: ScheduleItem[] = [
  {
    time: "06:00 AM - 07:15 AM",
    monday: { activity: "Power Hypertrophy", trainer: "Marcus" },
    tuesday: { activity: "Metcon Grind", trainer: "Elena" },
    wednesday: { activity: "Elite Powerlifting", trainer: "Viktor" },
    thursday: { activity: "Cardio Assault", trainer: "Sarah" },
    friday: { activity: "Hypertrophy Push", trainer: "Marcus" },
    saturday: { activity: "CrossFit Combat", trainer: "Elena" },
    sunday: { activity: "Active Mobility", trainer: "Sarah" }
  },
  {
    time: "09:00 AM - 10:15 AM",
    monday: { activity: "CNC Conditioning", trainer: "Elena" },
    tuesday: { activity: "Deadlift Max Strategy", trainer: "Viktor" },
    wednesday: { activity: "Athletic Mobility", trainer: "Sarah" },
    thursday: { activity: "Hypertrophy Pull", trainer: "Marcus" },
    friday: { activity: "Metcon Sprint", trainer: "Elena" },
    saturday: { activity: "Strongman Lift", trainer: "Viktor" },
    sunday: { activity: "Steam Recovery", trainer: "Concierge" }
  },
  {
    time: "12:00 PM - 01:15 PM",
    monday: { activity: "Lunch Express Lift", trainer: "Marcus" },
    tuesday: { activity: "Anaerobic Intervals", trainer: "Sarah" },
    wednesday: { activity: "Squat Bio-Profiling", trainer: "Viktor" },
    thursday: { activity: "CrossFit Basic Core", trainer: "Elena" },
    friday: { activity: "Body re-Comp Elite", trainer: "Marcus" },
    saturday: { activity: "Open Lifting Arena", trainer: "Self" },
    sunday: { activity: "Closed / Prep", trainer: "None" }
  },
  {
    time: "04:30 PM - 05:45 PM",
    monday: { activity: "High Hypertrophy Legs", trainer: "Marcus" },
    tuesday: { activity: "CrossFit Metcon", trainer: "Elena" },
    wednesday: { activity: "Power Clean Masterclass", trainer: "Viktor" },
    thursday: { activity: "V02 Max Assault", trainer: "Sarah" },
    friday: { activity: "Full Hypertrophy Peak", trainer: "Marcus" },
    saturday: { activity: "Teammate Challenge", trainer: "Elena" },
    sunday: { activity: "CNS Decompression", trainer: "Sarah" }
  },
  {
    time: "07:30 PM - 08:45 PM",
    monday: { activity: "Extreme Powerlifting", trainer: "Viktor" },
    tuesday: { activity: "Hypertrophy Upper Frame", trainer: "Marcus" },
    wednesday: { activity: "High-Tempo Burn", trainer: "Sarah" },
    thursday: { activity: "Olympic Clean progression", trainer: "Viktor" },
    friday: { activity: "MMA Core Conditioning", trainer: "Elena" },
    saturday: { activity: "Grit Power Hour", trainer: "Viktor" },
    sunday: { activity: "Mindfulness and Yoga", trainer: "Sarah" }
  }
];

export const MOTIVATIONAL_QUOTES = [
  "STEEL FORGES DISCIPLINE. SYMPATHY FOR THE WEAK LIVES OUTSIDE OF THESE WALLS.",
  "YOUR NONSENSE EXCUSES END WHERE THE POWERPLATFORM BEGINS.",
  "MAX PERFORMANCE IS NOT ENJOYABLE. IT IS SURGERY UNDER RESISTANCE.",
  "PAIN IS BIOMETRIC FEEDBACK INDICATING LIMITS READY TO BE SHATTERED.",
  "DON'T COMPROMISE WITH CHRONIC COMFORTS. THE GRAVITY OF THE BAR WILL REVEAL YOUR INNER TRUTH."
];
