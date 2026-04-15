import React, { useState } from 'react';
import './index.css';
import LandingPage from './pages/LandingPage';
import TruckApp from './pages/TruckApp';
import ShopApp from './pages/ShopApp';
import GigApp from './pages/GigApp';
import AIAssistant from './components/AIAssistant';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'truck' | 'shop' | 'gig'

  const enterApp = (type) => setView(type);

  if (view === 'landing') {
    return <LandingPage onEnter={enterApp} />;
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Profile switcher bar */}
      <div style={{
        background: '#0A0C11', borderBottom: '1px solid #1E2230',
        padding: '0 24px', display: 'flex', alignItems: 'center', gap: 0,
        position: 'sticky', top: 0, zIndex: 200
      }}>
        <div
          style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 15, marginRight: 24, padding: '11px 0', cursor: 'pointer', color: '#F0F2F7' }}
          onClick={() => setView('landing')}
        >
          Account<span style={{ color: view === 'gig' ? '#00C896' : view === 'shop' ? '#E84855' : '#F5A623' }}>iple</span>
        </div>
        {[
          { id: 'truck', label: '🚛 Truck Driver', badge: 'Owner-Op', badgeColor: '#F5A623' },
          { id: 'shop',  label: '🔧 Auto Repair',  badge: 'Business',  badgeColor: '#E84855' },
          { id: 'gig',   label: '🛵 Gig Driver',   badge: 'Freelance', badgeColor: '#00C896' },
        ].map(tab => (
          <div
            key={tab.id}
            onClick={() => setView(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '11px 20px', cursor: 'pointer', fontSize: 13,
              color: view === tab.id ? '#F0F2F7' : '#626B88',
              borderBottom: `2px solid ${view === tab.id ? tab.badgeColor : 'transparent'}`,
              transition: 'all 0.15s', fontWeight: 500, whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
            <span style={{
              display: 'inline-block', padding: '2px 7px', borderRadius: 12,
              fontSize: 10, fontWeight: 700, background: `${tab.badgeColor}22`, color: tab.badgeColor
            }}>{tab.badge}</span>
          </div>
        ))}
      </div>

      {view === 'truck' && <TruckApp />}
      {view === 'shop'  && <ShopApp />}
      {view === 'gig'   && <GigApp />}

      <AIAssistant variant={view} />
    </div>
  );
}
