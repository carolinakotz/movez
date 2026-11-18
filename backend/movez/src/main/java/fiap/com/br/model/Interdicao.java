package fiap.com.br.model;

import java.time.LocalDate;

public class Interdicao {
    private Long cdInterdicao;
    private Long cdTrecho;
    private Long cdUsuarioAviso;
    private Long cdUsuarioConfirma;
    private String tpInterdicao; // 'OBRA', 'ALAGAMENTO', 'BLOQUEIO'
    private String dsInterdicao;
    private LocalDate dtInicio;
    private LocalDate dtPrevisaoFim;
    private LocalDate dtEncerramento;
    private String dsPassagemAlternativa;
    private String stInterdicao; // 'ATIVA', 'ENCERRADA'

    public Interdicao() {
        this.stInterdicao = "ATIVA";
    }

    public Interdicao(Long cdInterdicao, Long cdTrecho, Long cdUsuarioAviso,
                      Long cdUsuarioConfirma, String tpInterdicao, String dsInterdicao,
                      LocalDate dtInicio, LocalDate dtPrevisaoFim, LocalDate dtEncerramento,
                      String dsPassagemAlternativa, String stInterdicao) {
        this.cdInterdicao = cdInterdicao;
        this.cdTrecho = cdTrecho;
        this.cdUsuarioAviso = cdUsuarioAviso;
        this.cdUsuarioConfirma = cdUsuarioConfirma;
        this.tpInterdicao = tpInterdicao;
        this.dsInterdicao = dsInterdicao;
        this.dtInicio = dtInicio;
        this.dtPrevisaoFim = dtPrevisaoFim;
        this.dtEncerramento = dtEncerramento;
        this.dsPassagemAlternativa = dsPassagemAlternativa;
        this.stInterdicao = (stInterdicao != null) ? stInterdicao : "ATIVA";
    }

    public boolean isAtiva() {
        return "ATIVA".equalsIgnoreCase(this.stInterdicao);
    }

    public Long getCdInterdicao() {
        return cdInterdicao;
    }

    public void setCdInterdicao(Long cdInterdicao) {
        this.cdInterdicao = cdInterdicao;
    }

    public Long getCdTrecho() {
        return cdTrecho;
    }

    public void setCdTrecho(Long cdTrecho) {
        this.cdTrecho = cdTrecho;
    }

    public Long getCdUsuarioAviso() {
        return cdUsuarioAviso;
    }

    public void setCdUsuarioAviso(Long cdUsuarioAviso) {
        this.cdUsuarioAviso = cdUsuarioAviso;
    }

    public Long getCdUsuarioConfirma() {
        return cdUsuarioConfirma;
    }

    public void setCdUsuarioConfirma(Long cdUsuarioConfirma) {
        this.cdUsuarioConfirma = cdUsuarioConfirma;
    }

    public String getTpInterdicao() {
        return tpInterdicao;
    }

    public void setTpInterdicao(String tpInterdicao) {
        this.tpInterdicao = tpInterdicao;
    }

    public String getDsInterdicao() {
        return dsInterdicao;
    }

    public void setDsInterdicao(String dsInterdicao) {
        this.dsInterdicao = dsInterdicao;
    }

    public LocalDate getDtInicio() {
        return dtInicio;
    }

    public void setDtInicio(LocalDate dtInicio) {
        this.dtInicio = dtInicio;
    }

    public LocalDate getDtPrevisaoFim() {
        return dtPrevisaoFim;
    }

    public void setDtPrevisaoFim(LocalDate dtPrevisaoFim) {
        this.dtPrevisaoFim = dtPrevisaoFim;
    }

    public LocalDate getDtEncerramento() {
        return dtEncerramento;
    }

    public void setDtEncerramento(LocalDate dtEncerramento) {
        this.dtEncerramento = dtEncerramento;
    }

    public String getDsPassagemAlternativa() {
        return dsPassagemAlternativa;
    }

    public void setDsPassagemAlternativa(String dsPassagemAlternativa) {
        this.dsPassagemAlternativa = dsPassagemAlternativa;
    }

    public String getStInterdicao() {
        return stInterdicao;
    }

    public void setStInterdicao(String stInterdicao) {
        this.stInterdicao = stInterdicao;
    }

    @Override
    public String toString() {
        return "Interdicao{" +
                "cdInterdicao=" + cdInterdicao +
                ", cdTrecho=" + cdTrecho +
                ", cdUsuarioAviso=" + cdUsuarioAviso +
                ", cdUsuarioConfirma=" + cdUsuarioConfirma +
                ", tpInterdicao='" + tpInterdicao + '\'' +
                ", stInterdicao='" + stInterdicao + '\'' +
                '}';
    }
}
