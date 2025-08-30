import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Animation configuration constants
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
  },
  ease: {
    smooth: 'power2.out',
    bounce: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.3)',
    expo: 'expo.out',
  },
  stagger: {
    fast: 0.1,
    normal: 0.2,
    slow: 0.3,
  },
};

// Common animation presets
export const GSAP_ANIMATIONS = {
  // Fade animations
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.smooth },
  },
  
  fadeInUp: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0, duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.smooth },
  },
  
  fadeInDown: {
    from: { opacity: 0, y: -30 },
    to: { opacity: 1, y: 0, duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.smooth },
  },
  
  fadeInLeft: {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0, duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.smooth },
  },
  
  fadeInRight: {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0, duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.smooth },
  },

  // Scale animations
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.bounce },
  },
  
  scaleInBounce: {
    from: { opacity: 0, scale: 0.5 },
    to: { opacity: 1, scale: 1, duration: ANIMATION_CONFIG.duration.slow, ease: ANIMATION_CONFIG.ease.elastic },
  },

  // Rotation animations
  rotateIn: {
    from: { opacity: 0, rotation: -180 },
    to: { opacity: 1, rotation: 0, duration: ANIMATION_CONFIG.duration.slow, ease: ANIMATION_CONFIG.ease.bounce },
  },

  // Flip animations
  flipIn: {
    from: { opacity: 0, rotationY: -90 },
    to: { opacity: 1, rotationY: 0, duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

// Animation utility functions
export const animateElement = (element: string | Element, animation: keyof typeof GSAP_ANIMATIONS) => {
  const config = GSAP_ANIMATIONS[animation];
  return gsap.fromTo(element, config.from, config.to);
};

export const animateElements = (
  elements: string | Element[],
  animation: keyof typeof GSAP_ANIMATIONS,
  staggerDelay: number = ANIMATION_CONFIG.stagger.normal
) => {
  const config = GSAP_ANIMATIONS[animation];
  return gsap.fromTo(elements, config.from, {
    ...config.to,
    stagger: staggerDelay,
  });
};

// Scroll-triggered animations
export const createScrollAnimation = (
  trigger: string | Element,
  animation: keyof typeof GSAP_ANIMATIONS,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean;
    toggleActions?: string;
  } = {}
) => {
  const config = GSAP_ANIMATIONS[animation];
  const {
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    toggleActions = 'play none none reverse',
  } = options;

  return gsap.fromTo(trigger, config.from, {
    ...config.to,
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
      toggleActions,
    },
  });
};

// Timeline helper functions
export const createTimeline = (options?: gsap.TimelineVars) => {
  return gsap.timeline(options);
};

export const createScrollTimeline = (
  trigger: string | Element,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean;
    pin?: boolean;
  } = {}
) => {
  const { start = 'top center', end = 'bottom center', scrub = true, pin = false } = options;

  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
      pin,
    },
  });
};

// Text animations
export const typeWriter = (element: string | Element, text: string, duration: number = 2) => {
  return gsap.to(element, {
    duration,
    text,
    ease: 'none',
  });
};

// Hover animations
export const createHoverAnimation = (
  element: string | Element,
  hoverState: gsap.TweenVars,
  restState?: gsap.TweenVars
) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const hoverTween = gsap.to(el, { ...hoverState, paused: true });
  const restTween = restState ? gsap.to(el, { ...restState, paused: true }) : null;

  el.addEventListener('mouseenter', () => {
    restTween?.reverse();
    hoverTween.play();
  });

  el.addEventListener('mouseleave', () => {
    hoverTween.reverse();
    restTween?.play();
  });

  return { hoverTween, restTween };
};

// Magnetic button effect
export const createMagneticEffect = (element: string | Element, strength: number = 0.3) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = (el as Element).getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  el.addEventListener('mousemove', handleMouseMove);
  el.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    el.removeEventListener('mousemove', handleMouseMove);
    el.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Page transition animations
export const pageTransition = {
  enter: (element: string | Element) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  },
  
  exit: (element: string | Element) => {
    return gsap.to(element, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
    });
  },
};

// Loading animations
export const loadingAnimations = {
  spinner: (element: string | Element) => {
    return gsap.to(element, {
      rotation: 360,
      duration: 1,
      ease: 'none',
      repeat: -1,
    });
  },
  
  pulse: (element: string | Element) => {
    return gsap.to(element, {
      scale: 1.1,
      duration: 0.8,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
    });
  },
  
  dots: (elements: string | Element[]) => {
    return gsap.to(elements, {
      y: -10,
      duration: 0.4,
      ease: 'power2.inOut',
      stagger: 0.1,
      yoyo: true,
      repeat: -1,
    });
  },
};