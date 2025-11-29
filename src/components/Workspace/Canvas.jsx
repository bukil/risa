import React from 'react';
import { Move, Link, MoreVertical } from 'lucide-react';

const CanvasCard = ({ title, x, y, color }) => (
    <div className="card-surface" style={{
        position: 'absolute',
        left: x,
        top: y,
        width: '240px',
        padding: '16px',
        background: 'white',
        cursor: 'grab',
        zIndex: 1
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ width: '30px', height: '4px', background: color, borderRadius: '4px' }} />
            <MoreVertical size={14} color="hsl(var(--text-muted))" />
        </div>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '8px' }}>{title}</h4>
        <p style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', lineHeight: '1.4' }}>
            Extracted snippet from the source material. This represents a key finding.
        </p>
    </div>
);

const Canvas = () => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, hsla(var(--text-muted), 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ padding: 'var(--space-lg)', pointerEvents: 'none' }}>
                <h1 style={{ fontSize: '1.5rem' }}>Research Canvas</h1>
                <p style={{ color: 'hsl(var(--text-muted))' }}>Cluster and organize your findings spatially.</p>
            </div>

            {/* Mock Cluster 1 */}
            <div style={{
                position: 'absolute', top: '100px', left: '100px',
                width: '550px', height: '400px',
                border: '2px dashed hsla(var(--primary), 0.2)',
                borderRadius: 'var(--radius-lg)',
                background: 'hsla(var(--primary), 0.02)'
            }}>
                <div style={{
                    position: 'absolute', top: '-12px', left: '20px',
                    background: 'hsl(var(--primary))', color: 'white',
                    padding: '2px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600
                }}>
                    Market Trends
                </div>

                <CanvasCard title="Growth in 2025" x={40} y={40} color="var(--primary)" />
                <CanvasCard title="Consumer Shift" x={280} y={80} color="var(--secondary)" />
                <CanvasCard title="APAC Region Analysis" x={100} y={200} color="var(--accent)" />

                {/* Connection Line Mockup */}
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                    <path d="M 160 120 Q 220 120 280 140" stroke="hsla(var(--text-muted), 0.3)" strokeWidth="2" fill="none" strokeDasharray="4" />
                    <path d="M 160 120 Q 160 200 220 260" stroke="hsla(var(--text-muted), 0.3)" strokeWidth="2" fill="none" strokeDasharray="4" />
                </svg>
            </div>

            {/* Floating Controls */}
            <div className="card-surface" style={{
                position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
                padding: '8px', display: 'flex', gap: '8px', borderRadius: 'var(--radius-full)'
            }}>
                <button style={{ padding: '8px', border: 'none', background: 'transparent', cursor: 'pointer' }}><Move size={18} /></button>
                <button style={{ padding: '8px', border: 'none', background: 'transparent', cursor: 'pointer' }}><Link size={18} /></button>
            </div>
        </div>
    );
};

export default Canvas;
