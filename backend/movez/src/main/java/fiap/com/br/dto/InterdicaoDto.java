package fiap.com.br.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class InterdicaoDto {

    private Long cdInterdicao;

    private Long cdTrecho;

    @NotNull(message = "O codigo do usuario que avisou e obrigatorio")
    @Positive(message = "O codigo do usuario deve ser positivo")
    private Long cdUsuarioAviso;

    private Long cdUsuarioConfirma;

    @NotBlank(message = "O tipo de interdicao e obrigatorio")
    @Pattern(regexp = "OBRA|ALAGAMENTO|BLOQUEIO", message = "O tipo deve ser OBRA, ALAGAMENTO ou BLOQUEIO")
    private String tpInterdicao;

    @NotBlank(message = "A descricao da interdicao e obrigatoria")
    @Size(max = 200, message = "A descricao deve ter no maximo 200 caracteres")
    private String dsInterdicao;

    @NotNull(message = "A data de inicio e obrigatoria")
    private LocalDate dtInicio;

    @NotNull(message = "A previsao de termino e obrigatoria")
    private LocalDate dtPrevisaoFim;

    private LocalDate dtEncerramento;

    @Size(max = 200, message = "A passagem alternativa deve ter no maximo 200 caracteres")
    private String dsPassagemAlternativa;

    private String stInterdicao;

    public InterdicaoDto() {
    }

    public InterdicaoDto(Long cdInterdicao, Long cdTrecho, Long cdUsuarioAviso, Long cdUsuarioConfirma,
                         String tpInterdicao, String dsInterdicao, LocalDate dtInicio,
                         LocalDate dtPrevisaoFim, LocalDate dtEncerramento,
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
        this.stInterdicao = stInterdicao;
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
}
