import React, { useEffect, useState } from 'react';
import { getEffectHtmlElements, getBgEffectRawCss } from '../data/bg-effects';

const BackgroundEffects = ({ theme }) => {
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        if (!theme.bgEffect || theme.bgEffect === 'none') {
            setHtmlContent('');
            return;
        }

        // Add the keyframes and css dynamically if not already present
        if (!document.getElementById('bg-effects-raw-css')) {
            const style = document.createElement('style');
            style.id = 'bg-effects-raw-css';
            style.innerHTML = getBgEffectRawCss();
            document.head.appendChild(style);
        }

        const colorHex = theme.bgEffectColor || '#ffffff';
        const html = getEffectHtmlElements(theme.bgEffect, colorHex);
        setHtmlContent(html);
    }, [theme.bgEffect, theme.bgEffectColor]);

    if (!theme.bgEffect || theme.bgEffect === 'none') return null;

    return (
        <div 
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default BackgroundEffects;
