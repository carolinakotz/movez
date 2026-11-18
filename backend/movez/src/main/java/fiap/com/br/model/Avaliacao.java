package fiap.com.br.model;

import java.time.LocalDate;

public class Avaliacao {
    private Long cdAvaliacao;
    private Long cdTrecho;
    private Long cdUsuario;
    private Integer nrSombra;
    private Integer nrIluminacao;
    private Integer nrCalcada;
    private Integer nrSeguranca;
    private Integer nrSilencio;
    private String dsComentario;
    private LocalDate dtAvaliacao;

    public Avaliacao() {
    }

    public Avaliacao(Long cdAvaliacao, Long cdTrecho, Long cdUsuario, Integer nrSombra,
                     Integer nrIluminacao, Integer nrCalcada, Integer nrSeguranca,
                     Integer nrSilencio, String dsComentario, LocalDate dtAvaliacao) {
        this.cdAvaliacao = cdAvaliacao;
        this.cdTrecho = cdTrecho;
        this.cdUsuario = cdUsuario;
        this.nrSombra = nrSombra;
        this.nrIluminacao = nrIluminacao;
        this.nrCalcada = nrCalcada;
        this.nrSeguranca = nrSeguranca;
        this.nrSilencio = nrSilencio;
        this.dsComentario = dsComentario;
        this.dtAvaliacao = dtAvaliacao;
    }

    public Double getMediaConforto() {
        if (nrSombra == null || nrIluminacao == null || nrCalcada == null || nrSeguranca == null || nrSilencio == null) {
            return null;
        }
        return (nrSombra + nrIluminacao + nrCalcada + nrSeguranca + nrSilencio) / 5.0;
    }

    public Long getCdAvaliacao() {
        return cdAvaliacao;
    }

    public void setCdAvaliacao(Long cdAvaliacao) {
        this.cdAvaliacao = cdAvaliacao;
    }

    public Long getCdTrecho() {
        return cdTrecho;
    }

    public void setCdTrecho(Long cdTrecho) {
        this.cdTrecho = cdTrecho;
    }

    public Long getCdUsuario() {
        return cdUsuario;
    }

    public void setCdUsuario(Long cdUsuario) {
        this.cdUsuario = cdUsuario;
    }

    public Integer getNrSombra() {
        return nrSombra;
    }

    public void setNrSombra(Integer nrSombra) {
        this.nrSombra = nrSombra;
    }

    public Integer getNrIluminacao() {
        return nrIluminacao;
    }

    public void setNrIluminacao(Integer nrIluminacao) {
        this.nrIluminacao = nrIluminacao;
    }

    public Integer getNrCalcada() {
        return nrCalcada;
    }

    public void setNrCalcada(Integer nrCalcada) {
        this.nrCalcada = nrCalcada;
    }

    public Integer getNrSeguranca() {
        return nrSeguranca;
    }

    public void setNrSeguranca(Integer nrSeguranca) {
        this.nrSeguranca = nrSeguranca;
    }

    public Integer getNrSilencio() {
        return nrSilencio;
    }

    public void setNrSilencio(Integer nrSilencio) {
        this.nrSilencio = nrSilencio;
    }

    public String getDsComentario() {
        return dsComentario;
    }

    public void setDsComentario(String dsComentario) {
        this.dsComentario = dsComentario;
    }

    public LocalDate getDtAvaliacao() {
        return dtAvaliacao;
    }

    public void setDtAvaliacao(LocalDate dtAvaliacao) {
        this.dtAvaliacao = dtAvaliacao;
    }

    @Override
    public String toString() {
        return "Avaliacao{" +
                "cdAvaliacao=" + cdAvaliacao +
                ", cdTrecho=" + cdTrecho +
                ", cdUsuario=" + cdUsuario +
                ", nrSombra=" + nrSombra +
                ", nrIluminacao=" + nrIluminacao +
                ", nrCalcada=" + nrCalcada +
                ", nrSeguranca=" + nrSeguranca +
                ", nrSilencio=" + nrSilencio +
                ", dtAvaliacao=" + dtAvaliacao +
                '}';
    }
}
