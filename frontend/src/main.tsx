import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import App from './App.tsx'
import AdminPanel from './AdminPanel.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { MantineProvider } from '@mantine/core';
import StreamOverlay from './StreamOverlay.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path='/stream-overlay' element={<StreamOverlay />} />
        </Routes>
      </BrowserRouter> 
    </MantineProvider>
  </StrictMode>,
)
