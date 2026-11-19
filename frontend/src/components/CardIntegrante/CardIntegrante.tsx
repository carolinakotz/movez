import { Link } from 'react-router';
import type { Integrante } from '../../types/integrante';
import FotoIntegrante from '../FotoIntegrante/FotoIntegrante';

type CardIntegranteProps = {
    integrante: Integrante;
};

export default function CardIntegrante({ integrante }: CardIntegranteProps) {
    return (
        <article className="relative flex h-full flex-col items-center gap-4 rounded-cartao border border-linha bg-white p-6 text-center transition-shadow hover:shadow-[0_8px_24px_rgb(2_34_86/0.12)]">
            <FotoIntegrante integrante={integrante} decorativa />
            <div>
                <h2 className="text-xl font-extrabold">
                    <Link
                        to={`/integrantes/${integrante.id}`}
                        className="rounded-campo after:absolute after:inset-0 after:rounded-cartao after:content-[''] hover:text-verde-texto"
                    >
                        {integrante.nome}
                    </Link>
                </h2>
                <p className="mt-1 text-ardosia">
                    RM {integrante.rm}, turma {integrante.turma}
                </p>
            </div>
        </article>
    );
}
