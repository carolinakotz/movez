package fiap.com.br.exception;

public class TrechoJaInterditadoException extends RegraDeNegocioException {
    public TrechoJaInterditadoException(Long cdTrecho) {
        super("O trecho com ID " + cdTrecho + " ja possui uma interdicao ATIVA. Apenas uma interdicao ativa e permitida por trecho.");
    }
}
