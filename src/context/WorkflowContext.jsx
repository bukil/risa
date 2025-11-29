import React, { createContext, useContext, useState } from 'react';

const WorkflowContext = createContext();

export const useWorkflow = () => useContext(WorkflowContext);

export const WorkflowProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([
        { id: 'default-1', type: 'pdf', title: 'Future of Sustainable Packaging', source: 'Industry Report 2024', summary: 'Key trends in biodegradable materials and circular economy.', date: 'Oct 12' },
        { id: 'default-2', type: 'video', title: 'Bioplastics vs. Recycled PET', source: 'GreenTech Summit', summary: 'Panel discussion on cost-benefit analysis of new materials.', date: 'Nov 01' },
        { id: 'default-3', type: 'article', title: 'Consumer Sentiment Q3', source: 'Nielsen Data', summary: 'Survey results showing 60% willingness to pay for eco-packaging.', date: 'Yesterday' },
        { id: 'default-4', type: 'pdf', title: 'EU Regulatory Framework', source: 'European Commission', summary: 'Draft guidelines for single-use plastic reduction targets.', date: '2 days ago' },
    ]);
    const [pinnedItems, setPinnedItems] = useState([]);
    const [insightContent, setInsightContent] = useState('');
    const [metrics, setMetrics] = useState({
        sourcesExplored: 0,
        agentAssists: 0,
        humanInterventions: 0,
    });

    const addSearchResult = (result) => {
        setSearchResults(prev => [result, ...prev]);
        setMetrics(prev => ({ ...prev, sourcesExplored: prev.sourcesExplored + 1, agentAssists: prev.agentAssists + 1 }));
    };

    const pinItem = (item) => {
        if (!pinnedItems.find(i => i.id === item.id)) {
            setPinnedItems(prev => [...prev, item]);
            setMetrics(prev => ({ ...prev, humanInterventions: prev.humanInterventions + 1 }));
        }
    };

    const addToEditor = (text) => {
        setInsightContent(prev => prev + (prev ? '\n\n' : '') + text);
        setMetrics(prev => ({ ...prev, humanInterventions: prev.humanInterventions + 1 }));
    };

    return (
        <WorkflowContext.Provider value={{
            searchResults,
            pinnedItems,
            insightContent,
            setInsightContent,
            metrics,
            addSearchResult,
            pinItem,
            addToEditor
        }}>
            {children}
        </WorkflowContext.Provider>
    );
};
