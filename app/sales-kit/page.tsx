"use client";

/**
 * The sales kit: one public page holding everything the team sends to a prospect.
 *
 * Deliberately outside MainLayout and outside the auth context. Routes in this
 * app are gated per page rather than by middleware, so a page that simply does
 * not call useAuth is reachable without a login - which is the whole point,
 * because the people opening this are often on a phone between meetings and
 * some of them are not users of the product at all.
 *
 * Two kinds of asset sit here. The videos and the carousel live in Google Drive
 * and are embedded on demand; the two platform guides are served from this site
 * so they keep working if a Drive permission changes, which is the failure the
 * team would discover in front of a client.
 */

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";

type Kind = "video" | "deck" | "guide";

interface Asset {
  id: string;
  kind: Kind;
  title: string;
  blurb: string;
  /** What this is for, in the words somebody would use choosing it. */
  useWhen: string;
  minutes?: string;
  /** Google Drive file id, for the embedded player. */
  driveId?: string;
  /** Self-hosted paths, for the two guides. */
  readHref?: string;
  pdfHref?: string;
  /** Rough download weight, so nobody opens 6 MB on mobile data unawares. */
  weight?: string;
}

const ASSETS: Asset[] = [
  {
    id: "lms-demo",
    kind: "video",
    title: "LMS product demo",
    blurb:
      "The full walkthrough of the platform as a prospect would see it, cut down to the parts that land.",
    useWhen: "Send after a first call, or play it live if the connection is good.",
    driveId: "1B6ZijBOBN4x6m-oW1SMe-OhyGWWPXB1x",
  },
  {
    id: "education-reimagined",
    kind: "video",
    title: "Education, reimagined",
    blurb: "The short brand film. Positioning rather than product detail.",
    useWhen: "Opening a deck, or a cold introduction where the product is not the hook yet.",
    driveId: "1ZBM7oWuJXwWGlTyKltVACwcbuCSa0Wx8",
  },
  {
    id: "office-tour",
    kind: "video",
    title: "Office tour",
    blurb: "Who we are and where the work happens.",
    useWhen: "Credibility. Useful with clients who want to know the team is real.",
    driveId: "1arNkYg-amee8-O3wILe_XtwGKMP4khYL",
  },
  {
    id: "carousel",
    kind: "deck",
    title: "AI Linc carousel",
    blurb: "The slide carousel, final cut. Designed to be scrolled rather than presented.",
    useWhen: "Social, or a quick attachment when there is no time for a call.",
    driveId: "1fFdcjeutDQV3g38VurmPXnJ1_IrIFk6M",
  },
  {
    id: "end-to-end",
    kind: "guide",
    title: "AI Linc, end to end",
    blurb:
      "The product as a learner meets it: where they begin, inside a course, how practice is proved, and getting hired. Twelve sections, forty two screenshots of the live platform.",
    useWhen: "The one to send a client. It reads as a story rather than a feature list.",
    readHref: "/sales/ai-linc-end-to-end.html",
    pdfHref: "/sales/ai-linc-end-to-end.pdf",
    weight: "4 MB",
  },
  {
    id: "role-by-role",
    kind: "guide",
    title: "AI Linc, role by role",
    blurb:
      "Four workspaces and six roles, with every module shown from each one. Sixty eight screenshots, including the admin and super admin surfaces.",
    useWhen:
      "Deeper, and more internal in tone. Good for a technical buyer or for getting a new joiner up to speed.",
    readHref: "/sales/ai-linc-role-by-role.html",
    pdfHref: "/sales/ai-linc-role-by-role.pdf",
    weight: "7 MB",
  },
];

const LOOK: Record<Kind, { label: string; icon: string; accent: string }> = {
  video: { label: "Video", icon: "mdi:play-circle-outline", accent: "#be123c" },
  deck: { label: "Carousel", icon: "mdi:view-carousel-outline", accent: "#b45309" },
  guide: { label: "Guide", icon: "mdi:book-open-page-variant-outline", accent: "#4338ca" },
};

const driveView = (id: string) => `https://drive.google.com/file/d/${id}/view`;
const drivePreview = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

export default function SalesKitPage() {
  const [open, setOpen] = useState<Asset | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [origin, setOrigin] = useState("");

  useEffect(() => setOrigin(window.location.origin), []);

  // Internal material on a public URL should at least stay out of search.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    document.title = "AI Linc sales kit";
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  // Escape closes the viewer, and the page must not scroll behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const groups = useMemo(
    () => [
      { key: "guide" as Kind, heading: "Guides", note: "Hosted here, so they keep working." },
      { key: "video" as Kind, heading: "Videos", note: "Streamed from Drive." },
      { key: "deck" as Kind, heading: "Carousel", note: "" },
    ],
    [],
  );

  async function copy(asset: Asset) {
    const url = asset.driveId
      ? driveView(asset.driveId)
      : `${origin}${asset.readHref ?? ""}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(asset.id);
      setTimeout(() => setCopied((c) => (c === asset.id ? null : c)), 1800);
    } catch {
      window.prompt("Copy this link", url);
    }
  }

  return (
    <div className="kit">
      <style>{CSS}</style>

      <header className="hero">
        <div className="wrap">
          <div className="badge">
            <Icon icon="mdi:briefcase-outline" width={15} />
            <span>Internal sales kit</span>
          </div>
          <h1>Everything you send a prospect, in one place.</h1>
          <p className="sub">
            Six assets: two written guides, three videos and the carousel. Each one says what it is
            for, so you are picking rather than guessing.
          </p>
          <div className="meta">
            <span>
              <Icon icon="mdi:link-variant" width={14} /> Shareable links
            </span>
            <span>
              <Icon icon="mdi:cellphone" width={14} /> Works on a phone
            </span>
            <span>
              <Icon icon="mdi:lock-open-variant-outline" width={14} /> No login needed
            </span>
          </div>
        </div>
      </header>

      <main className="wrap body">
        {groups.map((g) => {
          const items = ASSETS.filter((a) => a.kind === g.key);
          if (!items.length) return null;
          return (
            <section key={g.key}>
              <div className="sechead">
                <h2>{g.heading}</h2>
                {g.note && <span>{g.note}</span>}
              </div>
              <div className="grid">
                {items.map((a) => {
                  const look = LOOK[a.kind];
                  return (
                    <article key={a.id} className="card" style={{ ["--accent" as string]: look.accent }}>
                      <div className="cardtop">
                        <span className="chip">
                          <Icon icon={look.icon} width={14} />
                          {look.label}
                        </span>
                        {a.weight && <span className="weight">{a.weight}</span>}
                      </div>
                      <h3>{a.title}</h3>
                      <p className="blurb">{a.blurb}</p>
                      <p className="usewhen">
                        <Icon icon="mdi:target" width={14} />
                        <span>{a.useWhen}</span>
                      </p>
                      <div className="actions">
                        {a.driveId && (
                          <button className="btn primary" onClick={() => setOpen(a)}>
                            <Icon icon={a.kind === "video" ? "mdi:play" : "mdi:book-open-variant"} width={16} />
                            {a.kind === "video" ? "Play" : "Open"}
                          </button>
                        )}
                        {a.readHref && (
                          <a className="btn primary" href={a.readHref} target="_blank" rel="noreferrer">
                            <Icon icon="mdi:book-open-variant" width={16} />
                            Read online
                          </a>
                        )}
                        {a.pdfHref && (
                          <a className="btn" href={a.pdfHref} target="_blank" rel="noreferrer">
                            <Icon icon="mdi:file-pdf-box" width={16} />
                            PDF
                          </a>
                        )}
                        {a.driveId && (
                          <a className="btn" href={driveView(a.driveId)} target="_blank" rel="noreferrer">
                            <Icon icon="mdi:google-drive" width={15} />
                            Drive
                          </a>
                        )}
                        <button className="btn ghost" onClick={() => copy(a)}>
                          <Icon icon={copied === a.id ? "mdi:check" : "mdi:link-variant"} width={15} />
                          {copied === a.id ? "Copied" : "Copy link"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section className="note">
          <Icon icon="mdi:information-outline" width={18} />
          <div>
            <strong>A note on the links.</strong> The two guides are served from this site, so they
            do not depend on a Drive permission staying as it is. The videos and the carousel are
            streamed from Drive: if one will not play for a prospect, the sharing setting on that
            file is the first thing to check.
          </div>
        </section>
      </main>

      {open && (
        <div className="viewer" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={open.title}>
          <div className="viewerinner" onClick={(e) => e.stopPropagation()}>
            <div className="viewerbar">
              <span>{open.title}</span>
              <div>
                <a href={driveView(open.driveId!)} target="_blank" rel="noreferrer" className="btn ghost sm">
                  <Icon icon="mdi:open-in-new" width={14} />
                  Open in Drive
                </a>
                <button className="btn ghost sm" onClick={() => setOpen(null)} aria-label="Close">
                  <Icon icon="mdi:close" width={16} />
                </button>
              </div>
            </div>
            {/* Loaded only on open, so six iframes never start at once. */}
            <iframe src={drivePreview(open.driveId!)} title={open.title} allow="autoplay" allowFullScreen />
          </div>
        </div>
      )}
    </div>
  );
}

const CSS = `
.kit{--bg:#f6f7fb;--card:#ffffff;--line:#e5e7f0;--ink:#101322;--dim:#5b6076;
  min-height:100vh;background:var(--bg);color:var(--ink);
  font-family:var(--font-sans,system-ui,-apple-system,"Segoe UI",sans-serif);}
@media (prefers-color-scheme:dark){.kit{--bg:#0b0d16;--card:#141829;--line:#262c45;--ink:#eef0f8;--dim:#99a0bb;}}
.kit .wrap{max-width:1120px;margin:0 auto;padding:0 20px;}
.kit .hero{padding:56px 0 40px;background:
  radial-gradient(900px 380px at 12% -10%,rgba(124,58,237,.22),transparent 60%),
  radial-gradient(760px 340px at 92% 0%,rgba(14,165,233,.18),transparent 60%);
  border-bottom:1px solid var(--line);}
.kit .badge{display:inline-flex;align-items:center;gap:7px;padding:6px 13px;border-radius:999px;
  background:rgba(124,58,237,.12);color:#7c3aed;font-size:.73rem;font-weight:800;
  letter-spacing:.09em;text-transform:uppercase;}
@media (prefers-color-scheme:dark){.kit .badge{background:rgba(167,139,250,.16);color:#c4b5fd;}}
.kit h1{margin:16px 0 0;font-size:clamp(1.8rem,5.2vw,3rem);line-height:1.1;letter-spacing:-.025em;font-weight:800;}
.kit .sub{margin:14px 0 0;max-width:620px;font-size:clamp(.97rem,2.3vw,1.08rem);line-height:1.6;color:var(--dim);}
.kit .meta{display:flex;flex-wrap:wrap;gap:16px;margin-top:22px;font-size:.82rem;color:var(--dim);font-weight:600;}
.kit .meta span{display:inline-flex;align-items:center;gap:6px;}
.kit .body{padding:40px 20px 72px;}
.kit section{margin-bottom:40px;}
.kit .sechead{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:16px;}
.kit h2{margin:0;font-size:1.22rem;font-weight:800;letter-spacing:-.01em;}
.kit .sechead span{font-size:.84rem;color:var(--dim);}
.kit .grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));}
/* A section with one asset in it would otherwise stretch that card the full
   width of the page, which reads as a banner rather than as one more card
   in the same set. */
.kit .grid:has(> :only-child){grid-template-columns:minmax(300px,420px);}
.kit .card{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:20px;
  display:flex;flex-direction:column;position:relative;overflow:hidden;}
.kit .card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--accent);}
.kit .cardtop{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;}
.kit .chip{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;
  background:color-mix(in srgb,var(--accent) 13%,transparent);color:var(--accent);
  font-size:.68rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase;}
.kit .weight{font-size:.72rem;color:var(--dim);font-weight:700;}
.kit h3{margin:0 0 8px;font-size:1.1rem;font-weight:800;letter-spacing:-.01em;}
.kit .blurb{margin:0 0 12px;font-size:.92rem;line-height:1.55;color:var(--dim);}
.kit .usewhen{display:flex;gap:8px;margin:0 0 16px;padding:10px 12px;border-radius:11px;
  background:color-mix(in srgb,var(--accent) 7%,transparent);font-size:.86rem;line-height:1.5;}
.kit .usewhen svg{flex:0 0 auto;margin-top:3px;color:var(--accent);}
.kit .actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto;}
.kit .btn{display:inline-flex;align-items:center;gap:6px;padding:9px 14px;border-radius:10px;
  border:1px solid var(--line);background:transparent;color:var(--ink);font:inherit;
  font-size:.85rem;font-weight:700;cursor:pointer;text-decoration:none;}
.kit .btn:hover{background:color-mix(in srgb,var(--accent) 8%,transparent);border-color:var(--accent);}
.kit .btn.primary{background:var(--accent);border-color:var(--accent);color:#fff;}
.kit .btn.primary:hover{filter:brightness(1.08);}
.kit .btn.ghost{border-color:transparent;color:var(--dim);}
.kit .btn.sm{padding:6px 10px;font-size:.8rem;}
.kit .note{display:flex;gap:12px;padding:18px 20px;border-radius:16px;
  background:color-mix(in srgb,#0ea5e9 8%,transparent);border:1px solid color-mix(in srgb,#0ea5e9 24%,transparent);
  font-size:.9rem;line-height:1.6;color:var(--dim);}
.kit .note svg{flex:0 0 auto;margin-top:2px;color:#0ea5e9;}
.kit .note strong{color:var(--ink);}
.kit .viewer{position:fixed;inset:0;z-index:1300;background:rgba(5,7,16,.82);
  backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:16px;}
.kit .viewerinner{width:min(1040px,100%);background:var(--card);border-radius:16px;overflow:hidden;
  border:1px solid var(--line);display:flex;flex-direction:column;max-height:92vh;}
.kit .viewerbar{display:flex;align-items:center;justify-content:space-between;gap:12px;
  padding:12px 14px;border-bottom:1px solid var(--line);font-weight:800;font-size:.95rem;}
.kit .viewerbar div{display:flex;gap:6px;align-items:center;}
.kit .viewerinner iframe{width:100%;aspect-ratio:16/9;border:0;background:#000;}
@media (max-width:640px){
  .kit .hero{padding:36px 0 28px;}
  .kit .body{padding:28px 16px 56px;}
  .kit .wrap{padding:0 16px;}
  .kit .grid{grid-template-columns:1fr;}
  .kit .viewerinner iframe{aspect-ratio:4/3;}
  .kit .actions .btn{flex:1 1 auto;justify-content:center;}
}
`;
