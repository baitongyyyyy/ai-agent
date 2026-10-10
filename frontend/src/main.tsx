import React from 'react';
import ReactDOM from 'react-dom/client';
import Workspace from './pages/WorkspacePage';
import './styles.css';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><Workspace hosted={false}/></React.StrictMode>);
