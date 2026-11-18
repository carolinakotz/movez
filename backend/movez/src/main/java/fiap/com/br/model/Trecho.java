package fiap.com.br.model;

public class Trecho {
    private Long cdTrecho;
    private String nmLogradouro;
    private String nmBairro;
    private String nmCidade;
    private Double vlExtensaoM;

    public Trecho() {
    }

    public Trecho(Long cdTrecho, String nmLogradouro, String nmBairro, String nmCidade, Double vlExtensaoM) {
        this.cdTrecho = cdTrecho;
        this.nmLogradouro = nmLogradouro;
        this.nmBairro = nmBairro;
        this.nmCidade = nmCidade;
        this.vlExtensaoM = vlExtensaoM;
    }

    public Long getCdTrecho() {
        return cdTrecho;
    }

    public void setCdTrecho(Long cdTrecho) {
        this.cdTrecho = cdTrecho;
    }

    public String getNmLogradouro() {
        return nmLogradouro;
    }

    public void setNmLogradouro(String nmLogradouro) {
        this.nmLogradouro = nmLogradouro;
    }

    public String getNmBairro() {
        return nmBairro;
    }

    public void setNmBairro(String nmBairro) {
        this.nmBairro = nmBairro;
    }

    public String getNmCidade() {
        return nmCidade;
    }

    public void setNmCidade(String nmCidade) {
        this.nmCidade = nmCidade;
    }

    public Double getVlExtensaoM() {
        return vlExtensaoM;
    }

    public void setVlExtensaoM(Double vlExtensaoM) {
        this.vlExtensaoM = vlExtensaoM;
    }

    @Override
    public String toString() {
        return "Trecho{" +
                "cdTrecho=" + cdTrecho +
                ", nmLogradouro='" + nmLogradouro + '\'' +
                ", nmBairro='" + nmBairro + '\'' +
                ", nmCidade='" + nmCidade + '\'' +
                ", vlExtensaoM=" + vlExtensaoM +
                '}';
    }
}
