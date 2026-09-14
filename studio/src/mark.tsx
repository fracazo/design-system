type Density = "full" | "mid" | "min";

type JacarandaMarkProps = {
  className?: string;
  density?: Density;
  invert?: boolean;
};

const full = {
  edge: [
    [28.2, 7.2],
    [35.8, 7.2],
    [16.8, 13.8],
    [47.2, 13.8],
    [13, 20.4],
    [51, 20.4],
    [9.2, 27],
    [54.8, 27],
    [13, 33.6],
    [51, 33.6],
    [16.8, 40.2],
    [47.2, 40.2],
    [28.2, 46.8],
    [35.8, 46.8],
  ],
  mid: [
    [24.4, 13.8],
    [32, 13.8],
    [39.6, 13.8],
    [20.6, 20.4],
    [43.4, 20.4],
    [16.8, 27],
    [47.2, 27],
    [20.6, 33.6],
    [43.4, 33.6],
    [24.4, 40.2],
    [32, 40.2],
    [39.6, 40.2],
  ],
  core: [
    [28.2, 20.4],
    [35.8, 20.4],
    [24.4, 27],
    [32, 27],
    [39.6, 27],
    [28.2, 33.6],
    [35.8, 33.6],
  ],
} as const;

const mid = {
  core: [[32, 28.8]] as const,
  edge: [
    [17.4, 28.8],
    [46.6, 28.8],
  ] as const,
  mid: [
    [24.7, 16.2],
    [39.3, 16.2],
    [24.7, 41.4],
    [39.3, 41.4],
  ] as const,
};

function Trunk({ width }: { width: number }) {
  return (
    <path
      d="M32 60 L32 48"
      stroke="var(--jacaranda-trunk)"
      strokeWidth={width}
      strokeLinecap="round"
    />
  );
}

function Blossoms({
  rings,
  radius,
}: {
  rings: { edge: readonly (readonly [number, number])[]; mid: readonly (readonly [number, number])[]; core: readonly (readonly [number, number])[] };
  radius: number;
}) {
  return (
    <>
      {rings.edge.map(([cx, cy], i) => (
        <circle key={`e${i}`} cx={cx} cy={cy} r={radius} fill="var(--blossom-edge)" />
      ))}
      {rings.mid.map(([cx, cy], i) => (
        <circle key={`m${i}`} cx={cx} cy={cy} r={radius} fill="var(--blossom-mid)" />
      ))}
      {rings.core.map(([cx, cy], i) => (
        <circle key={`c${i}`} cx={cx} cy={cy} r={radius} fill="var(--blossom-core)" />
      ))}
    </>
  );
}

/**
 * Canopy mark from the Jacaranda brand sheet v4.
 * Full: 33 blossoms, 64px and up. Mid: 7 blossoms, 24 to 64. Min: one blossom, under 24.
 */
export function JacarandaMark({
  className,
  density = "full",
  invert = false,
}: JacarandaMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      data-jacaranda-mark=""
      data-invert={invert ? "true" : undefined}
      aria-hidden
      fill="none"
    >
      {density === "full" && (
        <>
          <Trunk width={3.6} />
          <Blossoms rings={full} radius={3.3} />
        </>
      )}
      {density === "mid" && (
        <>
          <Trunk width={4.4} />
          <Blossoms rings={mid} radius={8.6} />
        </>
      )}
      {density === "min" && (
        <>
          <Trunk width={6.5} />
          <circle cx="32" cy="30" r="20" fill="var(--blossom-edge)" />
        </>
      )}
    </svg>
  );
}

/** Archivo 700 lockup. Mark height is cap height plus 40%. Gap is one blossom. */
export function JacarandaLockup({
  className,
  subtitle,
}: {
  className?: string;
  subtitle?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-[0.44em]">
        <JacarandaMark density="mid" className="h-[1.4em] w-[1.4em] shrink-0" />
        <div className="min-w-0">
          <span className="font-bold tracking-tight">Jacaranda</span>
          {subtitle ? (
            <p className="font-mono text-[12px] font-normal tracking-[0.06em] text-ink-3">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
