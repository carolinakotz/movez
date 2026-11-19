import { Outlet, ScrollRestoration } from 'react-router';
import Cabecalho from './components/Cabecalho/Cabecalho';
import Rodape from './components/Rodape/Rodape';

// Layout raiz: cabeçalho e rodapé fixos, e o Outlet troca o conteúdo de cada rota.
export default function App() {
    return (
        <>
            <Cabecalho />
            <Outlet />
            <Rodape />
            <ScrollRestoration />
        </>
    );
}
