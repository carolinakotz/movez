package fiap.com.br.model;

public class Perfil {
    private Long cdPerfil;
    private String nmPerfil;
    private String dsPerfil;

    public Perfil() {
    }

    public Perfil(Long cdPerfil, String nmPerfil, String dsPerfil) {
        this.cdPerfil = cdPerfil;
        this.nmPerfil = nmPerfil;
        this.dsPerfil = dsPerfil;
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

    public String getDsPerfil() {
        return dsPerfil;
    }

    public void setDsPerfil(String dsPerfil) {
        this.dsPerfil = dsPerfil;
    }

    @Override
    public String toString() {
        return "Perfil{" +
                "cdPerfil=" + cdPerfil +
                ", nmPerfil='" + nmPerfil + '\'' +
                ", dsPerfil='" + dsPerfil + '\'' +
                '}';
    }
}
