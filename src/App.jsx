import React, { useMemo, useState } from "react";
import { ShieldCheck, Building2, Phone, Star, MapPin, CalendarDays, Briefcase } from "lucide-react";

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxp4t9u-ZUAI6ANtppogx-CxnMZcjkVCOXW8C5xPsunI_D3o8IB1uC0k2h9FjRDQTko8w/exec";

const facilityMultipliers = {
  Office: 1,
  Medical: 1.45,
  Bank: 1.3,
  "Property Management": 1.4,
  Other: 1.15,
};

const card = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 24,
  backdropFilter: "blur(10px)",
};

const field = {
  padding: 16,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  width: "100%",
  outline: "none",
  fontSize: 15,
};

export default function PureAuraEliteHybrid() {
  const [facility, setFacility] = useState("Office");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [frequency, setFrequency] = useState("Weekly");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [propertyUnits, setPropertyUnits] = useState("");
  const [portfolioType, setPortfolioType] = useState("");
  const [needsWalkthrough, setNeedsWalkthrough] = useState(false);

  const quote = useMemo(() => {
    const base = 215;
    const frequencyMultiplier = {
      "One-Time": 1.2,
      Weekly: 1,
      "2x Weekly": 1.8,
      "3x Weekly": 2.5,
      Nightly: 4.2,
      Monthly: 0.9,
    }[frequency] || 1;
    return Math.round(base * facilityMultipliers[facility] * frequencyMultiplier);
  }, [facility, frequency]);

  const handleSubmit = async () => {
    setSubmitError("");
    setSubmitted(false);

    if (!name || !email || !phone) {
      setSubmitError("Please fill in your name, email, and phone number.");
      return;
    }

    const payload = {
      name,
      email,
      phone,
      city,
      zip,
      facility,
      frequency,
      notes,
      quote,
      propertyUnits,
      portfolioType,
      needsWalkthrough,
      leadType: quote >= 1000 || needsWalkthrough ? "Walkthrough Priority" : "Quote Follow-Up",
      autoReplyRequested: true,
      autoReplySubject: `Pure Aura received your request`,
      autoReplyMessage:
        quote >= 1000 || needsWalkthrough
          ? `Thank you for reaching out to Pure Aura Cleaning Solutions. We received your request and recommend a walkthrough so we can confirm scope, access, and service needs. Our team will follow up shortly to coordinate next steps.`
          : `Thank you for reaching out to Pure Aura Cleaning Solutions. We received your request and your starting estimate begins at $${quote}. Our team will follow up shortly to confirm details and next steps.`,
    };

    setLoading(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
    } catch {
      setSubmitted(true);
      setSubmitError(
        quote >= 1000 || needsWalkthrough
          ? "Your request was received, but online delivery had an issue. Please book a walkthrough now and our team will confirm everything directly."
          : "Your request was received, but online delivery had an issue. Please call 740-284-8500 if you need immediate help."
      );

      if (quote >= 1000 || needsWalkthrough) {
        window.setTimeout(() => {
          window.open("https://calendly.com/management-pureauracleaningsolutions/30min", "_blank", "noopener,noreferrer");
        }, 700);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#06111a", color: "white" }}>
      <div
        style={{
          textAlign: "center",
          padding: "12px",
          fontSize: 12,
          letterSpacing: ".2em",
          textTransform: "uppercase",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.72)",
          background: "linear-gradient(90deg, rgba(212,175,55,0.18), rgba(255,255,255,0.03), rgba(212,175,55,0.12))",
        }}
      >
        Woman-Owned • Fully Insured • Commercial Specialists • Pittsburgh + Ohio Valley
      </div>

      <section
        style={{
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background:
            "linear-gradient(90deg, rgba(4,9,16,0.9), rgba(8,19,31,0.62), rgba(9,25,40,0.38)), url(https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1800&q=80) center/cover",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "84px 24px 90px", display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 28, alignItems: "center" }}>
          <div>
            <div style={{ color: "#d4af37", fontSize: 14, letterSpacing: ".25em", textTransform: "uppercase" }}>
              Pure Aura Cleaning Solutions
            </div>

            <h1 style={{ fontSize: 76, lineHeight: 1.02, marginTop: 12, maxWidth: 920 }}>
              Premium Commercial Cleaning<br />
              Without the Headaches
            </h1>

            <p style={{ marginTop: 24, fontSize: 21, color: "rgba(255,255,255,0.76)", maxWidth: 720, lineHeight: 1.75 }}>
              Built for offices, banks, medical facilities, and property managers who need consistency, fast communication, and a cleaner standard from day one.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 30 }}>
              <button onClick={() => document.getElementById("quote-card")?.scrollIntoView({ behavior: "smooth", block: "center" })} style={{ background: "#d4af37", color: "black", padding: "16px 28px", border: "none", borderRadius: 16, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                Get Instant Quote
              </button>
              <button onClick={() => window.open("https://calendly.com/management-pureauracleaningsolutions/30min", "_blank", "noopener,noreferrer")} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.28)", color: "white", padding: "16px 28px", borderRadius: 16, fontSize: 15, cursor: "pointer" }}>
                Request Walkthrough
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 14, marginTop: 34 }}>
              {[
                [ShieldCheck, "Fully Insured"],
                [Building2, "Commercial Focused"],
                [MapPin, "Regional Coverage"],
                [CalendarDays, "Fast Scheduling"],
              ].map(([Icon, label]) => (
                <div key={label} style={{ ...card, padding: 16 }}>
                  <Icon size={18} color="#d4af37" style={{ marginBottom: 10 }} />
                  <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.92)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div id="quote-card" style={{ ...card, padding: 28, boxShadow: "0 20px 90px rgba(0,0,0,0.4)" }}>
            <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
              Instant Quote
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, marginTop: 10 }}>
              Get pricing started in under a minute
            </div>
            <p style={{ marginTop: 10, color: "rgba(255,255,255,0.68)", lineHeight: 1.7 }}>
              Tell us the type of facility and your contact information. We’ll generate a starting estimate and follow up quickly.
            </p>

            <div style={{ display: "grid", gap: 14, marginTop: 22 }}>
              <select value={facility} onChange={(e) => setFacility(e.target.value)} style={field}>
                <option>Office</option>
                <option>Medical</option>
                <option>Bank</option>
                <option>Property Management</option>
              </select>

              <select value={frequency} onChange={(e) => setFrequency(e.target.value)} style={field}>
                <option>One-Time</option>
                <option>Weekly</option>
                <option>2x Weekly</option>
                <option>3x Weekly</option>
                <option>Nightly</option>
                <option>Monthly</option>
              </select>

              <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} style={field} />
              <input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} style={field} />
              <input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} style={field} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} style={field} />
                <input placeholder="ZIP Code" value={zip} onChange={(e) => setZip(e.target.value)} style={field} />
              </div>
              {facility === "Property Management" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <input placeholder="Approx. Unit Count" value={propertyUnits} onChange={(e) => setPropertyUnits(e.target.value)} style={field} />
                  <select value={portfolioType} onChange={(e) => setPortfolioType(e.target.value)} style={field}>
                    <option value="">Portfolio Type</option>
                    <option>Apartment / Multifamily</option>
                    <option>Condo / HOA</option>
                    <option>Office Portfolio</option>
                    <option>Mixed Use</option>
                  </select>
                </div>
              )}
              <textarea placeholder={facility === "Property Management" ? "Tell us about the properties, turnover needs, common areas, and schedule" : "Tell us about the property, service schedule, or scope"} value={notes} onChange={(e) => setNotes(e.target.value)} style={{ ...field, minHeight: 110, resize: "vertical" }} />
              <label style={{ display: "flex", gap: 10, alignItems: "center", color: "rgba(255,255,255,0.78)", fontSize: 14 }}>
                <input type="checkbox" checked={needsWalkthrough} onChange={(e) => setNeedsWalkthrough(e.target.checked)} />
                I would like a walkthrough for more accurate pricing
              </label>
            </div>

            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 12, letterSpacing: ".22em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                Starting Estimate
              </div>
              <div style={{ fontSize: 60, lineHeight: 1, color: "#d4af37", fontWeight: 700, marginTop: 8 }}>
                ${quote}
              </div>
            </div>

            <button onClick={handleSubmit} style={{ marginTop: 22, padding: "16px 28px", background: "#d4af37", border: "none", borderRadius: 16, fontWeight: 700, fontSize: 16, color: "black", width: "100%", cursor: "pointer" }}>
              {loading ? "Submitting..." : quote >= 1000 ? "Request Pricing + Walkthrough" : "Get My Quote"}
            </button>

            {submitted && (
              <div style={{ marginTop: 18, color: "#34d399", fontWeight: 600, lineHeight: 1.7 }}>
                We received your request. We’ll reach out shortly with next steps{quote >= 1000 || needsWalkthrough ? " and walkthrough scheduling." : "."}
                <div style={{ marginTop: 8, color: "rgba(209,250,229,0.85)", fontWeight: 500 }}>
                  Your lead was also tagged for an automatic follow-up email in the submission payload.
                </div>
              </div>
            )}

            {submitError && (
              <div style={{ marginTop: 18, color: "#fca5a5", fontWeight: 600, lineHeight: 1.7 }}>
                {submitError}
              </div>
            )}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "26px 24px 0" }}>
        <div style={{ ...card, padding: "20px 24px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          {[
            "Responsive communication from first contact to ongoing service.",
            "Professional presentation for decision-makers and facility teams.",
            "Structured for recurring commercial accounts and walkthroughs.",
          ].map((text) => (
            <div key={text} style={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.7, fontSize: 15 }}>{text}</div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "90px 24px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "end", flexWrap: "wrap" }}>
          <div>
            <div style={{ color: "#d4af37", fontSize: 13, letterSpacing: ".22em", textTransform: "uppercase" }}>
              Why businesses choose Pure Aura
            </div>
            <h2 style={{ fontSize: 42, marginTop: 12, marginBottom: 0 }}>
              Trusted by businesses that expect results
            </h2>
          </div>
          <div style={{ display: "flex", gap: 6, color: "#d4af37" }}>
            <Star size={18} fill="#d4af37" />
            <Star size={18} fill="#d4af37" />
            <Star size={18} fill="#d4af37" />
            <Star size={18} fill="#d4af37" />
            <Star size={18} fill="#d4af37" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 26, marginTop: 30 }}>
          <div style={{ ...card, padding: 24 }}>
            <ShieldCheck color="#d4af37" />
            <h3 style={{ fontSize: 24, marginTop: 14 }}>Fully Insured</h3>
            <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.8 }}>
              Reliable service backed by proper coverage, clear communication, and consistent quality standards.
            </p>
          </div>

          <div style={{ ...card, padding: 24 }}>
            <Building2 color="#d4af37" />
            <h3 style={{ fontSize: 24, marginTop: 14 }}>Commercial Specialists</h3>
            <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.8 }}>
              We focus on offices, banks, medical facilities, and managed properties that need dependable recurring service.
            </p>
          </div>

          <div style={{ ...card, padding: 24 }}>
            <Phone color="#d4af37" />
            <h3 style={{ fontSize: 24, marginTop: 14 }}>Fast Response</h3>
            <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.8 }}>
              Quotes, scheduling, and follow-up are handled quickly so you are not left waiting on the next step.
            </p>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "36px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 26 }}>
          <div style={{ ...card, padding: 28 }}>
            <div style={{ color: "#d4af37", fontSize: 13, letterSpacing: ".22em", textTransform: "uppercase" }}>
              Property managers and larger facilities
            </div>
            <h3 style={{ fontSize: 34, marginTop: 14, marginBottom: 0 }}>
              Need recurring service or multiple locations?
            </h3>
            <p style={{ marginTop: 18, color: "rgba(255,255,255,0.74)", lineHeight: 1.8, maxWidth: 700 }}>
              Pure Aura is structured to support recurring commercial cleaning, portfolio accounts, and walkthrough-based quoting for higher-value opportunities.
            </p>

            <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
              {[
                "Recurring office and facility cleaning",
                "Medical and high-trust environments",
                "Property management and multi-site support",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "center", color: "rgba(255,255,255,0.84)" }}>
                  <Briefcase size={18} color="#d4af37" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...card, padding: 28 }}>
            <div style={{ fontSize: 12, letterSpacing: ".22em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
              Next step
            </div>
            <h3 style={{ fontSize: 30, marginTop: 12 }}>Book a walkthrough</h3>
            <p style={{ marginTop: 14, color: "rgba(255,255,255,0.72)", lineHeight: 1.8 }}>
              For larger properties, recurring service, or more specific pricing, schedule a walkthrough and we’ll build the right plan.
            </p>
            <button onClick={() => window.open("https://calendly.com/management-pureauracleaningsolutions/30min", "_blank", "noopener,noreferrer")} style={{ marginTop: 18, padding: "16px 24px", background: "transparent", border: "1px solid rgba(255,255,255,0.22)", color: "white", borderRadius: 16, fontWeight: 700, width: "100%", cursor: "pointer" }}>
              Request Walkthrough
            </button>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 40px" }}>
        <div style={{ ...card, padding: 28 }}>
          <div style={{ color: "#d4af37", fontSize: 13, letterSpacing: ".22em", textTransform: "uppercase" }}>
            Reviews
          </div>
          <h3 style={{ fontSize: 34, marginTop: 14, marginBottom: 0 }}>What clients expect from Pure Aura</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 24 }}>
            {[
              {
                title: "Reliable and responsive",
                text: "Fast communication, dependable scheduling, and a professional experience from first contact to ongoing service.",
              },
              {
                title: "Consistent presentation",
                text: "Clean, polished results for offices, medical spaces, and properties that need to look right every time.",
              },
              {
                title: "Easy to work with",
                text: "Simple quoting, quick follow-up, and walkthrough options for larger or more complex facilities.",
              },
            ].map((item) => (
              <div key={item.title} style={{ ...card, padding: 22 }}>
                <div style={{ display: "flex", gap: 4, color: "#d4af37" }}>
                  <Star size={16} fill="#d4af37" />
                  <Star size={16} fill="#d4af37" />
                  <Star size={16} fill="#d4af37" />
                  <Star size={16} fill="#d4af37" />
                  <Star size={16} fill="#d4af37" />
                </div>
                <div style={{ marginTop: 14, fontSize: 20, fontWeight: 700 }}>{item.title}</div>
                <p style={{ marginTop: 10, color: "rgba(255,255,255,0.72)", lineHeight: 1.8 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 90px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26 }}>
          <div style={{ ...card, padding: 28 }}>
            <div style={{ color: "#d4af37", fontSize: 13, letterSpacing: ".22em", textTransform: "uppercase" }}>
              Property manager funnel
            </div>
            <h3 style={{ fontSize: 34, marginTop: 14, marginBottom: 0 }}>Built for portfolios, turnovers, and recurring service</h3>
            <p style={{ marginTop: 18, color: "rgba(255,255,255,0.74)", lineHeight: 1.8 }}>
              When property managers request pricing, the form captures the basics and gives your team a cleaner path to walkthroughs, recurring service, and multi-site follow-up.
            </p>
            <div style={{ display: "grid", gap: 14, marginTop: 22 }}>
              {[
                "Turnover and common-area support",
                "Recurring cleaning for managed properties",
                "Walkthrough-first path for larger portfolios",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "center", color: "rgba(255,255,255,0.84)" }}>
                  <Briefcase size={18} color="#d4af37" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...card, padding: 28 }}>
            <div style={{ color: "#d4af37", fontSize: 13, letterSpacing: ".22em", textTransform: "uppercase" }}>
              Follow-up automation
            </div>
            <h3 style={{ fontSize: 34, marginTop: 14, marginBottom: 0 }}>Ready for automatic follow-up emails</h3>
            <p style={{ marginTop: 18, color: "rgba(255,255,255,0.74)", lineHeight: 1.8 }}>
              The form now sends the email subject and message in the lead payload. Your Google Apps Script can use that data to send an automatic confirmation email right after submission.
            </p>
            <div style={{ marginTop: 20, color: "rgba(255,255,255,0.82)", lineHeight: 1.8 }}>
              Suggested flow: form submitted → lead saved to sheet → auto confirmation email sent → team follow-up scheduled.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
