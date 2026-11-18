package fiap.com.br.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class TrechoDto {

    private Long cdTrecho;

    @NotBlank(message = "O logradouro e obrigatorio")
    @Size(max = 100, message = "O logradouro deve ter no maximo 100 caracteres")
    private String nmLogradouro;

    @NotBlank(message = "O bairro e obrigatorio")
    @Size(max = 60, message = "O bairro deve ter no maximo 60 caracteres")
    private String nmBairro;

    @NotBlank(message = "A cidade e obrigatoria")
    @Size(max = 60, message = "A cidade deve ter no maximo 60 caracteres")
    private String nmCidade;

    @NotNull(message = "A extensao em metros e obrigatoria")
    @Positive(message = "A extensao deve ser maior que zero")
    private Double vlExtensaoM;

    public TrechoDto() {
    }

    public TrechoDto(Long cdTrecho, String nmLogradouro, String nmBairro, String nmCidade, Double vlExtensaoM) {
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
}
