"use client";

import { useEffect, useRef } from "react";

// Real-looking snippets pulled from this project's own stack, not lorem-ipsum
// filler — reinforces the "written by a working backend/full-stack engineer"
// feel called for over a generic glow/particle effect.
const SNIPPETS = [
  "def get_portfolio_home(request):",
  "class ArchitectureBlueprint(models.Model):",
  "docker compose -f infra/docker-compose.yml up -d",
  "git push origin production",
  "SELECT * FROM auth_user WHERE is_staff = true;",
  "celery -A config worker -l info",
  "nginx -s reload",
  "npm run build && npm run typecheck",
  "python manage.py migrate --noinput",
  "@api_view([\"GET\", \"POST\"])",
  "ssh deploy@vps 'docker compose pull'",
  "CREATE INDEX idx_project_order ON portfolio_project (order);",
  "const revalidate = 60;",
  "server { listen 443 ssl; }",
  "class IsOwnerUser(BasePermission):",
  "REDIS_URL = os.environ['REDIS_URL']",
  "await fetch(`${baseUrl}/api/portfolio/home`)",
  "gunicorn config.wsgi:application --workers 3",
  "ALTER TABLE portfolio_contactmessage ADD COLUMN read_at timestamptz;",
  "useEffect(() => { ... }, [scrollY])"
];

type Line = {
  text: string;
  x: number;
  y: number;
  layer: 0 | 1 | 2;
  drift: number;
  typeSeed: number;
};

// Cheap in-canvas typing/deleting cycle per line — mirrors the TextType
// typewriter feel across the whole floating field without spinning up
// dozens of real DOM TextType instances (would mean dozens of concurrent
// React-state + gsap loops for decorative background text).
const TYPE_MS_PER_CHAR = 46;
const DELETE_MS_PER_CHAR = 24;
const HOLD_MS = 1400;
const GAP_MS = 700;
const CURSOR_BLINK_MS = 500;

const LAYER_CONFIG = [
  { speed: 4, size: 12, baseAlpha: 0.16, scrollFactor: 0.04 },
  { speed: 7, size: 13, baseAlpha: 0.22, scrollFactor: 0.08 },
  { speed: 11, size: 14, baseAlpha: 0.3, scrollFactor: 0.14 }
] as const;

const SPOTLIGHT_RADIUS = 260;

function useReducedMotion() {
  const ref = useRef(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    ref.current = query.matches;
    const update = () => {
      ref.current = query.matches;
    };
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return ref;
}

export function CodeField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedRef = useReducedMotion();

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    let width = 0;
    let height = 0;
    let lines: Line[] = [];
    const pointer = { x: -9999, y: -9999 };
    let scrollY = window.scrollY;
    let raf = 0;
    let visible = !document.hidden;

    function seedLines() {
      const count = Math.max(30, Math.round((width * height) / 38000));
      lines = Array.from({ length: count }, (_, index) => {
        const layer = (index % 3) as 0 | 1 | 2;
        return {
          text: SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)],
          x: Math.random() * width,
          y: Math.random() * height,
          layer,
          drift: 0.6 + Math.random() * 0.8,
          typeSeed: Math.random() * 100000
        };
      });
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedLines();
    }

    function onPointerMove(event: PointerEvent) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    }

    function onPointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    function onScroll() {
      scrollY = window.scrollY;
    }

    function onVisibilityChange() {
      visible = !document.hidden;
    }

    function draw(time: number) {
      raf = requestAnimationFrame(draw);
      if (!visible) return;

      const reduced = reducedRef.current;
      ctx.clearRect(0, 0, width, height);
      ctx.font = "12px var(--font-mono), monospace";
      ctx.textBaseline = "middle";

      for (const line of lines) {
        const config = LAYER_CONFIG[line.layer];
        ctx.font = `${config.size}px var(--font-mono), monospace`;

        const autoDrift = reduced ? 0 : (time * 0.001 * config.speed * line.drift) % (height + 40);
        const scrollOffset = reduced ? 0 : scrollY * config.scrollFactor;
        let y = (line.y + autoDrift + scrollOffset) % (height + 40);
        if (y < -20) y += height + 40;

        const dx = line.x - pointer.x;
        const dy = y - pointer.y;
        const distance = reduced ? Infinity : Math.sqrt(dx * dx + dy * dy);
        const spotlight = distance < SPOTLIGHT_RADIUS ? 1 - distance / SPOTLIGHT_RADIUS : 0;

        const alpha = Math.min(1, config.baseAlpha + spotlight * 0.55);
        const usesAccent = spotlight > 0.15;

        ctx.fillStyle = usesAccent
          ? `rgba(0, 209, 255, ${alpha})`
          : `rgba(148, 163, 184, ${alpha})`;

        const len = line.text.length;
        const typeMs = len * TYPE_MS_PER_CHAR;
        const deleteMs = len * DELETE_MS_PER_CHAR;
        const cycle = typeMs + HOLD_MS + deleteMs + GAP_MS;

        let visibleText = line.text;
        let showCursor = false;
        if (!reduced) {
          const t = (time + line.typeSeed) % cycle;
          if (t < typeMs) {
            const chars = Math.floor(t / TYPE_MS_PER_CHAR);
            visibleText = line.text.slice(0, chars);
            showCursor = true;
          } else if (t < typeMs + HOLD_MS) {
            visibleText = line.text;
            showCursor = Math.floor(t / CURSOR_BLINK_MS) % 2 === 0;
          } else if (t < typeMs + HOLD_MS + deleteMs) {
            const elapsed = t - typeMs - HOLD_MS;
            const chars = len - Math.floor(elapsed / DELETE_MS_PER_CHAR);
            visibleText = line.text.slice(0, Math.max(0, chars));
            showCursor = true;
          } else {
            visibleText = "";
          }
        }

        ctx.fillText(showCursor ? `${visibleText}_` : visibleText, line.x, y);
      }
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.body);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reducedRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
