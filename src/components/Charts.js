import React from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
const WEEKS  = ['W1', 'W2', 'W3', 'W4', 'W5'];

export function DualBarChart({ data1, data2, color1, color2, labels = MONTHS, height = 110 }) {
  const max = Math.max(...data1, ...data2, 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height }}>
      {labels.map((lbl, i) => {
        const h1 = Math.round((data1[i] / max) * 100);
        const h2 = Math.round((data2[i] / max) * 100);
        return (
          <div key={lbl} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: height - 20, width: '100%' }}>
              <div style={{ flex: 1, height: `${h1}%`, background: color1, borderRadius: '3px 3px 0 0', minHeight: 3 }} />
              <div style={{ flex: 1, height: `${h2}%`, background: color2, borderRadius: '3px 3px 0 0', minHeight: 3 }} />
            </div>
            <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'DM Mono, monospace' }}>{lbl}</div>
          </div>
        );
      })}
    </div>
  );
}

export function SingleBarChart({ data, color, labels = MONTHS, height = 90 }) {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height }}>
      {labels.map((lbl, i) => (
        <div key={lbl} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ width: '100%', height: `${Math.round((data[i] / max) * 100)}%`, background: color, borderRadius: '3px 3px 0 0', minHeight: 3 }} />
          <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'DM Mono, monospace' }}>{lbl}</div>
        </div>
      ))}
    </div>
  );
}

export function TriBarChart({ d1, d2, d3, c1, c2, c3, labels = WEEKS, height = 110 }) {
  const max = Math.max(...d1, ...d2, ...d3, 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height }}>
      {labels.map((lbl, i) => (
        <div key={lbl} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ display: 'flex', gap: 1, alignItems: 'flex-end', height: height - 20, width: '100%' }}>
            <div style={{ flex: 1, height: `${Math.round((d1[i] / max) * 100)}%`, background: c1, borderRadius: '3px 3px 0 0', minHeight: 3 }} />
            <div style={{ flex: 1, height: `${Math.round((d2[i] / max) * 100)}%`, background: c2, borderRadius: '3px 3px 0 0', minHeight: 3 }} />
            <div style={{ flex: 1, height: `${Math.round((d3[i] / max) * 100)}%`, background: c3, borderRadius: '3px 3px 0 0', minHeight: 3 }} />
          </div>
          <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'DM Mono, monospace' }}>{lbl}</div>
        </div>
      ))}
    </div>
  );
}

export function DonutChart({ segments, total, label }) {
  // segments: [{value, color}]
  const circumference = 2 * Math.PI * 36;
  const sum = segments.reduce((a, s) => a + s.value, 0);
  let offset = 0;
  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="36" fill="none" stroke="var(--bg3)" strokeWidth="14" />
        {segments.map((seg, i) => {
          const dash = (seg.value / sum) * circumference;
          const el = (
            <circle key={i} cx="50" cy="50" r="36" fill="none"
              stroke={seg.color} strokeWidth="14"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      <div className="donut-center">
        <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Syne, sans-serif' }}>{total}</div>
        <div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, fontFamily: 'DM Mono, monospace' }}>{label}</div>
      </div>
    </div>
  );
}

export function StatCard({ label, value, valueColor, change, changeUp }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={{ color: valueColor }}>{value}</div>
      {change && (
        <div className="stat-change">
          {changeUp !== undefined && <span style={{ color: changeUp ? 'var(--green)' : 'var(--red)' }}>{changeUp ? '↑' : '↑'} </span>}
          {change}
        </div>
      )}
    </div>
  );
}

export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-title">{title}</div>
        {children}
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onClose}>Save</button>
        </div>
      </div>
    </div>
  );
}

export function TaxBlock({ rows }) {
  return (
    <div className="tax-block">
      {rows.map((row, i) => (
        <div key={i} className={`tax-row${row.total ? ' total' : ''}`}>
          <span className="key">{row.label}</span>
          <span className="val" style={row.color ? { color: row.color } : {}}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}

export function ProgBar({ label, value, max, color, displayValue }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="prog-wrap">
      <div className="prog-top">
        <span style={{ color: 'var(--text2)', fontSize: 11 }}>{label}</span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color }}>{displayValue}</span>
      </div>
      <div className="prog-track">
        <div className="prog-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export function Alert({ children, type = 'warn' }) {
  const cls = type === 'red' ? 'alert alert-red' : type === 'green' ? 'alert alert-green' : 'alert';
  return <div className={cls}><span style={{ flexShrink: 0 }}>{type === 'red' ? '⚠' : type === 'green' ? '✓' : '⚠'}</span><span>{children}</span></div>;
}

export function SchRow({ label, sub, status, statusColor, borderColor }) {
  return (
    <div className="sch-row" style={{ borderLeft: `3px solid ${borderColor}` }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontSize: 10, color: 'var(--text3)' }}>{sub}</div>}
      </div>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: statusColor }}>{status}</div>
    </div>
  );
}
