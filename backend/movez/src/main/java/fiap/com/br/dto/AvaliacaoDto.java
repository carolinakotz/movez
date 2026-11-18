package fiap.com.br.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class AvaliacaoDto {

    private Long cdAvaliacao;

    private Long cdTrecho;

    @NotNull(message = "O codigo do usuario e obrigatorio")
    @Positive(message = "O codigo do usuario deve ser positivo")
    private Long cdUsuario;

    @NotNull(message = "A nota de sombra e obrigatoria")
    @Min(value = 1, message = "A nota de sombra deve ser no minimo 1")
    @Max(value = 5, message = "A nota de sombra deve ser no maximo 5")
    private Integer nrSombra;

    @NotNull(message = "A nota de iluminacao e obrigatoria")
    @Min(value = 1, message = "A nota de iluminacao deve ser no minimo 1")
    @Max(value = 5, message = "A nota de iluminacao deve ser no maximo 5")
    private Integer nrIluminacao;

    @NotNull(message = "A nota de calcada e obrigatoria")
    @Min(value = 1, message = "A nota de calcada deve ser no minimo 1")
    @Max(value = 5, message = "A nota de calcada deve ser no maximo 5")
    private Integer nrCalcada;

    @NotNull(message = "A nota de seguranca e obrigatoria")
    @Min(value = 1, message = "A nota de seguranca deve ser no minimo 1")
    @Max(value = 5, message = "A nota de seguranca deve ser no maximo 5")
    private Integer nrSeguranca;

    @NotNull(message = "A nota de silencio e obrigatoria")
    @Min(value = 1, message = "A nota de silencio deve ser no minimo 1")
    @Max(value = 5, message = "A nota de silencio deve ser no maximo 5")
    private Integer nrSilencio;

    @Size(max = 200, message = "O comentario deve ter no maximo 200 caracteres")
    private String dsComentario;

    private LocalDate dtAvaliacao;

    private Double mediaConforto;

    public AvaliacaoDto() {
    }

    public AvaliacaoDto(Long cdAvaliacao, Long cdTrecho, Long cdUsuario, Integer nrSombra,
                        Integer nrIluminacao, Integer nrCalcada, Integer nrSeguranca,
                        Integer nrSilencio, String dsComentario, LocalDate dtAvaliacao, Double mediaConforto) {
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
        this.mediaConforto = mediaConforto;
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

    public Double getMediaConforto() {
        return mediaConforto;
    }

    public void setMediaConforto(Double mediaConforto) {
        this.mediaConforto = mediaConforto;
    }
}
