import CabecalhoPagina from '../../components/CabecalhoPagina/CabecalhoPagina';
import CardIntegrante from '../../components/CardIntegrante/CardIntegrante';
import Pagina from '../../components/Pagina/Pagina';
import { integrantes } from '../../data/integrantes';

export default function Integrantes() {
    return (
        <Pagina titulo="Integrantes">
            <CabecalhoPagina titulo="Integrantes" />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {integrantes.map((integrante) => (
                    <li key={integrante.id}>
                        <CardIntegrante integrante={integrante} />
                    </li>
                ))}
            </ul>
        </Pagina>
    );
}
