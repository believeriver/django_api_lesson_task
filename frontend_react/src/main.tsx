import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './features/login/Login.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/tasks" element={<App />} />
        </Routes>
      </BrowserRouter>
      {/* <App /> */}
    </Provider>
  </StrictMode>
);
