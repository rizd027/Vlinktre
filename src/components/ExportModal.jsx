import React, { useState, useEffect } from 'react';
import { X, Copy, Download, Check, FileCode, Code } from 'lucide-react';
import { saveAs } from 'file-saver';
import { getEffectHtmlElements, getBgEffectRawCss } from '../data/bg-effects';

const ExportModal = ({ isOpen, onClose, profile, links, socials, theme, layoutType, previewDevice }) => {
    const [copied, setCopied] = useState(false);
    const [htmlCode, setHtmlCode] = useState('');

    const [assetMap, setAssetMap] = useState({});

    useEffect(() => {
        const prepare = async () => {
            if (isOpen) {
                generateCode();
            }
        };
        prepare();
    }, [isOpen, profile, links, socials, theme, layoutType]);

    const generateCode = () => {
        const assets = {};
        const resolveUrl = (url, prefix = 'img') => {
            if (!url) return '';
            if (url.startsWith('blob:')) {
                const name = `${prefix}_${Math.random().toString(36).substr(2, 6)}.png`;
                assets[url] = name;
                return `assets/${name}`;
            }
            return url;
        };

        // --- CSS Generation ---
        const cssContent = `/* 
* VLink Builder Exported Styles
* Generated on ${new Date().toLocaleDateString()}
*/

:root {
    --bg-color: ${theme.bg || '#000000'};
    --primary-color: ${theme.btnColor || '#8228d9'};
    --text-color: ${theme.pageColor || '#ffffff'};
    --font-heading: '${theme.titleFont || 'Inter'}', sans-serif;
    --font-body: '${theme.pageFont || 'Inter'}', sans-serif;
}

* {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}

body {
    margin: 0;
    padding: 0;
    font-family: var(--font-body);
    background: var(--bg-color);
    color: var(--text-color);
    min-height: 100vh;
    overflow-x: hidden;
}

/* Animations */
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-custom {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes glow-custom {
    0%, 100% { filter: drop-shadow(0 0 5px rgba(255,255,255,0.3)); }
    50% { filter: drop-shadow(0 0 20px rgba(255,255,255,0.8)); }
}

@keyframes lightSweep {
    0% { transform: translateX(-150%) skewX(-25deg); }
    100% { transform: translateX(150%) skewX(-25deg); }
}

@keyframes textSweep {
    0% { background-position: 200% center; }
    100% { background-position: -200% center; }
}

@keyframes teeter {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-2deg); }
    75% { transform: rotate(2deg); }
}

@keyframes colorPulse {
    0%, 100% { color: inherit; filter: brightness(1) drop-shadow(0 0 0px transparent); }
    25% { color: #ff3366; filter: brightness(1.2) drop-shadow(0 0 8px rgba(255, 51, 102, 0.5)); }
    50% { color: #33ff66; filter: brightness(1.2) drop-shadow(0 0 8px rgba(51, 255, 102, 0.5)); }
    75% { color: #3366ff; filter: brightness(1.2) drop-shadow(0 0 8px rgba(51, 102, 255, 0.5)); }
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
}

@keyframes bounce-custom {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
}

@keyframes shine {
    0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateX(200%) skewX(-15deg); opacity: 0; }
}

.animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; opacity: 0; }
.animate-pulse-custom { animation: pulse-custom 2s ease-in-out infinite; }
.animate-glow-custom { animation: glow-custom 2.5s ease-in-out infinite; }
.animate-teeter { animation: teeter 3s ease-in-out infinite; }
.animate-color-pulse { animation: colorPulse 3s ease-in-out infinite; }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-bounce-custom { animation: bounce-custom 2s ease-in-out infinite; }

.animate-sweep { position: relative; overflow: hidden; isolation: isolate; }
.animate-sweep::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0) 10%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 90%, transparent);
    animation: lightSweep 2s ease-in-out infinite;
    pointer-events: none; z-index: 10;
}

.animate-sweep-text {
    background: linear-gradient(90deg, currentColor 30%, rgba(255, 255, 255, 0.8) 50%, currentColor 70%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textSweep 2.5s linear infinite;
}

.animate-shine:hover .shine-overlay {
    animation: shine 0.7s ease-in-out forwards;
}


/* Interaction Effects */
.hover-lift { transition: transform 0.3s ease; }
.hover-lift:hover { transform: translateY(-6px); }
.hover-scale { transition: transform 0.3s ease; }
.hover-scale:hover { transform: scale(1.03); }
.hover-glow { transition: box-shadow 0.3s ease; }
.hover-glow:hover { box-shadow: 0 0 20px rgba(255,255,255,0.3); }
.active-push:active { transform: scale(0.95); }
.active-inset:active { transform: scale(0.97); filter: brightness(0.8); }

/* UI Elements */
.wallpaper-container {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
}

.link-item {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    position: relative;
    overflow: hidden;
    width: 100%;
    z-index: 1;
}

.link-item:hover { transform: translateY(-3px); }
.link-item:active { transform: scale(0.98); }

.link-thumb {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 12px;
}

.link-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.1);
    border-radius: 8px;
    margin-right: 12px;
}

.link-content {
    flex: 1;
    min-width: 0;
}

.link-title {
    display: block;
    font-weight: 600;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.link-url {
    display: block;
    font-size: 11px;
    opacity: 0.6;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.social-btn svg, .social-btn i {
    width: ${theme.socialSize || 18}px !important;
    height: ${theme.socialSize || 18}px !important;
}

/* Hide Scrollbar */
::-webkit-scrollbar { width: 0px; display: none; }
* { -ms-overflow-style: none; scrollbar-width: none; }

${getBgEffectRawCss()}
`;

        // --- JS Generation ---
        const jsContent = `/* 
* VLink Builder Exported Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    // Initializing Lucide Icons
    const initIcons = () => {
        if (window.lucide) {
            window.lucide.createIcons();
            console.log('Icons initialized');
        } else {
            setTimeout(initIcons, 100);
        }
    };
    initIcons();
    
    ${theme.wallpaperStyle === 'video' && theme.videoAudioEnabled ? `
    // Autoplay audio handling
    const bgVideo = document.getElementById('vlink-bg-video');
    if (bgVideo) {
        bgVideo.volume = ${(theme.videoVolume ?? 50) / 100};
        bgVideo.muted = false;
        var playPromise = bgVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(function() {
                // Autoplay blocked. Mute it to allow visual playback, wait for interaction to unmute.
                bgVideo.muted = true;
                bgVideo.play();
                document.body.addEventListener('click', function playOnInteract() {
                    bgVideo.muted = false;
                    document.body.removeEventListener('click', playOnInteract);
                }, { once: true });
            });
        }
    }
    ` : ''}
    
    console.log('VLink Page Ready');
});
`;

        const toKabab = (str) => str ? str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() : '';

        // --- HTML Parts ---
        const getLinkStyles = (l, theme) => {
            const layout = l.layout || layoutType || 'classic';
            let styles = `
                border-radius: ${theme.btnRadius || 12}px;
                margin-bottom: ${theme.btnSpacing || 12}px;
                padding: ${layout === 'featured' ? '20px' : (layout === 'grid' ? '16px' : '12px 16px')};
                display: flex;
                align-items: center;
                gap: 12px;
                text-decoration: none;
                transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
                position: relative;
                overflow: hidden;
                width: 100%;
                z-index: 10;
            `;

            if (layout === 'grid') {
                styles += `flex-direction: column; justify-content: center; text-align: center; aspect-square: 1/1;`;
            }

            // Button Color & Type
            if (theme.btnStyle === 'glass') {
                const glassBg = theme.btnColor ?
                    (theme.btnColor.startsWith('#') ? `${theme.btnColor}1A` : theme.btnColor) :
                    'rgba(255,255,255,0.08)';
                styles += `background: ${glassBg}; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.12);`;
            } else if (theme.btnStyle === 'outline') {
                styles += `background: transparent; border: 2px solid ${theme.btnColor || '#ffffff'};`;
            } else if (theme.btnColorType === 'gradient') {
                styles += `background: linear-gradient(135deg, ${theme.btnColorGradient1 || '#8228d9'} 0%, ${theme.btnColorGradient2 || '#6366f1'} 100%); border: none;`;
            } else if (theme.btnColorType === 'pattern') {
                if (theme.btnColorPattern === 'dots') {
                    styles += `background-color: ${theme.btnColor || '#8228d9'}; background-image: radial-gradient(rgba(255,255,255,0.2) 1.5px, transparent 1.5px); background-size: 12px 12px;`;
                } else if (theme.btnColorPattern === 'stripes') {
                    styles += `background-color: ${theme.btnColor || '#8228d9'}; background-image: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent); background-size: 24px 24px;`;
                } else {
                    styles += `background: ${theme.btnColor || '#ffffff'};`;
                }
            } else {
                styles += `background: ${theme.btnColor || '#ffffff'}; border: none;`;
            }

            // Box-shadow is no longer used for solid shadows; we purely use the separate shadow div to support opacity and animations properly.

            // Text Style
            let textColor = theme.btnTextColor || '#ffffff';
            if (theme.btnStyle === 'solid' && !theme.btnTextColor) textColor = '#000000';
            styles += `color: ${textColor};`;

            return styles;
        };

        const getLinkShadowHtml = (theme) => {
            if (!theme.btnShadowType || theme.btnShadowType === 'none') return '';

            const spread = theme.btnShadowSpread || 0;
            const shadowAnimClass = theme.btnShadowAnimation && theme.btnShadowAnimation !== 'none' ? `animate-${theme.btnShadowAnimation}` : '';

            let shadowBg = `background-color: ${theme.btnShadowColor || '#000000'};`;

            if (theme.btnShadowType === 'gradient') {
                shadowBg = `background-image: linear-gradient(135deg, ${theme.btnShadowColorGradient1 || '#000'}, ${theme.btnShadowColorGradient2 || '#000'});`;
            } else if (theme.btnShadowType === 'pattern') {
                if (theme.btnShadowPattern === 'dots') {
                    shadowBg = `background-color: ${theme.btnShadowColor || '#000'}; background-image: radial-gradient(rgba(255,255,255,0.1) 1.5px, transparent 1.5px); background-size: 12px 12px;`;
                } else if (theme.btnShadowPattern === 'stripes') {
                    shadowBg = `background-color: ${theme.btnShadowColor || '#000'}; background-image: linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent); background-size: 24px 24px;`;
                } else if (theme.btnShadowPattern === 'noise') {
                    shadowBg = `background-color: ${theme.btnShadowColor || '#000'}; background-image: url('https://grain-y.com/assets/images/noise.png'); background-blend-mode: overlay;`;
                } else if (theme.btnShadowPattern === 'custom' && theme.btnShadowCustomPattern) {
                    shadowBg = `background-color: ${theme.btnShadowColor || '#000'}; background-image: url('${resolveUrl(theme.btnShadowCustomPattern, 'shadow_pattern')}'); background-size: cover; background-blend-mode: overlay;`;
                }
            }

            const outerStyle = `position: absolute; z-index: 5; inset: ${-spread}px; transform: translate(${theme.btnShadowX || 0}px, ${theme.btnShadowY || 4}px); pointer-events: none;`;
            const innerStyle = `position: absolute; inset: 0; border-radius: ${theme.btnRadius || 12}px; filter: blur(${theme.btnShadowBlur || 0}px); opacity: ${theme.btnShadowOpacity ?? (theme.btnShadowType === 'solid' ? 1 : 0.5)}; ${shadowBg}`;

            return `<div style="${outerStyle}"><div class="${shadowAnimClass}" style="${innerStyle}"></div></div>`;
        };

        const wallpaperStyles = () => {
            const style = theme.wallpaperStyle || 'fill';
            if (style === 'gradient') {
                if (theme.gradientDirection === 'radial') {
                    return `background: radial-gradient(circle at center, ${theme.gradientColor1 || '#FF512F'}, ${theme.gradientColor2 || '#DD2476'});`;
                }
                const deg = theme.gradientDirection === 'linear-up' ? '0deg' : '180deg';
                return `background: linear-gradient(${deg}, ${theme.gradientColor1 || '#FF512F'} 0%, ${theme.gradientColor2 || '#DD2476'} 100%);`;
            }
            if (style === 'blur') {
                return `background: ${theme.blurColor || theme.bg || '#000000'};`;
            }
            if (style === 'pattern') {
                return `background: ${theme.patternBackgroundColor || theme.bg || '#000000'};`;
            }
            if (style === 'video') {
                return `background: #000000;`;
            }
            return `background: ${theme.bg || '#000000'};`;
        };

        const getPatternStyle = (theme) => {
            const patternType = theme.patternType || 'dots';
            const color = theme.patternColor || '#ffffff';
            let backgroundStyle = {};

            switch (patternType) {
                case 'dots':
                    backgroundStyle = { backgroundImage: `radial-gradient(circle, ${color} 1.5px, transparent 1.5px)`, backgroundSize: '20px 20px' };
                    break;
                case 'stripes':
                    backgroundStyle = { backgroundImage: `repeating-linear-gradient(45deg, ${color} 0px, ${color} 2px, transparent 2px, transparent 8px)` };
                    break;
                case 'grid':
                    backgroundStyle = { backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`, backgroundSize: '20px 20px' };
                    break;
                case 'diagonal':
                    backgroundStyle = { backgroundImage: `repeating-linear-gradient(45deg, ${color} 0px, ${color} 1px, transparent 1px, transparent 8px)` };
                    break;
                case 'waves':
                    backgroundStyle = { backgroundImage: `radial-gradient(circle at 100% 50%, transparent 8px, ${color} 8px, ${color} 10px, transparent 10px), radial-gradient(circle at 0% 50%, transparent 8px, ${color} 8px, ${color} 10px, transparent 10px)`, backgroundSize: '30px 30px', backgroundPosition: '0 0, 15px 15px' };
                    break;
                case 'circles':
                    backgroundStyle = { backgroundImage: `radial-gradient(circle, ${color} 3px, transparent 3px)`, backgroundSize: '30px 30px' };
                    break;
                case 'hexagon':
                    backgroundStyle = { backgroundImage: `radial-gradient(circle at 50% 0, ${color} 18%, transparent 18%), radial-gradient(circle at 6.7% 75%, ${color} 18%, transparent 18%), radial-gradient(circle at 93.3% 75%, ${color} 18%, transparent 18%)`, backgroundSize: '30px 52px' };
                    break;
                case 'triangles':
                    backgroundStyle = { backgroundImage: `linear-gradient(30deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}), linear-gradient(150deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color})`, backgroundSize: '40px 70px', backgroundPosition: '0 0, 0 0, 20px 35px, 20px 35px' };
                    break;
                case 'zigzag':
                    backgroundStyle = { backgroundImage: `linear-gradient(135deg, ${color} 25%, transparent 25%), linear-gradient(225deg, ${color} 25%, transparent 25%), linear-gradient(45deg, ${color} 25%, transparent 25%), linear-gradient(315deg, ${color} 25%, transparent 25%)`, backgroundSize: '20px 20px', backgroundPosition: '10px 0, 10px 0, 0 0, 0 0' };
                    break;
                case 'checkerboard':
                    backgroundStyle = { backgroundImage: `linear-gradient(45deg, ${color} 25%, transparent 25%), linear-gradient(-45deg, ${color} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${color} 75%), linear-gradient(-45deg, transparent 75%, ${color} 75%)`, backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' };
                    break;
                case 'custom':
                    if (theme.customPatternImage) {
                        backgroundStyle = { backgroundImage: `url(${theme.customPatternImage})`, backgroundSize: '100px 100px', backgroundRepeat: 'repeat' };
                    } else {
                        backgroundStyle = { backgroundImage: `radial-gradient(circle, ${color} 1.5px, transparent 1.5px)`, backgroundSize: '20px 20px' };
                    }
                    break;
                default:
                    backgroundStyle = { backgroundImage: `radial-gradient(circle, ${color} 1.5px, transparent 1.5px)`, backgroundSize: '20px 20px' };
            }

            return Object.entries(backgroundStyle).map(([k, v]) => `${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}: ${v};`).join(' ');
        };

        const containerClass = layoutType === 'grid' ? 'grid grid-cols-2 gap-3 pb-4' :
            layoutType === 'carousel' ? 'flex overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar' :
                'flex flex-col gap-3';

        // --- Static SVG Icons ---
        const getSocialSvg = (platform, size) => {
            const s = size || 18;
            switch (platform?.toLowerCase()) {
                case 'instagram': return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`;
                case 'twitter': return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"></path></svg>`;
                case 'youtube': return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`;
                case 'github': return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`;
                case 'linkedin': return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`;
                case 'tiktok': return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" /></svg>`;
                case 'mail': return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
                default: return `<i data-lucide="${toKabab(platform)}" style="width: ${s}px; height: ${s}px;"></i>`;
            }
        };

        const getBrandColor = (platform) => {
            switch (platform?.toLowerCase()) {
                case 'instagram': return '#f472b6';
                case 'twitter': return '#60a5fa';
                case 'youtube': return '#ef4444';
                case 'github': return '#ffffff';
                case 'linkedin': return '#2563eb';
                case 'tiktok': return '#ffffff';
                case 'mail': return '#9ca3af';
                default: return '#ffffff';
            }
        };

        const getSocialColor = (platform, theme) => {
            if (theme.socialColorType === 'brand') {
                return getBrandColor(platform);
            }
            return theme.socialColorType === 'custom' ? theme.socialCustomColor : (theme.pageColor || '#ffffff');
        };

        const avatarAnimationClass = theme.headerAnimation && theme.headerAnimation !== 'none' ? `animate-${theme.headerAnimation}` : '';
        const titleAnimationClass = theme.titleAnimation && theme.titleAnimation !== 'none' ? (theme.titleAnimation === 'sweep' ? 'animate-sweep-text' : `animate-${theme.titleAnimation}`) : '';
        const bioAnimationClass = theme.pageAnimation && theme.pageAnimation !== 'none' ? (theme.pageAnimation === 'sweep' ? 'animate-sweep-text' : `animate-${theme.pageAnimation}`) : '';

        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${profile.username} | VLink Builder</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;700&family=Outfit:wght@400;500;700;800&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
CSSPLACEHOLDER
    </style>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['${theme.pageFont || 'Inter'}', 'sans-serif'],
                        heading: ['${theme.titleFont || 'Inter'}', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style>
        .social-btn { padding: 8px; transition: all 0.3s ease; opacity: 0.75; display: flex; align-items: center; gap: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; }
        .social-btn:hover { transform: translateY(-3px); opacity: 1; }
        
        /* Hero Styles */
        .hero-card {
            width: 100%;
            border-radius: 2.5rem;
            padding: 1rem;
            text-align: center;
            margin-bottom: 2.5rem;
            position: relative;
            z-index: 10;
            ${profile.heroModel === 'glass' ? 'background: rgba(255,255,255,0.08); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 20px 50px rgba(0,0,0,0.2);' :
                profile.heroModel === 'float' ? 'background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); transform: translateY(-10px);' :
                    profile.heroModel === 'joined' ? 'background: rgba(0,0,0,0.3); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1);' :
                        'background: transparent;'}
        }

        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .snap-x { scroll-snap-type: x mandatory; }
        .snap-center { scroll-snap-align: center; }

        /* Interaction Effects */
        .hover-lift:hover { transform: translateY(-6px); }
        .hover-scale:hover { transform: scale(1.03); }
        .hover-glow:hover { box-shadow: 0 0 20px rgba(255,255,255,0.3); }
        .active-push:active { transform: scale(0.95); }
        .active-inset:active { transform: scale(0.97); filter: brightness(0.8); }

        /* Desktop Frame Box */
        .desktop-frame-outer {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            min-height: 100vh;
            padding: 24px;
        }
        .desktop-frame-box {
            position: relative;
            width: 100%;
            max-width: 420px;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.10);
            border-radius: 32px;
            box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35);
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
            overflow: hidden;
        }
        /* Mobile: remove frame, fill screen */
        @media (max-width: 767px) {
            .desktop-frame-outer { padding: 0; display: block; }
            .desktop-frame-box {
                max-width: 100%;
                border-radius: 0;
                border: none;
                box-shadow: none;
                background: transparent;
                backdrop-filter: none;
                -webkit-backdrop-filter: none;
            }
        }
    </style>
</head>
<body class="antialiased font-sans">
    <div class="wallpaper-container" style="${wallpaperStyles()}">
        ${getEffectHtmlElements(theme.bgEffect, theme.bgEffectColor || '#ffffff')}
        ${theme.noise ? `<div style="position: absolute; inset: 0; background-image: url('https://grain-y.com/assets/images/noise.png'); opacity: 0.05; pointer-events: none; z-index: 1;"></div>` : ''}
        
        ${(theme.wallpaperStyle === 'image' || theme.wallpaperStyle === 'blur') && theme.backgroundImage ? `
            <img src="${resolveUrl(theme.backgroundImage, 'wallpaper')}" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: ${theme.imageOpacity ?? 1}; filter: blur(${theme.imageBlur ?? 0}px); z-index: 0;">
        ` : ''}
        
        ${theme.wallpaperStyle === 'video' && theme.backgroundVideo ? `
            <video id="vlink-bg-video" src="${resolveUrl(theme.backgroundVideo, 'bg_video')}" autoplay muted playsinline loop style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: ${theme.videoOpacity ?? 1}; filter: blur(${theme.videoBlur ?? 0}px); z-index: 0;"></video>
        ` : ''}
        
        ${theme.wallpaperStyle === 'blur' ? `
            <div style="position: absolute; inset: -30%; background: ${theme.backgroundImage ? `url(${resolveUrl(theme.backgroundImage, 'wallpaper')}) center/cover no-repeat` : (theme.blurColor || theme.bg || '#ffffff')}; filter: blur(${theme.blurIntensity || 40}px) saturate(1.5); opacity: 0.6; transform: scale(1.1); z-index: 1;"></div>
        ` : ''}
        
        ${theme.wallpaperStyle === 'pattern' ? `
            <div style="position: absolute; inset: 0; opacity: ${theme.patternOpacity ?? 0.15}; filter: ${theme.patternBlur ? `blur(${theme.patternBlur}px)` : 'none'}; ${getPatternStyle(theme)}; z-index: 2;"></div>
        ` : ''}
    </div>

    <div class="desktop-frame-outer">
        <div class="desktop-frame-box">
            <div class="flex flex-col items-center pt-6 pb-16 px-6 relative z-10 text-center">
        
        <!-- Header -->
        <header class="w-full flex flex-col items-center animate-fade-in-up">
            ${profile.headerLayout === 'hero' ? `
                <div class="hero-card" style="margin-top: ${profile.spacingAvatar ?? 16}px;">
                    ${profile.showAvatar ? `<img src="${resolveUrl(profile.avatar, 'avatar') || ''}" class="w-24 h-24 rounded-full mx-auto border-4 border-white/10 object-cover shadow-2xl ${avatarAnimationClass}" style="margin-bottom: 24px;" />` : ''}
                    
                    ${theme.titleStyle === 'text' ? `
                        <h1 class="text-3xl font-bold font-heading ${titleAnimationClass}" style="color: ${theme.titleColor || '#ffffff'}; margin-top: ${profile.spacingUsername ?? 12}px;">${profile.username}</h1>
                    ` : `
                        <div class="flex justify-center ${titleAnimationClass}" style="transform: scale(${(theme.titleLogoSize || 100) / 100}); margin-top: ${profile.spacingUsername ?? 12}px;">
                            ${theme.titleLogo ? `<img src="${resolveUrl(theme.titleLogo, 'logo')}" style="max-height: 80px; width: auto; object-fit: contain;">` : `<div class="w-32 h-10 bg-white/10 rounded-lg flex items-center justify-center text-[10px] opacity-30 font-bold uppercase tracking-widest">Logo</div>`}
                        </div>
                    `}
                    
                    ${profile.showBio ? `<p class="text-base opacity-90 leading-relaxed ${bioAnimationClass}" style="color: ${theme.pageColor || 'rgba(255,255,255,0.8)'}; margin-top: ${profile.spacingBio ?? 6}px;">${profile.bio}</p>` : ''}
                </div>
            ` : `
                ${profile.showAvatar ? `<img src="${resolveUrl(profile.avatar, 'avatar') || ''}" class="w-28 h-28 rounded-full border-4 border-white/10 object-cover shadow-xl ${avatarAnimationClass}" style="margin-top: ${profile.spacingAvatar ?? 16}px;" />` : ''}
                
                ${theme.titleStyle === 'text' ? `
                    <h1 class="text-2xl font-bold font-heading ${titleAnimationClass}" style="color: ${theme.titleColor || '#ffffff'}; margin-top: ${profile.spacingUsername ?? 12}px;">${profile.username}</h1>
                ` : `
                    <div class="flex justify-center ${titleAnimationClass}" style="transform: scale(${(theme.titleLogoSize || 100) / 100}); margin-top: ${profile.spacingUsername ?? 12}px;">
                        ${theme.titleLogo ? `<img src="${resolveUrl(theme.titleLogo, 'logo')}" style="max-height: 60px; width: auto; object-fit: contain;">` : `<div class="w-32 h-8 bg-white/10 rounded-lg flex items-center justify-center text-[8px] opacity-30 font-bold uppercase tracking-widest">Logo</div>`}
                    </div>
                `}
                
                ${profile.showBio ? `<p class="text-sm opacity-80 leading-relaxed max-w-[280px] ${bioAnimationClass}" style="color: ${theme.pageColor || 'rgba(255,255,255,0.7)'}; margin-top: ${profile.spacingBio ?? 6}px;">${profile.bio}</p>` : ''}
            `}
            
            ${theme.socialPosition === 'top' ? `<div class="flex flex-wrap w-full ${theme.socialAlignment === 'left' ? 'justify-start' : theme.socialAlignment === 'right' ? 'justify-end' : 'justify-center'} animate-fade-in-up" style="gap: ${(theme.socialSpacing || 16) * 0.75}px; margin-top: 16px; animation-delay: 0.1s;">${socials.filter(s => s.url).map((s, i) => `
            <div class="animate-fade-in-up shrink-0" style="animation-delay: ${0.2 + (i * 0.1)}s;">
                <a href="${s.url}" target="_blank" class="social-btn ${theme.socialHover === 'lift' ? 'hover-lift' : theme.socialHover === 'scale' ? 'hover-scale' : theme.socialHover === 'glow' ? 'hover-glow' : ''} ${theme.socialAnimation && theme.socialAnimation !== 'none' ? (theme.socialAnimation === 'sweep' ? 'animate-sweep' : `animate-${theme.socialAnimation}`) : ''}" style="color: ${getSocialColor(s.platform, theme)}; font-family: ${theme.socialFont || 'Inter'}; font-weight: ${theme.socialTextWeight || 700}; animation-delay: ${i * 0.3}s;">
                    ${getSocialSvg(s.platform, theme.socialSize)}
                    ${theme.socialStyle === 'icon-text' ? `<span${theme.socialAnimation === 'sweep' ? ' class="animate-sweep-text"' : ''}>${s.platform}</span>` : ''}
                </a>
            </div>
        `).join('')}</div>` : ''}
        </header>

        <!-- Links -->
        <main class="w-full ${containerClass} animate-fade-in-up" style="animation-delay: 0.15s; margin-top: ${profile.spacingLinks ?? 20}px;">
            ${links.filter(l => l.active).map((l, i) => {
                            const layout = l.layout || layoutType || 'classic';
                            const animationClass = theme.btnAnimation && theme.btnAnimation !== 'none' ? `animate-${theme.btnAnimation}` : '';
                            const shineClass = theme.btnHoverEffect === 'shine' ? 'animate-shine' : '';
                            const itemClass = layoutType === 'carousel' ? 'min-w-[85%] snap-center' : '';

                            // Media rendering logic matching LinkItem.jsx
                            let mediaHtml = '';
                            if (l.thumbnail) {
                                const mediaClass = layout === 'grid' ? 'w-12 h-12 rounded-2xl mb-2' :
                                    (layout === 'showcase' && i === 0) || layout === 'featured' ? 'w-20 h-20 rounded-2xl mr-4' :
                                        'w-10 h-10 rounded-xl mr-3';
                                mediaHtml = `<div class="shrink-0 overflow-hidden ${mediaClass}"><img src="${resolveUrl(l.thumbnail, 'thumb')}" class="w-full h-full object-cover"></div>`;
                            } else if (l.icon) {
                                const iconSize = layout === 'grid' ? 20 : ((layout === 'showcase' && i === 0) || layout === 'featured' ? 28 : 20);
                                const mediaClass = layout === 'grid' ? 'w-10 h-10 rounded-xl mb-2' :
                                    (layout === 'showcase' && i === 0) || layout === 'featured' ? 'w-14 h-14 rounded-2xl mr-4' :
                                        'w-9 h-9 rounded-lg mr-3';
                                mediaHtml = `<div class="shrink-0 flex items-center justify-center bg-white/10 ${mediaClass} text-current">${getSocialSvg(l.icon, iconSize)}</div>`;
                            }

                            const hoverClass = theme.btnHoverEffect === 'lift' ? 'hover-lift' : theme.btnHoverEffect === 'scale' ? 'hover-scale' : theme.btnHoverEffect === 'glow' ? 'hover-glow' : '';
                            const activeClass = theme.btnPressEffect === 'push' ? 'active-push' : theme.btnPressEffect === 'inset' ? 'active-inset' : '';
                            const shadowHtml = getLinkShadowHtml(theme);

                            return `
                <div class="relative w-full ${itemClass}" style="margin-bottom: ${theme.btnSpacing || 12}px;">
                    ${shadowHtml}
                    <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="link-item ${animationClass} ${shineClass} ${hoverClass} ${activeClass}" style="${getLinkStyles(l, theme)} margin-bottom: 0;">
                        ${theme.btnHoverEffect === 'shine' ? '<div class="absolute inset-0 shine-overlay pointer-events-none" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transform: translateX(-100%) skewX(-15deg);"></div>' : ''}
                        
                        ${mediaHtml}
                        
                        <div class="flex-1 min-w-0 flex flex-col ${layout === 'grid' ? 'items-center' : ''}">
                            <span class="truncate" style="font-family: ${theme.btnFont || 'Inter'}; font-weight: ${theme.btnTextWeight || 600}; font-size: ${layout === 'featured' ? '18px' : (layout === 'grid' ? '11px' : (theme.btnFontSize || 14) + 'px')};">${l.title}</span>

                        </div>
                        
                        ${layout !== 'grid' ? `
                            <div class="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity ml-auto">
                                <i data-lucide="chevron-right" style="width: 12px;"></i>
                            </div>
                        ` : ''}
                    </a>
                </div>`;
                        }).join('\n')}
        </main>


        <!-- Bottom Socials -->
        ${theme.socialPosition === 'bottom' ? `<div class="flex flex-wrap w-full border-t border-white/5 pt-5 mt-10 mb-6 ${theme.socialAlignment === 'left' ? 'justify-start' : theme.socialAlignment === 'right' ? 'justify-end' : 'justify-center'} animate-fade-in-up" style="gap: ${(theme.socialSpacing || 16) * 0.75}px; animation-delay: 0.3s;">${socials.filter(s => s.url).map((s, i) => `
            <div class="animate-fade-in-up shrink-0" style="animation-delay: ${0.4 + (i * 0.1)}s;">
                <a href="${s.url}" target="_blank" class="social-btn ${theme.socialHover === 'lift' ? 'hover-lift' : theme.socialHover === 'scale' ? 'hover-scale' : theme.socialHover === 'glow' ? 'hover-glow' : ''} ${theme.socialAnimation && theme.socialAnimation !== 'none' ? (theme.socialAnimation === 'sweep' ? 'animate-sweep' : `animate-${theme.socialAnimation}`) : ''}" style="color: ${getSocialColor(s.platform, theme)}; font-family: ${theme.socialFont || 'Inter'}; font-weight: ${theme.socialTextWeight || 700}; animation-delay: ${i * 0.3}s;">
                    ${getSocialSvg(s.platform, theme.socialSize)}
                    ${theme.socialStyle === 'icon-text' ? `<span${theme.socialAnimation === 'sweep' ? ' class="animate-sweep-text"' : ''}>${s.platform}</span>` : ''}
                </a>
            </div>
        `).join('')}</div>` : ''}

        <!-- Greeting Card -->
        ${theme.showFooter ? `
        <div class="mt-4 p-6 rounded-3xl text-left w-full border relative overflow-hidden ${theme.footerAnimation && theme.footerAnimation !== 'none' ? `animate-${theme.footerAnimation}` : 'animate-fade-in-up'}" style="animation-delay: 0.3s; background: ${theme.footerBtnStyle === 'glass' ? 'rgba(255,255,255,0.06)' : theme.footerBtnColor}; border-color: rgba(255,255,255,0.1); border-radius: ${theme.footerBtnRadius}px; backdrop-filter: ${theme.footerBtnStyle === 'glass' ? 'blur(20px)' : 'none'}; -webkit-backdrop-filter: ${theme.footerBtnStyle === 'glass' ? 'blur(20px)' : 'none'};">
            <div class="flex items-center gap-2 mb-2 relative z-10">
                <i data-lucide="heart" style="width: 14px; color: #a855f7; fill: rgba(168,85,247,0.1);"></i>
                <h3 class="font-bold text-xs tracking-tight" style="color: ${theme.footerBtnTextColor || '#ffffff'}">${theme.footerGreetingTitle}</h3>
            </div>
            <p class="text-[10px] opacity-70 leading-relaxed relative z-10 font-medium" style="color: ${theme.footerBtnTextColor || '#ffffff'}">${theme.footerGreetingDesc}</p>
        </div>` : ''}

        <footer class="mt-12 w-full animate-fade-in-up pb-12" style="animation-delay: 0.5s;">
            ${theme.showVlink ? `
            <div class="flex flex-col items-center gap-2">
                <div class="h-px w-8 bg-white/5 mb-2"></div>
                <div class="opacity-30 flex items-center justify-center gap-1.5 transition-opacity hover:opacity-100 duration-300">
                    <span class="text-[10px] font-medium tracking-tight text-white/60">Made with</span>
                    <span class="text-[10px] font-bold text-white uppercase tracking-tighter">Vlink.id x rizddf</span>
                </div>
            </div>` : ''}
        </footer>
            </div>
        </div>
    </div>



    <!-- Scripts -->
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script>
JSPLACEHOLDER
    </script>
</body>
</html>`;

        // Inline CSS and JS into the single HTML
        const singleHtml = htmlContent
            .replace('CSSPLACEHOLDER', cssContent)
            .replace('JSPLACEHOLDER', jsContent);

        setAssetMap(assets);
        setHtmlCode(singleHtml);
    };

    const urlToBase64 = (url) => {
        return new Promise((resolve, reject) => {
            if (!url || !url.startsWith('blob:')) return resolve(url);
            fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                })
                .catch(reject);
        });
    };

    const getInlinedHtml = async () => {
        let code = htmlCode;
        const tempAssets = { ...assetMap };
        for (const [blobUrl, fileName] of Object.entries(tempAssets)) {
            try {
                const base64 = await urlToBase64(blobUrl);
                code = code.split(`assets/${fileName}`).join(base64);
            } catch (e) {
                console.error('Base64 conversion failed:', e);
            }
        }
        return code;
    };

    const handleCopy = async () => {
        const code = await getInlinedHtml();
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = async () => {
        const singleHtml = await getInlinedHtml();
        const blob = new Blob([singleHtml], { type: 'text/html;charset=utf-8' });
        saveAs(blob, `${(profile.username || 'vlinktree').replace(/\s+/g, '-').toLowerCase()}-export.html`);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <div
                className="relative bg-[#121212] border border-white/10 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-white/5 bg-[#121212]">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Code className="text-blue-400" size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Export Code</h2>
                            <p className="text-xs text-white/40">Download your VLink Builder as a single HTML file</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 flex overflow-hidden">
                    {/* File label bar */}
                    <div className="w-full flex flex-col overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0f0f0f] border-b border-white/5 shrink-0">
                            <FileCode size={14} className="text-orange-400" />
                            <span className="text-xs font-medium text-orange-400">index.html</span>
                            <span className="ml-auto text-[10px] text-white/20 font-mono">CSS + JS inlined</span>
                        </div>

                        {/* Code Editor Preview */}
                        <div className="flex-1 flex flex-col bg-[#0c0c0c] relative group overflow-hidden">
                            <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-xs font-medium text-white/70 transition-colors backdrop-blur-md"
                                >
                                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            </div>

                            <div className="flex-1 overflow-auto p-6 custom-scrollbar">
                                <pre className="font-mono text-xs sm:text-sm leading-relaxed text-white/70 whitespace-pre-wrap select-text font-light">
                                    <code>{htmlCode}</code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-white/5 bg-[#121212] flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white font-medium hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDownload}
                        className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg shadow-white/5"
                    >
                        <Download size={16} />
                        Download HTML
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportModal;
