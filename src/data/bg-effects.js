import { Heart, Snowflake, Circle, Sparkles, Navigation, Ban } from 'lucide-react';

export const BG_EFFECT_OPTIONS = [
    { id: 'none', label: 'None', icon: Ban },
    { id: 'hearts', label: 'Hearts', icon: Heart },
    { id: 'snow', label: 'Snow', icon: Snowflake },
    { id: 'bubbles', label: 'Bubbles', icon: Circle },
    { id: 'fireflies', label: 'Fireflies', icon: Navigation },
    { id: 'sparkles', label: 'Sparkles', icon: Sparkles }
];

export const getBgEffectRawCss = () => `
/* Effects Keyframes */
@keyframes fall-down {
    0%   { top: -10%; transform: translateX(0) rotate(0deg); opacity: 1; }
    25%  { top: 25%; transform: translateX(-12px) rotate(90deg); opacity: 1; }
    75%  { top: 85%; transform: translateX(12px) rotate(270deg); opacity: 0.7; }
    100% { top: 110%; transform: translateX(0) rotate(360deg); opacity: 0; }
}

@keyframes float-up {
    0%   { top: 110%; transform: translateX(0) scale(1) rotate(0deg); opacity: 1; }
    25%  { top: 75%; transform: translateX(-12px) scale(1.1) rotate(45deg); opacity: 0.9; }
    75%  { top: 15%; transform: translateX(12px)  scale(1.3) rotate(135deg); opacity: 0.5; }
    100% { top: -10%; transform: translateX(0) scale(1.5) rotate(180deg); opacity: 0; }
}

@keyframes firefly-wander {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
    20%  { opacity: 1; }
    50%  { transform: translate(40px, -40px) scale(1.2); opacity: 0.8; }
    80%  { opacity: 1; }
}

@keyframes sparkle-twinkle {
    0%, 100% { transform: scale(0) rotate(0deg);   opacity: 0; }
    50%       { transform: scale(1) rotate(180deg); opacity: 1; }
}

/* Base Particle Style — GPU Accelerated */
.bg-particle {
    position: absolute;
    pointer-events: none;
    z-index: 1;
    will-change: transform, opacity;
}

/* Specific Effect Types */
.bg-effect-snow .bg-particle {
    animation: fall-down linear infinite;
    border-radius: 50%;
    background-color: currentColor;
}

.bg-effect-bubbles .bg-particle {
    animation: float-up ease-in infinite;
    border: 1px solid currentColor;
    border-radius: 50%;
    background-color: transparent;
}

.bg-effect-hearts .bg-particle {
    animation: float-up linear infinite;
}
.bg-effect-hearts .bg-particle svg {
    fill: currentColor;
    width: 100%;
    height: 100%;
}

.bg-effect-fireflies .bg-particle {
    animation: firefly-wander ease-in-out infinite;
    border-radius: 50%;
    background-color: currentColor;
    box-shadow: 0 0 8px 2px currentColor;
}

.bg-effect-sparkles .bg-particle {
    animation: sparkle-twinkle ease-in-out infinite;
}
.bg-effect-sparkles .bg-particle svg {
    fill: currentColor;
    width: 100%;
    height: 100%;
}
`;

export const getEffectHtmlElements = (effectId, colorHex) => {
    if (!effectId || effectId === 'none') return '';

    const particles = [];
    const count = effectId === 'snow' || effectId === 'sparkles' ? 20 : 15;
    
    for (let i = 0; i < count; i++) {
        const size = Math.random() * 15 + 8;
        const left = Math.random() * 85 + 5; // Clamp between 5% and 90%
        const delay = Math.random() * -20;
        const duration = Math.random() * 8 + 8;

        // GPU-optimized: now animates `top` to stay natively bounded by parent relative dimensions
        const isFallEffect = effectId === 'snow';
        const isRiseEffect = effectId === 'hearts' || effectId === 'bubbles';
        const topStr = isFallEffect || isRiseEffect ? '' : `top: ${Math.random() * 100}%; `;
        let style = `left: ${left}%; ${topStr}width: ${size}px; height: ${size}px; animation-delay: ${delay}s; animation-duration: ${duration}s; color: ${colorHex} !important;`;
        
        let innerContent = '';
        
        if (effectId === 'hearts') {
            innerContent = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
            style += `opacity: ${Math.random() * 0.4 + 0.3}; animation-name: float-up;`;
        } else if (effectId === 'bubbles') {
            style += `opacity: ${Math.random() * 0.5 + 0.2}; animation-name: float-up;`;
        } else if (effectId === 'snow') {
            style += `opacity: ${Math.random() * 0.6 + 0.3}; background-color: ${colorHex}; animation-name: fall-down;`;
        } else if (effectId === 'fireflies') {
            style += `width: ${size / 3}px; height: ${size / 3}px; opacity: ${Math.random() * 0.6 + 0.4}; animation-name: firefly-wander;`;
        } else if (effectId === 'sparkles') {
            innerContent = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><polygon points="17.657 6.343 12 12 17.657 17.657 12 12 6.343 17.657 12 12 6.343 6.343 12 12 17.657 6.343"></polygon></svg>`;
            style += `opacity: ${Math.random() * 0.5 + 0.5}; animation-name: sparkle-twinkle;`;
        }

        particles.push(`<div class="bg-particle" style="${style}">${innerContent}</div>`);
    }

    return `<div class="bg-effect-container bg-effect-${effectId}" style="position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 1;">${particles.join('')}</div>`;
};
