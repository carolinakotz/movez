package fiap.com.br.exception;

public class EmailJaCadastradoException extends RegraDeNegocioException {
    public EmailJaCadastradoException(String email) {
        super("Ja existe um usuario cadastrado com o e-mail: " + email);
    }
}
