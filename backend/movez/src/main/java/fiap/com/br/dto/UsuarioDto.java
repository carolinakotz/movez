package fiap.com.br.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class UsuarioDto {

    private Long cdUsuario;

    @NotBlank(message = "O nome do usuario e obrigatorio")
    @Size(max = 100, message = "O nome do usuario deve ter no maximo 100 caracteres")
    private String nmUsuario;

    @NotBlank(message = "O e-mail e obrigatorio")
    @Email(message = "O e-mail informado e invalido")
    @Size(max = 120, message = "O e-mail deve ter no maximo 120 caracteres")
    private String dsEmail;

    @NotNull(message = "O codigo do perfil e obrigatorio")
    @Positive(message = "O codigo do perfil deve ser positivo")
    private Long cdPerfil;

    private String nmPerfil;

    public UsuarioDto() {
    }

    public UsuarioDto(Long cdUsuario, String nmUsuario, String dsEmail, Long cdPerfil, String nmPerfil) {
        this.cdUsuario = cdUsuario;
        this.nmUsuario = nmUsuario;
        this.dsEmail = dsEmail;
        this.cdPerfil = cdPerfil;
        this.nmPerfil = nmPerfil;
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
}
