import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App.tsx';
import './globals.css';

// Páginas institucionais
import Home from './routes/Home';
import PaginaErro from './routes/Error';

// Páginas da solução (integradas à API Java)
import Trechos from './routes/Trechos';
import CadastrarTrecho from './routes/CadastrarTrecho';
import TrechoDetalhe from './routes/TrechoDetalhe';
import EditarTrecho from './routes/EditarTrecho';
import AvaliarTrecho from './routes/AvaliarTrecho';
import Avisos from './routes/Avisos';
import NovoAviso from './routes/NovoAviso';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <PaginaErro />,
        children: [
            { index: true, element: <Home /> },

            { path: 'trechos', element: <Trechos /> },
            { path: 'trechos/novo', element: <CadastrarTrecho /> },
            { path: 'trechos/:id', element: <TrechoDetalhe /> },
            { path: 'trechos/:id/editar', element: <EditarTrecho /> },
            { path: 'trechos/:id/avaliar', element: <AvaliarTrecho /> },
            { path: 'avisos', element: <Avisos /> },
            { path: 'avisos/novo', element: <NovoAviso /> },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
