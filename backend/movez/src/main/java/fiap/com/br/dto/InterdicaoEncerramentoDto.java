package fiap.com.br.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public class InterdicaoEncerramentoDto {

    @NotNull(message = "O codigo do usuario confirmador e obrigatorio")
    @Positive(message = "O codigo do usuario deve ser positivo")
    private Long cdUsuarioConfirma;

    private LocalDate dtEncerramento;

    public InterdicaoEncerramentoDto() {
    }

    public InterdicaoEncerramentoDto(Long cdUsuarioConfirma, LocalDate dtEncerramento) {
        this.cdUsuarioConfirma = cdUsuarioConfirma;
        this.dtEncerramento = dtEncerramento;
    }

    public Long getCdUsuarioConfirma() {
        return cdUsuarioConfirma;
    }

    public void setCdUsuarioConfirma(Long cdUsuarioConfirma) {
        this.cdUsuarioConfirma = cdUsuarioConfirma;
    }

    public LocalDate getDtEncerramento() {
        return dtEncerramento;
    }

    public void setDtEncerramento(LocalDate dtEncerramento) {
        this.dtEncerramento = dtEncerramento;
    }
}
