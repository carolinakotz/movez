package fiap.com.br.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class PerfilDto {

    private Long cdPerfil;

    @NotBlank(message = "O nome do perfil e obrigatorio")
    @Size(max = 30, message = "O nome do perfil deve ter no maximo 30 caracteres")
    private String nmPerfil;

    @NotBlank(message = "A descricao do perfil e obrigatoria")
    @Size(max = 150, message = "A descricao do perfil deve ter no maximo 150 caracteres")
    private String dsPerfil;

    public PerfilDto() {
    }

    public PerfilDto(Long cdPerfil, String nmPerfil, String dsPerfil) {
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
}
