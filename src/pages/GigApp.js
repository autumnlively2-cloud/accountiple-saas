import React, { useState } from 'react';
import { TriBarChart, SingleBarChart, DonutChart, Modal, TaxBlock, ProgBar, Alert, SchRow } from '../components/Charts';

const NAV = [
  { id: 'dashboard', label: 'Dashboard',          icon: '◼', section: 'Earnings' },
  { id: 'earnings',  label: 'Earnings & Tips',    icon: '↑',  section: null },
  { id: 'platforms', label: 'Platform Breakdown', icon: '⊞', section: null },
  { id: 'mileage',   label: 'Mileage Log',        icon: '⊙', section: 'Tools' },
  { id: 'expenses',  label: 'Expenses',           icon: '↓',  section: null },
  { id: 'tax',       label: 'Tax Estimator',      icon: '%',  badge: 'Q2', section: null },
  { id: 'reports',   label: 'Reports',            icon: '≡',  section: null },
];

const GIG_COLOR = '#00C896';

export default function GigApp() {
  const [page, setPage] = useState('dashboard');
  const [modal, setModal] = useState(null);

  return (
    <div className="app-shell" style={{ height: 'calc(100vh - 41px)' }}>
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-name">Aaliyah Johnson</div>
          <div className="sidebar-logo-sub">Multi-Platform Gig Driver</div>
        </div>
        <div className="sidebar-user">
          <div className="avatar" style={{ background: `linear-gradient(135deg,${GIG_COLOR},#0099FF)` }}>AJ</div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 500 }}>Aaliyah Johnson</div>
            <div style={{ fontSize: 10, color: 'var(--text3)' }}>Delivery Gig Worker</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {NAV.map(n => (
            <React.Fragment key={n.id}>
              {n.section && <div className="nav-section">{n.section}</div>}
              <div className={`nav-item${page === n.id ? ' active' : ''}`} onClick={() => setPage(n.id)} style={page===n.id?{color:GIG_COLOR,borderLeftColor:GIG_COLOR}:{}}>
                <span>{n.icon}</span> {n.label}
                {n.badge && <span className="nav-badge" style={{background:GIG_COLOR}}>{n.badge}</span>}
              </div>
            </React.Fragment>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="tax-widget">
            <div className="tax-widget-label">Est. Q2 Tax Due</div>
            <div className="tax-widget-amount" style={{ color: GIG_COLOR }}>$1,840</div>
            <div className="tax-widget-date">Jun 16, 2026 deadline</div>
          </div>
        </div>
      </aside>

      <main className="main">
        {page === 'dashboard' && <GigDashboard onModal={setModal} />}
        {page === 'earnings'  && <GigEarnings />}
        {page === 'platforms' && <GigPlatforms />}
        {page === 'mileage'   && <GigMileage onModal={setModal} />}
        {page === 'expenses'  && <GigExpenses onModal={setModal} />}
        {page === 'tax'       && <GigTax />}
        {page === 'reports'   && <GigReports />}

        <Modal open={modal === 'session'} onClose={() => setModal(null)} title="Log Delivery Session">
          <div className="form-row">
            <div className="form-group"><label className="form-label">Platform</label><select className="form-select"><option>DoorDash</option><option>Uber Eats</option><option>Instacart</option><option>GrubHub</option></select></div>
            <div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date" defaultValue="2026-04-14" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Hours Active</label><input className="form-input" type="number" placeholder="0.0" step="0.5" /></div>
            <div className="form-group"><label className="form-label">Deliveries</label><input className="form-input" type="number" placeholder="0" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Base Pay ($)</label><input className="form-input" type="number" placeholder="0.00" /></div>
            <div className="form-group"><label className="form-label">Tips ($)</label><input className="form-input" type="number" placeholder="0.00" /></div>
          </div>
          <div className="form-group"><label className="form-label">Miles Driven</label><input className="form-input" type="number" placeholder="0" /></div>
        </Modal>
        <Modal open={modal === 'expense'} onClose={() => setModal(null)} title="Log Expense">
          <div className="form-row">
            <div className="form-group"><label className="form-label">Category</label><select className="form-select"><option>Fuel</option><option>Phone (biz %)</option><option>Delivery Bags</option><option>Car Wash</option><option>Parking</option><option>Maintenance</option></select></div>
            <div className="form-group"><label className="form-label">Amount ($)</label><input className="form-input" type="number" placeholder="0.00" /></div>
          </div>
          <div className="form-group"><label className="form-label">Notes</label><input className="form-input" placeholder="Optional description" /></div>
        </Modal>
      </main>
    </div>
  );
}

function GigDashboard({ onModal }) {
  return (
    <>
      <div className="topbar">
        <div className="page-title">Gig Dashboard</div>
        <div className="topbar-right">
          <span className="type-badge" style={{color:GIG_COLOR,borderColor:'rgba(0,200,150,0.2)',background:'rgba(0,200,150,0.1)'}}>🛵 Gig Driver</span>
          <button className="btn btn-ghost" onClick={() => onModal('session')}>+ Log Session</button>
        </div>
      </div>
      <div className="content">
        <Alert type="green">✓ &nbsp;Great week! You earned <strong>$892 in 3 days</strong> and logged <strong>318 miles</strong>. Est. hourly: <strong>$18.40/hr</strong> after expenses.</Alert>
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-label">Gross Earnings MTD</div><div className="stat-value" style={{color:'#2ECC71'}}>$3,284</div><div className="stat-change"><span style={{color:'#2ECC71'}}>↑ 6%</span> vs March</div></div>
          <div className="stat-card"><div className="stat-label">Tips Earned MTD</div><div className="stat-value" style={{color:'#FFD166'}}>$412</div><div className="stat-change">12.5% tip rate</div></div>
          <div className="stat-card"><div className="stat-label">Net After Expenses</div><div className="stat-value" style={{color:'#4ECDC4'}}>$2,090</div><div className="stat-change">63.6% keep rate</div></div>
          <div className="stat-card"><div className="stat-label">Annual Tax Liability</div><div className="stat-value" style={{color:GIG_COLOR}}>$3,680</div><div className="stat-change">Self-emp. est. annual</div></div>
        </div>
        <div className="main-side">
          <div className="card">
            <div className="section-hdr"><div className="section-title">Weekly Earnings — Apr 2026</div></div>
            <TriBarChart d1={[620,780,940,778,0]} d2={[88,104,128,114,0]} d3={[0,0,120,0,0]} c1={GIG_COLOR} c2="#FFD166" c3="#0099FF" height={110} />
            <div style={{display:'flex',gap:14,marginTop:8}}>
              {[['Base Pay',GIG_COLOR],['Tips','#FFD166'],['Bonuses','#0099FF']].map(([l,c])=>(
                <div key={l} style={{display:'flex',alignItems:'center',gap:5,fontSize:10,color:'var(--text3)'}}><div style={{width:8,height:8,borderRadius:2,background:c}}/>{l}</div>
              ))}
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div className="card">
              <div className="section-title" style={{marginBottom:12}}>Platform Split</div>
              <div style={{display:'flex',alignItems:'center',gap:14}}>
                <DonutChart segments={[{value:55,color:'#FF3008'},{value:25,color:'#555'},{value:12,color:'#0AAD0A'},{value:8,color:'#F63440'}]} total="$3.3k" label="Total" />
                <div style={{flex:1}}>
                  {[['DoorDash 55%','#FF3008','$1,806'],['Uber Eats 25%','#555','$821'],['Instacart 12%','#0AAD0A','$394'],['GrubHub 8%','#F63440','$263']].map(([l,c,v])=>(
                    <div key={l} className="leg-item"><div className="leg-dot" style={{background:c}}/><span>{l}</span><span style={{marginLeft:'auto',fontFamily:'DM Mono,monospace',fontSize:10}}>{v}</span></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="card">
              <div className="section-title" style={{marginBottom:10}}>This Week</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                {[['$892',GIG_COLOR,'Earnings'],['$114','#FFD166','Tips'],['318 mi','#4ECDC4','Miles'],['49 hrs','#4A90E2','Active']].map(([v,c,l])=>(
                  <div key={l} style={{background:'var(--bg3)',borderRadius:8,padding:'10px 12px',border:'1px solid var(--border)'}}>
                    <div style={{fontSize:17,fontWeight:700,fontFamily:'Syne,sans-serif',color:c}}>{v}</div>
                    <div style={{fontSize:9,color:'var(--text3)',textTransform:'uppercase',letterSpacing:1,fontFamily:'DM Mono,monospace',marginTop:3}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="section-hdr"><div className="section-title">Recent Deliveries</div></div>
          <table className="data-table">
            <thead><tr><th>Date</th><th>Platform</th><th>Type</th><th>Miles</th><th>Tip</th><th className="text-right">Earnings</th></tr></thead>
            <tbody>
              {[
                ['Apr 12','DoorDash','tag-platform','Restaurant','4.2 mi','+$5','$14.80'],
                ['Apr 12','DoorDash','tag-platform','Restaurant','2.8 mi','+$3','$9.40'],
                ['Apr 11','Uber Eats','tag-repair','Restaurant','6.1 mi','+$8','$18.20'],
                ['Apr 11','Instacart','tag-parts','Grocery','8.4 mi','+$12','$32.60'],
                ['Apr 10','DoorDash','tag-platform','Dash Pass','3.5 mi','—','$11.40'],
              ].map(([d,plat,tagClass,type,miles,tip,earn])=>(
                <tr key={d+plat+earn}><td style={{color:'var(--text3)',fontSize:11,fontFamily:'DM Mono,monospace'}}>{d}</td><td><span className={`tag ${tagClass}`}>{plat}</span></td><td>{type}</td><td style={{fontFamily:'DM Mono,monospace',fontSize:11}}>{miles}</td><td style={{fontFamily:'DM Mono,monospace',fontSize:11,color:tip!=='—'?'#FFD166':'var(--text3)'}}>{tip}</td><td className="amount-pos text-right">{earn}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function GigEarnings() {
  return (
    <>
      <div className="topbar"><div className="page-title">Earnings & Tips</div><div className="topbar-right"><button className="btn btn-primary" style={{background:GIG_COLOR,color:'#000'}}>+ Log Session</button></div></div>
      <div className="content">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-label">Base Pay MTD</div><div className="stat-value" style={{color:'#2ECC71'}}>$2,872</div></div>
          <div className="stat-card"><div className="stat-label">Tips MTD</div><div className="stat-value" style={{color:'#FFD166'}}>$412</div><div className="stat-change">12.5% of earnings</div></div>
          <div className="stat-card"><div className="stat-label">Best Day</div><div className="stat-value" style={{color:'#4ECDC4'}}>$294</div><div className="stat-change">Fri Apr 4 · 6.5 hrs</div></div>
          <div className="stat-card"><div className="stat-label">Avg $/Hour</div><div className="stat-value" style={{color:GIG_COLOR}}>$18.40</div><div className="stat-change">After expenses</div></div>
        </div>
        <div className="card">
          <div className="section-hdr"><div className="section-title">Earnings by Week — April 2026</div></div>
          <table className="data-table">
            <thead><tr><th>Week</th><th>Days</th><th>Deliveries</th><th>Hours</th><th>Base Pay</th><th>Tips</th><th className="text-right">Total</th></tr></thead>
            <tbody>
              {[['Apr 7–13','5','48','33 hr','$778','$114','$892'],['Mar 31–Apr 6','6','62','44 hr','$1,012','$142','$1,154'],['Mar 24–30','4','41','28 hr','$680','$98','$778']].map(([wk,...rest])=>(
                <tr key={wk}><td style={{color:'var(--text3)'}}>{wk}</td>{rest.slice(0,-1).map((v,i)=><td key={i} style={{fontFamily:'DM Mono,monospace',fontSize:11}}>{v}</td>)}<td className="amount-pos text-right">{rest[rest.length-1]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function GigPlatforms() {
  return (
    <>
      <div className="topbar"><div className="page-title">Platform Breakdown</div><div className="topbar-right"><button className="btn btn-ghost">+ Connect Platform</button></div></div>
      <div className="content">
        {[
          {name:'DoorDash',init:'DD',bg:'#FF3008',mtd:'$1,806',stats:'187 deliveries · $9.66 avg · Acceptance: 84% · 4.94★',pct:55},
          {name:'Uber Eats',init:'UE',bg:'#1a1a1a',mtd:'$821',stats:'74 deliveries · $11.09 avg · Acceptance: 91% · 4.88★',pct:25},
          {name:'Instacart',init:'IC',bg:'#0AAD0A',mtd:'$394',stats:'18 batches · $21.89 avg · Rating: 5.0★ · Shopper',pct:12},
          {name:'GrubHub',init:'GH',bg:'#F63440',mtd:'$263',stats:'29 deliveries · $9.07 avg · Acceptance: 78%',pct:8},
        ].map(p => (
          <div key={p.name} className="platform-card">
            <div className="plat-icon" style={{background:p.bg}}>{p.init}</div>
            <div style={{flex:1}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontSize:14,fontWeight:600}}>{p.name}</div>
                <div className="amount-pos">{p.mtd} MTD</div>
              </div>
              <div style={{fontSize:11,color:'var(--text3)',marginTop:3}}>{p.stats}</div>
              <div style={{marginTop:8}}><div className="prog-track"><div className="prog-fill" style={{width:`${p.pct}%`,background:p.bg}}/></div></div>
            </div>
          </div>
        ))}
        <div className="card">
          <div className="section-hdr"><div className="section-title">Platform Efficiency Comparison</div></div>
          <table className="data-table">
            <thead><tr><th>Platform</th><th>Deliveries</th><th>Avg Order</th><th>Tip Rate</th><th>Mi/Delivery</th><th className="text-right">$/Hour Est.</th></tr></thead>
            <tbody>
              {[['DoorDash','tag-platform','#FF3008','187','$9.66','14%','3.4','$19.20','pos'],['Uber Eats','tag-repair','#555','74','$11.09','11%','4.2','$17.80','pos'],['Instacart','tag-parts','#0AAD0A','18','$21.89','24%','8.1','$21.40','neu'],['GrubHub','tag-expense','#F63440','29','$9.07','8%','3.9','$14.60','neg']].map(([name,tagClass,,del,avg,tip,mi,hr,color])=>(
                <tr key={name}><td><span className={`tag ${tagClass}`}>{name}</span></td><td style={{fontFamily:'DM Mono,monospace',fontSize:11}}>{del}</td><td style={{fontFamily:'DM Mono,monospace',fontSize:11}}>{avg}</td><td style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'#FFD166'}}>{tip}</td><td style={{fontFamily:'DM Mono,monospace',fontSize:11}}>{mi}</td><td className={`amount-${color} text-right`}>{hr}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function GigMileage({ onModal }) {
  return (
    <>
      <div className="topbar"><div className="page-title">Mileage Log</div><div className="topbar-right"><button className="btn btn-ghost">Auto-Track</button><button className="btn btn-primary" style={{background:GIG_COLOR,color:'#000'}} onClick={() => onModal('mile')}>+ Log Miles</button></div></div>
      <div className="content">
        <Alert type="green">💡 &nbsp;Mileage is your biggest deduction! At $0.67/mi you've already unlocked <strong>$4,784</strong> in deductions — that's ~$1,435 in real tax savings!</Alert>
        <div className="mile-stats">
          <div className="mile-stat"><div className="mile-val" style={{color:GIG_COLOR}}>7,140</div><div className="mile-lbl">Business Miles YTD</div></div>
          <div className="mile-stat"><div className="mile-val" style={{color:'#2ECC71'}}>$4,784</div><div className="mile-lbl">Deduction Value</div></div>
          <div className="mile-stat"><div className="mile-val" style={{color:'#4A90E2'}}>2,840</div><div className="mile-lbl">Deliveries Driven</div></div>
        </div>
        <div className="two-col">
          <div className="card">
            <div className="section-title" style={{marginBottom:12}}>Mileage Deduction</div>
            <TaxBlock rows={[
              {label:'IRS Rate (2026)',value:'$0.67/mile'},
              {label:'Business Miles YTD',value:'7,140 mi'},
              {label:'Unlogged (estimate)',value:'~420 mi',color:'#E74C3C'},
              {label:'Total Deduction',value:'$4,784',color:GIG_COLOR,total:true},
            ]} />
            <div style={{fontSize:10,color:'var(--text3)',marginTop:8}}>💡 Log ALL miles — to restaurant, between pickups, and home on last delivery. These all count!</div>
          </div>
          <div className="card">
            <div className="section-title" style={{marginBottom:12}}>Weekly Miles</div>
            <SingleBarChart data={[1420,1680,2040,1680,320]} color={GIG_COLOR} height={90} />
          </div>
        </div>
        <div className="card">
          <div className="section-hdr"><div className="section-title">Session Log</div></div>
          <table className="data-table">
            <thead><tr><th>Date</th><th>Platform</th><th>Hours</th><th>Deliveries</th><th>Miles</th><th className="text-right">Earnings</th><th>$/Mile</th></tr></thead>
            <tbody>
              {[['Apr 12','DoorDash','tag-platform','5.5 hr','14','48','$148','$3.08'],['Apr 11','Instacart','tag-parts','4.0 hr','3','62','$94','$1.52'],['Apr 10','Uber Eats','tag-repair','6.0 hr','18','74','$182','$2.46']].map(([d,plat,tagClass,hrs,del,mi,earn,ratePerMi])=>(
                <tr key={d+plat}><td style={{color:'var(--text3)',fontSize:11,fontFamily:'DM Mono,monospace'}}>{d}</td><td><span className={`tag ${tagClass}`}>{plat}</span></td><td style={{fontFamily:'DM Mono,monospace',fontSize:11}}>{hrs}</td><td style={{fontFamily:'DM Mono,monospace',fontSize:11}}>{del}</td><td style={{fontFamily:'DM Mono,monospace',fontSize:11}}>{mi}</td><td className="amount-pos text-right">{earn}</td><td style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'var(--text3)'}}>{ratePerMi}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function GigExpenses({ onModal }) {
  return (
    <>
      <div className="topbar"><div className="page-title">Expenses</div><div className="topbar-right"><button className="btn btn-primary" style={{background:GIG_COLOR,color:'#000'}} onClick={() => onModal('expense')}>+ Log Expense</button></div></div>
      <div className="content">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-label">Fuel MTD</div><div className="stat-value" style={{color:'#F5A623'}}>$480</div><div className="stat-change">Largest expense</div></div>
          <div className="stat-card"><div className="stat-label">Phone (biz 80%)</div><div className="stat-value" style={{color:'#4A90E2'}}>$60</div><div className="stat-change">100% deductible portion</div></div>
          <div className="stat-card"><div className="stat-label">Delivery Bags</div><div className="stat-value" style={{color:'#4ECDC4'}}>$48</div><div className="stat-change">100% deductible</div></div>
          <div className="stat-card"><div className="stat-label">Total Deductions</div><div className="stat-value" style={{color:GIG_COLOR}}>$1,194</div><div className="stat-change">All categories</div></div>
        </div>
        <div className="card">
          <div className="section-title" style={{marginBottom:12}}>Gig Driver Deductions Checklist</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {[
              {lbl:'Mileage ($4,784 YTD)', done:true},
              {lbl:'Phone bill (80% biz use)', done:true},
              {lbl:'Insulated delivery bags', done:true},
              {lbl:'Car washes (delivery)', done:true},
              {lbl:'Parking fees', done:false, warn:true},
              {lbl:'Health insurance (self-emp)', done:false},
            ].map(({lbl,done,warn})=>(
              <div key={lbl} style={{display:'flex',alignItems:'center',gap:8,padding:'9px 12px',background:'var(--bg3)',borderRadius:8,fontSize:12}}>
                <span style={{color:done?GIG_COLOR:warn?'#FFD166':'#E74C3C'}}>{done?'✓':warn?'⚠':'✕'}</span>{lbl}
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <table className="data-table">
            <thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Deductible</th><th className="text-right">Amount</th></tr></thead>
            <tbody>
              {[['Apr 12','Fuel — QT on Eastman Rd','Fuel','fuel','100%','-$42'],['Apr 11','Phone bill — AT&T (80% biz)','Phone','parts','80%','-$60'],['Apr 10','Insulated delivery bag — Amazon','Gear','parts','100%','-$48'],['Apr 09','Car wash — delivery use','Car Wash','parts','100%','-$14'],].map(([d,desc,cat,type,ded,amt])=>(
                <tr key={d+desc}><td style={{color:'var(--text3)',fontSize:11,fontFamily:'DM Mono,monospace'}}>{d}</td><td>{desc}</td><td><span className={`tag tag-${type}`}>{cat}</span></td><td><span className="tag tag-deduct">{ded}</span></td><td className="amount-neg text-right">{amt}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function GigTax() {
  return (
    <>
      <div className="topbar"><div className="page-title">Tax Estimator</div><div className="topbar-right"><button className="btn btn-ghost">Download PDF</button></div></div>
      <div className="content">
        <div className="qtabs">
          <div className="qtab active">Q1 2026</div>
          <div className="qtab due">Q2 2026 ← Due Jun 16</div>
          <div className="qtab">Q3 2026</div>
          <div className="qtab">Q4 2026</div>
        </div>
        <div className="two-col">
          <div>
            <div className="card">
              <div className="section-title" style={{marginBottom:12}}>Earnings & Deductions</div>
              <TaxBlock rows={[
                {label:'1099 Gross Earnings',value:'$9,840'},
                {label:'Mileage Deduction',value:'-$4,784'},
                {label:'Other Expenses',value:'-$1,194'},
                {label:'Net Taxable Income',value:'$3,862',total:true},
              ]} />
            </div>
            <div className="card">
              <div className="section-title" style={{marginBottom:12}}>Tax Calculation</div>
              <TaxBlock rows={[
                {label:'SE Tax (15.3%)',value:'$591'},
                {label:'SE Deduction (50%)',value:'-$295'},
                {label:'Federal Income (12% bracket)',value:'$463'},
                {label:'Payments Made Q1',value:'-$800',color:'#2ECC71'},
                {label:'Q2 Payment Due',value:'$1,840',color:GIG_COLOR,total:true},
              ]} />
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div className="card">
              <div className="section-title" style={{marginBottom:12}}>Payment Schedule</div>
              <SchRow label="Q1 — Apr 15, 2026" status="PAID $800" statusColor="#2ECC71" borderColor="#2ECC71" />
              <SchRow label="Q2 — Jun 16, 2026" status={`DUE $1,840`} statusColor={GIG_COLOR} borderColor={GIG_COLOR} />
              <SchRow label="Q3 — Sep 15, 2026" status="EST $900" statusColor="var(--text3)" borderColor="var(--border)" />
              <SchRow label="Filing — Jan 15, 2027" status="EST $1,100" statusColor="var(--text3)" borderColor="var(--border)" />
            </div>
            <div className="card">
              <div className="section-title" style={{marginBottom:10}}>1099 Tax Tips for Gig Workers</div>
              {[
                {c:GIG_COLOR,t:'DoorDash sends 1099-NEC if you earn >$600'},
                {c:'#0099FF',t:'Tips ARE taxable income — report them all'},
                {c:'#FFD166',t:'Bonuses & quests count as gig income'},
                {c:'#E74C3C',t:'You pay BOTH sides of SE tax (15.3%)'},
                {c:'#9B59B6',t:'Keep a mileage log — IRS may audit'},
                {c:'#F5A623',t:'Quarterly payments avoid a penalty'},
              ].map(({c,t})=>(
                <div key={t} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 0',borderBottom:'1px solid var(--border)',fontSize:12}}>
                  <div style={{width:7,height:7,borderRadius:'50%',background:c,flexShrink:0}}/>{t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function GigReports() {
  return (
    <>
      <div className="topbar"><div className="page-title">Reports</div><div className="topbar-right"><button className="btn btn-ghost">Export CSV</button><button className="btn btn-primary" style={{background:GIG_COLOR,color:'#000'}}>Download PDF</button></div></div>
      <div className="content">
        <div className="three-col">
          {[['📊','Earnings Report','All platforms combined'],['🏛️','Schedule C Prep','CPA-ready 1099 summary'],['🛵','Mileage Report','IRS-compliant log export'],['⊞','Platform Comparison','$/hr by platform'],['💡','Deduction Report','What you saved this year'],['📅','Weekly Breakdown','Earnings by day & time']].map(([icon,title,desc])=>(
            <div key={title} className="card" style={{cursor:'pointer',marginBottom:0}}>
              <div style={{fontSize:26,marginBottom:8}}>{icon}</div>
              <div style={{fontSize:13,fontWeight:600,marginBottom:3}}>{title}</div>
              <div style={{fontSize:11,color:'var(--text3)',marginBottom:14}}>{desc}</div>
              <button className="btn btn-ghost btn-sm" style={{width:'100%',justifyContent:'center'}}>Generate</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
