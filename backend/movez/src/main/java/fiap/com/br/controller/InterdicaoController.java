package fiap.com.br.controller;

import fiap.com.br.dto.InterdicaoDto;
import fiap.com.br.dto.InterdicaoEncerramentoDto;
import fiap.com.br.service.InterdicaoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/interdicoes")
public class InterdicaoController {

    private final InterdicaoService interdicaoService;

    public InterdicaoController(InterdicaoService interdicaoService) {
        this.interdicaoService = interdicaoService;
    }

    @PostMapping
    public ResponseEntity<InterdicaoDto> cadastrar(@RequestBody @Valid InterdicaoDto dto) {
        InterdicaoDto criado = interdicaoService.insert(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(criado.getCdInterdicao())
                .toUri();
        return ResponseEntity.created(location).body(criado);
    }

    @GetMapping
    public ResponseEntity<List<InterdicaoDto>> listar() {
        return ResponseEntity.ok(interdicaoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InterdicaoDto> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(interdicaoService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InterdicaoDto> atualizar(@PathVariable Long id, @RequestBody @Valid InterdicaoDto dto) {
        return ResponseEntity.ok(interdicaoService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        interdicaoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Regra de dominio R2 e R3: encerrar interdicao com confirmacao por outro usuario
    @PatchMapping("/{id}/encerrar")
    public ResponseEntity<InterdicaoDto> encerrar(@PathVariable Long id,
                                                  @RequestBody @Valid InterdicaoEncerramentoDto dto) {
        return ResponseEntity.ok(interdicaoService.encerrar(id, dto));
    }
}
