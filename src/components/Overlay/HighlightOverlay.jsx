import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const HighlightOverlay = ({ targetId, explanation, onNext, isLastStep }) => {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        const updatePosition = () => {
            const element = document.getElementById(targetId);
            if (element) {
                const rect = element.getBoundingClientRect();
                setPosition({
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height
                });
            }
        };

        // Initial update
        updatePosition();

        // Update on resize and scroll
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        // Small timeout to ensure DOM is ready if mounting simultaneously
        const timer = setTimeout(updatePosition, 100);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
            clearTimeout(timer);
        };
    }, [targetId]);

    if (!position) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            pointerEvents: 'none', // Let clicks pass through generally
            overflow: 'hidden'
        }}>
            {/* Spotlight Effect using Box Shadow */}
            <div style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: position.width,
                height: position.height,
                borderRadius: '12px',
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)', // The dark overlay
                transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                pointerEvents: 'none'
            }} />

            {/* Active Border */}
            <div style={{
                position: 'absolute',
                top: position.top - 4,
                left: position.left - 4,
                width: position.width + 8,
                height: position.height + 8,
                borderRadius: '16px',
                border: '2px solid hsl(var(--primary))',
                boxShadow: '0 0 30px hsla(var(--primary), 0.4)',
                pointerEvents: 'none',
                animation: 'pulse 2s infinite'
            }} />

            {/* Explanation Card */}
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '320px',
                background: 'hsla(var(--bg-surface), 0.95)',
                backdropFilter: 'blur(16px)',
                padding: '24px',
                borderRadius: '20px',
                border: '1px solid hsla(var(--primary), 0.3)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                pointerEvents: 'auto',
                animation: 'slideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                zIndex: 10000
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <div style={{
                        padding: '6px', borderRadius: '8px',
                        background: 'hsla(var(--primary), 0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Sparkles size={16} color="hsl(var(--primary))" />
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'hsl(var(--primary))', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        AI Insight
                    </span>
                </div>

                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'hsl(var(--text-main))', marginBottom: '24px' }}>
                    {explanation}
                </p>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onNext}
                        style={{
                            background: 'hsl(var(--primary))',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 12px hsla(var(--primary), 0.3)',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 6px 16px hsla(var(--primary), 0.4)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px hsla(var(--primary), 0.3)';
                        }}
                    >
                        {isLastStep ? 'Done' : 'Next'} <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 hsla(var(--primary), 0.4); border-color: hsla(var(--primary), 1); }
                    50% { box-shadow: 0 0 0 10px hsla(var(--primary), 0); border-color: hsla(var(--primary), 0.5); }
                    100% { box-shadow: 0 0 0 0 hsla(var(--primary), 0.4); border-color: hsla(var(--primary), 1); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
};

export default HighlightOverlay;
