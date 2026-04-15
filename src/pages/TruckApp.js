import React, { useState } from 'react';
import { DualBarChart, SingleBarChart, DonutChart, Modal, TaxBlock, ProgBar, Alert, SchRow } from '../components/Charts';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '◼' },
  { id: 'income',    label: 'Income / Loads', icon: '↑' },
  { id: 'expenses',  label: 'Expenses', icon: '↓' },
  { id: 'mileage',   label: 'Mileage Log', icon: '⊙' },
  { id: 'tax',       label: 'Tax Estimator', icon: '%', badge: 'Q2' },
  { id: 'reports',   label: 'Reports', icon: '≡' },
];

export default function TruckApp() {
  const [page, setPage] = useState('dashboard');
  const [modal, setModal] = useState(null);

  return (
    <div className="app-shell" style={{ height: 'calc(100vh - 41px)' }}>
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-name">Jake Rivera Trucking</div>
          <div className="sidebar-logo-sub">Owner-Operator · CDL-A</div>
        </div>
        <div className="sidebar-user">
          <div className="avatar" style={{ background: 'linear-gradient(135deg,#F5A623,#FF6B35)' }}>JR</div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 500 }}>Jake Rivera</div>
            <div style={{ fontSize: 10, color: 'var(--text3)' }}>Truck Driver</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section">Overview</div>
          {NAV.map(n => (
            <div key={n.id} className={`nav-item${page === n.id ? ' active' : ''}`} onClick={() => setPage(n.id)}>
              <span>{n.icon}</span> {n.label}
              {n.badge && <span className="nav-badge">{n.badge}</span>}
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="tax-widget">
            <div className="tax-widget-label">Est. Q2 Tax Due</div>
            <div className="tax-widget-amount">$4,864</div>
            <div className="tax-widget-date">Jun 16, 2026 deadline</div>
          </div>
        </div>
      </aside>

      <main className="main">
        {page === 'dashboard' && <TruckDashboard onModal={setModal} />}
        {page === 'income'    && <TruckIncome />}
        {page === 'expenses'  && <TruckExpenses onModal={setModal} />}
        {page === 'mileage'   && <TruckMileage onModal={setModal} />}
        {page === 'tax'       && <TruckTax />}
        {page === 'reports'   && <TruckReports />}

        <Modal open={modal === 'addEntry'} onClose={() => setModal(null)} title="Add Transaction">
          <div className="form-row">
            <div className="form-group"><label className="form-label">Type</label><select className="form-select"><option>Income (Load)</option><option>Expense</option></select></div>
            <div className="form-group"><label className="form-label">Amount ($)</label><input className="form-input" type="number" placeholder="0.00" /></div>
          </div>
          <div className="form-group"><label className="form-label">Description</label><input className="form-input" placeholder="Load # or expense description" /></div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date" defaultValue="2026-04-14" /></div>
            <div className="form-group"><label className="form-label">Category</label><select className="form-select"><option>Freight Income</option><option>Fuel</option><option>Repair</option><option>Insurance</option><option>Tolls</option></select></div>
          </div>
        </Modal>
        <Modal open={modal === 'addMile'} onClose={() => setModal(null)} title="Log Trip">
          <div className="form-row">
            <div className="form-group"><label className="form-label">From</label><input className="form-input" placeholder="City, State" /></div>
            <div className="form-group"><label className="form-label">To</label><input className="form-input" placeholder="City, State" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Miles</label><input className="form-input" type="number" placeholder="0" /></div>
            <div className="form-group"><label className="form-label">Load #</label><input className="form-input" placeholder="A-4830" /></div>
          </div>
        </Modal>
      </main>
    </div>
  );
}

function TruckDashboard({ onModal }) {
  return (
    <>
      <div className="topbar">
        <div className="page-title">Dashboard</div>
        <div className="topbar-right">
          <span className="type-badge">🚛 Truck Driver</span>
          <button className="btn btn-ghost" onClick={() => onModal('addEntry')}>+ Add Entry</button>
        </div>
      </div>
      <div className="content">
        <Alert>⚠ &nbsp;<strong>Q2 estimated tax</strong> due Jun 16, 2026. Set aside <strong>$4,864</strong> to avoid IRS underpayment penalty.</Alert>
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-label">Gross Revenue</div><div className="stat-value" style={{color:'#2ECC71'}}>$48,320</div><div className="stat-change"><span style={{color:'#2ECC71'}}>↑ 12%</span> vs last qtr</div></div>
          <div className="stat-card"><div className="stat-label">Total Expenses</div><div className="stat-value" style={{color:'#E74C3C'}}>$19,640</div><div className="stat-change"><span style={{color:'#E74C3C'}}>↑ 8%</span> vs last qtr</div></div>
          <div className="stat-card"><div className="stat-label">Net Profit</div><div className="stat-value" style={{color:'#4A90E2'}}>$28,680</div><div className="stat-change"><span style={{color:'#2ECC71'}}>↑ 15%</span> vs last qtr</div></div>
          <div className="stat-card"><div className="stat-label">Tax Liability</div><div className="stat-value" style={{color:'#F5A623'}}>$8,560</div><div className="stat-change">SE + federal est.</div></div>
        </div>
        <div className="main-side">
          <div className="card">
            <div className="section-hdr"><div className="section-title">Revenue vs Expenses — 2026</div></div>
            <DualBarChart data1={[14800,15200,18320,16240,0]} data2={[6060,6320,7640,7200,0]} color1="#2ECC71" color2="#E74C3C" />
            <div style={{display:'flex',gap:14,marginTop:8}}>
              <div style={{display:'flex',alignItems:'center',gap:5,fontSize:10,color:'var(--text3)'}}><div style={{width:8,height:8,borderRadius:2,background:'#2ECC71'}}/>Revenue</div>
              <div style={{display:'flex',alignItems:'center',gap:5,fontSize:10,color:'var(--text3)'}}><div style={{width:8,height:8,borderRadius:2,background:'#E74C3C'}}/>Expenses</div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div className="card">
              <div className="section-title" style={{marginBottom:12}}>Expense Mix</div>
              <div style={{display:'flex',alignItems:'center',gap:14}}>
                <DonutChart segments={[{value:48,color:'#F5A623'},{value:22,color:'#4A90E2'},{value:13,color:'#2ECC71'},{value:17,color:'#E74C3C'}]} total="$19.6k" label="Total" />
                <div style={{flex:1}}>
                  {[['Fuel 48%','#F5A623','$9,480'],['Insurance 22%','#4A90E2','$4,320'],['Repairs 13%','#2ECC71','$2,560'],['Other 17%','#E74C3C','$3,280']].map(([l,c,v])=>(
                    <div key={l} className="leg-item"><div className="leg-dot" style={{background:c}}/><span>{l}</span><span style={{marginLeft:'auto',fontFamily:'DM Mono,monospace',fontSize:10}}>{v}</span></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="card">
              <div className="section-title" style={{marginBottom:12}}>Tax Readiness</div>
              <ProgBar label="Set aside" value={50} max={100} color="#2ECC71" displayValue="$4,280 / $8,560" />
              <ProgBar label="Deductions" value={72} max={100} color="#4A90E2" displayValue="72% logged" />
              <ProgBar label="Mileage" value={77} max={100} color="#4ECDC4" displayValue="38,420 mi" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="section-hdr"><div className="section-title">Recent Transactions</div></div>
          <table className="data-table">
            <thead><tr><th>Date</th><th>Description</th><th>Category</th><th className="text-right">Amount</th></tr></thead>
            <tbody>
              {[
                ['Apr 10','Load — Chicago to Dallas','Freight','income','+$3,200'],
                ['Apr 09','Flying J — Fuel fillup','Fuel','fuel','-$480'],
                ['Apr 08','Load — Memphis to Atlanta','Freight','income','+$2,750'],
                ['Apr 07','Tire replacement — rear axle','Repair','repair','-$840'],
                ['Apr 05','Load — Dallas to Phoenix','Freight','income','+$4,100'],
              ].map(([d,desc,cat,type,amt])=>(
                <tr key={d+desc}><td style={{color:'var(--text3)',fontSize:11,fontFamily:'DM Mono,monospace'}}>{d}</td><td>{desc}</td><td><span className={`tag tag-${type}`}>{cat}</span></td><td className={`text-right ${type==='income'?'amount-pos':'amount-neg'}`}>{amt}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function TruckIncome() {
  return (
    <>
      <div className="topbar"><div className="page-title">Income / Loads</div><div className="topbar-right"><button className="btn btn-primary">+ Add Load</button></div></div>
      <div className="content">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-label">This Month</div><div className="stat-value" style={{color:'#2ECC71'}}>$16,240</div><div className="stat-change"><span style={{color:'#2ECC71'}}>↑ 9%</span> vs March</div></div>
          <div className="stat-card"><div className="stat-label">Avg Per Load</div><div className="stat-value" style={{color:'#4A90E2'}}>$2,840</div><div className="stat-change">17 loads this quarter</div></div>
          <div className="stat-card"><div className="stat-label">Avg Rate/Mile</div><div className="stat-value" style={{color:'#F5A623'}}>$3.82</div><div className="stat-change">Industry avg: $3.24</div></div>
          <div className="stat-card"><div className="stat-label">YTD Revenue</div><div className="stat-value" style={{color:'#4ECDC4'}}>$48,320</div><div className="stat-change">On pace $193K/yr</div></div>
        </div>
        <div className="card">
          <div className="section-hdr"><div className="section-title">Load Ledger — 2026</div></div>
          <table className="data-table">
            <thead><tr><th>Date</th><th>Load #</th><th>Route</th><th>Broker</th><th>Miles</th><th className="text-right">Amount</th><th>$/mi</th></tr></thead>
            <tbody>
              {[
                ['Apr 10','A-4821','Chicago → Dallas','Echo Global','921','$3,200','$3.47'],
                ['Apr 08','A-4819','Memphis → Atlanta','CH Robinson','393','$2,750','$6.99'],
                ['Apr 05','A-4815','Dallas → Phoenix','Coyote Logistics','1,065','$4,100','$3.85'],
                ['Apr 02','A-4810','Houston → Chicago','Total Quality','1,092','$3,890','$3.56'],
                ['Mar 29','A-4807','Nashville → Denver','Spot Market','1,381','$5,200','$3.76'],
              ].map(([d,load,route,broker,miles,amt,rate])=>(
                <tr key={load}><td style={{color:'var(--text3)',fontSize:11,fontFamily:'DM Mono,monospace'}}>{d}</td><td><span className="tag tag-income">{load}</span></td><td>{route}</td><td>{broker}</td><td style={{fontFamily:'DM Mono,monospace',fontSize:11}}>{miles}</td><td className="amount-pos text-right">{amt}</td><td style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'var(--text3)'}}>{rate}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function TruckExpenses({ onModal }) {
  return (
    <>
      <div className="topbar"><div className="page-title">Expenses</div><div className="topbar-right"><button className="btn btn-primary" onClick={() => onModal('addEntry')}>+ Log Expense</button></div></div>
      <div className="content">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-label">Fuel</div><div className="stat-value" style={{color:'#F5A623'}}>$9,480</div><div className="stat-change">48% of expenses</div></div>
          <div className="stat-card"><div className="stat-label">Insurance</div><div className="stat-value" style={{color:'#4A90E2'}}>$4,320</div><div className="stat-change">22% of expenses</div></div>
          <div className="stat-card"><div className="stat-label">Repairs</div><div className="stat-value" style={{color:'#E74C3C'}}>$2,160</div><div className="stat-change">11% of expenses</div></div>
          <div className="stat-card"><div className="stat-label">Deductible Total</div><div className="stat-value" style={{color:'#2ECC71'}}>$14,200</div><div className="stat-change">72% are deductible</div></div>
        </div>
        <div className="card">
          <div className="section-hdr"><div className="section-title">Expense Ledger</div></div>
          <table className="data-table">
            <thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Vendor</th><th>Deductible</th><th className="text-right">Amount</th></tr></thead>
            <tbody>
              {[
                ['Apr 09','Fuel — Flying J Amarillo','Fuel','fuel','Flying J','100%','-$480'],
                ['Apr 07','Rear axle tire set','Repair','repair','TA Truck Service','100%','-$840'],
                ['Apr 06','I-40 Oklahoma tolls','Tolls','parts','OTA EZTag','100%','-$62'],
                ['Apr 05','Overnight — Super 8 Flagstaff','Lodging','income','Super 8','100%','-$89'],
                ['Apr 01','Commercial insurance Q2','Insurance','repair','Progressive Comm.','100%','-$1,440'],
              ].map(([d,desc,cat,type,vendor,ded,amt])=>(
                <tr key={d+desc}><td style={{color:'var(--text3)',fontSize:11,fontFamily:'DM Mono,monospace'}}>{d}</td><td>{desc}</td><td><span className={`tag tag-${type}`}>{cat}</span></td><td>{vendor}</td><td><span className="tag tag-deduct">{ded}</span></td><td className="amount-neg text-right">{amt}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function TruckMileage({ onModal }) {
  return (
    <>
      <div className="topbar"><div className="page-title">Mileage Log</div><div className="topbar-right"><button className="btn btn-ghost">Import GPS</button><button className="btn btn-primary" onClick={() => onModal('addMile')}>+ Log Trip</button></div></div>
      <div className="content">
        <div className="mile-stats">
          <div className="mile-stat"><div className="mile-val" style={{color:'#4ECDC4'}}>38,420</div><div className="mile-lbl">Business Miles YTD</div></div>
          <div className="mile-stat"><div className="mile-val" style={{color:'#2ECC71'}}>$25,741</div><div className="mile-lbl">Deduction @ $0.67/mi</div></div>
          <div className="mile-stat"><div className="mile-val" style={{color:'#4A90E2'}}>1,280</div><div className="mile-lbl">Trips Logged</div></div>
        </div>
        <div className="two-col">
          <div className="card">
            <div className="section-title" style={{marginBottom:12}}>IRS Mileage Deduction</div>
            <TaxBlock rows={[
              {label:'IRS Rate (2026)',value:'$0.67/mile'},
              {label:'Business Miles',value:'38,420 mi'},
              {label:'Personal Miles',value:'2,840 mi'},
              {label:'Total Deduction',value:'$25,741',color:'#2ECC71',total:true},
            ]} />
            <div style={{fontSize:10,color:'var(--text3)',marginTop:8}}>Based on IRS Publication 463. Actual expenses method may yield higher deductions for diesel trucks.</div>
          </div>
          <div className="card">
            <div className="section-title" style={{marginBottom:12}}>Miles by Month</div>
            <SingleBarChart data={[8200,7400,9100,9820,3900]} color="#4ECDC4" height={90} />
          </div>
        </div>
        <div className="card">
          <div className="section-hdr"><div className="section-title">Trip Log</div></div>
          <table className="data-table">
            <thead><tr><th>Date</th><th>From</th><th>To</th><th>Purpose</th><th>Miles</th><th className="text-right">Deduction</th></tr></thead>
            <tbody>
              {[['Apr 10','Chicago, IL','Dallas, TX','Load #A-4821','921','$617.07'],['Apr 08','Memphis, TN','Atlanta, GA','Load #A-4819','393','$263.31'],['Apr 05','Dallas, TX','Phoenix, AZ','Load #A-4815','1,065','$713.55'],['Apr 02','Houston, TX','Chicago, IL','Load #A-4810','1,092','$731.64']].map(([d,fr,to,pur,mi,ded])=>(
                <tr key={d+fr}><td style={{color:'var(--text3)',fontSize:11,fontFamily:'DM Mono,monospace'}}>{d}</td><td>{fr}</td><td>{to}</td><td>{pur}</td><td style={{fontFamily:'DM Mono,monospace',fontSize:11}}>{mi}</td><td className="amount-pos text-right">{ded}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function TruckTax() {
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
              <div className="section-title" style={{marginBottom:12}}>Income & Deductions</div>
              <TaxBlock rows={[
                {label:'Gross Revenue',value:'$48,320'},
                {label:'Deductible Expenses',value:'-$14,200'},
                {label:'Mileage Deduction',value:'-$25,741'},
                {label:'Section 179 Depreciation',value:'-$8,000'},
                {label:'Net Taxable Income',value:'$379',total:true},
              ]} />
            </div>
            <div className="card">
              <div className="section-title" style={{marginBottom:12}}>Tax Calculation</div>
              <TaxBlock rows={[
                {label:'SE Tax (15.3%)',value:'$7,392'},
                {label:'SE Deduction (50%)',value:'-$3,696'},
                {label:'Federal Income Tax (22%)',value:'$1,168'},
                {label:'Q2 Payment Due',value:'$4,864',color:'#E74C3C',total:true},
              ]} />
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div className="card">
              <div className="section-title" style={{marginBottom:12}}>Payment Schedule</div>
              <SchRow label="Q1 — Apr 15, 2026" sub="Jan 1 – Mar 31" status="PAID $4,200" statusColor="#2ECC71" borderColor="#2ECC71" />
              <SchRow label="Q2 — Jun 16, 2026" sub="Apr 1 – May 31" status="DUE $4,864" statusColor="#F5A623" borderColor="#F5A623" />
              <SchRow label="Q3 — Sep 15, 2026" status="EST $4,200" statusColor="var(--text3)" borderColor="var(--border)" />
              <SchRow label="Filing — Jan 15, 2027" status="EST $4,800" statusColor="var(--text3)" borderColor="var(--border)" />
            </div>
            <div className="card">
              <div className="section-title" style={{marginBottom:10}}>Trucker Deductions Checklist</div>
              {['Per diem meals ($69/day away)','DOT physical & medical card','Fuel, tolls, truck maintenance','ELD, logbook, CB radio','Section 179 truck depreciation','Health insurance (self-employed)'].map(d=>(
                <div key={d} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 0',borderBottom:'1px solid var(--border)',fontSize:12}}>
                  <span style={{color:'#2ECC71',fontSize:13}}>✓</span>{d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TruckReports() {
  return (
    <>
      <div className="topbar"><div className="page-title">Reports</div><div className="topbar-right"><button className="btn btn-ghost">Export CSV</button><button className="btn btn-primary">Download PDF</button></div></div>
      <div className="content">
        <div className="three-col">
          {[['📊','Profit & Loss','Full income & expense summary'],['🏛️','Schedule C Prep','Organized for your CPA'],['🛣️','Mileage Report','IRS-compliant log export'],['🚛','Load Summary','All loads, routes & rates'],['💰','Expense Report','All expenses by category'],['📅','Quarterly Summary','Q1-Q4 comparison']].map(([icon,title,desc])=>(
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
