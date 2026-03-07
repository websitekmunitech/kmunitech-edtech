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
  if (!createdAt) return '-';
  const d = new Date(createdAt);
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function roleConfig(role: string) {
  if (role === 'instructor') return { label: 'Instructor',       icon: '🎓', bar: '#16a34a', canvasLabel: 'Instructor' };
  if (role === 'admin')      return { label: 'Platform Admin',  icon: '⚙️', bar: '#ea580c', canvasLabel: 'Platform Admin' };
  return                            { label: 'Student Developer', icon: '💻', bar: '#2563eb', canvasLabel: 'Student Developer' };
}

/** Draw a rounded rectangle path */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/** Wrap text and return lines */
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const w of words) {
    const test = current ? `${current} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = w;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export default function UniverseIDCard({ id, name, role, createdAt, avatarUrl }: Props) {
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const cfg    = roleConfig(role);
  const uid    = uvId(id, createdAt);
  const since  = memberSince(createdAt);
  const profileUrl = `${window.location.origin}/profile/${id}`;

  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     Draw the card directly onto a 2D canvas so the
     downloaded PNG looks exactly like the preview.
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const buildCanvas = useCallback(async (): Promise<HTMLCanvasElement> => {
    const S  = 3;           // super-sample factor
    const CW = 500 * S;     // canvas pixel width
    const CH = 300 * S;     // canvas pixel height

    const cvs = document.createElement('canvas');
    cvs.width  = CW;
    cvs.height = CH;
    const ctx  = cvs.getContext('2d')!;
    ctx.scale(S, S);        // draw in logical 500Ã—300 coords

    const W = 500, H = 300;

    // â”€â”€ 1. Rounded clip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    roundRect(ctx, 0, 0, W, H, 22);
    ctx.clip();

    // â”€â”€ 2. Background gradient â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0,    '#1a3fc9');
    bg.addColorStop(0.30, '#2563eb');
    bg.addColorStop(0.72, '#059669');
    bg.addColorStop(1,    '#064e3b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // â”€â”€ 3. Dot mesh overlay â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    ctx.save();
    ctx.globalAlpha = 0.08;
    for (let x = 2; x < W; x += 30)
      for (let y = 2; y < H; y += 30) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
      }
    ctx.restore();

    // â”€â”€ 4. Glow orbs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const orb1 = ctx.createRadialGradient(W + 30, -30, 0, W + 30, -30, 200);
    orb1.addColorStop(0, 'rgba(134,239,172,0.28)');
    orb1.addColorStop(1, 'transparent');
    ctx.fillStyle = orb1;
    ctx.fillRect(0, 0, W, H);

    const orb2 = ctx.createRadialGradient(-20, H + 40, 0, -20, H + 40, 220);
    orb2.addColorStop(0, 'rgba(96,165,250,0.22)');
    orb2.addColorStop(1, 'transparent');
    ctx.fillStyle = orb2;
    ctx.fillRect(0, 0, W, H);

    // â”€â”€ 5. Holographic top strip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const holo = ctx.createLinearGradient(0, 0, W, 0);
    holo.addColorStop(0,    '#60a5fa');
    holo.addColorStop(0.25, '#34d399');
    holo.addColorStop(0.5,  '#a78bfa');
    holo.addColorStop(0.75, '#f472b6');
    holo.addColorStop(1,    '#60a5fa');
    ctx.fillStyle = holo;
    ctx.fillRect(0, 0, W, 5);

    // â”€â”€ 6. White header bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const HEADER_H = 58;
    ctx.fillStyle = 'rgba(255,255,255,0.97)';
    ctx.fillRect(0, 5, W, HEADER_H);

    // Header bottom border
    ctx.strokeStyle = 'rgba(219,234,254,0.9)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 5 + HEADER_H);
    ctx.lineTo(W, 5 + HEADER_H);
    ctx.stroke();

    // Logo icon circle
    const logoGrad = ctx.createLinearGradient(16, 14, 52, 54);
    logoGrad.addColorStop(0, '#2563eb');
    logoGrad.addColorStop(1, '#16a34a');
    roundRect(ctx, 16, 14, 38, 38, 10);
    ctx.fillStyle = logoGrad;
    ctx.fill();

    // Book icon (white, inside logo)
    ctx.save();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1.8;
    ctx.lineJoin = 'round';
    ctx.lineCap  = 'round';
    // Left page
    ctx.beginPath();
    ctx.moveTo(22, 22); ctx.lineTo(22, 45);
    ctx.lineTo(35, 45); ctx.lineTo(35, 22);
    ctx.quadraticCurveTo(28, 19, 22, 22);
    ctx.stroke();
    // Right page
    ctx.beginPath();
    ctx.moveTo(35, 22); ctx.lineTo(35, 45);
    ctx.lineTo(48, 45); ctx.lineTo(48, 22);
    ctx.quadraticCurveTo(41, 19, 35, 22);
    ctx.stroke();
    ctx.restore();

    // "UniVerse" text in header
    ctx.font = 'bold 22px Inter, Segoe UI, system-ui, sans-serif';
    ctx.fillStyle = '#2563eb';
    ctx.fillText('Uni', 62, 40);
    const uniW = ctx.measureText('Uni').width;
    ctx.fillStyle = '#16a34a';
    ctx.fillText('Verse', 62 + uniW, 40);

    // Subtitle
    ctx.font = '600 9px Inter, Segoe UI, system-ui, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('UNIFIED LEARNING ECOSYSTEM', 62, 53);

    // UID right-aligned in header
    ctx.textAlign = 'right';
    ctx.font = '700 8px Inter, Segoe UI, system-ui, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('MEMBER ID', W - 14, 34);
    ctx.font = '800 11px "Courier New", monospace';
    ctx.fillStyle = '#1e3a5f';
    ctx.fillText(uid, W - 14, 50);
    ctx.textAlign = 'left';

    // â”€â”€ 7. Body area â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const BODY_TOP = 5 + HEADER_H + 16;   // ~79

    // Avatar circle
    const AX = 24, AY = BODY_TOP, AR = 42;  // center: (AX+AR, AY+AR)
    const CX = AX + AR, CY = AY + AR;
    ctx.save();
    ctx.beginPath();
    ctx.arc(CX, CY, AR, 0, Math.PI * 2);
    ctx.clip();
    const avGrad = ctx.createLinearGradient(CX - AR, CY - AR, CX + AR, CY + AR);
    avGrad.addColorStop(0, '#1d4ed8');
    avGrad.addColorStop(1, '#15803d');
    ctx.fillStyle = avGrad;
    ctx.fill();
    // Initials
    ctx.font = `900 ${AR * 0.75}px Inter, Segoe UI, system-ui, sans-serif`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, CX, CY + 1);
    ctx.restore();

    // Avatar border ring
    ctx.beginPath();
    ctx.arc(CX, CY, AR + 2, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.90)';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';

    // Text column
    const TX = AX + AR * 2 + 14;   // ~112
    const TEXT_MAX = W - TX - 112;  // leave room for QR

    // Name
    ctx.font = '900 20px Inter, Segoe UI, system-ui, sans-serif';
    ctx.fillStyle = 'white';
    const nameLines = wrapText(ctx, name, TEXT_MAX);
    nameLines.slice(0, 2).forEach((line, i) => ctx.fillText(line, TX, BODY_TOP + 18 + i * 24));

    // Verified badge
    const BADGE_Y = BODY_TOP + 30;
    const badgeText = 'Verified Member of UniVerse';
    ctx.font = '700 10px Inter, Segoe UI, system-ui, sans-serif';
    const bW = ctx.measureText(badgeText).width + 20;
    roundRect(ctx, TX, BADGE_Y, bW, 20, 10);
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.32)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.fillText(badgeText, TX + 10, BADGE_Y + 13.5);

    // Role badge — use only plain ASCII text so canvas renders it reliably
    const ROLE_Y = BADGE_Y + 30;
    const roleLabel = cfg.canvasLabel;
    ctx.font = '800 13px Inter, Segoe UI, system-ui, sans-serif';
    const labelW = ctx.measureText(roleLabel).width;
    const rW = labelW + 36; // padding + dot indicator
    roundRect(ctx, TX, ROLE_Y, rW, 26, 13);
    ctx.fillStyle = cfg.bar;
    ctx.fill();
    // White dot indicator
    ctx.beginPath();
    ctx.arc(TX + 14, ROLE_Y + 13, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.fill();
    // Label text
    ctx.fillStyle = 'white';
    ctx.fillText(roleLabel, TX + 24, ROLE_Y + 17.5);

    // Member since
    ctx.font = '600 10px Inter, Segoe UI, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.60)';
    ctx.fillText('MEMBER SINCE', TX, ROLE_Y + 42);
    const msW = ctx.measureText('MEMBER SINCE ').width;
    ctx.font = '800 10px Inter, Segoe UI, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.fillText(since, TX + msW, ROLE_Y + 42);

    // â”€â”€ 8. QR code â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const qrCanvas = qrContainerRef.current?.querySelector('canvas');
    if (qrCanvas) {
      const QS = 84, QX = W - QS - 16, QY = BODY_TOP - 2;
      // White box behind QR
      roundRect(ctx, QX - 8, QY - 8, QS + 16, QS + 16, 12);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.65)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.drawImage(qrCanvas, QX, QY, QS, QS);
      // "Scan Profile" label
      ctx.font = '700 8px Inter, Segoe UI, system-ui, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.textAlign = 'center';
      ctx.fillText('SCAN PROFILE', QX + QS / 2, QY + QS + 22);
      ctx.textAlign = 'left';
    }

    // â”€â”€ 9. Bottom strip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const STRIP_Y = H - 34;
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(16, STRIP_Y); ctx.lineTo(W - 16, STRIP_Y);
    ctx.stroke();

    const chips = ['Skills', 'Portfolio', 'Certificates'];
    let chipX = 20;
    ctx.font = '700 11px Inter, Segoe UI, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    chips.forEach(chip => {
      ctx.fillText(chip, chipX, STRIP_Y + 18);
      chipX += ctx.measureText(chip).width + 22;
    });

    // Watermark
    ctx.textAlign = 'right';
    ctx.font = '600 9px Inter, Segoe UI, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.38)';
    ctx.fillText('universe.app', W - 16, STRIP_Y + 18);
    ctx.textAlign = 'left';

    return cvs;
  }, [uid, since, cfg, initials, name]);

  const handleDownload = useCallback(async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const cvs = await buildCanvas();
      const link = document.createElement('a');
      link.download = `UniVerse-ID-${name.replace(/\s+/g, '-')}.png`;
      link.href = cvs.toDataURL('image/png', 1.0);
      link.click();
    } catch (e) {
      console.error('Card download failed', e);
    } finally {
      setDownloading(false);
    }
  }, [buildCanvas, name, downloading]);

  /* â”€â”€ Preview card (Tailwind / inline for screen only) â”€â”€ */
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

      {/* Hidden QR canvas so we can copy it into the download canvas */}
      <div ref={qrContainerRef} style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}>
        <QRCodeCanvas value={profileUrl} size={120} bgColor="#ffffff" fgColor="#1e3a5f" level="M" />
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• VISUAL PREVIEW â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div style={{
        position: 'relative', width: 500, height: 300, borderRadius: 22, overflow: 'hidden',
        boxShadow: '0 28px 72px rgba(37,99,235,0.45), 0 8px 24px rgba(0,0,0,0.45)',
        userSelect: 'none', fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
      }}>
        {/* BG */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,#1a3fc9 0%,#2563eb 28%,#059669 72%,#064e3b 100%)' }} />
        {/* Dot mesh */}
        <div style={{ position:'absolute', inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Ccircle cx='2' cy='2' r='1.2' fill='rgba(255,255,255,0.08)'/%3E%3C/svg%3E")` }} />
        {/* Glow orbs */}
        <div style={{ position:'absolute', top:-70, right:-70, width:240, height:240, borderRadius:'50%', background:'radial-gradient(circle,rgba(134,239,172,0.28) 0%,transparent 70%)' }} />
        <div style={{ position:'absolute', bottom:-90, left:-50, width:260, height:260, borderRadius:'50%', background:'radial-gradient(circle,rgba(96,165,250,0.22) 0%,transparent 70%)' }} />
        {/* Holo strip */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:5, background:'linear-gradient(90deg,#60a5fa 0%,#34d399 25%,#a78bfa 50%,#f472b6 75%,#60a5fa 100%)' }} />
        {/* Sparkles */}
        {[{top:22,right:148,size:18,o:0.22},{top:60,right:96,size:11,o:0.16},{bottom:40,left:26,size:14,o:0.18}].map((s,i)=>(
          <div key={i} style={{ position:'absolute', top:s.top, bottom:(s as any).bottom, right:(s as any).right, left:(s as any).left, color:`rgba(255,255,255,${s.o})`, fontSize:s.size, lineHeight:1 }}>✦</div>
        ))}

        {/* Header */}
        <div style={{ position:'relative', background:'rgba(255,255,255,0.97)', padding:'10px 18px', display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid rgba(219,234,254,.9)', marginTop:5 }}>
          <div style={{ width:38, height:38, borderRadius:11, flexShrink:0, background:'linear-gradient(135deg,#2563eb,#16a34a)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 14px rgba(37,99,235,.4)' }}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          </div>
          <div>
            <div style={{ display:'flex', alignItems:'baseline', gap:1, lineHeight:1 }}>
              <span style={{ color:'#2563eb', fontWeight:900, fontSize:22, letterSpacing:-.5 }}>Uni</span>
              <span style={{ color:'#16a34a', fontWeight:900, fontSize:22, letterSpacing:-.5 }}>Verse</span>
            </div>
            <div style={{ color:'#94a3b8', fontSize:9, fontWeight:600, letterSpacing:2, textTransform:'uppercase', marginTop:2 }}>Unified Learning Ecosystem</div>
          </div>
          <div style={{ marginLeft:'auto', textAlign:'right' }}>
            <div style={{ color:'#94a3b8', fontSize:8, fontWeight:700, letterSpacing:2, textTransform:'uppercase' }}>Member ID</div>
            <div style={{ color:'#1e3a5f', fontSize:12, fontWeight:800, fontFamily:'monospace', letterSpacing:1 }}>{uid}</div>
          </div>
        </div>

        {/* Body */}
        <div style={{ position:'relative', padding:'14px 18px 10px' }}>
          <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
            {/* Avatar */}
            <div style={{ flexShrink:0, width:84, height:84, borderRadius:'50%', border:'3.5px solid rgba(255,255,255,.92)', boxShadow:'0 8px 28px rgba(0,0,0,.38)', overflow:'hidden', background:'linear-gradient(135deg,#1d4ed8,#15803d)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              {avatarUrl
                ? <img src={avatarUrl} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                : <span style={{ color:'white', fontSize:30, fontWeight:900 }}>{initials}</span>}
            </div>
            {/* Info */}
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ color:'white', fontWeight:900, fontSize:20, textShadow:'0 2px 10px rgba(0,0,0,.32)', lineHeight:1.2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{name}</div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:5, background:'rgba(255,255,255,.18)', border:'1px solid rgba(255,255,255,.32)', borderRadius:20, padding:'4px 11px', marginTop:7 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                <span style={{ color:'white', fontSize:10, fontWeight:700 }}>Verified Member of <strong>UniVerse</strong></span>
              </div>
              <div style={{ marginTop:9 }}>
                <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:cfg.bar, borderRadius:20, padding:'5px 15px', boxShadow:`0 4px 16px ${cfg.bar}70` }}>
                  <span style={{ fontSize:13 }}>{cfg.icon}</span>
                  <span style={{ color:'white', fontSize:12, fontWeight:800 }}>{cfg.label}</span>
                </div>
              </div>
              <div style={{ marginTop:8, color:'rgba(255,255,255,.60)', fontSize:10, fontWeight:600, letterSpacing:.5 }}>
                MEMBER SINCE&nbsp;&nbsp;<span style={{ color:'rgba(255,255,255,.92)', fontWeight:800 }}>{since}</span>
              </div>
            </div>
            {/* QR */}
            <div style={{ flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
              <div style={{ background:'white', borderRadius:14, padding:8, boxShadow:'0 8px 28px rgba(0,0,0,.28)', border:'2px solid rgba(255,255,255,.65)' }}>
                <QRCodeCanvas value={profileUrl} size={80} bgColor="#ffffff" fgColor="#1e3a5f" level="M" includeMargin={false}/>
              </div>
              <span style={{ color:'rgba(255,255,255,.55)', fontSize:8, fontWeight:700, letterSpacing:1.2, textTransform:'uppercase' }}>Scan Profile</span>
            </div>
          </div>
          {/* Bottom strip */}
          <div style={{ marginTop:12, paddingTop:10, borderTop:'1px solid rgba(255,255,255,.18)', display:'flex', alignItems:'center', gap:20 }}>
            {[['🧠','Skills'],['📁','Portfolio'],['🏆','Certificates']].map(([icon,label])=>(
              <div key={label} style={{ display:'flex', alignItems:'center', gap:6, color:'rgba(255,255,255,.88)', fontSize:11, fontWeight:700 }}>
                <span style={{ fontSize:13 }}>{icon}</span>{label}
              </div>
            ))}
            <div style={{ marginLeft:'auto', color:'rgba(255,255,255,.38)', fontSize:9, fontWeight:600 }}>universe.app</div>
          </div>
        </div>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        style={{
          display:'flex', alignItems:'center', gap:8,
          background: downloading ? '#334155' : 'linear-gradient(135deg,#2563eb,#16a34a)',
          color:'white', border:'none', cursor: downloading ? 'wait' : 'pointer',
          padding:'10px 24px', borderRadius:12, fontSize:13.5, fontWeight:700,
          boxShadow:'0 6px 20px rgba(37,99,235,.38)', opacity: downloading ? .7 : 1,
          fontFamily:"'Inter',system-ui,sans-serif", transition:'all .2s',
        }}
      >
        {downloading ? (
          <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation:'uv-spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Generating...</>
        ) : (
          <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download ID Card</>
        )}
      </button>

      <style>{`@keyframes uv-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
