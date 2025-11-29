import React from 'react';
import { Plus, ExternalLink, MoreHorizontal } from 'lucide-react';

const OmniSearch = () => {
    const results = [
        { id: 1, title: 'Future of Sustainable Packaging', type: 'Article', color: 'var(--primary-soft)', size: 'large' },
        { id: 2, title: 'Bioplastics Market Report', type: 'PDF', color: '#e0f2f1', size: 'medium' }, // Mint
        { id: 3, title: 'Competitor Analysis 2024', type: 'Sheet', color: '#fff3e0', size: 'small' }, // Orange
        { id: 4, title: 'Design Trends', type: 'Image', color: '#f3e5f5', size: 'medium' }, // Purple
        { id: 5, title: 'User Interviews', type: 'Video', color: '#e8eaf6', size: 'small' }, // Indigo
        { id: 6, title: 'Regulatory Guidelines', type: 'Doc', color: '#ffebee', size: 'large' }, // Red
    ];

    return (
        <div style={{ padding: 'var(--space-lg)', height: '100%', overflowY: 'auto' }}>
            <div style={{ marginBottom: 'var(--space-lg)' }}>
                <h1 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Omni Search</h1>
                <p style={{ color: 'hsl(var(--text-muted))' }}>Exploring "Sustainable Packaging Solutions"</p>
            </div>

            {/* Mosaic Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gridAutoRows: '200px',
                gap: 'var(--space-md)'
            }}>
                {results.map((item) => (
                    <div key={item.id} className="card-surface" style={{
                        gridRow: item.size === 'large' ? 'span 2' : 'span 1',
                        background: item.color,
                        padding: 'var(--space-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative',
                        cursor: 'pointer'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <span style={{
                                fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px',
                                fontWeight: 600, opacity: 0.6
                            }}>{item.type}</span>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', opacity: 0.5 }}>
                                <MoreHorizontal size={16} />
                            </button>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', lineHeight: '1.3' }}>{item.title}</h3>
                            <p style={{ fontSize: '0.8rem', color: 'hsla(0,0%,0%,0.5)', lineHeight: '1.5' }}>
                                Agent summary of the content goes here. It provides a quick glimpse into the source.
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                            <button style={{
                                flex: 1, padding: '6px', borderRadius: 'var(--radius-full)', border: 'none',
                                background: 'white', fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}>
                                <Plus size={12} /> Pin to Canvas
                            </button>
                            <button style={{
                                padding: '6px', borderRadius: 'var(--radius-full)', border: 'none',
                                background: 'rgba(255,255,255,0.5)', cursor: 'pointer'
                            }}>
                                <ExternalLink size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OmniSearch;
