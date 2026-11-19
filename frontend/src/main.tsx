import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App.tsx';
import './globals.css';

// Páginas institucionais
import PaginaErro from './routes/Error';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <PaginaErro />,
        children: [
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
