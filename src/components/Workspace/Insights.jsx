import React from 'react';
import { Quote, FileText, Download, Share2 } from 'lucide-react';

const Insights = () => {
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            {/* Document Area */}
            <div className="light-panel" style={{
                flex: 1,
                padding: 'var(--space-xl)',
                overflowY: 'auto',
                maxWidth: '800px',
                margin: '0 auto',
                background: 'white',
                boxShadow: 'var(--shadow-sm)',
                minHeight: '100%'
            }}>
                <div style={{ marginBottom: 'var(--space-xl)', borderBottom: '1px solid hsla(var(--border-subtle))', paddingBottom: '20px' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Sustainable Packaging Strategy</h1>
                    <div style={{ display: 'flex', gap: '12px', color: 'hsl(var(--text-muted))', fontSize: '0.9rem' }}>
                        <span>Last edited just now</span>
                        <span>•</span>
                        <span>4 Sources Linked</span>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Insights;
