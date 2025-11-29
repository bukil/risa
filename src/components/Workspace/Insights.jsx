import React from 'react';
import { Quote, FileText, Download, Share2 } from 'lucide-react';

const Insights = () => {
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            {/* Document Area */}
            <div style={{
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

                <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'hsl(var(--text-main))' }}>
                    <p style={{ marginBottom: '24px' }}>
                        The shift towards sustainable packaging is no longer just a trend but a regulatory necessity.
                        <span style={{
                            background: 'hsla(var(--primary), 0.15)',
                            borderBottom: '2px solid hsl(var(--primary))',
                            padding: '0 4px', margin: '0 4px', borderRadius: '4px', cursor: 'pointer'
                        }}>
                            Recent reports indicate a 40% growth in bioplastics by 2025
                        </span>
                        driven largely by consumer demand in the APAC region.
                    </p>

                    <h3 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px' }}>Key Drivers</h3>
                    <p style={{ marginBottom: '24px' }}>
                        Regulatory frameworks in the EU are tightening, forcing CPG companies to rethink their supply chains.
                        <span style={{
                            background: 'hsla(var(--secondary), 0.15)',
                            borderBottom: '2px solid hsl(var(--secondary))',
                            padding: '0 4px', margin: '0 4px', borderRadius: '4px', cursor: 'pointer'
                        }}>
                            The "Green Deal" initiative
                        </span>
                        sets a precedent that other markets are likely to follow.
                    </p>

                    <div style={{
                        background: 'hsla(var(--bg-app), 0.5)',
                        padding: '24px',
                        borderRadius: 'var(--radius-md)',
                        borderLeft: '4px solid hsl(var(--accent))',
                        margin: '40px 0',
                        fontStyle: 'italic'
                    }}>
                        "Innovation in material science is outpacing adoption rates, creating a gap between capability and implementation."
                        <div style={{ marginTop: '12px', fontSize: '0.9rem', fontWeight: 600, color: 'hsl(var(--accent))' }}>— Industry Expert Interview</div>
                    </div>
                </div>
            </div>

            {/* Citations Sidebar */}
            <div style={{
                width: '300px',
                borderLeft: '1px solid hsla(var(--border-subtle))',
                background: 'hsla(var(--bg-sidebar), 0.5)',
                padding: 'var(--space-lg)'
            }}>
                <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Quote size={16} /> Citations
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="card-surface" style={{ padding: '12px', borderLeft: '3px solid hsl(var(--primary))' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Bioplastics Market Report</div>
                        <div style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Page 42 • Table 3.1</div>
                    </div>

                    <div className="card-surface" style={{ padding: '12px', borderLeft: '3px solid hsl(var(--secondary))' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>EU Green Deal Policy</div>
                        <div style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Section 4.2 • Waste Management</div>
                    </div>
                </div>

                <div style={{ marginTop: '40px', display: 'flex', gap: '12px' }}>
                    <button className="card-surface" style={{ flex: 1, padding: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        <Download size={16} /> Export
                    </button>
                    <button className="card-surface" style={{ flex: 1, padding: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        <Share2 size={16} /> Share
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Insights;
