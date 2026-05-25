import React, { useState, useEffect } from "react";
import {
  Dumbbell,
  Users,
  Award,
  Clock,
  Sparkles,
  MapPin,
  Phone,
  Instagram,
  Send,
  Calendar,
  Smile,
  Check,
  CheckCircle2,
  Cpu,
  Flame,
  Snowflake,
  Apple,
  GlassWater,
  TrendingUp,
  Scale,
  Star,
  ChevronRight,
  ArrowUpRight,
  Play,
  Volume2,
  VolumeX,
  Plus
} from "lucide-react";
import ChatBot from "./components/ChatBot";
import { PROGRAMS, TRAINERS, TRANSFORMATION_GALLERY, PLANS, FEATURES, GALLERY_MOCK_IMAGES, WEEKLY_SCHEDULE, MOTIVATIONAL_QUOTES } from "./data";
import { GymProgram } from "./types";

export default function App() {
  // Mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Motivational quote state
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Active workout program modal or details
  const [selectedProgram, setSelectedProgram] = useState<GymProgram | null>(null);

  // Workout schedule filters
  const [activeDay, setActiveDay] = useState<"monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday">("monday");

  // Before-After Slider position state (percentage 0 to 100)
  const [sliderPosition, setSliderPosition] = useState(50);

  // BMI Calculator states
  const [weight, setWeight] = useState(78);
  const [height, setHeight] = useState(180);
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState("");

  // Lead inquiry form states
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadProgram, setLeadProgram] = useState("Weight Training");
  const [leadPlan, setLeadPlan] = useState("Pro Protocol");
  const [leadMessage, setLeadMessage] = useState("");
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquiryResult, setInquiryResult] = useState<{ success: boolean; message: string; referenceId?: string } | null>(null);

  // Audio ambient controls (simulating heavy mechanical atmosphere overlay sound or cinematic feel)
  const [ambientAudio, setAmbientAudio] = useState(false);

  // Testimonial state selector
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Counter animate simulation
  const [membersCount, setMembersCount] = useState(850);
  const [experienceYears, setExperienceYears] = useState(1);

  // Cycle motivational quotes
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Simulating loading progressive counters
  useEffect(() => {
    const memTimer = setTimeout(() => {
      if (membersCount < 1000) {
        setMembersCount((prev) => Math.min(1000, prev + 15));
      }
    }, 50);
    return () => clearTimeout(memTimer);
  }, [membersCount]);

  useEffect(() => {
    const expTimer = setTimeout(() => {
      if (experienceYears < 5) {
        setExperienceYears((prev) => prev + 1);
      }
    }, 300);
    return () => clearTimeout(expTimer);
  }, [experienceYears]);

  // Handle BMI Calculation
  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
      setBmiResult(bmi);

      if (bmi < 18.5) {
        setBmiCategory("UNDERWEIGHT | High calorie mass macro required.");
      } else if (bmi >= 18.5 && bmi < 24.9) {
        setBmiCategory("OPTIMAL COMPOSITION | Re-comp hyper-growth recommended.");
      } else if (bmi >= 25 && bmi < 29.9) {
        setBmiCategory("DENSE STRUCTURE | Targeted caloric deficit metabolic pacing required.");
      } else {
        setBmiCategory("EXCESSED LOAD | Anaerobic metabolic conditioning protocol mandatory.");
      }
    }
  };

  // Submit Membership Inquiry Lead
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;

    setIsSubmittingInquiry(true);
    setInquiryResult(null);

    try {
      const response = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          phone: leadPhone,
          program: leadProgram,
          plan: leadPlan,
          message: leadMessage,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Inquiry failure");
      }

      setInquiryResult({
        success: true,
        message: data.message || "VIP entry request submitted.",
        referenceId: data.referenceId,
      });

      // Clear input fields on success
      setLeadName("");
      setLeadEmail("");
      setLeadPhone("");
      setLeadMessage("");
    } catch (err: any) {
      console.error(err);
      setInquiryResult({
        success: false,
        message: "Network exception. Fallback active: We have registered your parameters offline. Feel free to come directly for check-in program registration.",
      });
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  // Quick select dynamic plan trigger
  const handleQuickSelectPlan = (planName: string) => {
    setLeadPlan(planName);
    const element = document.getElementById("inquiry-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-luxury-black text-rose-50 select-none min-h-screen relative flex flex-col font-sans">
      
      {/* Dynamic Animated Motivational Top Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-zinc-950 to-rose-950 text-rose-200 py-2.5 px-4 text-[11px] md:text-xs tracking-widest font-mono text-center border-b border-rose-900/30 flex items-center justify-center gap-2 overflow-hidden transition-all duration-700">
        <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse shrink-0" />
        <span className="font-bold shrink-0">KRONOS PRINCIPLE:</span>
        <span className="uppercase text-rose-100 italic font-light truncate">
          "{MOTIVATIONAL_QUOTES[quoteIndex]}"
        </span>
      </div>

      {/* Navigation bar - Sticky Transparent / High-End Glassmorphism */}
      <header className="sticky top-0 z-40 bg-luxury-black/90 backdrop-blur-md border-b border-zinc-900 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo with Red Laser Accent */}
          <a href="#hero" className="flex items-center gap-2.5 group" id="logo-gold-link">
            <div className="w-10 h-10 bg-radial from-rose-600 to-rose-950 rounded bg-zinc-900 border border-rose-600 flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-transform group-hover:scale-105 duration-300">
              <span className="font-display font-extrabold text-[#FFFFFF] tracking-tighter text-xl">K</span>
            </div>
            <div>
              <span className="font-display font-black text-lg md:text-xl text-[#FFFFFF] tracking-widest uppercase block">
                KRONOS
              </span>
              <span className="text-[9px] text-[#FF3B3B] uppercase font-mono tracking-widest block -mt-1.5 font-bold">
                LUXURY PERFORMANCE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Link Menu */}
          <nav className="hidden md:flex items-center gap-8 font-display text-xs font-semibold tracking-widest uppercase text-zinc-400">
            <a href="#hero" className="hover:text-[#FF3B3B] transition-colors relative group py-2">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF3B3B] group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#about" className="hover:text-[#FF3B3B] transition-colors relative group py-2">
              About
            </a>
            <a href="#programs" className="hover:text-[#FF3B3B] transition-colors relative group py-2">
              Programs
            </a>
            <a href="#trainers" className="hover:text-[#FF3B3B] transition-colors relative group py-2">
              Trainers
            </a>
            <a href="#schedule" className="hover:text-[#FF3B3B] transition-colors relative group py-2">
              Schedule
            </a>
            <a href="#membership" className="hover:text-[#FF3B3B] transition-colors relative group py-2">
              Membership
            </a>
            <a href="#gallery" className="hover:text-[#FF3B3B] transition-colors relative group py-2">
              Gallery
            </a>
            <a href="#contact" className="hover:text-[#FF3B3B] transition-colors relative group py-2">
              Contact
            </a>
          </nav>

          {/* Actions & Mobile menu button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const formEl = document.getElementById("inquiry-section");
                formEl?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hidden lg:flex items-center gap-1.5 bg-rose-950/40 border border-rose-600/60 hover:bg-rose-600/30 text-[#FFFFFF] hover:text-[#FFFFFF] uppercase font-display text-[11px] font-bold tracking-widest py-2 px-4 shadow-[0_0_12px_rgba(225,29,72,0.15)] hover:shadow-[0_0_20px_rgba(225,29,72,0.35)] rounded transition-all cursor-pointer"
            >
              Apply Online
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-rose-100 hover:text-[#FF3B3B] p-2 focus:outline-none"
              aria-label="Toggle navigation menu"
              id="btn-mobile-menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-current transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`h-0.5 w-full bg-current transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`h-0.5 w-full bg-current transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-6 space-y-4 flex flex-col uppercase font-display text-xs font-bold tracking-widest text-zinc-300">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#FF3B3B] py-2 border-b border-zinc-900/45 block"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#FF3B3B] py-2 border-b border-zinc-900/45 block"
            >
              About
            </a>
            <a
              href="#programs"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#FF3B3B] py-2 border-b border-zinc-900/45 block"
            >
              Programs
            </a>
            <a
              href="#trainers"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#FF3B3B] py-2 border-b border-zinc-900/45 block"
            >
              Trainers
            </a>
            <a
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#FF3B3B] py-2 border-b border-zinc-900/45 block"
            >
              Schedule
            </a>
            <a
              href="#membership"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#FF3B3B] py-2 border-b border-zinc-900/45 block"
            >
              Membership
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#FF3B3B] py-2"
            >
              Gallery
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#FF3B3B] py-2 block"
            >
              Contact
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const elem = document.getElementById("inquiry-section");
                elem?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full text-center bg-rose-600 text-white rounded py-3 mt-4"
            >
              Apply Online
            </button>
          </nav>
        )}
      </header>

      {/* HERO SECTION - Premium Split Layout (Recipe 11 SaaS Pattern) */}
      <section id="hero" className="relative text-white border-b border-zinc-900 overflow-hidden">
        
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/75 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/30 z-10" />
          {/* Unsplash cinematic background video simulator overlay */}
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920"
            alt="KRONOS Cinematic Sanctuary"
            className="w-full h-full object-cover object-center absolute -top-12 scale-105 filter saturate-[0.8] brightness-[0.25]"
          />
        </div>

        {/* Recipe 11 Split Layout Double-Pane Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-120px)] lg:h-[700px]">
          
          {/* Left Hero Pane - Brand Slogan & Dynamic Metrics */}
          <div className="lg:col-span-7 flex flex-col justify-between py-12 lg:py-16 pr-0 lg:pr-8 border-r-0 lg:border-r border-zinc-900">
            <div>
              
              {/* Premium Floating Tag */}
              <div className="inline-flex items-center gap-1.5 bg-rose-500/10 border border-rose-600/30 text-[#FF3B3B] text-[10px] md:text-xs font-mono tracking-widest px-3 py-1.5 uppercase rounded-full mb-8">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
                METRI-COACHING IS ONLINE
              </div>

              {/* Giant Luxury Typography Pattern (Recipe 11 style) */}
              <h1 className="font-display font-black tracking-tighter uppercase leading-[0.85] text-[#FFFFFF] text-5xl sm:text-7xl lg:text-8xl mb-8">
                Transform<br />
                <span className="text-stroke-luxury text-[#FFFFFF]">Your Body.</span><br />
                <span className="text-[#FF3B3B]">Build Your</span> Confidence.
              </h1>

              {/* Subheading text */}
              <p className="font-sans text-sm md:text-base text-zinc-400 font-light leading-relaxed max-w-xl mb-10">
                Witness an uncompromising physical rebirth. Our athletic sanctuary fuses medical-grade biomechanics, elite sports trainers, modern thermodynamic recovery, and a beautiful premium ambient dark ecosystem configured for the top 1% of achievers.
              </p>

              {/* Button Groups */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#membership"
                  className="bg-[#FF3B3B] hover:bg-rose-700 text-[#FFFFFF] font-display text-xs font-black uppercase tracking-widest py-5 px-10 rounded shadow-[0_0_25px_rgba(225,29,72,0.4)] hover:shadow-[0_0_40px_rgba(225,29,72,0.7)] text-center transition-all duration-300"
                >
                  Join Access Protocol
                </a>
                <a
                  href="#inquiry-section"
                  className="bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-[#FFFFFF] hover:text-[#FF3B3B] font-display text-xs font-black uppercase tracking-widest py-5 px-10 rounded text-center transition-all duration-300"
                >
                  Book Free Trial Session
                </a>
              </div>
            </div>

            {/* Quick Live Stats Line */}
            <div className="grid grid-cols-3 gap-6 pt-12 mt-12 border-t border-zinc-900">
              <div className="text-left font-display">
                <span className="block text-[10px] text-zinc-500 tracking-widest uppercase mb-1">CAPACITY ACTIVE</span>
                <span className="text-xl md:text-2xl font-bold font-mono tracking-tight text-[#FFFFFF]">26%</span>
              </div>
              <div className="text-left font-display">
                <span className="block text-[10px] text-zinc-500 tracking-widest uppercase mb-1">RECOVERY TIER</span>
                <span className="text-xl md:text-2xl font-bold font-mono tracking-tight text-[#FF3B3B]">PLATINUM</span>
              </div>
              <div className="text-left font-display">
                <span className="block text-[10px] text-zinc-500 tracking-widest uppercase mb-1">ACTIVE COACHES</span>
                <span className="text-xl md:text-2xl font-bold font-mono tracking-tight text-[#FFFFFF]">15</span>
              </div>
            </div>
          </div>

          {/* Right Hero Pane - Feature Preview Dashboard & Live Inquiry Prompt */}
          <div className="lg:col-span-5 bg-zinc-950/80 backdrop-blur-md p-6 lg:p-10 flex flex-col justify-between gap-8 h-full">
            
            {/* SaaS Preview Card 1: Live Status */}
            <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-xl relative overflow-hidden">
              <div className="absolute right-4 top-4">
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest bg-rose-600/10 text-[#FF3B3B] px-2 py-1 rounded">
                  Now Coaching
                </span>
                <span className="text-zinc-500 text-xs font-mono">ID: SEC_882</span>
              </div>
              <h3 className="font-display font-bold text-[#FFFFFF] text-base mb-1">Biometric Hypertrophy Progression</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Marcus Iron Vance instruction sequence starting dynamically. Access open barbell platform metric feedback.
              </p>
              
              <div className="mt-4 flex items-center justify-between border-t border-zinc-800/80 pt-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-rose-600/50 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=100" alt="Marcus" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[11px] font-mono text-rose-300">Coach Marcus V.</span>
                </div>
                <span className="text-[10px] text-zinc-500 uppercase font-mono">5 Slots Available</span>
              </div>
            </div>

            {/* Quick Micro Applet: Mini Interactive BMI Dial Preview */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] tracking-widest text-zinc-400 font-mono uppercase bg-zinc-800 px-2 py-0.5 rounded">
                    SaaS Engine
                  </span>
                  <Scale className="w-4 h-4 text-rose-500 shrink-0" />
                </div>
                <h4 className="font-display font-medium text-xs text-zinc-200 uppercase tracking-wider mb-2">
                  Rapid Biometric Screening
                </h4>
                <p className="text-xs text-zinc-400 font-extralight mb-4">
                  Quick-check your potential. Use our custom BMI calculator below or chat directly with KRONOS AI.
                </p>
              </div>

              <div className="bg-zinc-950 p-4 border border-zinc-800 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-zinc-500 block">STANDARD HEIGHT</span>
                  <span className="font-mono text-[#FFFFFF] text-sm font-semibold">{height} cm</span>
                </div>
                <div className="border-r border-zinc-800 h-8 self-center" />
                <div>
                  <span className="text-[9px] text-zinc-500 block">STANDARD WEIGHT</span>
                  <span className="font-mono text-[#FFFFFF] text-sm font-semibold">{weight} kg</span>
                </div>
                <div className="border-r border-zinc-800 h-8 self-center" />
                <a href="#biometrics" className="text-rose-500 text-xs hover:underline flex items-center gap-1 font-mono font-bold uppercase transition">
                  Go Calc <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Interactive Widget Box: Stream alignment */}
            <div className="border-t border-zinc-800/80 pt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] block text-zinc-500 uppercase font-mono tracking-widest">Gym Sector</span>
                <span className="text-sm font-semibold font-display text-zinc-100">Peak Performance, London</span>
              </div>
              <div className="w-12 h-12 rounded-full border border-rose-600 flex items-center justify-center text-[#FF3B3B] hover:bg-rose-950 hover:text-white transition cursor-pointer">
                <ChevronRight className="w-5 h-5 animate-pulse" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT THE GYM SECTION with Split Layout & Live Counters */}
      <section id="about" className="py-24 bg-luxury-black border-b border-zinc-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Image with overlays */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -top-4 -left-4 w-48 h-48 bg-rose-900/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -right-6 w-52 h-52 bg-rose-600/10 rounded-full blur-3xl" />

              {/* Glowing red accent outline container */}
              <div className="relative border border-zinc-800 rounded-2xl overflow-hidden p-2 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <img
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800"
                  alt="KRONOS Luxury Facility"
                  className="w-full rounded-xl object-cover h-[450px] filter saturate-[0.85] contrast-125 transition-transform duration-700 hover:scale-[1.03]"
                />
                
                {/* Floating Absolute Metric Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-zinc-950/90 border border-zinc-800 p-6 rounded-xl backdrop-blur-md flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-rose-500 font-mono block uppercase tracking-widest">
                      Facility Status
                    </span>
                    <span className="font-display font-extrabold text-sm text-[#FFFFFF] tracking-widest uppercase">
                      Hyper-Oxygenated Zone
                    </span>
                  </div>
                  <div className="bg-rose-600/20 text-[#FF3B3B] font-mono text-[11px] py-1 px-2.5 rounded-md border border-rose-500/20">
                    O2: 24.2%
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Information list & counts */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
              <div>
                <span className="text-[#FF3B3B] text-[11px] font-mono font-bold uppercase tracking-widest block mb-1">
                  01 // BESPOKE COGNITIVE FITNESS
                </span>
                <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-[#FFFFFF] leading-tight">
                  THE SANCTUARY OF PHYSICAL ABSOLUTION.
                </h2>
                <div className="w-16 h-1.5 bg-[#FF3B3B] mt-4" />
              </div>

              <p className="font-sans text-sm md:text-base text-zinc-400 font-light leading-relaxed">
                KRONOS is not a fitness gym; it is a meticulous athletic engine designed to target hyper-efficiency. We provide an uncompromising tier of premium wellness:
              </p>

              {/* Mini visual split specifications display cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-xs uppercase text-[#FFFFFF] tracking-wider">Certified Coaches</h4>
                    <p className="text-zinc-500 text-[11px] font-light mt-1">Collegiate lifters and biomechanics doctors.</p>
                  </div>
                </div>
                
                <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-xs uppercase text-[#FFFFFF] tracking-wider">Latest Machines</h4>
                    <p className="text-zinc-500 text-[11px] font-light mt-1">Plate-loaded and digital smart load vectors.</p>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-xs uppercase text-[#FFFFFF] tracking-wider">Locker & changing rooms</h4>
                    <p className="text-zinc-500 text-[11px] font-light mt-1">Hyper hygienic, luxury keyless dry-shampoo amenities.</p>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-xs uppercase text-[#FFFFFF] tracking-wider">Dietary Macro Guidance</h4>
                    <p className="text-zinc-500 text-[11px] font-light mt-1">Integrated biochemistry, fuel, and supplement lists.</p>
                  </div>
                </div>
              </div>

              {/* Extra split section text */}
              <div className="p-4 bg-zinc-950 border-l-2 border-rose-600 text-zinc-400 text-xs tracking-wide leading-relaxed font-light">
                Our facilities feature specialized <strong className="text-rose-100">Cardio Zones</strong> equipped with heart-rate cinematic screens, and a robust, sound-insulated <strong className="text-rose-100">Weightlifting Area</strong> custom-tuned to dampen steel vibration impact.
              </div>

              {/* Animated Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-zinc-900">
                <div className="bg-zinc-950 border border-zinc-900 rounded-lg py-4 px-3 text-center transition hover:border-rose-900/40">
                  <span className="text-xl md:text-2xl font-mono font-bold text-[#FFFFFF] block">{membersCount}+</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Members</span>
                </div>
                <div className="bg-zinc-950 border border-zinc-900 rounded-lg py-4 px-3 text-center transition hover:border-rose-900/40">
                  <span className="text-xl md:text-2xl font-mono font-bold text-[#FF3B3B] block">15 Elite</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Trainers</span>
                </div>
                <div className="bg-zinc-950 border border-zinc-900 rounded-lg py-4 px-3 text-center transition hover:border-rose-900/40">
                  <span className="text-xl md:text-2xl font-mono font-bold text-[#FFFFFF] block">{experienceYears} Years</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Experience</span>
                </div>
                <div className="bg-zinc-950 border border-zinc-900 rounded-lg py-4 px-3 text-center transition hover:border-rose-900/40">
                  <span className="text-xl md:text-2xl font-mono font-bold text-[#FFFFFF] block">24/7/365</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">VIP Support</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION - Modern responsive grid with smooth modal view and hover animations */}
      <section id="programs" className="py-24 bg-luxury-dark border-b border-zinc-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row items-stretch md:items-end justify-between mb-12">
            <div>
              <span className="text-[#FF3B3B] text-[11px] font-mono font-bold uppercase tracking-widest block mb-1">
                02 // TRAINING DISCIPLINES
              </span>
              <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-[#FFFFFF]">
                ELITE WORKOUT ARCHITECTURES.
              </h2>
            </div>
            <p className="text-zinc-500 text-xs md:text-sm font-light max-w-md mt-4 md:mt-0 leading-relaxed">
              Programmed by biological specialists. Every physical program targets custom heart zones and neural pathways for rapid growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((program) => (
              <div
                key={program.id}
                className="group relative overflow-hidden rounded-xl border border-zinc-900 bg-luxury-matte transition-all duration-300 hover:border-rose-600/40"
                id={`card-program-${program.id}`}
              >
                {/* Background Image Container */}
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter saturate-[0.75] contrast-110 brightness-[0.6]"
                  />
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="bg-rose-600/90 text-white text-[10px] font-mono tracking-widest px-2.5 py-1 uppercase rounded font-bold">
                      {program.intensity} Priority
                    </span>
                    <span className="bg-zinc-950/80 text-zinc-300 text-[10px] font-mono tracking-widest px-2.5 py-1 uppercase rounded">
                      {program.duration}
                    </span>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-[#FFFFFF] uppercase tracking-wider mb-2 flex items-center justify-between">
                    {program.title}
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-rose-500 transition-colors" />
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
                    {program.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                    <button
                      onClick={() => {
                        setSelectedProgram(program);
                        // Open inquiry with pre-filled program
                        setLeadProgram(program.title);
                      }}
                      className="text-[#FF3B3B] text-[11px] font-mono tracking-widest uppercase hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      Audit Details <ChevronRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => {
                        setLeadProgram(program.title);
                        const contactSection = document.getElementById("inquiry-section");
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="bg-zinc-900 border border-zinc-800 text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded hover:bg-rose-950/30 hover:border-rose-900/50 transition duration-300 transform group-hover:translate-x-1"
                    >
                      Register Fit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Program Modal */}
          {selectedProgram && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <div className="bg-zinc-950 border border-rose-900 max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl relative">
                <div className="relative h-64">
                  <img src={selectedProgram.image} alt={selectedProgram.title} className="w-full h-full object-cover brightness-[0.5]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="absolute top-4 right-4 bg-black/80 hover:bg-[#FF3B3B] text-white p-2 rounded-full border border-zinc-800 transition-all cursor-pointer"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-4 left-6">
                    <span className="text-rose-500 text-xs font-mono tracking-widest uppercase block mb-1">
                      KRONOS PROTOCOL
                    </span>
                    <h3 className="text-2xl font-display font-black text-white uppercase">{selectedProgram.title}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-zinc-900 p-3 rounded">
                      <span className="text-[10px] text-zinc-500 uppercase block font-mono">Intensity Level</span>
                      <strong className="text-rose-500 font-display">{selectedProgram.intensity}</strong>
                    </div>
                    <div className="bg-zinc-900 p-3 rounded">
                      <span className="text-[10px] text-zinc-500 uppercase block font-mono">Session Pacing</span>
                      <strong className="text-white font-display">{selectedProgram.duration}</strong>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs text-[#FFFFFF] font-mono tracking-wider mb-1">PROGRAM MECHANICS</h4>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      {selectedProgram.description} Our scientific training parameters incorporate high mechanical tension overrides, targeted neuromuscular coaching models, and tailored protein recovery alignment. High performance outputs are monitored using smart biometric devices.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-900 flex justify-end gap-3">
                    <button
                      onClick={() => setSelectedProgram(null)}
                      className="bg-zinc-900 text-zinc-400 text-xs px-4 py-2.5 rounded hover:text-white"
                    >
                      Close Overview
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProgram(null);
                        const contactSection = document.getElementById("inquiry-section");
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="bg-[#FF3B3B] hover:bg-rose-700 text-[#FFFFFF] text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded shadow-[0_0_15px_rgba(225,29,72,0.4)]"
                    >
                      Book Free Trial
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* BMI CALCULATOR SECTION - Highly interactive to address requested extra feature */}
      <section id="biometrics" className="py-20 bg-luxury-black border-b border-zinc-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Box Header description */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div>
                <span className="text-rose-500 text-[11px] font-mono font-bold uppercase tracking-widest block mb-1">
                  03 // BIOMETRIC METRICS
                </span>
                <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-[#FFFFFF]">
                  KRONOS BMI ENGINE.
                </h2>
                <div className="w-12 h-1 bg-rose-600 mt-4" />
              </div>

              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                Before formulating custom nutrition plans, establish your current structural index. Enter your parameters to see high-precision physical category profiles immediately.
              </p>

              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-rose-500 shrink-0" />
                  <div className="text-xs">
                    <strong className="text-rose-100 block font-semibold">Scientific Hypertrophy Mapping</strong>
                    <span className="text-zinc-500 font-extralight block">Based on WHO optimal structural thresholds.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Calculators Container with SaaS Range inputs & animations */}
            <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 rounded-2xl p-6 md:p-8 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="absolute right-0 top-0 w-24 h-24 bg-rose-900/10 rounded-full blur-2xl" />
              
              <form onSubmit={calculateBMI} className="space-y-6">
                
                {/* Weight slider & selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    <span>Target Body Weight</span>
                    <span className="text-[#FFFFFF] bg-zinc-900 border border-zinc-800 py-1 px-3 rounded font-mono text-sm font-bold">
                      {weight} kg
                    </span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="160"
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-rose-600"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
                    <span>40 KG</span>
                    <span>100 KG</span>
                    <span>160 KG</span>
                  </div>
                </div>

                {/* Height slider & selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    <span>Aesthetic Height</span>
                    <span className="text-[#FFFFFF] bg-zinc-900 border border-zinc-800 py-1 px-3 rounded font-mono text-sm font-bold">
                      {height} cm
                    </span>
                  </div>
                  <input
                    type="range"
                    min="130"
                    max="220"
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-rose-600"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
                    <span>130 CM</span>
                    <span>175 CM</span>
                    <span>220 CM</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#FF3B3B] hover:bg-rose-700 text-[#FFFFFF] font-display text-xs font-black uppercase tracking-widest py-4 rounded transition-all duration-300 shadow-[0_0_15px_rgba(225,29,72,0.3)] cursor-pointer"
                >
                  Analyze Biometrics Index
                </button>
              </form>

              {/* BMI Dynamic feedback segment */}
              {bmiResult !== null && (
                <div className="mt-8 p-6 bg-rose-950/20 border border-rose-900 rounded-xl space-y-2 transition-all animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-mono tracking-widest text-[#FF3B3B] font-bold">
                      Biometric Result ID: 091
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">Engine Live</span>
                  </div>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold font-mono tracking-tighter text-[#FFFFFF]">
                      {bmiResult}
                    </span>
                    <span className="text-xs text-zinc-400 font-light">BMI POINTS</span>
                  </div>

                  <p className="text-xs text-zinc-300 tracking-wide font-light border-t border-rose-900/30 pt-2 uppercase">
                    {bmiCategory}
                  </p>

                  <div className="pt-3 flex gap-2 overflow-x-auto">
                    <a
                      href="#membership"
                      className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-rose-300 text-[10px] uppercase font-mono tracking-widest py-2 px-3 rounded text-center block"
                    >
                      Recommend Diet plan ➔
                    </a>
                    <button
                      onClick={() => handleQuickSelectPlan("Pro Protocol")}
                      className="bg-rose-600 hover:bg-rose-700 text-white text-[10px] uppercase font-mono tracking-widest py-2 px-3 rounded text-center"
                    >
                      Connect Coach Advice
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* WORKOUT SCHEDULE SECTION - Beautiful responsive agenda display for requested workout section */}
      <section id="schedule" className="py-24 bg-luxury-dark border-b border-zinc-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row items-stretch md:items-end justify-between mb-12">
            <div>
              <span className="text-rose-500 text-[11px] font-mono font-bold uppercase tracking-widest block mb-1">
                04 // REAL-TIME SCHEDULING
              </span>
              <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-[#FFFFFF]">
                TACTICAL WORKOUT SCHEDULE.
              </h2>
            </div>

            {/* Filter buttons for mobile selection / desktop alignment */}
            <p className="text-zinc-500 text-xs md:text-sm font-light max-w-sm mt-2 md:mt-0 leading-relaxed">
              Plan your physical commitment. High-performance workout grids configured with dedicated leadership slots.
            </p>
          </div>

          {/* Quick Tab Selector for Weekdays with red ambient laser outlines */}
          <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-zinc-950 border border-zinc-900 max-w-4xl mx-auto rounded-lg">
            {(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const).map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`flex-1 text-center py-2.5 px-3 rounded text-xs tracking-wider font-mono font-bold uppercase cursor-pointer transition-all duration-300 whitespace-nowrap min-w-[90px] ${
                  activeDay === day
                    ? "bg-[#FF3B3B] text-white shadow-[0_0_12px_rgba(225,29,72,0.3)]"
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900"
                }`}
              >
                {day.substring(0, 3)}
              </button>
            ))}
          </div>

          {/* Schedule display table (Recipe 11 schedule-item layout) */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden max-w-5xl mx-auto">
            
            <div className="bg-zinc-900/60 py-3.5 px-6 border-b border-zinc-800 grid grid-cols-12 text-[10px] text-zinc-500 font-mono uppercase tracking-widest font-bold">
              <div className="col-span-3">Pacing Slots & Time</div>
              <div className="col-span-5">Elite Discipline</div>
              <div className="col-span-3">Assigned Coach</div>
              <div className="col-span-1 text-right">Access</div>
            </div>

            <div className="divide-y divide-zinc-900/60">
              {WEEKLY_SCHEDULE.map((item, idx) => {
                const dayActivity = item[activeDay];
                if (!dayActivity || dayActivity.activity === "Closed / Prep" || dayActivity.trainer === "None") {
                  return (
                    <div key={idx} className="p-6 text-center text-zinc-600 text-xs font-mono uppercase tracking-widest">
                      {item.time} // Facilities Open for Self-Training Protocol
                    </div>
                  );
                }

                return (
                  <div
                    key={idx}
                    className="p-6 grid grid-cols-1 md:grid-cols-12 items-center gap-4 hover:bg-zinc-900/20 transition-colors"
                  >
                    {/* Time */}
                    <div className="md:col-span-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-rose-500 shrink-0" />
                        <span className="font-mono text-xs font-bold text-rose-400">{item.time}</span>
                      </div>
                    </div>

                    {/* Class activity name */}
                    <div className="md:col-span-5">
                      <span className="font-display font-bold text-[#FFFFFF] tracking-wider text-sm uppercase block">
                        {dayActivity.activity}
                      </span>
                      <span className="text-[10px] text-zinc-500 block">Biometric Tracking Capable</span>
                    </div>

                    {/* Master coach */}
                    <div className="md:col-span-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-zinc-800 border border-rose-500/30 overflow-hidden text-center block">
                        <div className="w-full h-full bg-rose-950 flex items-center justify-center font-mono text-[10px] text-white font-bold uppercase">
                          {dayActivity.trainer[0]}
                        </div>
                      </div>
                      <span className="text-zinc-300 text-xs font-mono">Coach {dayActivity.trainer}</span>
                    </div>

                    {/* Action link */}
                    <div className="md:col-span-1 text-left md:text-right">
                      <button
                        onClick={() => {
                          setLeadProgram(dayActivity.activity);
                          const contactSection = document.getElementById("inquiry-section");
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="text-[#FF3B3B] font-mono text-[11px] font-bold uppercase hover:underline"
                        aria-label="Secure program register slot"
                      >
                        Secure ➔
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* TRAINER SECTION - With clean hover social cards */}
      <section id="trainers" className="py-24 bg-luxury-black border-b border-zinc-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#FF3B3B] text-[11px] font-mono font-bold uppercase tracking-widest block mb-1">
              05 // PRIVATE COMMANDERS
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-[#FFFFFF] mb-4">
              MASTER BIOLOGICAL LEADERS.
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed">
              We employ only peak performers. Former national Olympic heavyweights, competitive powerlifters, and certified biochemistry advisors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINERS.map((trainer) => (
              <div
                key={trainer.id}
                className="group relative bg-[#111111] border border-zinc-900 rounded-xl overflow-hidden transition-all duration-300 hover:border-rose-600/40"
                id={`card-trainer-${trainer.id}`}
              >
                {/* Trainer Image */}
                <div className="h-80 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 filter saturate-0 brightness-[0.7] group-hover:saturate-[0.8] group-hover:brightness-[0.9]"
                  />
                  
                  {/* Floating Social Icons */}
                  <div className="absolute bottom-4 right-4 z-20 flex gap-2 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-zinc-950 text-white flex items-center justify-center hover:bg-rose-600 border border-zinc-800 transition-colors"
                      title="Follow on Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${trainer.name.toLowerCase().replace(/\s/g, "")}@kronos.gym`}
                      className="w-8 h-8 rounded-full bg-zinc-950 text-white flex items-center justify-center hover:bg-rose-600 border border-zinc-800 transition-colors"
                      title="Direct Mail Concierge"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Trainer Details info */}
                <div className="p-5 space-y-2">
                  <div>
                    <span className="text-[10px] text-rose-500 font-mono tracking-widest block uppercase font-bold">
                      {trainer.specialty}
                    </span>
                    <h3 className="font-display font-bold text-base text-[#FFFFFF] uppercase tracking-wider">
                      {trainer.name}
                    </h3>
                    <span className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase block mt-0.5">
                      {trainer.experience} Experience
                    </span>
                  </div>

                  <p className="text-zinc-400 text-xs italic font-light leading-relaxed pt-2 border-t border-zinc-900">
                    "{trainer.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TRANSFORMATION SLIDER & TESTIMONIALS - With custom glowing review cards */}
      <section id="transformations" className="py-24 bg-luxury-dark border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-rose-500 text-[11px] font-mono font-bold uppercase tracking-widest block mb-1">
              06 // VERIFIED ABSOLUTION
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-[#FFFFFF] mb-4">
              PROVEN METAMORPHOSIS SLIDER.
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed">
              Drag the premium laser-interactive slider below to isolate Before and After muscular density gains under KRONOS coaching models.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Interactive Image Before/After dragging overlay */}
            <div className="lg:col-span-6 space-y-4">
              
              <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl select-none">
                
                {/* After Image (Full background) */}
                <img
                  src={TRANSFORMATION_GALLERY[activeTestimonialIdx].afterImg}
                  alt="Post Transformation KRONOS"
                  className="absolute inset-0 w-full h-full object-cover filter saturate-[0.95] contrast-[1.1]"
                />
                <div className="absolute right-4 bottom-4 bg-[#FF3B3B] text-white text-[10px] font-mono font-bold tracking-widest px-3 py-1 uppercase rounded-md z-20">
                  AFTER PROTOCOL
                </div>

                {/* Before Image (Cropped overlays based on slider position state) */}
                <div
                  className="absolute inset-0 overflow-hidden z-10"
                  style={{ width: `${sliderPosition}%`, borderRight: "2px solid #e11d48" }}
                >
                  <img
                    src={TRANSFORMATION_GALLERY[activeTestimonialIdx].beforeImg}
                    alt="Pre-KRONOS Before Shape"
                    className="absolute inset-0 w-full h-full object-cover max-w-none filter saturate-[0.5] brightness-[0.7]"
                    style={{ width: "100%", height: "420px" }}
                  />
                  <div className="absolute left-4 bottom-4 bg-zinc-900 text-zinc-300 text-[10px] font-mono tracking-widest px-3 py-1 uppercase rounded-md">
                    BEFORE STAT
                  </div>
                </div>

                {/* Simulated center handle */}
                <div
                  className="absolute top-0 bottom-0 z-20 pointer-events-none flex items-center justify-center"
                  style={{ left: `calc(${sliderPosition}% - 14px)` }}
                >
                  <div className="w-7 h-7 rounded-full bg-rose-600 border border-white flex items-center justify-center text-white shadow-xl">
                    ↔
                  </div>
                </div>

                {/* Hidden range input covering full image bounding box */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-ew-resize"
                  title="Drag left or right to slide Before and After"
                />
              </div>

              {/* Slider Helper label block */}
              <div className="flex justify-between items-center px-2 text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                <span>← Sliders Side BEFORE</span>
                <span className="text-[#FF3B3B] animate-pulse">Drag Range on Image</span>
                <span>Sliders Side AFTER →</span>
              </div>

              {/* Selector tabs for switching client cases */}
              <div className="flex gap-2">
                {TRANSFORMATION_GALLERY.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTestimonialIdx(idx);
                      // Reset slide to center
                      setSliderPosition(50);
                    }}
                    className={`flex-1 text-center py-2.5 px-3 rounded border text-xs tracking-wider uppercase font-mono cursor-pointer transition ${
                      activeTestimonialIdx === idx
                        ? "bg-rose-950/20 border-rose-600 text-[#FF3B3B]"
                        : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-white"
                    }`}
                  >
                    CASE: {item.clientName}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Col: Client review card (Glowing reviews style) */}
            <div className="lg:col-span-6 space-y-6">
              
              <div 
                className="bg-zinc-950 border border-rose-900/30 p-8 rounded-2xl relative shadow-[0_10px_40px_rgba(225,29,72,0.1)] hover:border-rose-500 transition-all duration-300"
                style={{ boxShadow: "0 0 25px rgba(225, 29, 72, 0.05)" }}
              >
                
                {/* Achievement Floating Banner inside review card */}
                <div className="bg-rose-600/10 border border-rose-600/20 rounded-lg p-4 mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block font-mono">Verified Metric Rebuilt</span>
                    <strong className="text-[#FFFFFF] text-sm font-display tracking-widest uppercase">
                      {TRANSFORMATION_GALLERY[activeTestimonialIdx].achievement}
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 uppercase block font-mono">COACHING TIME</span>
                    <strong className="text-rose-400 text-xs font-mono">
                      {TRANSFORMATION_GALLERY[activeTestimonialIdx].duration}
                    </strong>
                  </div>
                </div>

                {/* Rating stars */}
                <div className="flex gap-1 mb-4 text-rose-500">
                  {Array.from({ length: TRANSFORMATION_GALLERY[activeTestimonialIdx].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Client Quote */}
                <p className="text-sm text-zinc-300 font-light leading-relaxed italic mb-8">
                  "{TRANSFORMATION_GALLERY[activeTestimonialIdx].quote}"
                </p>

                {/* Review poster details */}
                <div className="flex items-center gap-4 border-t border-zinc-900 pt-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-850">
                    {/* Generates placeholder preview initials profile */}
                    <div className="w-full h-full bg-zinc-900 text-zinc-300 flex items-center justify-center font-display font-bold">
                      {TRANSFORMATION_GALLERY[activeTestimonialIdx].clientName.split(" ").map(n => n[0]).join("")}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-sm text-[#FFFFFF] uppercase tracking-wider">
                      {TRANSFORMATION_GALLERY[activeTestimonialIdx].clientName}
                    </h4>
                    <span className="text-[10px] text-rose-400 uppercase tracking-widest font-mono">
                      Elite Key Member
                    </span>
                  </div>
                </div>

              </div>

              {/* Call out stat */}
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg flex items-center gap-3">
                <Smile className="w-5 h-5 text-rose-500 shrink-0" />
                <span className="text-xs text-zinc-400 font-light">
                  Join hundreds of high achievers who have successfully transformed their lives with our customized programs.
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* MEMBERSHIP PRICING PLANS SECTION */}
      <section id="membership" className="py-24 bg-luxury-black border-b border-zinc-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-rose-500 text-[11px] font-mono font-bold uppercase tracking-widest block mb-1">
              07 // ACCESS PRIVILEGES
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-[#FFFFFF] mb-4">
              CLUB PROTOCOL TIER PLANS.
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed">
              No long commitments. Choose your physical code tier. Upgrade or adapt metrics dynamically under elite review.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl border flex flex-col justify-between transition-all duration-300 p-8 ${
                  plan.isPopular
                    ? "bg-gradient-to-b from-[#160d0f] to-luxury-black border-rose-600 shadow-[0_0_20px_rgba(225,29,72,0.2)] md:scale-[1.04] relative z-10"
                    : "bg-[#111111] border-zinc-900 shadow-lg"
                }`}
                id={`card-plan-${plan.id}`}
              >
                
                {/* Popular Flag tag banner */}
                {plan.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#FF3B3B] text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-[0_0_12px_rgba(225,29,72,0.4)]">
                    RECOMMENDED SYSTEM TIER
                  </span>
                )}

                <div>
                  <div className="mb-6">
                    <span className="text-[10px] font-mono tracking-widest text-[#FF3B3B] uppercase font-bold block mb-1">
                      {plan.isPopular ? "PRO PROTOCOL" : "KRONOS LEVEL"}
                    </span>
                    <h3 className="font-display font-black text-2xl text-[#FFFFFF] uppercase tracking-wider">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-light mt-2 min-h-[32px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Pricing Display */}
                  <div className="mb-8 flex items-baseline">
                    <span className="text-5xl font-extrabold font-mono tracking-tight text-[#FFFFFF]">$</span>
                    <span className="text-5xl font-extrabold font-mono tracking-tighter text-[#FFFFFF]">{plan.price}</span>
                    <span className="text-zinc-400 text-xs ml-2">/ {plan.period}</span>
                  </div>

                  {/* Key Features layout list */}
                  <div className="space-y-4 pt-6 border-t border-zinc-900/60">
                    <h4 className="text-[10px] font-mono tracking-widest uppercase text-zinc-500">
                      TIER FEATS INCLUDED:
                    </h4>
                    
                    <ul className="space-y-3 font-sans text-xs font-light text-zinc-300">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing card action buttons */}
                <div className="pt-8 mt-8 border-t border-zinc-900/60">
                  <button
                    onClick={() => handleQuickSelectPlan(plan.name)}
                    className={`w-full py-3.5 px-6 rounded font-display text-xs font-bold tracking-widest uppercase cursor-pointer transition duration-300 block text-center ${
                      plan.isPopular
                        ? "bg-[#FF3B3B] hover:bg-rose-700 text-white shadow-[0_0_15px_rgba(225,29,72,0.3)]"
                        : "bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white"
                    }`}
                  >
                    Select Plan Access
                  </button>
                  <p className="text-center text-[9px] text-zinc-600 font-mono uppercase tracking-widest mt-2">
                    *Immediate activation upon biometric validation
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* GALLERY SECTION (Cinematic Masonry Gallery) */}
      <section id="gallery" className="py-24 bg-luxury-dark border-b border-zinc-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-rose-500 text-[11px] font-mono font-bold uppercase tracking-widest block mb-1">
              08 // VISUAL PORTFOLIO
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-[#FFFFFF] mb-4">
              KRONOS DESIGN PLATFORM.
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed">
              Step inside our dark environment setup. Built for the peak human experience. Hover on sections to reveal sector tags.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
            {GALLERY_MOCK_IMAGES.map((img, index) => (
              <div
                key={index}
                className={`${img.span} relative overflow-hidden group rounded-xl border border-zinc-900`}
                id={`gallery-item-${index}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity" />
                <img
                  src={img.url}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-[0.6] brightness-[0.6] hover:saturate-[0.9]"
                />
                <div className="absolute bottom-4 left-4 z-20 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="bg-rose-600/90 text-white text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded font-bold">
                    Sector Reveal
                  </span>
                  <h4 className="font-display font-bold text-xs uppercase text-[#FFFFFF] tracking-widest mt-1">
                    {img.label}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CORE FEATURES SECTION (Icon Cards block) */}
      <section id="features" className="py-24 bg-luxury-black border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row items-stretch md:items-end justify-between mb-16">
            <div>
              <span className="text-rose-500 text-[11px] font-mono font-bold uppercase tracking-widest block mb-1">
                09 // THE KRONOS BIO-COMPONENTS
              </span>
              <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-[#FFFFFF]">
                ELITE INFRASTRUCTURE REVELATION.
              </h2>
            </div>
            <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed max-w-sm mt-4 md:mt-0">
              Beyond standard parameters, we deploy continuous luxury. Masterful tools optimized for immediate cell recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat) => {
              // Icon Map helper since we import specifically
              const IconComp = 
                feat.iconName === "Cpu" ? Cpu :
                feat.iconName === "Flame" ? Flame :
                feat.iconName === "Snowflake" ? Snowflake :
                feat.iconName === "Apple" ? Apple :
                feat.iconName === "GlassWater" ? GlassWater : TrendingUp;

              return (
                <div
                  key={feat.id}
                  className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 transition-all duration-300 hover:border-rose-600/30 group hover:translate-y-[-4px]"
                  id={`feature-card-${feat.id}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 text-rose-500 flex items-center justify-center mb-5 group-hover:bg-[#FF3B3B] group-hover:text-white transition duration-300 shadow-[0_0_15px_rgba(225,29,72,0.05)]">
                    <IconComp className="w-6 h-6" />
                  </div>
                  
                  <h3 className="font-display font-bold text-base text-[#FFFFFF] uppercase tracking-wider mb-2">
                    {feat.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA BANNER WITH SPLIT OVERLAY */}
      <section className="relative py-24 text-white overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/90 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200"
            alt="KRONOS Athlete absolute training"
            className="w-full h-full object-cover filter saturate-[0.5] brightness-[0.2]"
          />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-8">
          <span className="text-[#FF3B3B] text-xs font-mono font-bold uppercase tracking-widest block animate-pulse">
            // UNLIMITED ACCESS PROTOCOL
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter text-[#FFFFFF] leading-none">
            YOUR STRONGEST VERSION STARTS TODAY.
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Eliminate comfortable habits. Access our precision weights, thermodynamic steam rooms, biochemical diet macros, and world champion mentors.
          </p>
          
          <button
            onClick={() => {
              const element = document.getElementById("inquiry-section");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-[#FF3B3B] hover:bg-rose-700 text-[#FFFFFF] font-display text-xs font-black uppercase tracking-widest py-5 px-12 rounded shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_35px_rgba(225,29,72,0.7)] transition-all cursor-pointer inline-block"
            id="btn-cta-bottom"
          >
            Join The Gym Access
          </button>
        </div>
      </section>

      {/* ONLINE MEMBERSHIP INQUIRY FORM (Lead Submission Form & Contacts layout block) */}
      <section id="inquiry-section" className="py-24 bg-luxury-dark scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Box Contacts & Info Details */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-10">
              <div className="space-y-6">
                <div>
                  <span className="text-rose-500 text-[11px] font-mono font-bold uppercase tracking-widest block mb-1">
                    10 // ESTABLISH METRIC ACCESS
                  </span>
                  <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-[#FFFFFF]">
                    VIP REGISTRATION APPLICATION.
                  </h2>
                </div>
                
                <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed">
                  Apply below or connect with our VIP orientation coordinators on WhatsApp or Instagram. After filing your metric credentials, checkout with active key pass.
                </p>

                {/* Simulated Address Details Block */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-rose-100 text-xs block font-bold uppercase tracking-wider">KRONOS HIGH ZONE SANCTUARY</strong>
                      <span className="text-zinc-400 text-xs font-light">18 Mayfair High Street, Sector 4, London UK</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-rose-100 text-xs block font-bold uppercase tracking-wider">VIP INTAKE CONTACT</strong>
                      <span className="text-zinc-400 text-xs font-light">+44 (0) 20 7946 0912</span>
                      <a
                        href="https://wa.me/442079460912"
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-500 text-[10px] uppercase font-mono tracking-widest block hover:underline font-bold mt-1"
                      >
                        WhatsApp Direct Access ➔
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Instagram className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-rose-100 text-xs block font-bold uppercase tracking-wider">INSTAGRAM COMMUNITY</strong>
                      <a
                        href="#"
                        className="text-rose-400 text-xs font-light hover:underline"
                      >
                        @kronos_luxury_performance
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Mock Google Maps Integration UI view components */}
              <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4 overflow-hidden shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Google Satellite Feed</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                
                {/* Visual Satellite simulation mockup representing central London premium physical grid */}
                <div className="h-32 bg-zinc-900 rounded-lg relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Central coordinates indicator logo pin */}
                  <div className="relative z-10 text-center space-y-1">
                    <MapPin className="w-7 h-7 text-[#FF3B3B] mx-auto animate-bounce" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFFFFF] block bg-zinc-950/80 px-2 py-0.5 rounded">
                      Central London Hub / SEC-8
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Box: Submission Form */}
            <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 rounded-2xl p-6 md:p-10 shadow-[0_20px_5px_-20px_rgba(0,0,0,0.5)]">
              <h3 className="font-display font-bold text-[#FFFFFF] uppercase tracking-wider text-xl mb-6 flex items-center gap-2">
                APPLICATION INQUIRY
                <Sparkles className="w-5 h-5 text-rose-500 shrink-0" />
              </h3>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="e.g. Sterling Cole"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-rose-600 focus:outline-none rounded px-4 py-3 text-sm text-zinc-100 font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                      Digital Email Pass
                    </label>
                    <input
                      type="email"
                      required
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="e.g. sterling@cole.com"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-rose-600 focus:outline-none rounded px-4 py-3 text-sm text-zinc-100 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                      Mobile Intake (Optional)
                    </label>
                    <input
                      type="tel"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="e.g. +44 7911 123456"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-rose-600 focus:outline-none rounded px-4 py-3 text-sm text-zinc-100 font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                      Target Discipline Program
                    </label>
                    <select
                      value={leadProgram}
                      onChange={(e) => setLeadProgram(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-rose-600 focus:outline-none rounded px-4 py-3 text-sm text-zinc-300 font-sans select-none"
                    >
                      {PROGRAMS.map((prog) => (
                        <option key={prog.id} value={prog.title}>
                          {prog.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                    Interested Club membership Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Starter Key", "Pro Protocol", "Elite Absolute"].map((planName) => (
                      <button
                        key={planName}
                        type="button"
                        onClick={() => setLeadPlan(planName)}
                        className={`text-center py-2.5 rounded text-[11px] font-mono tracking-widest uppercase cursor-pointer border transition duration-300 ${
                          leadPlan === planName
                            ? "bg-rose-950/40 border-rose-600 text-[#FF3B3B]"
                            : "bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {planName.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                    Performance constraints & Goals Message
                  </label>
                  <textarea
                    rows={4}
                    value={leadMessage}
                    onChange={(e) => setLeadMessage(e.target.value)}
                    placeholder="Describe your current power limits or muscular constraints..."
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-rose-600 focus:outline-none rounded px-4 py-3 text-sm text-zinc-100 font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingInquiry}
                  className="w-full bg-[#FF3B3B] hover:bg-rose-700 disabled:bg-zinc-900 text-white font-display text-xs font-black uppercase tracking-widest py-4.5 rounded transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_35px_rgba(225,29,72,0.6)]"
                >
                  {isSubmittingInquiry ? "TRANSMITTING METRIC..." : "TRANSMIT ENTRY APPLICATION"}
                </button>
              </form>

              {/* Leads Success feedback display toast modal */}
              {inquiryResult && (
                <div className={`mt-6 p-5 rounded-lg border flex flex-col gap-2 transition-all animate-fade-in ${
                  inquiryResult.success
                    ? "bg-stone-900/60 border-emerald-500/50 text-emerald-100"
                    : "bg-rose-950/20 border-rose-900 text-rose-100"
                }`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                    <span className="font-display font-bold text-sm uppercase tracking-wider">
                      {inquiryResult.success ? "PROCESSED VIP VERIFIED" : "ONLINE FAILURE RE-ROUTE"}
                    </span>
                  </div>
                  
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {inquiryResult.message}
                  </p>

                  {inquiryResult.referenceId && (
                    <div className="mt-2 text-[10px] font-mono uppercase bg-zinc-950 border border-zinc-850 px-2 py-1 rounded inline-block text-zinc-500">
                      REFERENCE PASS_ID: <span className="text-zinc-200 font-bold">{inquiryResult.referenceId}</span>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-luxury-black border-t border-zinc-900 text-zinc-500 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded bg-zinc-900 border border-rose-600 flex items-center justify-center shadow-[0_0_10px_rgba(225,29,72,0.3)]">
                <span className="font-display font-extrabold text-[#FFFFFF] tracking-tighter text-sm">K</span>
              </div>
              <div>
                <span className="font-display font-black text-sm text-[#FFFFFF] tracking-widest uppercase block">
                  KRONOS
                </span>
                <span className="text-[8px] text-rose-500 uppercase font-mono tracking-widest block -mt-1 font-bold">
                  LUXURY PERFORMANCE
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              Ultra-premium physical engineering sanctuary. Redefining human potential under perfect load resistances and active metabolic tracking.
            </p>
          </div>

          <div>
            <h4 className="font-display text-[10px] tracking-widest font-bold uppercase text-[#FFFFFF] mb-4">
              CLUB CHANNELS
            </h4>
            <ul className="space-y-2 text-xs font-light text-zinc-400">
              <li><a href="#about" className="hover:text-rose-500 transition-colors">Philosophy</a></li>
              <li><a href="#programs" className="hover:text-rose-500 transition-colors">Physical Programs</a></li>
              <li><a href="#schedule" className="hover:text-rose-500 transition-colors">Training Schedules</a></li>
              <li><a href="#membership" className="hover:text-rose-500 transition-colors">Membership Tiers</a></li>
              <li><a href="#biometrics" className="hover:text-rose-500 transition-colors">BMI Metric calculator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[10px] tracking-widest font-bold uppercase text-[#FFFFFF] mb-4">
              PERFORMANCE SPECS
            </h4>
            <ul className="space-y-2 text-xs font-light text-zinc-400">
              <li>Mon - Fri — 05:00 AM to 11:30 PM</li>
              <li>Sat - Sun — 06:00 AM to 10:00 PM</li>
              <li className="text-rose-500 font-mono text-[10px] font-bold uppercase tracking-widest">
                *Elite absolute members continuous 24/7 key-fob access
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-display text-[10px] tracking-widest font-bold uppercase text-[#FFFFFF] mb-4">
              VIP BULLETIN INTAKE
            </h4>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              Drop your metrics email below to receive instant schedules updates.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Email pass added to active update telemetry.");
              }}
              className="flex gap-1"
            >
              <input
                type="email"
                required
                placeholder="passcode@email.com"
                className="bg-zinc-900 border border-zinc-800 text-xs px-3 py-2 rounded focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 flex-1"
              />
              <button
                type="submit"
                className="bg-zinc-800 text-white text-xs px-4 py-2 rounded hover:bg-rose-950/40 hover:border-rose-900 transition"
                aria-label="Submit news subscription"
              >
                Pass
              </button>
            </form>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between text-[11px] text-zinc-600 font-mono uppercase tracking-widest">
          <p>© 2026 KRONOS Gymnasiums International Ltd. All absolute physical parameters reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Biometrics Privacy Policy</a>
            <a href="#" className="hover:text-white transition">CNS Terms</a>
          </div>
        </div>
      </footer>

      {/* FLOAT CHATBOT WRAPPER (Renders floating concierge chatbot matching theme) */}
      <ChatBot />

    </div>
  );
}
