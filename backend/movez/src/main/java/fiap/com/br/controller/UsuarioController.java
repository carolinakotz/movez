package fiap.com.br.controller;

import fiap.com.br.dto.AvaliacaoDto;
import fiap.com.br.dto.InterdicaoDto;
import fiap.com.br.dto.UsuarioDto;
import fiap.com.br.service.AvaliacaoService;
import fiap.com.br.service.InterdicaoService;
import fiap.com.br.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final AvaliacaoService avaliacaoService;
    private final InterdicaoService interdicaoService;

    public UsuarioController(UsuarioService usuarioService,
                             AvaliacaoService avaliacaoService,
                             InterdicaoService interdicaoService) {
        this.usuarioService = usuarioService;
        this.avaliacaoService = avaliacaoService;
        this.interdicaoService = interdicaoService;
    }

    @PostMapping
    public ResponseEntity<UsuarioDto> cadastrar(@RequestBody @Valid UsuarioDto dto) {
        UsuarioDto criado = usuarioService.insert(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(criado.getCdUsuario())
                .toUri();
        return ResponseEntity.created(location).body(criado);
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDto>> listar() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDto> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDto> atualizar(@PathVariable Long id, @RequestBody @Valid UsuarioDto dto) {
        return ResponseEntity.ok(usuarioService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        usuarioService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Rota aninhada 1:N - listar avaliacoes feitas pelo usuario
    @GetMapping("/{id}/avaliacoes")
    public ResponseEntity<List<AvaliacaoDto>> listarAvaliacoesDoUsuario(@PathVariable Long id) {
        return ResponseEntity.ok(avaliacaoService.findByUsuarioId(id));
    }

    // Rota aninhada 1:N - listar interdicoes reportadas pelo usuario
    @GetMapping("/{id}/interdicoes")
    public ResponseEntity<List<InterdicaoDto>> listarInterdicoesDoUsuario(@PathVariable Long id) {
        return ResponseEntity.ok(interdicaoService.findByUsuarioAvisoId(id));
    }
}
