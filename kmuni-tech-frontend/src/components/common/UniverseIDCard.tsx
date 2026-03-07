import React, { useRef, useCallback } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { ShieldCheck, Download, BookOpen, Code2, GraduationCap, Settings2, Briefcase, FileText, Award } from 'lucide-react';

interface Props {
  id: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: string;
  avatarUrl?: string;
}

function uvId(id: string, createdAt: string): string {
  const year = createdAt ? new Date(createdAt).getFullYear() : new Date().getFullYear();
  // Use last 4 hex chars of id as numeric seed
  const seed = parseInt(id.replace(/-/g, '').slice(-4), 16) % 9000 + 1000;
  return `UV-${year}-${seed}`;
}

function roleConfig(role: string) {
  if (role === 'instructor')
    return { label: 'Instructor', Icon: GraduationCap, color: 'from-green-500 to-teal-500' };
  if (role === 'admin')
    return { label: 'Platform Admin', Icon: Settings2, color: 'from-orange-500 to-red-500' };
  return { label: 'Student Developer', Icon: Code2, color: 'from-blue-500 to-blue-600' };
}

export default function UniverseIDCard({ id, name, role, createdAt, avatarUrl }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cfg = roleConfig(role);
  const uid = uvId(id, createdAt);
  const profileUrl = `${window.location.origin}/profile/${id}`;

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `UniVerse-ID-${name.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Card download failed', e);
    }
  }, [name]);

  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex flex-col items-center gap-4">
      {/* ── Card ── */}
      <div
        ref={cardRef}
        className="relative w-[420px] rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/30 select-none"
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-400 to-green-400" />
        {/* Sparkle accents */}
        <div className="absolute top-6 right-8 text-white/20 text-4xl leading-none">✦</div>
        <div className="absolute bottom-14 left-6 text-white/10 text-2xl leading-none">✦</div>
        <div className="absolute top-24 right-20 text-white/15 text-xl leading-none">✦</div>

        {/* ── Header ── */}
        <div className="relative bg-white/95 backdrop-blur-sm px-5 py-3.5 flex items-center gap-3 border-b border-blue-100">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-400/30">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <div className="flex items-baseline gap-0.5 leading-none">
              <span className="text-blue-500 font-black text-2xl tracking-tight">Uni</span>
              <span className="text-green-500 font-black text-2xl tracking-tight">Verse</span>
            </div>
            <p className="text-slate-400 text-[11px] font-medium tracking-widest uppercase mt-0.5">
              Unified Learning Ecosystem
            </p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="relative px-5 pt-5 pb-0">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-[76px] h-[76px] rounded-full border-[3px] border-white shadow-xl shadow-black/30 overflow-hidden bg-gradient-to-br from-blue-600 to-green-500 flex items-center justify-center">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-2xl font-black">{initials}</span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pt-1">
              <h2 className="text-white font-black text-xl leading-tight truncate drop-shadow-md">
                {name}
              </h2>
              <p className="text-white/80 font-mono text-sm font-semibold mt-0.5">{uid}</p>
              <div className="flex items-center gap-1.5 mt-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 w-fit">
                <ShieldCheck size={13} className="text-white" />
                <span className="text-white text-xs font-semibold">
                  Verified Member of{' '}
                  <span className="font-black text-white">UniVerse</span>
                </span>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex-shrink-0 bg-white rounded-xl p-1.5 shadow-lg shadow-black/20">
              <QRCodeCanvas
                value={profileUrl}
                size={72}
                bgColor="#ffffff"
                fgColor="#1e3a5f"
                level="M"
                includeMargin={false}
              />
            </div>
          </div>

          {/* ── Role badge ── */}
          <div className="mt-4 flex items-center gap-2">
            <div
              className={`flex items-center gap-2 bg-gradient-to-r ${cfg.color} text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md`}
            >
              <cfg.Icon size={14} />
              {cfg.label}
            </div>
          </div>

          {/* ── Bottom chips ── */}
          <div className="mt-3 pb-4 flex items-center gap-4 border-t border-white/20 pt-3">
            <div className="flex items-center gap-1.5 text-white/90 text-xs font-semibold">
              <Briefcase size={13} className="text-blue-100" />
              Skills
            </div>
            <div className="flex items-center gap-1.5 text-white/90 text-xs font-semibold">
              <FileText size={13} className="text-blue-100" />
              Portfolio
            </div>
            <div className="flex items-center gap-1.5 text-white/90 text-xs font-semibold">
              <Award size={13} className="text-blue-100" />
              Certificates
            </div>
          </div>
        </div>
      </div>

      {/* ── Download button ── */}
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
      >
        <Download size={15} />
        Download ID Card
      </button>
    </div>
  );
}
