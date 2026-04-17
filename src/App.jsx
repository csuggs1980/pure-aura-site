import React, { useMemo, useState } from "react";
import { ShieldCheck, Building2, Phone, Star } from "lucide-react";

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyJ6QBWeGQ1p4LprYi2bDAQpqDX80svS-mp4kL3tDiHBt-N1Egr7gB7SiTSCEjneUat-Q/exec";

const facilityMultipliers = {
  Office: 1,
  Medical: 1.45,
  Bank: 1.3,
  "Property Management": 1.4,
  Other: 1.15,
};

export default function PureAuraEliteHybrid() {
  const [facility, setFacility] = useState("Office");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const quote = useMemo(() => {
    const base = 215;
    return Math.round(base * facilityMultipliers[facility]);
  }, [facility]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ name, email, phone, quote }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#06111a", color: "white" }}>

      {/* TRUST BAR */}
      <div style={{ textAlign: "center", padding: "12px", fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
        Woman-Owned • Fully Insured • Commercial Specialists • Pittsburgh + Ohio Valley
      </div>

      {/* HERO */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px 60px" }}>

        <div style={{ color: "#d4af37", fontSize: 14, letterSpacing: ".25em", textTransform: "uppercase" }}>
          Pure Aura Cleaning Solutions
        </div>

        <h1 style={{ fontSize: 72, lineHeight: 1.05, marginTop: 10, maxWidth: 900 }}>
          Premium Commercial Cleaning<br />
          Without the Headaches
        </h1>

        <p style={{ marginTop: 24, fontSize: 20, color: "rgba(255,255,255,0.75)", maxWidth: 700 }}>
          We handle offices, banks, medical facilities, and multi-site properties with consistency, speed, and attention to detail.
        </p>

        <div style={{ display: "flex", gap: 16, marginTop: 30 }}>
          <button style={{ background: "#d4af37", color: "black", padding: "16px 28px", border: "none", fontWeight: 700 }}>
            Get Instant Quote
          </button>
          <button style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "white", padding: "16px 28px" }}>
            Request Walkthrough
          </button>
        </div>

      </div>

      {/* FORM */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>

        <h2 style={{ fontSize: 32, marginBottom: 20 }}>
          Get Your Quote
        </h2>

        <div style={{ display: "grid", gap: 14 }}>

          <select value={facility} onChange={(e) => setFacility(e.target.value)} style={{ padding: 14 }}>
            <option>Office</option>
            <option>Medical</option>
            <option>Bank</option>
            <option>Property Management</option>
          </select>

          <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: 14 }} />
          <input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: 14 }} />
          <input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ padding: 14 }} />

        </div>

        <div style={{ marginTop: 40 }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: ".2em" }}>
            STARTING ESTIMATE
          </div>

          <div style={{ fontSize: 56, color: "#d4af37", fontWeight: 700 }}>
            ${quote}
          </div>
        </div>

        <button onClick={handleSubmit} style={{ marginTop: 25, padding: "16px 28px", background: "#d4af37", border: "none", fontWeight: 700, fontSize: 16 }}>
          {loading ? "Submitting..." : "Get My Quote"}
        </button>

        {submitted && (
          <div style={{ marginTop: 20, color: "#34d399" }}>
            We received your request. We’ll reach out shortly.
          </div>
        )}

      </div>

      {/* AUTHORITY */}
      <div style={{ maxWidth: 1100, margin: "100px auto", padding: "0 24px" }}>

        <h3 style={{ fontSize: 32 }}>
          Trusted by Businesses That Expect Results
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 30, marginTop: 30 }}>

          <div>
            <ShieldCheck color="#d4af37" />
            <h4>Fully Insured</h4>
            <p>Reliable service backed by proper coverage and consistent quality.</p>
          </div>

          <div>
            <Building2 color="#d4af37" />
            <h4>Commercial Specialists</h4>
            <p>We focus on offices, banks, and medical facilities that need dependable service.</p>
          </div>

          <div>
            <Phone color="#d4af37" />
            <h4>Fast Response</h4>
            <p>Quotes and communication handled quickly so you’re never waiting.</p>
          </div>

        </div>

      </div>

    </div>
  );
}
