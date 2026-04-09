import { Heart, Snowflake, Circle, Sparkles, Navigation, Cloud, Coffee, Moon, FlaskConical, Divide, Atom, Magnet } from 'lucide-react';

export const BG_EFFECT_OPTIONS = [
    { id: 'none', label: 'None', icon: null },
    { id: 'hearts', label: 'Hearts', icon: Heart },
    { id: 'snow', label: 'Snow', icon: Snowflake },
    { id: 'bubbles', label: 'Bubbles', icon: Circle },
    { id: 'fireflies', label: 'Fireflies', icon: Navigation },
    { id: 'sparkles', label: 'Sparkles', icon: Sparkles },
    { id: 'doodles', label: 'Doodles', icon: Cloud },
    { id: 'cozy', label: 'Cozy', icon: Coffee },
    { id: 'science', label: 'Science', icon: FlaskConical },
    { id: 'math', label: 'Math', icon: Divide },
    { id: 'cafe', label: 'Cafe', icon: Coffee },
    { id: 'physics', label: 'Physics', icon: Atom }
];

export const getBgEffectRawCss = () => `
/* Effects Keyframes */
@keyframes fall-down {
    0% { top: -10%; transform: translateX(0) rotate(0deg); opacity: 1; }
    100% { top: 110%; transform: translateX(20px) rotate(360deg); opacity: 0; }
}

@keyframes float-up {
    0% { top: 110%; transform: translateX(0) scale(1) rotate(0deg); opacity: 1; }
    100% { top: -10%; transform: translateX(30px) scale(1.5) rotate(180deg); opacity: 0; }
}

@keyframes firefly-wander {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
    20% { opacity: 1; }
    50% { transform: translate(40px, -40px) scale(1.2); opacity: 0.8; }
    80% { opacity: 1; }
}

@keyframes sparkle-twinkle {
    0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
    50% { transform: scale(1) rotate(180deg); opacity: 1; }
}

@keyframes swing-left-right {
    0%, 100% { transform: translateX(-15px); }
    50% { transform: translateX(15px); }
}

/* Base Particle Style */
.bg-particle {
    position: absolute;
    pointer-events: none;
    z-index: 1;
}

/* Specific Effect Types */
.bg-effect-snow .bg-particle {
    animation: fall-down linear infinite, swing-left-right 3s ease-in-out infinite alternate;
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
    animation: float-up linear infinite, swing-left-right 4s ease-in-out infinite alternate;
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
        // Randomize size, delay, duration, position
        const size = Math.random() * 15 + 8; // 8px to 23px
        const left = Math.random() * 100; // 0% to 100%
        const delay = Math.random() * -20; // 0s to -20s so they start already moving
        const duration = Math.random() * 8 + 8; // 8s to 16s

        // Randomize top for all effects to ensure they are distributed, 
        // especially for those that wander or twinkle. 
        // For falling/rising effects, the keyframe will override this anyway during playback.
        const top = Math.random() * 100;
        const rotation = Math.random() * 360;
        let style = `left: ${left}%; top: ${top}%; width: ${size}px; height: ${size}px; animation-delay: ${delay}s; animation-duration: ${duration}s; color: ${colorHex} !important; transform: rotate(${rotation}deg);`;
        
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
        } else if (effectId === 'doodles') {
            const doodles = [
                '<circle cx="12" cy="12" r="10" stroke-dasharray="4 4" />',
                '<path d="M12 2v20M2 12h20" stroke-width="1" />',
                '<path d="M17.5 19c.7 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25Z" />',
                '<path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />',
                '<path d="M5 12h14" />'
            ];
            const icon = doodles[Math.floor(Math.random() * doodles.length)];
            innerContent = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>`;
            style += `opacity: ${Math.random() * 0.4 + 0.3}; animation-name: firefly-wander;`;
        } else if (effectId === 'cozy') {
            const cozies = [
                '<path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><path d="M6 1v3" /><path d="M10 1v3" />', // Coffee
                '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />', // Heart
                '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />', // Book
                '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />' // Moon
            ];
            const icon = cozies[Math.floor(Math.random() * cozies.length)];
            innerContent = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>`;
            style += `opacity: ${Math.random() * 0.5 + 0.3}; animation-name: float-up;`;
        } else if (effectId === 'science') {
            const scienceIcons = [
                '<path d="M10 2v7.51L4.53 17.5a2 2 0 0 0 1.71 3h11.52a2 2 0 0 0 1.71-3L14 9.51V2" /><path d="M8.5 2h7" /><path d="M8.5 12h7" />', // Flask
                '<circle cx="12" cy="12" r="3" /><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />', // Atom
                '<path d="M6 18h8" /><path d="M3 22h18" /><path d="M14 22a7 7 0 1 0-14-0" /><path d="M9 14h2" /><path d="M9 12a2 2 0 1 1-4 0V5a2 2 0 1 1 4 0v7z" />', // Microscope
                '<path d="m8 8 8 8" /><path d="m8 16 8-8" /><circle cx="8" cy="8" r="2" /><circle cx="16" cy="16" r="2" /><circle cx="8" cy="16" r="2" /><circle cx="16" cy="8" r="2" />' // DNA
            ];
            const icon = scienceIcons[Math.floor(Math.random() * scienceIcons.length)];
            innerContent = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>`;
            style += `opacity: ${Math.random() * 0.5 + 0.3}; animation-name: firefly-wander;`;
        } else if (effectId === 'math') {
            const mathIcons = [
                '<path d="M5 12h14" /><path d="M12 5v14" />', // Plus
                '<path d="M5 12h14" />', // Minus
                '<circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><circle cx="12" cy="7" r="1" /><circle cx="12" cy="17" r="1" />', // Divide
                '<path d="M9 12V4h6v7c0 1 1 2 2 2" /><path d="M4 4h16" /><path d="m4 18 3-6" />', // Pi
                '<path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />' // Infinity
            ];
            const icon = mathIcons[Math.floor(Math.random() * mathIcons.length)];
            innerContent = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>`;
            style += `opacity: ${Math.random() * 0.6 + 0.3}; animation-name: fall-down;`;
        } else if (effectId === 'cafe') {
            const cafeIcons = [
                '<path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />', // Cup
                '<path d="M6 1v3" /><path d="M10 1v3" />', // Steam
                '<path d="M16 8c-2-2-5-2-7 0s-2 5 0 7 5 2 7 0 2-5 0-7Z" /><path d="M9 15c2.5-1 5-4 7-7" />', // Coffee Bean
                '<path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />' // Note
            ];
            const icon = cafeIcons[Math.floor(Math.random() * cafeIcons.length)];
            innerContent = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>`;
            style += `opacity: ${Math.random() * 0.6 + 0.3}; animation-name: float-up;`;
        } else if (effectId === 'physics') {
            const physicsIcons = [
                '<circle cx="12" cy="12" r="3" /><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />', // Atom
                '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />' // Zap
            ];
            const icon = physicsIcons[Math.floor(Math.random() * physicsIcons.length)];
            innerContent = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>`;
            style += `opacity: ${Math.random() * 0.5 + 0.3}; animation-name: firefly-wander;`;
        }

        particles.push(`<div class="bg-particle" style="${style}">${innerContent}</div>`);
    }

    return `<div class="bg-effect-container bg-effect-${effectId}" style="position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 1;">${particles.join('')}</div>`;
};
