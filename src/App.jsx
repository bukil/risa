import React, { useState } from 'react';
import AppShell from './components/Layout/AppShell';
import OmniSearch from './components/Browser/OmniSearch';
import Canvas from './components/Workspace/Canvas';
import Insights from './components/Workspace/Insights';
import Analytics from './pages/Analytics';

function App() {
  const [activeTab, setActiveTab] = useState('omni');

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'omni' && <OmniSearch />}
      {activeTab === 'canvas' && <Canvas />}
      {activeTab === 'insights' && <Insights />}
      {activeTab === 'analytics' && <Analytics />}
    </AppShell>
  );
}

export default App;
