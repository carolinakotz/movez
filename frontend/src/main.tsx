import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App.tsx';
import './globals.css';

// Páginas institucionais
import PaginaErro from './routes/Error';

// Páginas da solução (integradas à API Java)
import Trechos from './routes/Trechos';
import CadastrarTrecho from './routes/CadastrarTrecho';
import EditarTrecho from './routes/EditarTrecho';
import AvaliarTrecho from './routes/AvaliarTrecho';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <PaginaErro />,
        children: [
            { path: 'trechos', element: <Trechos /> },
            { path: 'trechos/novo', element: <CadastrarTrecho /> },
            { path: 'trechos/:id/editar', element: <EditarTrecho /> },
            { path: 'trechos/:id/avaliar', element: <AvaliarTrecho /> },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
