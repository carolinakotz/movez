package fiap.com.br.exception;

public class InterdicaoJaEncerradaException extends RegraDeNegocioException {
    public InterdicaoJaEncerradaException(Long id) {
        super("A interdicao com ID " + id + " ja se encontra ENCERRADA e nao pode ser alterada.");
    }
}
