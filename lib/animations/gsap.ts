import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// ── Easing Presets (matching BRAVÍO CSS tokens) ──
export const EASE_BRAVIO = "cubic-bezier(0.76, 0, 0.24, 1)";
export const EASE_EXPO = "expo.inOut";
export const EASE_POWER = "power4.inOut";

// ── Duration Presets ──
export const DUR_FAST = 0.3;
export const DUR_BASE = 0.6;
export const DUR_SLOW = 1.0;
export const DUR_SLOWER = 1.4;

// ── Fade + Slide Up ──
export function fadeSlideUp(
  targets: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    stagger?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration ?? DUR_SLOW,
      delay: options.delay ?? 0,
      stagger: options.stagger ?? 0,
      ease: EASE_BRAVIO,
      scrollTrigger: options.scrollTrigger,
    }
  );
}

// ── Text Reveal (Line by Line) ──
export function revealText(
  element: HTMLElement,
  scrollTriggerVars?: ScrollTrigger.Vars
) {
  const split = new SplitText(element, { type: "lines", linesClass: "line" });
  const lines = split.lines;

  lines.forEach((line) => {
    const wrapper = document.createElement("span");
    wrapper.style.overflow = "hidden";
    wrapper.style.display = "block";
    line.parentNode?.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  return gsap.fromTo(
    lines,
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: DUR_SLOWER,
      stagger: 0.12,
      ease: EASE_BRAVIO,
      scrollTrigger: scrollTriggerVars,
    }
  );
}

// ── Image Reveal ──
export function revealImage(
  container: HTMLElement,
  image: HTMLElement,
  scrollTriggerVars?: ScrollTrigger.Vars
) {
  const tl = gsap.timeline({ scrollTrigger: scrollTriggerVars });
  tl.fromTo(
    container,
    { clipPath: "inset(100% 0% 0% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration: DUR_SLOWER, ease: EASE_BRAVIO }
  ).fromTo(
    image,
    { scale: 1.15 },
    { scale: 1, duration: DUR_SLOWER, ease: EASE_BRAVIO },
    0
  );
  return tl;
}

// ── Horizontal Scroll Gallery ──
export function createHorizontalScroll(
  track: HTMLElement,
  container: HTMLElement
) {
  const totalWidth = track.scrollWidth - container.clientWidth;

  return gsap.to(track, {
    x: -totalWidth,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${totalWidth}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
}

// ── Parallax ──
export function parallax(
  target: HTMLElement,
  speed = 0.3,
  scrollTriggerVars?: Partial<ScrollTrigger.Vars>
) {
  return gsap.to(target, {
    yPercent: speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger: target,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      ...scrollTriggerVars,
    },
  });
}

// ── Cleanup helper ──
export function killScrollTriggers(triggers: ScrollTrigger[]) {
  triggers.forEach((t) => t.kill());
}

export { gsap, ScrollTrigger };
