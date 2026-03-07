import React, { useRef, useCallback, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface Props {
  id: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: string;
  avatarUrl?: string;
}

function uvId(id: string, createdAt: string): string {
  const year = createdAt ? new Date(createdAt).getFullYear() : new Date().getFullYear();
  const seed = parseInt(id.replace(/-/g, '').slice(-4), 16) % 9000 + 1000;
  return `UV-${year}-${seed}`;
}

function memberSince(createdAt: string): string {
  if (!createdAt) return '—';
  const d = new Date(createdAt);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function roleConfig(role: string) {
  if (role === 'instructor') return { label: 'Instructor', icon: '🎓', bar: '#16a34a' };
  if (role === 'admin') return { label: 'Platform Admin', icon: '⚙️', bar: '#ea580c' };
  return { label: 'Student Developer', icon: '</>', bar: '#2563eb' };
}

/* ─── Dot-mesh SVG pattern used as background overlay ─── */
const meshPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Ccircle cx='2' cy='2' r='1.2' fill='rgba(255,255,255,0.08)'/%3E%3C/svg%3E")`;

export default function UniverseIDCard({ id, name, role, createdAt, avatarUrl }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const cfg = roleConfig(role);
  const uid = uvId(id, createdAt);
  const since = memberSince(createdAt);
  const profileUrl = `${window.location.origin}/profile/${id}`;

  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  const handleDownload = useCallback(async () => {
    if (!cardRef.current || downloading) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(cardRef.current, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        removeContainer: true,
      });
      const link = document.createElement('a');
      link.download = `UniVerse-ID-${name.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (e) {
      console.error('Card download failed', e);
    } finally {
      setDownloading(false);
    }
  }, [name, downloading]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

      {/* ════════════════════ CARD 500×300 px ════════════════════ */}
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          width: 500,
          height: 300,
          borderRadius: 24,
          overflow: 'hidden',
          fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
          boxShadow: '0 28px 72px rgba(37,99,235,0.45), 0 8px 24px rgba(0,0,0,0.45)',
          userSelect: 'none',
        }}
      >
        {/* Background gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg,#1a3fc9 0%,#2563eb 28%,#059669 72%,#064e3b 100%)',
        }} />

        {/* Dot-mesh overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: meshPattern }} />

        {/* Soft glow orbs */}
        <div style={{
          position: 'absolute', top: -70, right: -70,
          width: 240, height: 240, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(134,239,172,0.28) 0%,transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: -90, left: -50,
          width: 260, height: 260, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(96,165,250,0.22) 0%,transparent 70%)',
        }} />

        {/* Holographic rainbow strip */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 5,
          background: 'linear-gradient(90deg,#60a5fa 0%,#34d399 25%,#a78bfa 50%,#f472b6 75%,#60a5fa 100%)',
          opacity: 0.95,
        }} />

        {/* Sparkles */}
        {([
          { top: 22,  right: 145, size: 20, opacity: 0.22 },
          { top: 58,  right: 94,  size: 12, opacity: 0.16 },
          { bottom: 38,  left: 26,  size: 15, opacity: 0.18 },
          { top: 108, right: 218, size: 10, opacity: 0.14 },
        ] as const).map((s, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: 'top' in s ? s.top : undefined,
            bottom: 'bottom' in s ? s.bottom : undefined,
            right: 'right' in s ? s.right : undefined,
            left: 'left' in s ? s.left : undefined,
            color: `rgba(255,255,255,${s.opacity})`,
            fontSize: s.size, lineHeight: 1, pointerEvents: 'none',
          }}>✦</div>
        ))}

        {/* ══════ HEADER ══════ */}
        <div style={{
          position: 'relative',
          background: 'rgba(255,255,255,0.97)',
          padding: '10px 18px',
          display: 'flex', alignItems: 'center', gap: 12,
          borderBottom: '1px solid rgba(219,234,254,0.9)',
        }}>
          {/* Logo circle */}
          <div style={{
            width: 38, height: 38, borderRadius: 11, flexShrink: 0,
            background: 'linear-gradient(135deg,#2563eb,#16a34a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(37,99,235,0.40)',
          }}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          </div>

          {/* Brand name */}
          <div>
            <div style={{ display:'flex', alignItems:'baseline', gap: 1, lineHeight: 1 }}>
              <span style={{ color:'#2563eb', fontWeight:900, fontSize:22, letterSpacing:-0.5 }}>Uni</span>
              <span style={{ color:'#16a34a', fontWeight:900, fontSize:22, letterSpacing:-0.5 }}>Verse</span>
            </div>
            <div style={{ color:'#94a3b8', fontSize:9, fontWeight:600, letterSpacing:2.2, textTransform:'uppercase', marginTop:2 }}>
              Unified Learning Ecosystem
            </div>
          </div>

          {/* UID right side */}
          <div style={{ marginLeft:'auto', textAlign:'right' }}>
            <div style={{ color:'#94a3b8', fontSize:8, fontWeight:700, letterSpacing:2, textTransform:'uppercase' }}>Member ID</div>
            <div style={{ color:'#1e3a5f', fontSize:12, fontWeight:800, fontFamily:'monospace', letterSpacing:1 }}>{uid}</div>
          </div>
        </div>

        {/* ══════ BODY ══════ */}
        <div style={{ position:'relative', padding:'16px 18px 12px' }}>
          <div style={{ display:'flex', alignItems:'flex-start', gap: 16 }}>

            {/* Avatar */}
            <div style={{ flexShrink:0 }}>
              <div style={{
                width: 84, height: 84, borderRadius:'50%',
                border:'3.5px solid rgba(255,255,255,0.92)',
                boxShadow:'0 8px 28px rgba(0,0,0,0.38)',
                overflow:'hidden',
                background:'linear-gradient(135deg,#1d4ed8,#15803d)',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                {avatarUrl
                  ? <img src={avatarUrl} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  : <span style={{ color:'white', fontSize:30, fontWeight:900 }}>{initials}</span>
                }
              </div>
            </div>

            {/* Info column */}
            <div style={{ flex:1, minWidth:0 }}>
              {/* Name */}
              <div style={{
                color:'white', fontWeight:900, fontSize:20,
                textShadow:'0 2px 10px rgba(0,0,0,0.32)',
                lineHeight:1.2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
              }}>{name}</div>

              {/* Verified pill */}
              <div style={{
                display:'inline-flex', alignItems:'center', gap:5,
                background:'rgba(255,255,255,0.18)',
                border:'1px solid rgba(255,255,255,0.32)',
                borderRadius:20, padding:'4px 11px', marginTop:8,
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
                <span style={{ color:'white', fontSize:10, fontWeight:700 }}>
                  Verified Member of <strong>UniVerse</strong>
                </span>
              </div>

              {/* Role badge */}
              <div style={{ marginTop:10 }}>
                <div style={{
                  display:'inline-flex', alignItems:'center', gap:7,
                  background: cfg.bar,
                  borderRadius:20, padding:'5px 15px',
                  boxShadow:`0 4px 16px ${cfg.bar}70`,
                }}>
                  <span style={{ fontSize:13 }}>{cfg.icon}</span>
                  <span style={{ color:'white', fontSize:12, fontWeight:800, letterSpacing:0.3 }}>{cfg.label}</span>
                </div>
              </div>

              {/* Member since */}
              <div style={{ marginTop:9, color:'rgba(255,255,255,0.60)', fontSize:10, fontWeight:600, letterSpacing:0.5 }}>
                MEMBER SINCE&nbsp;&nbsp;
                <span style={{ color:'rgba(255,255,255,0.92)', fontWeight:800 }}>{since}</span>
              </div>
            </div>

            {/* QR code */}
            <div style={{ flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
              <div style={{
                background:'white', borderRadius:14, padding:8,
                boxShadow:'0 8px 28px rgba(0,0,0,0.28)',
                border:'2px solid rgba(255,255,255,0.65)',
              }}>
                <QRCodeCanvas
                  value={profileUrl}
                  size={80}
                  bgColor="#ffffff"
                  fgColor="#1e3a5f"
                  level="M"
                  includeMargin={false}
                />
              </div>
              <span style={{ color:'rgba(255,255,255,0.55)', fontSize:8, fontWeight:700, letterSpacing:1.2, textTransform:'uppercase' }}>
                Scan Profile
              </span>
            </div>
          </div>

          {/* Bottom strip */}
          <div style={{
            marginTop:13,
            paddingTop:12,
            borderTop:'1px solid rgba(255,255,255,0.18)',
            display:'flex', alignItems:'center', gap:22,
          }}>
            {[['🧰','Skills'],['📁','Portfolio'],['🏆','Certificates']].map(([icon,label]) => (
              <div key={label} style={{
                display:'flex', alignItems:'center', gap:6,
                color:'rgba(255,255,255,0.88)', fontSize:11, fontWeight:700,
              }}>
                <span style={{ fontSize:13 }}>{icon}</span>{label}
              </div>
            ))}
            <div style={{ marginLeft:'auto', color:'rgba(255,255,255,0.38)', fontSize:9, fontWeight:600, letterSpacing:0.5 }}>
              universe.app
            </div>
          </div>
        </div>
      </div>

      {/* ── Download button ── */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        style={{
          display:'flex', alignItems:'center', gap:8,
          background: downloading ? '#334155' : 'linear-gradient(135deg,#2563eb,#16a34a)',
          color:'white', border:'none', cursor: downloading ? 'wait' : 'pointer',
          padding:'10px 24px', borderRadius:12, fontSize:13.5, fontWeight:700,
          boxShadow:'0 6px 20px rgba(37,99,235,0.38)',
          transition:'all 0.2s',
          fontFamily:"'Inter',system-ui,sans-serif",
          opacity: downloading ? 0.7 : 1,
        }}
      >
        {downloading ? (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ animation:'spin 1s linear infinite' }}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            Generating…
          </>
        ) : (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download ID Card
          </>
        )}
      </button>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
