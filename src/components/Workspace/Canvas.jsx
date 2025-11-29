import React from 'react';
import { MoreHorizontal, Link as LinkIcon, Edit3, Move } from 'lucide-react';
import { useWorkflow } from '../../context/WorkflowContext';

const CanvasCard = ({ item, x, y, onDraft }) => {
    return (
        <div className="frosted-glass card-surface" style={{
            position: 'absolute',
            left: x, top: y,
            width: '280px',
            padding: '16px',
            cursor: 'grab',
            zIndex: 10
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'hsl(var(--primary))', textTransform: 'uppercase' }}>{item.type}</span>
                <MoreHorizontal size={16} color="hsl(var(--text-muted))" />
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '8px', lineHeight: '1.4' }}>{item.title}</h4>
            <p style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', marginBottom: '12px' }}>{item.summary}</p>

            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    onClick={() => onDraft(item)}
                    style={{
                        flex: 1, padding: '6px', borderRadius: '6px', border: 'none',
                        background: 'hsl(var(--primary))', color: 'white', fontSize: '0.8rem', fontWeight: 500,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                    }}
                >
                    <Edit3 size={12} /> Draft Insight
                </button>
            </div>
        </div>
    );
};

const Canvas = () => {
    const { pinnedItems, addToEditor } = useWorkflow();

    const handleDraft = (item) => {
        const text = `## Insight from ${item.source}\n\nBased on "${item.title}", it is crucial to note that: ${item.summary}\n\n(Source: ${item.source}, ${item.date})`;
        addToEditor(text);
        alert("Added to Insights Draft!");
    };

    return (
        <div style={{
            height: '100%', width: '100%',
            position: 'relative',
            overflow: 'hidden',
            backgroundSize: '40px 40px',
            backgroundImage: 'radial-gradient(circle, hsla(var(--text-muted), 0.2) 1px, transparent 1px)'
        }}>
            {/* Toolbar */}
            <div style={{
                position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
                background: 'hsla(var(--bg-surface), 0.8)', backdropFilter: 'blur(12px)',
                padding: '8px 16px', borderRadius: 'var(--radius-full)',
                border: '1px solid hsla(var(--border-subtle))',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex', gap: '16px', zIndex: 50
            }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Canvas</span>
                <div style={{ width: '1px', height: '20px', background: 'hsla(var(--border-subtle))' }} />
                <span style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>{pinnedItems.length} items pinned</span>
                <div style={{ width: '1px', height: '20px', background: 'hsla(var(--border-subtle))' }} />
                <button style={{ padding: '4px', border: 'none', background: 'transparent', cursor: 'pointer' }}><Move size={18} /></button>
                <button style={{ padding: '4px', border: 'none', background: 'transparent', cursor: 'pointer' }}><LinkIcon size={18} /></button>
            </div>

            {/* Cards */}
            {pinnedItems.map((item, index) => (
                <CanvasCard
                    key={item.id}
                    item={item}
                    x={100 + (index * 50)}
                    y={100 + (index * 50)}
                    onDraft={handleDraft}
                />
            ))}

            {pinnedItems.length === 0 && (
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    color: 'hsl(var(--text-muted))', textAlign: 'center'
                }}>
                    Pin items from Omni Search to organize them here.
                </div>
            )}
        </div>
    );
};

export default Canvas;
