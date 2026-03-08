import React, { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Award, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { buildProgressFromCompletions, getUnlockedCertificatesFromProgress } from '../../utils/selfLearnProgress';
import { fetchSelfLearnChapterCompletions, type SelfLearnChapterCompletionDTO } from '../../utils/api';

function formatMonthYear(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString(undefined, { month: 'long', year: 'numeric' });
}

export default function StudentCertificates() {
  const { user, token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [completions, setCompletions] = useState<SelfLearnChapterCompletionDTO[]>([]);

  useEffect(() => {
    setError('');
    setCompletions([]);

    if (!token) return;

    let mounted = true;
    setLoading(true);
    fetchSelfLearnChapterCompletions(token)
      .then((rows) => {
        if (!mounted) return;
        setCompletions(rows);
      })
      .catch((e: any) => {
        if (!mounted) return;
        setError(e?.message || 'Failed to load certificates');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [token]);

  const certs = useMemo(() => {
    const progress = buildProgressFromCompletions(completions);
    const unlocked = getUnlockedCertificatesFromProgress(progress).map((c) => ({
      id: c.id,
      course: c.title,
      issuedAt: c.issuedAt,
      date: formatMonthYear(c.issuedAt),
      grade: 'Completed',
      hours: 3,
    }));
    return unlocked;
  }, [completions]);

  function openCertificatePrintWindow(cert: { course: string; issuedAt: string }) {
    const name = (user?.name || 'Student').toString();
    const issued = formatMonthYear(cert.issuedAt);

    const w = window.open('', '_blank', 'noopener,noreferrer,width=960,height=720');
    if (!w) return;

    const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Certificate</title>
    <style>
      html, body { margin: 0; padding: 0; background: #fff; color: #0b1220; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif; }
      .page { padding: 48px; }
      .sheet { border: 2px solid #0b1220; padding: 40px; border-radius: 16px; }
      .kicker { font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.75; }
      h1 { margin: 14px 0 0; font-size: 40px; }
      .subtitle { margin: 10px 0 0; font-size: 16px; opacity: 0.8; }
      .name { margin: 26px 0 0; font-size: 30px; font-weight: 800; }
      .course { margin: 10px 0 0; font-size: 18px; }
      .meta { margin-top: 32px; display: flex; justify-content: space-between; gap: 24px; font-size: 14px; opacity: 0.8; }
      .line { margin-top: 10px; height: 1px; background: #0b1220; opacity: 0.2; }
      @media print {
        .page { padding: 0; }
        .sheet { border-radius: 0; border: 0; }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="sheet">
        <div class="kicker">KM UniVerse • Self-Learn</div>
        <h1>Certificate of Completion</h1>
        <div class="subtitle">This certifies that</div>
        <div class="name">${escapeHtml(name)}</div>
        <div class="subtitle">has successfully completed</div>
        <div class="course"><strong>${escapeHtml(cert.course)}</strong></div>
        <div class="line"></div>
        <div class="meta">
          <div>Issued: <strong>${escapeHtml(issued)}</strong></div>
          <div>Issued by: <strong>KM UniVerse</strong></div>
        </div>
      </div>
    </div>

    <script>
      window.onload = () => { setTimeout(() => window.print(), 50); };
    </script>
  </body>
</html>`;

    w.document.open();
    w.document.write(html);
    w.document.close();
  }

  function escapeHtml(input: string) {
    return input
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  return (
    <DashboardLayout>
      <div className="mb-8"><h1 className="text-2xl font-bold text-white">Certificates</h1><p className="text-slate-400 mt-1">Your earned certificates of completion</p></div>
      {loading ? <p className="text-slate-400">Loading…</p> : null}
      {error ? <p className="text-red-400 font-semibold">{error}</p> : null}
      {certs.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-5">
          {certs.map(cert => (
            <div key={cert.id} className="card p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center"><Award size={22} className="text-white" /></div>
                <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">Completed</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{cert.course}</h3>
              <div className="flex items-center gap-4 text-sm text-slate-400 mb-5">
                <span>Issued: {cert.date}</span>
                <span>{cert.hours}h course</span>
                <span>Grade: <strong className="text-emerald-400">{cert.grade}</strong></span>
              </div>
              <button
                type="button"
                onClick={() => openCertificatePrintWindow({ course: cert.course, issuedAt: cert.issuedAt })}
                className="btn-secondary text-sm flex items-center gap-2 py-2.5"
              >
                <Download size={14} /> Download PDF
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card p-16 text-center">
          <Award size={48} className="text-slate-600 mx-auto mb-4" />
          <p className="text-white font-semibold text-xl mb-2">No certificates yet</p>
          <p className="text-slate-400 mb-6">Complete a course to earn your first certificate</p>
          <a href="/courses" className="btn-primary inline-flex">Browse Courses</a>
        </div>
      )}
    </DashboardLayout>
  );
}
