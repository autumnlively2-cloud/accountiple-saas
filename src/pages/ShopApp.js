import React, { useState } from 'react';
import { DualBarChart, Modal, TaxBlock, ProgBar, Alert, SchRow } from '../components/Charts';

const NAV = [
  { id: 'dashboard',  label: 'Dashboard',       icon: '◼', section: 'Shop' },
  { id: 'workorders', label: 'Work Orders',      icon: '🔧', badge: '4', section: null },
  { id: 'invoices',   label: 'Invoices',         icon: '📄', section: null },
  { id: 'inventory',  label: 'Parts Inventory',  icon: '📦', section: null },
  { id: 'income',     label: 'Revenue',          icon: '↑',  section: 'Finance' },
  { id: 'expenses',   label: 'Expenses',         icon: '↓',  section: null },
  { id: 'tax',        label: 'Tax Estimator',    icon: '%',  badge: 'Q2', section: null },
  { id: 'reports',    label: 'Reports',          icon: '≡',  section: null },
];

export default function ShopApp() {
  const [page, setPage] = useState('dashboard');
  const [modal, setModal] = useState(null);

  return (
    <div className="app-shell" style={{ height: 'calc(100vh - 41px)' }}>
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-name">Rivera Auto Repair</div>
          <div className="sidebar-logo-sub">LLC · Longview, TX</div>
        </div>
        <div className="sidebar-user">
          <div className="avatar" style={{ background: 'linear-gradient(135deg,#E84855,#c73040)' }}>MR</div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 500 }}>Maria Rivera</div>
            <div style={{ fontSize: 10, color: 'var(--text3)' }}>Shop Owner</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {NAV.map(n => (
            <React.Fragment key={n.id}>
              {n.section && <div className="nav-section">{n.section}</div>}
              <div className={`nav-item${page === n.id ? ' active' : ''}`} onClick={() => setPage(n.id)} style={page===n.id?{color:'#E84855',borderLeftColor:'#E84855'}:{}}>
                <span>{n.icon}</span> {n.label}
                {n.badge && <span className="nav-badge" style={{background:'#E84855'}}>{n.badge}</span>}
              </div>
            </React.Fragment>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="tax-widget">
            <div className="tax-widget-label">Est. Q2 Tax Due</div>
            <div className="tax-widget-amount" style={{ color: '#E84855' }}>$6,120</div>
            <div className="tax-widget-date">Jun 16, 2026 deadline</div>
          </div>
        </div>
      </aside>

      <main className="main">
        {page === 'dashboard'  && <ShopDashboard onModal={setModal} />}
        {page === 'workorders' && <ShopWorkOrders onModal={setModal} />}
        {page === 'invoices'   && <ShopInvoices onModal={setModal} />}
        {page === 'inventory'  && <ShopInventory onModal={setModal} />}
        {page === 'income'     && <ShopRevenue />}
        {page === 'expenses'   && <ShopExpenses />}
        {page === 'tax'        && <ShopTax />}
        {page === 'reports'    && <ShopReports />}

        <Modal open={modal === 'wo'} onClose={() => setModal(null)} title="New Work Order">
          <div className="form-row">
            <div className="form-group"><label className="form-label">Customer Name</label><input className="form-input" placeholder="Full name" /></div>
            <div className="form-group"><label className="form-label">Phone</label><input className="form-input" placeholder="(xxx) xxx-xxxx" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Year</label><input className="form-input" placeholder="2024" /></div>
            <div className="form-group"><label className="form-label">Make & Model</label><input className="form-input" placeholder="Ford F-150" /></div>
          </div>
          <div className="form-group"><label className="form-label">Service Requested</label><input className="form-input" placeholder="Describe the repair..." /></div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Assign Tech</label><select className="form-select"><option>MK — Miguel K.</option><option>JR — Juan R.</option><option>AT — Andre T.</option></select></div>
            <div className="form-group"><label className="form-label">Est. Hours</label><input className="form-input" type="number" placeholder="0.0" /></div>
          </div>
        </Modal>
        <Modal open={modal === 'inv'} onClose={() => setModal(null)} title="New Invoice">
          <div className="form-row">
            <div className="form-group"><label className="form-label">Work Order #</label><select className="form-select"><option>RO-2841</option><option>RO-2840</option></select></div>
            <div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date" defaultValue="2026-04-14" /></div>
          </div>
          <div className="form-group"><label className="form-label">Labor Total ($)</label><input className="form-input" type="number" placeholder="0.00" /></div>
          <div className="form-group"><label className="form-label">Parts Total ($)</label><input className="form-input" type="number" placeholder="0.00" /></div>
          <div className="form-group"><label className="form-label">Payment Method</label><select className="form-select"><option>Cash</option><option>Card</option><option>Check</option><option>Pending</option></select></div>
        </Modal>
        <Modal open={modal === 'part'} onClose={() => setModal(null)} title="Add Part to Inventory">
          <div className="form-row">
            <div className="form-group"><label className="form-label">Part #</label><input className="form-input" placeholder="e.g. BRK-442" /></div>
            <div className="form-group"><label className="form-label">Quantity</label><input className="form-input" type="number" placeholder="0" /></div>
          </div>
          <div className="form-group"><label className="form-label">Description</label><input className="form-input" placeholder="Part name / description" /></div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Cost ($)</label><input className="form-input" type="number" placeholder="0.00" /></div>
            <div className="form-group"><label className="form-label">Sell Price ($)</label><input className="form-input" type="number" placeholder="0.00" /></div>
          </div>
          <div className="form-group"><label className="form-label">Reorder At (qty)</label><input className="form-input" type="number" placeholder="5" /></div>
        </Modal>
      </main>
    </div>
  );
}

function ShopDashboard({ onModal }) {
  return (
    <>
      <div className="topbar">
        <div className="page-title">Shop Dashboard</div>
        <div className="topbar-right">
          <span className="type-badge" style={{color:'#E84855',borderColor:'rgba(232,72,85,0.2)',background:'rgba(232,72,85,0.1)'}}>🔧 Auto Repair Shop</span>
          <button className="btn btn-primary" style={{background:'#E84855'}} onClick={() => onModal('wo')}>+ New Work Order</button>
        </div>
      </div>
      <div className="content">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-label">Revenue MTD</div><div className="stat-value" style={{color:'#2ECC71'}}>$22,480</div><div className="stat-change"><span style={{color:'#2ECC71'}}>↑ 14%</span> vs March</div></div>
          <div className="stat-card"><div className="stat-label">Open Work Orders</div><div className="stat-value" style={{color:'#E84855'}}>4</div><div className="stat-change">2 in progress</div></div>
          <div className="stat-card"><div className="stat-label">Parts Cost MTD</div><div className="stat-value" style={{color:'#F5A623'}}>$8,340</div><div className="stat-change">37% of revenue</div></div>
          <div className="stat-card"><div className="stat-label">Labor Revenue</div><div className="stat-value" style={{color:'#9B59B6'}}>$14,140</div><div className="stat-change">63% of revenue</div></div>
        </div>
        <div className="main-side">
          <div className="card">
            <div className="section-hdr"><div className="section-title">Revenue vs Expenses — 2026</div></div>
            <DualBarChart data1={[18400,19200,22100,22480,0]} data2={[13200,14100,16800,17340,0]} color1="#2ECC71" color2="#E84855" />
            <div style={{display:'flex',gap:14,marginTop:8}}>
              <div style={{display:'flex',alignItems:'center',gap:5,fontSize:10,color:'var(--text3)'}}><div style={{width:8,height:8,borderRadius:2,background:'#2ECC71'}}/>Revenue</div>
              <div style={{display:'flex',alignItems:'center',gap:5,fontSize:10,color:'var(--text3)'}}><div style={{width:8,height:8,borderRadius:2,background:'#E84855'}}/>Expenses</div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div className="card">
              <div className="section-title" style={{marginBottom:12}}>Revenue Mix</div>
              <ProgBar label="Labor" value={63} max={100} color="#9B59B6" displayValue="63%" />
              <ProgBar label="Parts Markup" value={25} max={100} color="#F5A623" displayValue="25%" />
              <ProgBar label="Diagnostics" value={8} max={100} color="#4A90E2" displayValue="8%" />
              <ProgBar label="Oil Changes" value={4} max={100} color="#4ECDC4" displayValue="4%" />
            </div>
            <div className="card">
              <div className="section-title" style={{marginBottom:10}}>Today's Bay Status</div>
              {[
                ['Bay 1 — 2019 F-150','In Progress','progress'],
                ['Bay 2 — 2021 Camry','Waiting Parts','waiting'],
                ['Bay 3 — 2017 Silverado','Estimate Only','open'],
                ['Bay 4','Available',null],
              ].map(([bay,status,type])=>(
                <div key={bay} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 10px',background:'var(--bg3)',borderRadius:7,marginBottom:6}}>
                  <span style={{fontSize:12}}>{bay}</span>
                  {type ? <span className={`tag tag-${type}`}>{status}</span> : <span style={{fontSize:11,color:'var(--text3)'}}>{status}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="section-hdr"><div className="section-title">Recent Work Orders</div></div>
          <table className="data-table">
            <thead><tr><th>RO #</th><th>Vehicle</th><th>Customer</th><th>Service</th><th>Tech</th><th>Status</th><th className="text-right">Total</th></tr></thead>
            <tbody>
              {[
                ['RO-2841','2019 Ford F-150','D. Thompson','Transmission service','MK','progress','$1,240'],
                ['RO-2840','2021 Toyota Camry','L. Garcia','Brake pads & rotors','JR','waiting','$680'],
                ['RO-2839','2020 Honda Civic','P. Williams','AC recharge + diag','AT','done','$320'],
                ['RO-2838','2018 RAM 1500','C. Johnson','Oil change + tire rotation','SL','done','$89'],
              ].map(([ro,veh,cust,svc,tech,status,total])=>(
                <tr key={ro}><td style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'var(--text3)'}}>{ro}</td><td>{veh}</td><td>{cust}</td><td>{svc}</td><td><div style={{width:24,height:24,borderRadius:'50%',background:'#9B59B6',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'#fff'}}>{tech}</div></td><td><span className={`tag tag-${status}`}>{status==='progress'?'In Progress':status==='waiting'?'Waiting Parts':status==='done'?'Complete':status}</span></td><td className="amount-neu text-right">{total}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function ShopWorkOrders({ onModal }) {
  return (
    <>
      <div className="topbar"><div className="page-title">Work Orders</div><div className="topbar-right"><button className="btn btn-primary" style={{background:'#E84855'}} onClick={() => onModal('wo')}>+ New Work Order</button></div></div>
      <div className="content">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-label">Open</div><div className="stat-value" style={{color:'#4A90E2'}}>4</div></div>
          <div className="stat-card"><div className="stat-label">In Progress</div><div className="stat-value" style={{color:'#F5A623'}}>2</div></div>
          <div className="stat-card"><div className="stat-label">Waiting Parts</div><div className="stat-value" style={{color:'#9B59B6'}}>1</div></div>
          <div className="stat-card"><div className="stat-label">Completed Today</div><div className="stat-value" style={{color:'#2ECC71'}}>3</div></div>
        </div>
        <div className="card">
          <div className="section-hdr"><div className="section-title">Active Work Orders</div></div>
          {[
            {ro:'RO-2841',veh:'2019 Ford F-150 4WD',cust:'D. Thompson',phone:'(903) 555-0182',svc:'Transmission flush + filter',hrs:'3.5',parts:'$420',labor:'$820',tech:'MK',status:'progress'},
            {ro:'RO-2840',veh:'2021 Toyota Camry',cust:'L. Garcia',phone:'(903) 555-0241',svc:'Brake pads + rotors (all 4)',hrs:'2.0',parts:'$280',labor:'$400',tech:'JR',status:'waiting'},
            {ro:'RO-2837',veh:'2017 Chevrolet Silverado',cust:'R. Martinez',phone:'(903) 555-0399',svc:'Engine light diag · knock sensor',hrs:'TBD',parts:'TBD',labor:'$120 diag',tech:'AT',status:'open'},
          ].map(wo => (
            <div key={wo.ro} style={{background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:10,padding:14,marginBottom:10,cursor:'pointer'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <div>
                  <div style={{fontSize:13,fontWeight:600}}>{wo.ro} — {wo.veh}</div>
                  <div style={{fontSize:11,color:'var(--text3)',marginTop:2}}>{wo.cust} · {wo.phone}</div>
                </div>
                <span className={`tag tag-${wo.status}`}>{wo.status==='progress'?'In Progress':wo.status==='waiting'?'Waiting Parts':'Estimate Pending'}</span>
              </div>
              <div style={{marginTop:10,display:'flex',gap:20,fontSize:11,color:'var(--text2)',flexWrap:'wrap'}}>
                <span>🔧 {wo.svc}</span><span>⏱ Est. {wo.hrs} hrs</span><span>💰 Parts: {wo.parts} | Labor: {wo.labor}</span><span>Tech: {wo.tech}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ShopInvoices({ onModal }) {
  return (
    <>
      <div className="topbar"><div className="page-title">Invoices</div><div className="topbar-right"><button className="btn btn-primary" style={{background:'#E84855'}} onClick={() => onModal('inv')}>+ New Invoice</button></div></div>
      <div className="content">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-label">Total Invoiced MTD</div><div className="stat-value" style={{color:'#2ECC71'}}>$22,480</div></div>
          <div className="stat-card"><div className="stat-label">Paid</div><div className="stat-value" style={{color:'#2ECC71'}}>$18,340</div><div className="stat-change">82% collection rate</div></div>
          <div className="stat-card"><div className="stat-label">Outstanding</div><div className="stat-value" style={{color:'#F5A623'}}>$3,140</div><div className="stat-change">3 invoices pending</div></div>
          <div className="stat-card"><div className="stat-label">Overdue 30+ Days</div><div className="stat-value" style={{color:'#E74C3C'}}>$1,000</div><div className="stat-change">1 invoice</div></div>
        </div>
        <div className="card">
          <div className="section-hdr"><div className="section-title">Invoice Ledger</div></div>
          <table className="data-table">
            <thead><tr><th>Invoice</th><th>Customer</th><th>Vehicle</th><th>Date</th><th>Status</th><th className="text-right">Amount</th></tr></thead>
            <tbody>
              {[
                ['#INV-1094','D. Thompson','2019 F-150','Apr 10','pending','$1,240'],
                ['#INV-1093','P. Williams','2020 Civic','Apr 09','paid','$320'],
                ['#INV-1092','C. Johnson','2018 RAM 1500','Apr 08','paid','$89'],
                ['#INV-1088','B. Wilson','2016 Accord','Mar 14','overdue','$1,000'],
              ].map(([inv,cust,veh,date,status,amt])=>(
                <tr key={inv}><td style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'var(--text3)'}}>{inv}</td><td>{cust}</td><td>{veh}</td><td style={{fontSize:11,color:'var(--text3)'}}>{date}</td><td><span className={`tag tag-${status}`}>{status.charAt(0).toUpperCase()+status.slice(1)}</span></td><td className={`text-right ${status==='paid'?'amount-pos':status==='overdue'?'amount-neg':'amount-neu'}`}>{amt}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function ShopInventory({ onModal }) {
  return (
    <>
      <div className="topbar"><div className="page-title">Parts Inventory</div><div className="topbar-right"><button className="btn btn-primary" style={{background:'#E84855'}} onClick={() => onModal('part')}>+ Add Part</button></div></div>
      <div className="content">
        <Alert type="red">⚠ &nbsp;3 parts are <strong>below reorder threshold</strong>. Order soon to avoid bay delays.</Alert>
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-label">Total SKUs</div><div className="stat-value" style={{color:'#4A90E2'}}>284</div></div>
          <div className="stat-card"><div className="stat-label">Inventory Value</div><div className="stat-value" style={{color:'#2ECC71'}}>$14,820</div></div>
          <div className="stat-card"><div className="stat-label">Low Stock Items</div><div className="stat-value" style={{color:'#E74C3C'}}>3</div></div>
          <div className="stat-card"><div className="stat-label">Parts Cost MTD</div><div className="stat-value" style={{color:'#F5A623'}}>$8,340</div></div>
        </div>
        <div className="card">
          <div className="section-hdr"><div className="section-title">Parts List</div></div>
          <table className="data-table">
            <thead><tr><th>Part #</th><th>Description</th><th>Category</th><th>In Stock</th><th>Reorder At</th><th>Cost</th><th className="text-right">Sell Price</th></tr></thead>
            <tbody>
              {[
                ['BRK-441','Ceramic Brake Pads (front)','Brakes','repair','12','5','$28','$59',false],
                ['OIL-5W30','Full Synthetic Oil 5W-30 (qt)','Fluids','parts','3 ⚠','20','$8','$18',true],
                ['FIL-AIR-22','Air Filter — Universal','Filters','parts','2 ⚠','8','$12','$29',true],
                ['SHK-KYB84','KYB Shock Absorbers (pair)','Suspension','repair','6','2','$74','$159',false],
                ['BAT-850CCA','AGM Battery 850 CCA','Electrical','income','1 ⚠','3','$95','$189',true],
              ].map(([pn,desc,cat,type,stock,reorder,cost,sell,low])=>(
                <tr key={pn}><td style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'var(--text3)'}}>{pn}</td><td>{desc}</td><td><span className={`tag tag-${type}`}>{cat}</span></td><td style={{fontFamily:'DM Mono,monospace',fontSize:11,color:low?'#E74C3C':undefined}}>{stock}</td><td style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'var(--text3)'}}>{reorder}</td><td style={{fontFamily:'DM Mono,monospace',fontSize:11}}>{cost}</td><td className="amount-neu text-right">{sell}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function ShopRevenue() {
  return (
    <>
      <div className="topbar"><div className="page-title">Revenue</div><div className="topbar-right"><button className="btn btn-primary" style={{background:'#E84855'}}>+ Log Payment</button></div></div>
      <div className="content">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-label">Labor Revenue</div><div className="stat-value" style={{color:'#9B59B6'}}>$14,140</div><div className="stat-change">63% of total</div></div>
          <div className="stat-card"><div className="stat-label">Parts Revenue</div><div className="stat-value" style={{color:'#F5A623'}}>$5,610</div><div className="stat-change">25% of total</div></div>
          <div className="stat-card"><div className="stat-label">Diagnostics</div><div className="stat-value" style={{color:'#4A90E2'}}>$1,800</div><div className="stat-change">8% of total</div></div>
          <div className="stat-card"><div className="stat-label">Avg RO Value</div><div className="stat-value" style={{color:'#2ECC71'}}>$482</div><div className="stat-change">47 ROs this month</div></div>
        </div>
        <div className="card">
          <div className="section-title" style={{marginBottom:14}}>Revenue by Service Type</div>
          <ProgBar label="Engine & Drivetrain" value={30} max={100} color="#9B59B6" displayValue="$6,840" />
          <ProgBar label="Brakes & Suspension" value={23} max={100} color="#E84855" displayValue="$5,200" />
          <ProgBar label="AC / Electrical / Diag" value={18} max={100} color="#4A90E2" displayValue="$4,100" />
          <ProgBar label="Oil Change / Routine" value={14} max={100} color="#4ECDC4" displayValue="$3,200" />
          <ProgBar label="Tires & Alignments" value={14} max={100} color="#F5A623" displayValue="$3,140" />
        </div>
      </div>
    </>
  );
}

function ShopExpenses() {
  return (
    <>
      <div className="topbar"><div className="page-title">Business Expenses</div><div className="topbar-right"><button className="btn btn-primary" style={{background:'#E84855'}}>+ Log Expense</button></div></div>
      <div className="content">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-label">Parts / COGS</div><div className="stat-value" style={{color:'#F5A623'}}>$8,340</div></div>
          <div className="stat-card"><div className="stat-label">Payroll</div><div className="stat-value" style={{color:'#E74C3C'}}>$6,200</div><div className="stat-change">2 technicians</div></div>
          <div className="stat-card"><div className="stat-label">Rent & Utilities</div><div className="stat-value" style={{color:'#4A90E2'}}>$2,800</div></div>
          <div className="stat-card"><div className="stat-label">Net Profit MTD</div><div className="stat-value" style={{color:'#2ECC71'}}>$5,140</div><div className="stat-change">22.9% margin</div></div>
        </div>
        <div className="card">
          <table className="data-table">
            <thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Deductible</th><th className="text-right">Amount</th></tr></thead>
            <tbody>
              {[
                ['Apr 10','Technician wages — week of Apr 7','Payroll','labor','100%','-$1,550'],
                ['Apr 09','Parts order — NAPA Longview','Parts COGS','parts','100%','-$2,140'],
                ['Apr 01','Bay rental — April 2026','Rent','repair','100%','-$2,200'],
                ['Apr 01','Business insurance — April','Insurance','repair','100%','-$380'],
                ['Apr 01','Lift inspection & maintenance','Equipment','parts','100%','-$320'],
              ].map(([d,desc,cat,type,ded,amt])=>(
                <tr key={d+desc}><td style={{color:'var(--text3)',fontSize:11,fontFamily:'DM Mono,monospace'}}>{d}</td><td>{desc}</td><td><span className={`tag tag-${type}`}>{cat}</span></td><td><span className="tag tag-deduct">{ded}</span></td><td className="amount-neg text-right">{amt}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function ShopTax() {
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
              <div className="section-title" style={{marginBottom:12}}>Business P&L Summary</div>
              <TaxBlock rows={[
                {label:'Total Revenue',value:'$62,800'},
                {label:'Cost of Goods (Parts)',value:'-$22,400'},
                {label:'Gross Profit',value:'$40,400'},
                {label:'Operating Expenses',value:'-$24,200'},
                {label:'Net Taxable Income',value:'$16,200',total:true},
              ]} />
            </div>
            <div className="card">
              <div className="section-title" style={{marginBottom:12}}>Tax Calculation (LLC)</div>
              <TaxBlock rows={[
                {label:'Federal Income Tax (22%)',value:'$3,564'},
                {label:'Self-Employment Tax',value:'$2,292'},
                {label:'Texas — No State Income Tax',value:'$0',color:'#2ECC71'},
                {label:'Q2 Estimated Payment',value:'$6,120',color:'#E84855',total:true},
              ]} />
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div className="card">
              <div className="section-title" style={{marginBottom:12}}>Payment Schedule</div>
              <SchRow label="Q1 — Apr 15, 2026" status="PAID $5,800" statusColor="#2ECC71" borderColor="#2ECC71" />
              <SchRow label="Q2 — Jun 16, 2026" status="DUE $6,120" statusColor="#E84855" borderColor="#E84855" />
              <SchRow label="Q3 — Sep 15, 2026" status="EST $5,900" statusColor="var(--text3)" borderColor="var(--border)" />
            </div>
            <div className="card">
              <div className="section-title" style={{marginBottom:10}}>Shop Deductions</div>
              {['Parts & COGS (100% deductible)','Technician wages & benefits','Rent, utilities, shop supplies','Equipment (lifts, tools, scanners)','Business insurance & liability','Marketing & software costs'].map(d=>(
                <div key={d} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 0',borderBottom:'1px solid var(--border)',fontSize:12}}>
                  <span style={{color:'#E84855',fontSize:13}}>✓</span>{d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ShopReports() {
  return (
    <>
      <div className="topbar"><div className="page-title">Reports</div><div className="topbar-right"><button className="btn btn-ghost">Export CSV</button><button className="btn btn-primary" style={{background:'#E84855'}}>Download PDF</button></div></div>
      <div className="content">
        <div className="three-col">
          {[['📊','Shop P&L','Revenue, COGS & net profit'],['🏛️','Schedule C','CPA-ready tax summary'],['📦','Inventory Report','Stock value & COGS'],['📄','Invoice Summary','Paid vs outstanding'],['👷','Technician Report','Labor hours & efficiency'],['📅','Monthly Comparison','Month-over-month trends']].map(([icon,title,desc])=>(
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
