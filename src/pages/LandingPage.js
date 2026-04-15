import React, { useState } from 'react';

export default function LandingPage({ onEnter }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="landing">
      {/* NAV */}
      <nav className="landing-nav">
        <div className="landing-logo">Account<span>iple</span></div>
        <div className="landing-nav-links">
          <a>Features</a>
          <a>Pricing</a>
          <a>For Truckers</a>
          <a>For Shops</a>
          <a>For Gig Workers</a>
          <button className="btn btn-ghost btn-sm" onClick={() => onEnter('truck')}>Sign In</button>
          <button className="btn btn-primary btn-sm" onClick={() => onEnter('truck')}>Start Free →</button>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-badge">✦ BUILT FOR THE ROAD & THE BAY</div>
        <h1>Stop guessing.<br />Start <span>keeping more</span><br />of what you earn.</h1>
        <p className="hero-sub">
          Accountiple tracks your profit, expenses, mileage, and taxes in real time — built specifically for truck drivers, auto repair shops, and gig delivery workers.
        </p>
        <div className="hero-ctas">
          <button className="btn btn-primary btn-xl" onClick={() => onEnter('truck')}>
            Get Started Free →
          </button>
          <button className="btn btn-ghost btn-xl" onClick={() => onEnter('truck')}>
            View Demo
          </button>
        </div>
        <div className="hero-stats">
          <div>
            <div className="hero-stat-val">$4,200+</div>
            <div className="hero-stat-lbl">Average tax savings per user</div>
          </div>
          <div>
            <div className="hero-stat-val">12 min</div>
            <div className="hero-stat-lbl">To set up your account</div>
          </div>
          <div>
            <div className="hero-stat-val">3 types</div>
            <div className="hero-stat-lbl">Of gig worker supported</div>
          </div>
        </div>
      </div>

      {/* MOCK DASHBOARD PREVIEW */}
      <div className="hero-img">
        <div className="hero-img-inner">
          <div className="hero-img-bar">
            <div className="hero-img-dot" style={{ background: '#E74C3C' }} />
            <div className="hero-img-dot" style={{ background: '#F5A623' }} />
            <div className="hero-img-dot" style={{ background: '#2ECC71' }} />
            <span style={{ marginLeft: 8, fontSize: 11, color: 'var(--text3)', fontFamily: 'DM Mono, monospace' }}>accountiple.app — Dashboard</span>
          </div>
          <div className="hero-img-mock">
            {[
              { label: 'Gross Revenue', value: '$48,320', color: '#2ECC71' },
              { label: 'Total Expenses', value: '$19,640', color: '#E74C3C' },
              { label: 'Net Profit',     value: '$28,680', color: '#4A90E2' },
              { label: 'Tax Liability',  value: '$8,560',  color: '#F5A623' },
            ].map(c => (
              <div key={c.label} className="mock-card">
                <div className="mock-lbl">{c.label}</div>
                <div className="mock-val" style={{ color: c.color }}>{c.value}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '0 20px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ background: 'var(--bg3)', borderRadius: 10, padding: 16, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12, fontFamily: 'Syne, sans-serif', fontWeight: 600, marginBottom: 12 }}>Revenue vs Expenses</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 }}>
                {[72, 74, 89, 79, 0].map((h, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', gap: 2, alignItems: 'flex-end', height: '100%' }}>
                    <div style={{ flex: 1, height: `${h}%`, background: '#2ECC71', borderRadius: '3px 3px 0 0' }} />
                    <div style={{ flex: 1, height: `${Math.round(h * 0.55)}%`, background: '#E74C3C', borderRadius: '3px 3px 0 0' }} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'var(--bg3)', borderRadius: 10, padding: 16, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12, fontFamily: 'Syne, sans-serif', fontWeight: 600, marginBottom: 10 }}>Tax Readiness</div>
              {[
                { lbl: 'Set aside', pct: 50, color: '#2ECC71', val: '50%' },
                { lbl: 'Deductions', pct: 72, color: '#4A90E2', val: '72%' },
                { lbl: 'Mileage', pct: 77, color: '#4ECDC4', val: '77%' },
              ].map(p => (
                <div key={p.lbl} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 4 }}>
                    <span style={{ color: 'var(--text2)' }}>{p.lbl}</span>
                    <span style={{ color: p.color, fontFamily: 'DM Mono, monospace' }}>{p.val}</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--bg4)', borderRadius: 2 }}>
                    <div style={{ width: `${p.pct}%`, height: '100%', background: p.color, borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="features-section">
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="features-title">Everything you need. Nothing you don't.</div>
          <div className="features-sub">Purpose-built for the way gig workers actually make money.</div>
          <div className="features-grid">
            {[
              { icon: '📊', title: 'Real-Time P&L', desc: 'See your profit and loss update instantly as you log income and expenses. No spreadsheets, no accountant needed for day-to-day tracking.' },
              { icon: '🛣️', title: 'IRS Mileage Log', desc: 'Log every business mile. Auto-calculate your deduction at the IRS standard rate ($0.67/mi). Export an IRS-compliant report instantly.' },
              { icon: '%', title: 'Quarterly Tax Estimator', desc: 'Know exactly what you owe before the deadline hits. We calculate SE tax, federal income tax, and remind you when payments are due.' },
              { icon: '📦', title: 'Parts Inventory (Shops)', desc: 'Track your parts stock, get low-inventory alerts, and auto-calculate COGS for tax purposes. Works with NAPA, AutoZone, and more.' },
              { icon: '⊞', title: 'Multi-Platform (Gig)', desc: 'Connect DoorDash, Uber Eats, Instacart, and GrubHub. See which platform pays best per hour and maximize your earning strategy.' },
              { icon: '💬', title: 'TaxBot AI', desc: 'Ask anything about deductions, quarterly payments, or Schedule C prep. Get instant answers from an AI trained on gig worker tax law.' },
            ].map(f => (
              <div key={f.title} className="feat-card">
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROFILES */}
      <div className="profiles-section">
        <div className="profiles-title">Built for your business type</div>
        <p style={{ textAlign: 'center', color: 'var(--text3)', fontSize: 15 }}>One platform, three powerful variants — switch between them any time.</p>
        <div className="profiles-grid">
          {[
            {
              emoji: '🚛', name: 'Truck Drivers', color: '#F5A623', type: 'truck',
              desc: 'Owner-operators and independent carriers. Track loads, fuel, tolls, and mileage. Maximize per diem and Section 179 depreciation.',
              features: ['Load ledger with route & broker', 'IRS mileage log (38,000+ mi/yr)', 'Per diem meal deduction tracker', 'Section 179 truck depreciation', 'IFTA fuel tax helper', 'Schedule C export'],
            },
            {
              emoji: '🔧', name: 'Auto Repair Shops', color: '#E84855', type: 'shop',
              desc: 'Independent shops and mobile mechanics. Manage work orders, invoices, inventory, and technician payroll — all tied to your taxes.',
              features: ['Work order & bay management', 'Customer invoice tracking', 'Parts inventory with reorder alerts', 'Labor vs parts revenue split', 'Payroll deduction tracking', 'Shop P&L and Schedule C'],
            },
            {
              emoji: '🛵', name: 'Gig Delivery Drivers', color: '#00C896', type: 'gig',
              desc: 'Multi-platform delivery workers on DoorDash, Uber Eats, Instacart, and GrubHub. Track every dollar, every mile, every tip.',
              features: ['4-platform income aggregator', 'Tips & bonuses tracked separately', 'Per-platform $/hour analysis', 'Mileage deduction maximizer', '1099-NEC income prep', 'Quarterly tax calculator'],
            },
          ].map(p => (
            <div
              key={p.type}
              className="profile-card"
              style={{ borderTop: `3px solid ${p.color}`, cursor: 'pointer', transition: 'border-color 0.15s' }}
              onMouseEnter={() => setHovered(p.type)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onEnter(p.type)}
            >
              <div className="profile-emoji">{p.emoji}</div>
              <div className="profile-name" style={{ color: p.color }}>{p.name}</div>
              <div className="profile-desc">{p.desc}</div>
              <div className="profile-features">
                {p.features.map(f => (
                  <div key={f} className="profile-feat">
                    <span style={{ color: p.color, fontSize: 11 }}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <button
                className="btn btn-primary btn-sm"
                style={{ marginTop: 20, width: '100%', justifyContent: 'center', background: p.color }}
                onClick={() => onEnter(p.type)}
              >
                Open {p.name} Dashboard →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING */}
      <div className="pricing-section">
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="features-title">Simple pricing</div>
          <div className="features-sub">No surprises. Cancel any time.</div>
          <div className="pricing-grid">
            {[
              {
                name: 'Starter', price: 'Free', period: 'forever', featured: false,
                features: ['1 business profile', 'Income & expense tracking', 'Mileage log (up to 500 trips)', 'Basic tax estimator', 'CSV export'],
              },
              {
                name: 'Pro', price: '$14.99', period: '/month, billed monthly', featured: true,
                features: ['All 3 business profiles', 'Unlimited transactions', 'Unlimited mileage trips', 'TaxBot AI assistant', 'Schedule C PDF export', 'Bank sync (1 account)', 'Receipt scanning', 'Priority support'],
              },
              {
                name: 'Business', price: '$27.99', period: '/month, billed monthly', featured: false,
                features: ['Everything in Pro', 'Multi-user (up to 5 techs)', 'Work order management', 'Invoice creation & tracking', 'Parts inventory system', 'Payroll expense tracking', 'Accountant sharing link'],
              },
            ].map(plan => (
              <div key={plan.name} className={`pricing-card${plan.featured ? ' featured' : ''}`}>
                {plan.featured && (
                  <div style={{ background: 'var(--accent)', color: '#000', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20, display: 'inline-block', marginBottom: 10, fontFamily: 'DM Mono, monospace', letterSpacing: 1 }}>MOST POPULAR</div>
                )}
                <div className="pricing-name">{plan.name}</div>
                <div className="pricing-price" style={{ color: plan.featured ? 'var(--accent)' : 'var(--text)' }}>{plan.price}</div>
                <div className="pricing-period">{plan.period}</div>
                {plan.features.map(f => (
                  <div key={f} className="pricing-feature">
                    <span style={{ color: '#2ECC71', fontSize: 12 }}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
                <button
                  className={`btn ${plan.featured ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}
                  onClick={() => onEnter('truck')}
                >
                  Get Started →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-title">Ready to keep more of<br />what you earn?</div>
        <div className="cta-sub">Join thousands of gig workers who stopped overpaying on taxes.</div>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
          <button className="btn btn-primary btn-xl" onClick={() => onEnter('truck')}>Start Free — Truck Driver</button>
          <button className="btn btn-primary btn-xl" style={{ background: '#E84855' }} onClick={() => onEnter('shop')}>Start Free — Repair Shop</button>
          <button className="btn btn-primary btn-xl" style={{ background: '#00C896' }} onClick={() => onEnter('gig')}>Start Free — Gig Driver</button>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <div className="landing-logo" style={{ fontSize: 15 }}>Account<span style={{ color: 'var(--accent)' }}>iple</span></div>
        <div style={{ display: 'flex', gap: 28 }}>
          <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
          <span style={{ cursor: 'pointer' }}>Terms of Service</span>
          <span style={{ cursor: 'pointer' }}>Support</span>
        </div>
        <div>© 2026 Accountiple. Built for gig workers.</div>
      </div>
    </div>
  );
}
