import React from 'react';
import { FileText, Video, File, MoreHorizontal, Plus } from 'lucide-react';
import { useWorkflow } from '../../context/WorkflowContext';

const ResultCard = ({ item, onPin }) => {
    const getIcon = () => {
        if (item.type === 'video') return <Video size={20} color="var(--color-web)" />;
        if (item.type === 'pdf') return <File size={20} color="var(--color-file)" />;
        return <FileText size={20} color="var(--color-code)" />;
    };

    return (
        <div className="frosted-glass card-surface" style={{
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            cursor: 'pointer',
            height: '100%'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                    padding: '8px', borderRadius: '12px',
                    background: 'hsla(var(--bg-app), 0.5)',
                    border: '1px solid hsla(var(--border-subtle))'
                }}>
                    {getIcon()}
                </div>
                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'hsl(var(--text-muted))' }}>
                    <MoreHorizontal size={18} />
                </button>
            </div>

            <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '6px', lineHeight: '1.4' }}>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))', lineHeight: '1.5' }}>{item.summary}</p>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'hsl(var(--text-muted))' }}>{item.source} • {item.date}</span>
                <button
                    onClick={() => onPin(item)}
                    style={{
                        padding: '6px 12px', borderRadius: 'var(--radius-full)',
                        border: '1px solid hsla(var(--primary), 0.3)',
                        background: 'hsla(var(--primary), 0.1)',
                        color: 'hsl(var(--primary))',
                        fontSize: '0.8rem', fontWeight: 600,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                    }}
                >
                    <Plus size={14} /> Pin
                </button>
            </div>
        </div>
    );
};

const OmniSearch = () => {
    const { searchResults, pinItem } = useWorkflow();

    return (
        <div style={{ padding: 'var(--space-lg)', height: '100%', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-lg)', letterSpacing: '-0.03em' }}>
                Omni Search <span style={{ color: 'hsl(var(--text-muted))', fontWeight: 400 }}>({searchResults.length} results)</span>
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                paddingBottom: '40px'
            }}>
                {searchResults.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'hsl(var(--text-muted))', marginTop: '40px' }}>
                        Start a search to see results from the Agent.
                    </div>
                ) : (
                    searchResults.map(item => (
                        <ResultCard key={item.id} item={item} onPin={pinItem} />
                    ))
                )}
            </div>
        </div>
    );
};

export default OmniSearch;
