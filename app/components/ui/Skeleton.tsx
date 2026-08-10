import s from "./Skeleton.module.css";

interface SkProps {
  w?: string;
  h?: string;
  r?: string;
  style?: React.CSSProperties;
}

/** Base shimmer box. */
function Sk({ w = "100%", h = "16px", r = "6px", style }: SkProps) {
  return (
    <div
      className={s.sk}
      aria-hidden="true"
      style={{ width: w, height: h, borderRadius: r, ...style }}
    />
  );
}

Sk.Circle = function SkCircle({ size = 40 }: { size?: number }) {
  return <Sk w={`${size}px`} h={`${size}px`} r="50%" />;
};

Sk.Title = function SkTitle({ w = "55%" }: { w?: string }) {
  return <Sk w={w} h="36px" r="8px" />;
};

Sk.Line = function SkLine({ w = "100%" }: { w?: string }) {
  return <Sk w={w} h="15px" r="5px" />;
};

Sk.Btn = function SkBtn({ w = "160px", h = "46px" }: { w?: string; h?: string }) {
  return <Sk w={w} h={h} r="12px" />;
};

Sk.Badge = function SkBadge() {
  return <Sk w="90px" h="24px" r="20px" />;
};

export { Sk };
