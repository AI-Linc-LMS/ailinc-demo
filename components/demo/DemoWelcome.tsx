"use client";

/**
 * The demo's front door, after sign-in.
 *
 * A prospect handed a URL and three logins has no idea what any of the sidebar
 * means. This offers a narrated walkthrough of the whole platform the moment
 * they land, which is the difference between "here is a product, good luck" and
 * a guided demo that runs itself when nobody from our side is on the call.
 *
 * Shown once per sign-in, not once ever: each demo session is a fresh visitor,
 * and a prospect who took the tour last week is usually a different person from
 * the one clicking today. Declining is remembered for that session only, so it
 * never nags.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Box, Button, Typography, Fade } from "@mui/material";
import { Icon } from "@iconify/react";
import { useAuth } from "@/lib/auth/auth-context";
import { useTour } from "@/components/community/TourProvider";
import { DEMO_MODE, DEMO_TENANT } from "@/lib/demo/config";
import { platformTour, welcomeCopy } from "@/lib/demo/tour";

/** sessionStorage, not localStorage: "this browser tab's visit", not "forever". */
const SEEN_KEY = "ailinc-demo-welcome-seen";

/** Home routes where an orientation makes sense. Not mid-quiz. */
const HOME_ROUTES = ["/dashboard", "/instructor/dashboard", "/admin/dashboard"];

export function DemoWelcome() {
  const { user, isAuthenticated, loading } = useAuth();
  const { startTour, isRunning } = useTour();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!DEMO_MODE || loading || !isAuthenticated || !user?.role) return;
    if (!HOME_ROUTES.includes(pathname ?? "")) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Private browsing: show it. Offering the tour twice is a smaller failure
      // than never offering it.
    }
    if (seen) return;

    // Let the page paint first. Opening on top of a half-rendered dashboard
    // makes the product look slow at the exact moment it is being judged.
    const timer = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(timer);
  }, [loading, isAuthenticated, user?.role, pathname]);

  const dismiss = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* nothing to remember; the card simply may reappear next navigation */
    }
  };

  const begin = () => {
    dismiss();
    // After the card has animated out, so the spotlight is not fighting it.
    window.setTimeout(() => startTour(platformTour(user?.role)), 260);
  };

  if (!DEMO_MODE || !open || isRunning) return null;

  const copy = welcomeCopy(user?.role);

  return (
    <Fade in>
      <Box
        role="dialog"
        aria-modal="true"
        aria-label="Welcome to the demo"
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 2400,
          display: "grid",
          placeItems: "center",
          p: 2,
          background: "rgba(15, 5, 24, 0.55)",
          backdropFilter: "blur(3px)",
        }}
        onClick={dismiss}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            width: "100%",
            maxWidth: 480,
            boxSizing: "border-box",
            borderRadius: "16px",
            p: { xs: 3, sm: 4 },
            background: "#ffffff",
            boxShadow: "0 24px 64px rgba(15,5,24,0.35)",
            textAlign: "center",
          }}
        >
          <Box
            aria-hidden
            sx={{
              width: 56,
              height: 56,
              mx: "auto",
              mb: 2,
              display: "grid",
              placeItems: "center",
              borderRadius: "14px",
              background: "linear-gradient(135deg,#7c3aed,#a855f7)",
              color: "#fff",
            }}
          >
            <Icon icon="mdi:compass-outline" width={30} />
          </Box>

          <Typography
            sx={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.6px", color: "#7c3aed", textTransform: "uppercase" }}
          >
            {DEMO_TENANT.shortName} product tour
          </Typography>

          <Typography sx={{ fontSize: 22, fontWeight: 700, color: "#0f172a", mt: 0.75, lineHeight: 1.25 }}>
            {copy.title}
          </Typography>

          <Typography sx={{ fontSize: 15, color: "#475569", mt: 1.25, lineHeight: 1.55 }}>
            {copy.body}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2.5,
              mt: 2.5,
              color: "#64748b",
              fontSize: 13,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Icon icon="mdi:clock-outline" width={16} />
              About {copy.minutes} {copy.minutes === 1 ? "minute" : "minutes"}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Icon icon="mdi:cards-outline" width={16} />
              {copy.steps} stops
            </Box>
          </Box>

          <Box sx={{ display: "grid", gap: 1.25, mt: 3 }}>
            <Button
              onClick={begin}
              variant="contained"
              fullWidth
              sx={{
                py: 1.25,
                borderRadius: "10px",
                textTransform: "none",
                fontSize: "0.95rem",
                fontWeight: 600,
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                boxShadow: "none",
                "&:hover": { background: "linear-gradient(135deg,#6d28d9,#9333ea)", boxShadow: "none" },
              }}
            >
              Take the tour
            </Button>
            <Button
              onClick={dismiss}
              fullWidth
              sx={{
                py: 1,
                borderRadius: "10px",
                textTransform: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "#475569",
                "&:hover": { background: "#f1f5f9" },
              }}
            >
              I&apos;ll explore on my own
            </Button>
          </Box>

          <Typography sx={{ fontSize: 12, color: "#94a3b8", mt: 2 }}>
            You can restart it any time from <strong>Guide</strong> in the top bar.
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
}
