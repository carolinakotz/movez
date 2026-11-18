package fiap.com.br.controller;

import fiap.com.br.dto.PerfilDto;
import fiap.com.br.dto.UsuarioDto;
import fiap.com.br.service.PerfilService;
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
@RequestMapping("/perfis")
public class PerfilController {

    private final PerfilService perfilService;
    private final UsuarioService usuarioService;

    public PerfilController(PerfilService perfilService, UsuarioService usuarioService) {
        this.perfilService = perfilService;
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<PerfilDto> cadastrar(@RequestBody @Valid PerfilDto dto) {
        PerfilDto criado = perfilService.insert(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(criado.getCdPerfil())
                .toUri();
        return ResponseEntity.created(location).body(criado);
    }

    @GetMapping
    public ResponseEntity<List<PerfilDto>> listar() {
        return ResponseEntity.ok(perfilService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PerfilDto> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(perfilService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PerfilDto> atualizar(@PathVariable Long id, @RequestBody @Valid PerfilDto dto) {
        return ResponseEntity.ok(perfilService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        perfilService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Rota aninhada 1:N - listar usuarios de um perfil
    @GetMapping("/{id}/usuarios")
    public ResponseEntity<List<UsuarioDto>> listarUsuariosDoPerfil(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.findByPerfilId(id));
    }

    // Rota aninhada 1:N - cadastrar usuario diretamente no perfil
    @PostMapping("/{id}/usuarios")
    public ResponseEntity<UsuarioDto> cadastrarUsuarioNoPerfil(@PathVariable Long id,
                                                               @RequestBody @Valid UsuarioDto dto) {
        dto.setCdPerfil(id);
        UsuarioDto criado = usuarioService.insert(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/usuarios/{id}")
                .buildAndExpand(criado.getCdUsuario())
                .toUri();
        return ResponseEntity.created(location).body(criado);
    }
}
