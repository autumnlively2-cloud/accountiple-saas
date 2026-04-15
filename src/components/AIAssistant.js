import React, { useState, useRef, useEffect } from 'react';

const SYSTEM_PROMPTS = {
  truck: `You are TaxBot, an expert AI tax assistant inside Accountiple — a profit and tax tracking app for owner-operator truck drivers. You help with:
- IRS Schedule C deductions for truckers (fuel, tolls, meals per diem at $69/day, DOT physicals, Section 179 truck depreciation, ELD devices, insurance)
- Quarterly estimated tax payments (Form 1040-ES)
- Self-employment tax calculations (15.3%)
- IFTA fuel tax reporting
- Mileage tracking best practices (IRS standard rate $0.67/mile in 2026)
- 1099 income from freight brokers
- Business structure advice (sole prop vs LLC vs S-Corp)
Keep answers concise, practical, and specific to truckers. Always remind users you're an AI, not a licensed CPA.`,

  shop: `You are TaxBot, an expert AI tax assistant inside Accountiple — a profit and tax tracking app for auto repair shop owners. You help with:
- Business deductions: parts/COGS, payroll, rent, equipment (lifts, scanners), insurance, supplies
- Section 179 deductions for shop equipment
- Payroll taxes and 1099 vs W-2 technicians
- Sales tax on parts vs labor (varies by state)
- Quarterly estimated tax payments
- LLC vs S-Corp structure for shop owners
- Inventory accounting (FIFO/LIFO for parts)
- Business income tax brackets
Keep answers concise and practical. Always remind users you're an AI, not a licensed CPA.`,

  gig: `You are TaxBot, an expert AI tax assistant inside Accountiple — a profit and tax tracking app for gig delivery drivers (DoorDash, Uber Eats, Instacart, GrubHub). You help with:
- 1099-NEC income from gig platforms (taxable when over $600)
- Mileage deduction ($0.67/mile in 2026) — the biggest deduction
- Self-employment tax (15.3% on net earnings)
- Quarterly estimated tax payments
- Deductible expenses: mileage, phone bill (business %), insulated bags, car washes, parking
- Tips and bonuses are taxable income
- Multi-platform income tracking and combined 1099s
- 12% vs 22% federal tax bracket thresholds
Keep answers short, simple, and encouraging. Always remind users you're an AI, not a licensed CPA.`,
};

const SUGGESTIONS = {
  truck: ['What can I deduct?', 'How does per diem work?', 'Section 179 explained', 'When is Q2 tax due?'],
  shop: ['Parts vs labor tax?', 'Deduct shop equipment?', '1099 vs W-2 techs?', 'LLC or S-Corp?'],
  gig: ['What miles count?', 'How much tax do I owe?', 'Is my phone deductible?', 'DoorDash 1099 tips'],
};

export default function AIAssistant({ variant }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: variant === 'shop'
        ? "Hi! I'm TaxBot 🔧 — your shop's AI tax guide. Ask me about deductions, payroll, inventory, or quarterly taxes."
        : variant === 'gig'
        ? "Hey! I'm TaxBot 🛵 Ready to help you maximize your gig driver deductions and stay ahead of your 1099 taxes!"
        : "Hey! I'm TaxBot 🚛 Your AI tax co-pilot for owner-operators. Ask me anything about truck driver deductions, quarterly payments, or Schedule C."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }));
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPTS[variant] || SYSTEM_PROMPTS.truck,
          messages: apiMessages,
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't get a response. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ Connection error. Make sure you're connected and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const accentColor = variant === 'shop' ? '#E84855' : variant === 'gig' ? '#00C896' : '#F5A623';

  return (
    <>
      {open && (
        <div className="ai-panel">
          <div className="ai-panel-header">
            <div className="ai-panel-dot" style={{ background: '#2ECC71' }} />
            <div style={{ flex: 1 }}>
              <div className="ai-panel-title">TaxBot AI</div>
              <div className="ai-panel-sub">
                {variant === 'shop' ? 'Auto Repair Tax Guide' : variant === 'gig' ? 'Gig Driver Tax Expert' : 'Trucker Tax Co-Pilot'}
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}
            >×</button>
          </div>

          <div className="ai-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`ai-msg${msg.role === 'user' ? ' user' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="ai-avatar" style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)` }}>T</div>
                )}
                <div className={`ai-bubble ${msg.role === 'user' ? 'user' : 'bot'}`}
                  style={msg.role === 'user' ? { background: accentColor } : {}}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="ai-msg">
                <div className="ai-avatar" style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)` }}>T</div>
                <div className="ai-bubble bot">
                  <div className="ai-thinking">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && (
            <div className="ai-suggestions">
              {(SUGGESTIONS[variant] || SUGGESTIONS.truck).map(s => (
                <button key={s} className="ai-suggestion" onClick={() => sendMessage(s)}>{s}</button>
              ))}
            </div>
          )}

          <div className="ai-input-area">
            <textarea
              ref={inputRef}
              className="ai-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Ask about deductions, taxes, mileage..."
              rows={1}
            />
            <button className="ai-send" onClick={() => sendMessage()} style={{ background: accentColor }}>↑</button>
          </div>
        </div>
      )}

      <button
        className="ai-chat-btn"
        onClick={() => setOpen(o => !o)}
        style={{ background: accentColor }}
        title="Ask TaxBot AI"
      >
        {open ? '×' : '💬'}
      </button>
    </>
  );
}
