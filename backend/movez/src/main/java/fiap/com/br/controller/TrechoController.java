package fiap.com.br.controller;

import fiap.com.br.dto.AvaliacaoDto;
import fiap.com.br.dto.InterdicaoDto;
import fiap.com.br.dto.TrechoDto;
import fiap.com.br.service.AvaliacaoService;
import fiap.com.br.service.InterdicaoService;
import fiap.com.br.service.TrechoService;
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
@RequestMapping("/trechos")
public class TrechoController {

    private final TrechoService trechoService;
    private final AvaliacaoService avaliacaoService;
    private final InterdicaoService interdicaoService;

    public TrechoController(TrechoService trechoService,
                            AvaliacaoService avaliacaoService,
                            InterdicaoService interdicaoService) {
        this.trechoService = trechoService;
        this.avaliacaoService = avaliacaoService;
        this.interdicaoService = interdicaoService;
    }

    @PostMapping
    public ResponseEntity<TrechoDto> cadastrar(@RequestBody @Valid TrechoDto dto) {
        TrechoDto criado = trechoService.insert(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(criado.getCdTrecho())
                .toUri();
        return ResponseEntity.created(location).body(criado);
    }

    @GetMapping
    public ResponseEntity<List<TrechoDto>> listar() {
        return ResponseEntity.ok(trechoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrechoDto> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(trechoService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrechoDto> atualizar(@PathVariable Long id, @RequestBody @Valid TrechoDto dto) {
        return ResponseEntity.ok(trechoService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        trechoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Rota aninhada 1:N - listar avaliacoes do trecho
    @GetMapping("/{id}/avaliacoes")
    public ResponseEntity<List<AvaliacaoDto>> listarAvaliacoesDoTrecho(@PathVariable Long id) {
        return ResponseEntity.ok(avaliacaoService.findByTrechoId(id));
    }

    // Rota aninhada 1:N - cadastrar avaliacao diretamente no trecho
    @PostMapping("/{id}/avaliacoes")
    public ResponseEntity<AvaliacaoDto> cadastrarAvaliacaoNoTrecho(@PathVariable Long id,
                                                                   @RequestBody @Valid AvaliacaoDto dto) {
        dto.setCdTrecho(id);
        AvaliacaoDto criado = avaliacaoService.insert(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/avaliacoes/{id}")
                .buildAndExpand(criado.getCdAvaliacao())
                .toUri();
        return ResponseEntity.created(location).body(criado);
    }

    // Rota aninhada 1:N - listar interdicoes do trecho
    @GetMapping("/{id}/interdicoes")
    public ResponseEntity<List<InterdicaoDto>> listarInterdicoesDoTrecho(@PathVariable Long id) {
        return ResponseEntity.ok(interdicaoService.findByTrechoId(id));
    }

    // Rota aninhada 1:N - cadastrar interdicao diretamente no trecho
    @PostMapping("/{id}/interdicoes")
    public ResponseEntity<InterdicaoDto> cadastrarInterdicaoNoTrecho(@PathVariable Long id,
                                                                     @RequestBody @Valid InterdicaoDto dto) {
        dto.setCdTrecho(id);
        InterdicaoDto criado = interdicaoService.insert(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/interdicoes/{id}")
                .buildAndExpand(criado.getCdInterdicao())
                .toUri();
        return ResponseEntity.created(location).body(criado);
    }
}
