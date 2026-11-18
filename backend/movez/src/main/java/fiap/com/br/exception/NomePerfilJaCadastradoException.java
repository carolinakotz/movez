package fiap.com.br.exception;

public class NomePerfilJaCadastradoException extends RegraDeNegocioException {
    public NomePerfilJaCadastradoException(String nome) {
        super("Ja existe um perfil cadastrado com o nome: " + nome);
    }
}
