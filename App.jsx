import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyJ6QBWeGQ1p4LprYi2bDAQpqDX80svS-mp4kL3tDiHBt-N1Egr7gB7SiTSCEjneUat-Q/exec";

const facilityMultipliers = {
  Office: 1,
  Medical: 1.45,
  Bank: 1.3,
  "Property Management": 1.4,
  Other: 1.15,
};

const frequencyMultipliers = {
  Weekly: 1,
  "2x Weekly": 1.8,
  "3x Weekly": 2.5,
  Nightly: 4.2,
  Monthly: 0.8,
  "One-Time": 1.15,
};

const sizeAdjustments = {
  Small: 0,
  Medium: 125,
  Large: 285,
  "Multi-Site": 500,
};

const urgencyAdjustments = {
  Standard: 0,
  Urgent: 75,
  "ASAP / Emergency": 150,
};

const inputStyle = {
  width: "100%",
  height: "48px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  padding: "0 12px",
};

const buttonGold = {
  background: "#d4af37",
  color: "black",
  padding: "16px 24px",
  borderRadius: "18px",
  border: "none",
  fontWeight: 700,
  cursor: "pointer",
};

const buttonGhost = {
  background: "rgba(255,255,255,0.1)",
  color: "white",
  padding: "16px 24px",
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,0.15)",
  fontWeight: 700,
  cursor: "pointer",
};

export default function PureAuraAutomationSystem() {
  const [facility, setFacility] = useState("Office");
  const [frequency, setFrequency] = useState("Weekly");
  const [size, setSize] = useState("Small");
  const [urgency, setUrgency] = useState("Standard");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [preferredPath, setPreferredPath] = useState("Instant Quote");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const quote = useMemo(() => {
    const base = 215;
    const adjusted =
      base * facilityMultipliers[facility] * frequencyMultipliers[frequency] +
      sizeAdjustments[size] +
      urgencyAdjustments[urgency];
    return Math.round(adjusted);
  }, [facility, frequency, size, urgency]);

  const leadTier = useMemo(() => {
    if (frequency === "Nightly" || size === "Multi-Site" || facility === "Medical" || facility === "Property Management") {
      return "Priority Commercial Lead";
    }
    if (frequency === "3x Weekly" || size === "Large") {
      return "High-Intent Lead";
    }
    return "Qualified Lead";
  }, [facility, frequency, size]);

  const routeRecommendation = useMemo(() => {
    if (size === "Multi-Site" || frequency === "Nightly" || preferredPath === "Walkthrough First") {
      return "Route to walkthrough scheduling";
    }
    return "Route through instant quote follow-up";
  }, [size, frequency, preferredPath]);

  const auraMessage = useMemo(() => {
    if (facility === "Medical") return "Medical facility — prioritize walkthrough.";
    if (facility === "Property Management") return "Property management — multi-site opportunity.";
    if (frequency === "Nightly") return "Nightly service — high value lead.";
    return "Standard qualified lead.";
  }, [facility, frequency]);

  const handleSubmit = async () => {
    setSubmitError("");
    setSubmitted(false);

    if (!name || !email || !phone) {
      setSubmitError("Please fill required fields.");
      return;
    }

    setLoading(true);

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ name, email, phone, quote }),
      });
      setSubmitted(true);
    } catch {
      setSubmitError("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, background: "#06111a", color: "white", minHeight: "100vh" }}>
      <h1 style={{ color: "#e8c768" }}>Pure Aura Automation System</h1>

      <div style={{ marginTop: 30 }}>
        <select style={inputStyle} value={facility} onChange={(e) => setFacility(e.target.value)}>
          <option>Office</option>
          <option>Medical</option>
          <option>Bank</option>
          <option>Property Management</option>
        </select>

        <input style={inputStyle} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input style={inputStyle} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input style={inputStyle} placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <div style={{ marginTop: 20, fontSize: 24 }}>${quote}</div>

        <button style={buttonGold} onClick={handleSubmit}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        {submitted && <div style={{ color: "#34d399" }}>Submitted!</div>}
        {submitError && <div style={{ color: "#f87171" }}>{submitError}</div>}
      </div>
    </div>
  );
}
