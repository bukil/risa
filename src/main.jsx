import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './styles/variables.css'
import App from './App.jsx'
import { WorkflowProvider } from './context/WorkflowContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WorkflowProvider>
      <App />
    </WorkflowProvider>
  </StrictMode>,
)
