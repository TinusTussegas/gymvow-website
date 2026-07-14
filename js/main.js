// GymVow site behavior — nav state, scroll reveals. Nothing decorative.

// Gate the hidden initial state of .reveal behind JS actually running,
// so the page is fully visible if this file never loads.
document.documentElement.classList.add('js');

// Masthead: the heavy amber rule appears once the page is in motion.
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu — typographic MENU/CLOSE toggle. The button ships with
// [hidden] so it only appears when this script actually runs.
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
  navToggle.hidden = false;
  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.textContent = open ? 'Close' : 'Menu';
  };
  navToggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  document.querySelectorAll('.nav-links a').forEach((a) =>
    a.addEventListener('click', () => setOpen(false))
  );
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) setOpen(false);
  });
}

// Scroll reveals — reveal once, then leave the content alone.
const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

// Final rep — scroll drives the barbell from the rack to lockout.
const pressTrack = document.querySelector('.press-track');
if (pressTrack) {
  const bar = document.getElementById('press-bar');
  const plateL = document.getElementById('press-plate-l');
  const plateR = document.getElementById('press-plate-r');
  const armL = document.getElementById('press-arm-l');
  const armR = document.getElementById('press-arm-r');
  const chipText = document.getElementById('press-chip-text');
  const meterFill = document.getElementById('press-meter-fill');
  const hint = document.getElementById('press-hint');
  const stage = document.getElementById('press-stage');

  const lerp = (a, b, t) => a + (b - a) * t;

  // The rep finishes at 70% of the pinned stretch; the last 30% holds the
  // completed scene on screen so a fast scroll never cuts away at lockout.
  const ANIM_END = 0.7;

  const render = (raw) => {
    const p = Math.min(1, raw / ANIM_END);

    // strain peaks mid-rep: the bar bends and trembles hardest at the sticking point
    const strain = 4 * p * (1 - p);
    const y = lerp(170, 86, p);
    const sag = 3 + 6 * strain;
    const jitter = Math.sin(p * 46) * 1.6 * strain;

    bar.setAttribute('d', `M 44 ${y} Q 160 ${y + sag} 276 ${y}`);
    const shift = `translate(0 ${y - 170})`;
    plateL.setAttribute('transform', shift);
    plateR.setAttribute('transform', shift);
    armL.setAttribute('points', `140,178 ${lerp(114, 126, p)},${lerp(212, 132, p)} 112,${y}`);
    armR.setAttribute('points', `180,178 ${lerp(206, 194, p)},${lerp(212, 132, p)} 208,${y}`);
    stage.style.transform = `translateX(${jitter}px)`;

    meterFill.style.transform = `scaleX(${p})`;
    hint.style.opacity = Math.max(0, 1 - p * 4);

    const locked = p >= 0.9;
    pressTrack.classList.toggle('is-locked', locked);
    pressTrack.classList.toggle('is-affirmed', p >= 0.97);
    chipText.textContent = locked ? '$40 PROTECTED' : '$40 AT RISK';
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    render(1);
  } else {
    // Ease the rendered progress toward the scroll position so a fast fling
    // still plays the press through instead of skipping frames. The scroll
    // handler only schedules a frame; measuring and rendering happen at most
    // once per frame, inside it.
    let current = 0;
    let raf = null;

    const tick = () => {
      const r = pressTrack.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const target = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
      const diff = target - current;
      if (Math.abs(diff) < 0.001) {
        current = target;
        render(current);
        raf = null;
        return;
      }
      current += diff * 0.16;
      render(current);
      raf = requestAnimationFrame(tick);
    };

    const queue = () => {
      if (raf === null) raf = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    queue();
  }
}
