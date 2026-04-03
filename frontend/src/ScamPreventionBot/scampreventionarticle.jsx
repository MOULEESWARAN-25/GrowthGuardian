import React, { useState, useEffect } from "react";

export default function ScamEducationBlog() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [fontSize, setFontSize] = useState("normal");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSection = (section) => setExpandedSection(expandedSection === section ? null : section);
  const increaseFontSize = () => setFontSize(fontSize === "normal" ? "large" : fontSize === "large" ? "x-large" : "x-large");
  const decreaseFontSize = () => setFontSize(fontSize === "x-large" ? "large" : fontSize === "large" ? "normal" : "normal");
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const fontSizeClasses = {
    normal: "text-base md:text-lg",
    large: "text-lg md:text-xl",
    "x-large": "text-xl md:text-2xl",
  };

  const theme = {
    bg: isDarkMode ? "bg-blue-900" : "bg-gradient-to-br from-blue-50 to-blue-100",
    text: isDarkMode ? "text-blue-100" : "text-blue-800",
    headings: isDarkMode ? "text-blue-300" : "text-blue-600",
    card: isDarkMode ? "bg-blue-800" : "bg-white",
    cardBorder: isDarkMode ? "border-blue-700" : "border-blue-200",
    highlight: isDarkMode ? "bg-blue-700 text-blue-100" : "bg-blue-100 text-blue-700",
    button: isDarkMode ? "bg-blue-600 hover:bg-blue-500 text-foreground" : "bg-blue-200 hover:bg-blue-300 text-blue-800",
    primaryButton: isDarkMode ? "bg-blue-500 hover:bg-blue-400 text-foreground" : "bg-blue-400 hover:bg-blue-500 text-foreground",
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-300`}>
      {/* Accessibility Controls */}
      <div className="fixed top-4 right-4 z-50 bg-opacity-90 backdrop-blur-sm rounded-full shadow-lg p-2 flex gap-2">
        <button onClick={increaseFontSize} className={`${theme.button} p-2 rounded-full transition-transform hover:scale-110`} aria-label="Increase font size">A+</button>
        <button onClick={decreaseFontSize} className={`${theme.button} p-2 rounded-full transition-transform hover:scale-110`} aria-label="Decrease font size">A-</button>
        <button onClick={toggleDarkMode} className={`${theme.button} p-2 rounded-full transition-transform hover:scale-110`} aria-label="Toggle dark mode">{isDarkMode ? "☀️" : "🌙"}</button>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button onClick={scrollToTop} aria-label="Back to top" className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg ${theme.primaryButton} transition-transform hover:scale-110`}>
          ↑
        </button>
      )}

      {/* Hero Section */}
      <header className={`text-center py-16 ${theme.text}`}>
        <div className="container mx-auto px-4">
          <h1 className={`${fontSize === "normal" ? "text-4xl md:text-5xl" : fontSize === "large" ? "text-5xl md:text-6xl" : "text-6xl md:text-7xl"} font-bold mb-6 transition-all duration-300 ${theme.headings}`}>
            Protect Yourself from <span className="text-blue-400">Scams and Fraud</span>
          </h1>
          {/* <p className={`${fontSize === "normal" ? "text-xl md:text-2xl" : fontSize === "large" ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"} max-w-3xl mx-auto mb-8`}>Expert advice from AARP and the FTC</p> */}
          <div className="mt-8 flex justify-center space-x-4">
            <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })} className={`${fontSizeClasses[fontSize]} px-8 py-3 ${theme.primaryButton} font-bold rounded-full transition-transform hover:scale-105 shadow-md`}>Get Help Now</button>
            <button onClick={() => document.querySelector("#resources").scrollIntoView({ behavior: "smooth" })} className={`${fontSizeClasses[fontSize]} px-8 py-3 ${theme.button} font-bold rounded-full transition-transform hover:scale-105 shadow-md`}>Find Resources</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <section className={`${theme.card} mb-12 rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl`}>
          <h2 className={`${fontSize === "normal" ? "text-2xl md:text-3xl" : fontSize === "large" ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"} font-bold ${theme.headings} mb-4`}>Why Older Adults Are Targeted</h2>
          <div className={`${fontSizeClasses[fontSize]} space-y-4`}>
            <p>According to the FBI and FTC, scammers target older adults due to their trust, savings, homeownership, and good credit. AARP reports seniors lose billions annually to fraud.</p>
            <p>Awareness of common scams and warning signs can protect you and your loved ones.</p>
          </div>
          <div className={`mt-6 p-4 ${theme.highlight} border-l-4 border-blue-400 rounded`}>
            <p className={`${fontSizeClasses[fontSize]} font-semibold`}>"Knowledge is your best defense against scammers." <span className="block mt-1 font-normal">— FTC</span></p>
          </div>
        </section>

        {/* Table of Contents */}
        <section className={`${theme.card} mb-12 rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl`}>
          <h2 className={`${fontSizeClasses[fontSize]} font-bold ${theme.headings} mb-4`}>Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[{ name: "Common Scams", link: "#common-scams", icon: "🚨" }, { name: "Warning Signs", link: "#warning-signs", icon: "⚠️" }, { name: "Protection Tips", link: "#protection-tips", icon: "🛡️" }, { name: "If You're Targeted", link: "#if-targeted", icon: "🆘" }, { name: "Free Resources", link: "#resources", icon: "📚" }, { name: "Safety Checklist", link: "#checklist", icon: "✅" }].map((item, index) => (
              <a key={index} href={item.link} className={`flex items-center p-3 rounded-lg ${isDarkMode ? "hover:bg-blue-700" : "hover:bg-blue-50"} transition-colors duration-200`}>
                <span className="text-2xl mr-3">{item.icon}</span>
                <span className={`${fontSizeClasses[fontSize]}`}>{item.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Common Scams */}
        <section id="common-scams" className="mb-12 scroll-mt-16">
          <h2 className={`${fontSize === "normal" ? "text-2xl md:text-3xl" : fontSize === "large" ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"} font-bold ${theme.headings} mb-6 text-center`}>Common Scams Targeting Older Adults</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{ title: "Government Impersonation Scams", source: "FTC", desc: "Scammers pose as Social Security, Medicare, or IRS officials, demanding payment via gift cards or wire transfers—methods real agencies never use.", icon: "🏛️" }, { title: "Grandparent Scams", source: "AARP", desc: "Callers pretend to be a grandchild in distress, urgently needing money and asking you to keep it secret.", icon: "👴" }, { title: "Tech Support Scams", source: "FTC", desc: "Fake pop-ups or calls warn of a virus, offering costly fixes or seeking remote access to steal data.", icon: "💻" }, { title: "Romance Scams", source: "AARP", desc: "Fraudsters build trust online, then invent emergencies to request funds, avoiding in-person meetings.", icon: "❤️" }, { title: "Lottery & Sweepstakes Scams", source: "FTC", desc: "You’re told you’ve won but must pay fees first—legitimate prizes never require upfront payment.", icon: "🎟️" }, { title: "Medicare Scams", source: "AARP", desc: "Callers posing as Medicare reps request your number for fake benefits, later using it for fraud.", icon: "🏥" }].map((scam, index) => (
              <div key={index} className={`${theme.card} rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500`}>
                <div className="flex items-start">
                  <span className="text-4xl mr-4">{scam.icon}</span>
                  <div>
                    <h3 className={`${fontSize === "normal" ? "text-xl" : fontSize === "large" ? "text-2xl" : "text-3xl"} font-semibold ${theme.headings}`}>{scam.title}</h3>
                    <p className={`text-sm font-medium ${isDarkMode ? "text-blue-300" : "text-blue-600"} mb-2`}>Source: {scam.source}</p>
                    <p className={`${fontSizeClasses[fontSize]}`}>{scam.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Warning Signs */}
        <section id="warning-signs" className={`${theme.card} mb-12 rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl scroll-mt-16`}>
          <h2 className={`${fontSize === "normal" ? "text-2xl md:text-3xl" : fontSize === "large" ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"} font-bold ${theme.headings} mb-4`}>Warning Signs of a Scam</h2>
          <p className={`${fontSizeClasses[fontSize]} mb-6`}>AARP and FTC highlight these common scammer tactics:</p>
          <div className="space-y-6">
            {[{ sign: "They pressure you to act immediately", details: "Urgency is used to stop you from thinking or consulting others, e.g., 'Act now or lose benefits.'", icon: "⏰" }, { sign: "They ask for unusual payment methods", details: "Gift cards, wire transfers, or crypto requests are red flags—legit entities don’t use these.", icon: "💳" }, { sign: "They say there's a problem with your account", details: "Claims of issues with Social Security or your bank should be verified directly with official sources.", icon: "⚠️" }, { sign: "They offer something too good to be true", details: "Free money or prizes with no risk are scams—if it’s too good, it’s not true.", icon: "🎁" }, { sign: "They request personal information", details: "Guard your Social Security number, Medicare ID, or bank details, even if they seem legit.", icon: "🔒" }].map((item, index) => (
              <div key={index} className={`${isDarkMode ? "bg-blue-700" : "bg-blue-50"} rounded-lg p-4 transition-colors duration-300`}>
                <div className="flex items-start">
                  <span className="text-4xl mr-4 mt-1">{item.icon}</span>
                  <div>
                    <h3 className={`${fontSize === "normal" ? "text-lg md:text-xl" : fontSize === "large" ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"} font-bold text-blue-500`}>{item.sign}</h3>
                    <p className={`${fontSizeClasses[fontSize]} mt-2`}>{item.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`mt-6 p-4 ${theme.highlight} border-l-4 border-blue-400 rounded`}>
            <p className={`${fontSizeClasses[fontSize]} font-semibold`}>AARP Tip: Trust your gut—if it feels off, hang up or walk away.</p>
          </div>
        </section>

        {/* Protection Tips */}
        <section id="protection-tips" className="mb-12 scroll-mt-16">
          <h2 className={`${fontSize === "normal" ? "text-2xl md:text-3xl" : fontSize === "large" ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"} font-bold ${theme.headings} mb-6 text-center`}>How to Protect Yourself</h2>
          <div className="space-y-4">
            {[{ title: "Be Cautious with Personal Info", source: "FTC", content: "Only share sensitive data if you initiated contact and trust the recipient. Shred personal documents." }, { title: "Verify Before You Trust", source: "AARP", content: "Hang up and call back using official numbers from websites or bills." }, { title: "Use Strong Passwords", source: "FTC", content: "Opt for unique passphrases and enable two-factor authentication." }, { title: "Be Careful Online", source: "AARP", content: "Avoid clicking unsolicited links; type URLs manually and skip shady downloads." }, { title: "Set Up Fraud Alerts", source: "FTC", content: "Request bank alerts and place a free fraud alert with credit bureaus." }, { title: "Check Your Credit", source: "AARP", content: "Monitor free credit reports at AnnualCreditReport.com for suspicious activity." }].map((tip, index) => (
              <div key={index} className={`${theme.card} rounded-xl shadow-lg overflow-hidden border-l-4 border-blue-400 transition-all duration-300 hover:shadow-xl`}>
                <button onClick={() => toggleSection(index)} className={`w-full text-left p-4 flex justify-between items-center ${fontSizeClasses[fontSize]} font-semibold ${theme.headings}`} aria-expanded={expandedSection === index}>
                  <div className="flex items-center">
                    <span>{tip.title}</span>
                    <span className={`ml-2 px-2 py-1 ${theme.highlight} text-sm rounded-full`}>{tip.source}</span>
                  </div>
                  <span className="text-xl">{expandedSection === index ? "−" : "+"}</span>
                </button>
                {expandedSection === index && <div className={`p-4 pt-2 border-t ${theme.cardBorder}`}><p className={`${fontSizeClasses[fontSize]}`}>{tip.content}</p></div>}
              </div>
            ))}
          </div>
        </section>

        {/* If Targeted */}
        <section id="if-targeted" className={`${theme.card} mb-12 rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl scroll-mt-16`}>
          <h2 className={`${fontSize === "normal" ? "text-2xl md:text-3xl" : fontSize === "large" ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"} font-bold ${theme.headings} mb-4`}>What to Do If Targeted</h2>
          <div className={`${fontSizeClasses[fontSize]} space-y-4`}><p>Don’t feel ashamed—scammers are skilled. Act fast with these steps:</p></div>
          <div className="mt-6 space-y-6">
            {[{ action: "Act Quickly", source: "FTC", steps: ["Contact your bank if financial info was shared", "Report gift card payments to the issuer", "Dispute credit card charges"], icon: "⚡" }, { action: "Report the Scam", source: "AARP", steps: ["FTC: ReportFraud.ftc.gov or 1-877-382-4357", "AARP Helpline: 1-877-908-3360", "IdentityTheft.gov for ID theft", "Local police"], icon: "📢" }, { action: "Protect Your Identity", source: "FTC", steps: ["Change affected passwords", "Add a fraud alert to credit reports", "Consider a credit freeze", "Monitor statements"], icon: "🔒" }, { action: "Seek Support", source: "AARP", steps: ["Talk to a loved one", "Contact your Area Agency on Aging", "Consider counseling if needed"], icon: "🤝" }].map((item, index) => (
              <div key={index} className={`${isDarkMode ? "bg-blue-700" : "bg-blue-50"} rounded-lg p-5 transition-colors duration-300`}>
                <h3 className={`${fontSize === "normal" ? "text-xl" : fontSize === "large" ? "text-2xl" : "text-3xl"} font-bold ${theme.headings} mb-2 flex items-center`}>
                  <span className={`mr-3 w-10 h-10 flex items-center justify-center ${isDarkMode ? "bg-blue-600" : "bg-blue-700"} text-foreground rounded-full`}>{item.icon}</span>
                  {item.action}
                  <span className={`ml-2 px-2 py-1 ${theme.highlight} text-sm rounded-full`}>{item.source}</span>
                </h3>
                <ul className="list-disc pl-12 space-y-2 mt-3">{item.steps.map((step, stepIndex) => <li key={stepIndex} className={`${fontSizeClasses[fontSize]}`}>{step}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        {/* Free Resources */}
        <section id="resources" className="mb-12 scroll-mt-16">
          <h2 className={`${fontSize === "normal" ? "text-2xl md:text-3xl" : fontSize === "large" ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"} font-bold ${theme.headings} mb-6 text-center`}>Free Resources to Help You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{ name: "AARP Fraud Watch Network", phone: "1-877-908-3360", website: "www.aarp.org/money/scams-fraud", description: "Free fraud alerts and support for all ages.", icon: "🔍" }, { name: "FTC Consumer Website", phone: "1-877-382-4357", website: "www.consumer.ftc.gov", description: "Report scams and get consumer protection tips.", icon: "🏛️" }, { name: "National Elder Fraud Hotline", phone: "1-833-372-8311", website: null, description: "Support for potential fraud victims.", icon: "☎️" }, { name: "Identity Theft Resource Center", phone: "1-888-400-5530", website: "www.idtheftcenter.org", description: "Live help for identity theft recovery.", icon: "🆔" }, { name: "Free Credit Reports", phone: "1-877-322-8228", website: "www.annualcreditreport.com", description: "Check your credit for free annually.", icon: "📋" }, { name: "Medicare Fraud Hotline", phone: "1-800-633-4227", website: "www.medicare.gov/fraud", description: "Report Medicare-related fraud.", icon: "🏥" }].map((resource, index) => (
              <div key={index} className={`${theme.card} rounded-xl shadow-lg p-6 flex flex-col h-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-3">{resource.icon}</span>
                  <h3 className={`${fontSize === "normal" ? "text-xl" : fontSize === "large" ? "text-2xl" : "text-3xl"} font-semibold ${theme.headings}`}>{resource.name}</h3>
                </div>
                <p className={`${fontSizeClasses[fontSize]} mb-2 flex-grow`}>{resource.description}</p>
                <div className={`pt-4 border-t ${theme.cardBorder} mt-auto`}>
                  <p className={`font-bold ${isDarkMode ? "text-blue-100" : "text-blue-800"}`}><span className="inline-block w-6 text-center mr-2">📞</span>{resource.phone}</p>
                  {resource.website && <p className={`font-bold ${isDarkMode ? "text-blue-300" : "text-blue-600"} break-words`}><span className="inline-block w-6 text-center mr-2">🌐</span>{resource.website}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Printable Checklist */}
        <section id="checklist" className={`${theme.card} mb-12 rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl scroll-mt-16`}>
          <h2 className={`${fontSize === "normal" ? "text-2xl md:text-3xl" : fontSize === "large" ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"} font-bold ${theme.headings} mb-4`}>Printable Safety Checklist</h2>
          <div className={`${fontSizeClasses[fontSize]} mb-6`}><p>Keep this handy reference—print it with the button below.</p></div>
          <div className={`border-2 ${isDarkMode ? "border-blue-700 bg-blue-800" : "border-blue-500 bg-blue-50"} rounded-lg p-6`}>
            <h3 className={`${fontSize === "normal" ? "text-xl" : fontSize === "large" ? "text-2xl" : "text-3xl"} font-bold ${theme.headings} mb-4`}>Scam Prevention Checklist</h3>
            <div className="space-y-3">
              {["Never share personal info with unknown callers", "Verify government agency claims independently", "Avoid gift cards, wire transfers, or crypto for unexpected requests", "Pause before acting on urgent demands", "Discuss financial decisions with trusted contacts", "Join the Do Not Call Registry (donotcall.gov)", "Check bank and credit statements often", "Update device security software", "Use strong, unique passwords"].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-6 h-6 ${isDarkMode ? "border-blue-400" : "border-blue-700"} border rounded flex-shrink-0 mr-3`} />
                  <span className={`${fontSizeClasses[fontSize]}`}>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button onClick={() => window.print()} className={`${fontSizeClasses[fontSize]} px-6 py-2 ${theme.primaryButton} font-bold rounded-lg transition-transform hover:scale-105`}>Print This Checklist</button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        
      </main>

         
    </div>
  );
}