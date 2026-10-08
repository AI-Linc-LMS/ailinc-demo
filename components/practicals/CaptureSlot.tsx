"use client";

import { useRef, useState } from "react";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

/**
 * One file the submission has to contain.
 *
 * A real file picker, not a mock. The point of this surface is that a learner
 * finds out before the deadline whether their phone will actually hand over a
 * 90-second clip, and that the product can say "that is 180MB, which will not
 * upload on site wifi" while they can still do something about it. So the file
 * is read locally, named, sized, and for an image previewed. Nothing is sent
 * anywhere in this build.
 *
 * `capture` on the input is what makes a phone open the camera rather than the
 * gallery. It is also the reason this cannot be a drag-and-drop zone alone:
 * most learners on these courses are on a phone, standing next to the unit.
 */
export interface CapturedFile {
  key: string;
  filename: string;
  bytes: number;
  seconds?: number;
  previewUrl?: string;
}

const prettyBytes = (n: number) =>
  n >= 1_048_576 ? `${(n / 1_048_576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;

const ACCEPT: Record<string, string> = {
  photo: "image/*",
  video: "video/*",
  audio: "audio/*",
};

const MEDIUM_ICON: Record<string, string> = {
  photo: "mdi:camera-outline",
  video: "mdi:video-outline",
  audio: "mdi:microphone-outline",
};

export function CaptureSlot({
  slotKey,
  label,
  medium,
  seconds,
  mustShow,
  accent,
  value,
  onChange,
  locked,
}: {
  slotKey: string;
  label: string;
  medium: "photo" | "video" | "audio";
  seconds?: number;
  /** What has to be visible or audible for the capture to count. */
  mustShow: string;
  accent: string;
  value?: CapturedFile;
  onChange: (f: CapturedFile | undefined) => void;
  locked?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [tooBig, setTooBig] = useState(false);

  const pick = (file: File | undefined) => {
    if (!file) return;
    // 200MB is well past anything a phone produces for a 90-second clip, so a
    // file over it is almost always 4K footage that will not upload from a
    // rooftop. Saying so now beats a failed upload later.
    setTooBig(file.size > 200 * 1_048_576);
    const isImage = file.type.startsWith("image/");
    onChange({
      key: slotKey,
      filename: file.name,
      bytes: file.size,
      previewUrl: isImage ? URL.createObjectURL(file) : undefined,
    });
  };

  const filled = !!value;

  return (
    <Box
      sx={{
        borderRadius: 3,
        border: `1px ${filled ? "solid" : "dashed"} ${filled ? accent : "var(--border-default)"}`,
        bgcolor: filled ? `color-mix(in srgb, ${accent} 6%, transparent)` : "transparent",
        overflow: "hidden",
      }}
    >
      <Box
        component="input"
        type="file"
        ref={inputRef as never}
        accept={ACCEPT[medium]}
        // Opens the camera directly on a phone instead of the photo library.
        {...(medium === "photo" ? { capture: "environment" } : {})}
        onChange={(e) => pick((e.target as HTMLInputElement).files?.[0])}
        sx={{ display: "none" }}
      />

      <Stack direction="row" spacing={1.25} sx={{ p: 1.4 }}>
        {value?.previewUrl ? (
          <Box
            component="img"
            src={value.previewUrl}
            alt=""
            sx={{ width: 58, height: 58, flexShrink: 0, borderRadius: 2, objectFit: "cover" }}
          />
        ) : (
          <Box
            sx={{
              width: 58,
              height: 58,
              flexShrink: 0,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              bgcolor: filled ? accent : "color-mix(in srgb, var(--border-default) 35%, transparent)",
              color: filled ? "white" : "var(--text-secondary)",
            }}
          >
            <Icon icon={filled ? "mdi:check" : MEDIUM_ICON[medium]} width={25} />
          </Box>
        )}

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={0.6} flexWrap="wrap">
            <Typography sx={{ fontSize: "0.86rem", fontWeight: 800 }}>{label}</Typography>
            <Typography
              sx={{
                px: 0.65,
                py: 0.1,
                borderRadius: 999,
                fontSize: "0.63rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                bgcolor: `color-mix(in srgb, ${accent} 14%, transparent)`,
                color: accent,
              }}
            >
              {medium}
              {seconds ? ` · ${seconds}s` : ""}
            </Typography>
          </Stack>

          {/* The acceptance criterion, not a description. "Both ends of the
              joint and the flux line visible in one frame" is checkable; "a
              photo of your work" is not, and a learner cannot aim at it. */}
          <Typography sx={{ fontSize: "0.78rem", lineHeight: 1.5, color: "var(--text-secondary)", mt: 0.3 }}>
            {mustShow}
          </Typography>

          {value && (
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
              <Icon icon="mdi:file-outline" width={13} color="var(--text-secondary)" />
              <Typography
                sx={{
                  fontSize: "0.74rem",
                  color: "var(--text-secondary)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {value.filename}
              </Typography>
              <Typography sx={{ fontSize: "0.74rem", color: "var(--text-secondary)", flexShrink: 0 }}>
                {prettyBytes(value.bytes)}
              </Typography>
            </Stack>
          )}

          {tooBig && (
            <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
              <Icon icon="mdi:wifi-alert" width={14} color="#b45309" style={{ flexShrink: 0, marginTop: 1 }} />
              <Typography sx={{ fontSize: "0.74rem", color: "#b45309", lineHeight: 1.45 }}>
                Over 200MB. That will struggle on site wifi. Drop your camera to 1080p and shoot it
                again rather than finding out at the end of a long upload.
              </Typography>
            </Stack>
          )}
        </Box>

        {!locked && (
          <Stack spacing={0.5} sx={{ flexShrink: 0 }}>
            <ButtonBase
              onClick={() => inputRef.current?.click()}
              sx={{
                px: 1.3,
                py: 0.6,
                borderRadius: 2,
                fontSize: "0.76rem",
                fontWeight: 800,
                color: filled ? "var(--text-secondary)" : "white",
                border: filled ? "1px solid var(--border-default)" : "none",
                background: filled ? "transparent" : accent,
              }}
            >
              {filled ? "Replace" : "Choose"}
            </ButtonBase>
            {filled && (
              <ButtonBase
                onClick={() => {
                  onChange(undefined);
                  setTooBig(false);
                }}
                sx={{ px: 1.3, py: 0.5, borderRadius: 2, fontSize: "0.74rem", color: "#be123c", fontWeight: 700 }}
              >
                Remove
              </ButtonBase>
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
