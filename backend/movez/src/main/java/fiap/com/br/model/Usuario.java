package fiap.com.br.model;

public class Usuario {
    private Long cdUsuario;
    private String nmUsuario;
    private String dsEmail;
    private Long cdPerfil;
    private String nmPerfil;

    public Usuario() {
    }

    public Usuario(Long cdUsuario, String nmUsuario, String dsEmail, Long cdPerfil) {
        this.cdUsuario = cdUsuario;
        this.nmUsuario = nmUsuario;
        this.dsEmail = dsEmail;
        this.cdPerfil = cdPerfil;
    }

    public Long getCdUsuario() {
        return cdUsuario;
    }

    public void setCdUsuario(Long cdUsuario) {
        this.cdUsuario = cdUsuario;
    }

    public String getNmUsuario() {
        return nmUsuario;
    }

    public void setNmUsuario(String nmUsuario) {
        this.nmUsuario = nmUsuario;
    }

    public String getDsEmail() {
        return dsEmail;
    }

    public void setDsEmail(String dsEmail) {
        this.dsEmail = dsEmail;
    }

    public Long getCdPerfil() {
        return cdPerfil;
    }

    public void setCdPerfil(Long cdPerfil) {
        this.cdPerfil = cdPerfil;
    }

    public String getNmPerfil() {
        return nmPerfil;
    }

    public void setNmPerfil(String nmPerfil) {
        this.nmPerfil = nmPerfil;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "cdUsuario=" + cdUsuario +
                ", nmUsuario='" + nmUsuario + '\'' +
                ", dsEmail='" + dsEmail + '\'' +
                ", cdPerfil=" + cdPerfil +
                '}';
    }
}
