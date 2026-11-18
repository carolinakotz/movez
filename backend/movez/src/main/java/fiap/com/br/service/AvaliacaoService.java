package fiap.com.br.service;

import fiap.com.br.dao.AvaliacaoDao;
import fiap.com.br.dao.TrechoDao;
import fiap.com.br.dao.UsuarioDao;
import fiap.com.br.dto.AvaliacaoDto;
import fiap.com.br.exception.EntidadeNaoEncontradaException;
import fiap.com.br.model.Avaliacao;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AvaliacaoService {

    private final AvaliacaoDao avaliacaoDao;
    private final TrechoDao trechoDao;
    private final UsuarioDao usuarioDao;
    private final ModelMapper modelMapper;

    public AvaliacaoService(AvaliacaoDao avaliacaoDao, TrechoDao trechoDao,
                            UsuarioDao usuarioDao, ModelMapper modelMapper) {
        this.avaliacaoDao = avaliacaoDao;
        this.trechoDao = trechoDao;
        this.usuarioDao = usuarioDao;
        this.modelMapper = modelMapper;
    }

    public AvaliacaoDto insert(AvaliacaoDto dto) {
        try {
            trechoDao.findById(dto.getCdTrecho())
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Trecho com ID " + dto.getCdTrecho() + " nao encontrado."));

            usuarioDao.findById(dto.getCdUsuario())
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Usuario com ID " + dto.getCdUsuario() + " nao encontrado."));

            Avaliacao entity = modelMapper.map(dto, Avaliacao.class);
            if (entity.getDtAvaliacao() == null) {
                entity.setDtAvaliacao(LocalDate.now());
            }

            Avaliacao inserida = avaliacaoDao.insert(entity);
            AvaliacaoDto response = modelMapper.map(inserida, AvaliacaoDto.class);
            response.setMediaConforto(inserida.getMediaConforto());
            return response;
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao cadastrar avaliacao no banco de dados", e);
        }
    }

    public List<AvaliacaoDto> findAll() {
        try {
            return avaliacaoDao.findAll().stream()
                    .map(this::toDto)
                    .collect(Collectors.toList());
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar avaliacoes no banco de dados", e);
        }
    }

    public AvaliacaoDto findById(Long id) {
        try {
            Avaliacao avaliacao = avaliacaoDao.findById(id)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Avaliacao com ID " + id + " nao encontrada."));
            return toDto(avaliacao);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar avaliacao no banco de dados", e);
        }
    }

    public List<AvaliacaoDto> findByTrechoId(Long cdTrecho) {
        try {
            trechoDao.findById(cdTrecho)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Trecho com ID " + cdTrecho + " nao encontrado."));

            return avaliacaoDao.findByTrechoId(cdTrecho).stream()
                    .map(this::toDto)
                    .collect(Collectors.toList());
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar avaliacoes do trecho no banco de dados", e);
        }
    }

    public List<AvaliacaoDto> findByUsuarioId(Long cdUsuario) {
        try {
            usuarioDao.findById(cdUsuario)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Usuario com ID " + cdUsuario + " nao encontrado."));

            return avaliacaoDao.findByUsuarioId(cdUsuario).stream()
                    .map(this::toDto)
                    .collect(Collectors.toList());
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar avaliacoes do usuario no banco de dados", e);
        }
    }

    public AvaliacaoDto update(Long id, AvaliacaoDto dto) {
        try {
            Avaliacao avaliacaoExistente = avaliacaoDao.findById(id)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Avaliacao com ID " + id + " nao encontrada para atualizacao."));

            avaliacaoExistente.setNrSombra(dto.getNrSombra());
            avaliacaoExistente.setNrIluminacao(dto.getNrIluminacao());
            avaliacaoExistente.setNrCalcada(dto.getNrCalcada());
            avaliacaoExistente.setNrSeguranca(dto.getNrSeguranca());
            avaliacaoExistente.setNrSilencio(dto.getNrSilencio());
            avaliacaoExistente.setDsComentario(dto.getDsComentario());

            avaliacaoDao.update(avaliacaoExistente);
            return toDto(avaliacaoExistente);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao atualizar avaliacao no banco de dados", e);
        }
    }

    public void deleteById(Long id) {
        try {
            avaliacaoDao.findById(id)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Avaliacao com ID " + id + " nao encontrada para exclusao."));

            avaliacaoDao.deleteById(id);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao excluir avaliacao no banco de dados", e);
        }
    }

    private AvaliacaoDto toDto(Avaliacao entity) {
        AvaliacaoDto dto = modelMapper.map(entity, AvaliacaoDto.class);
        dto.setMediaConforto(entity.getMediaConforto());
        return dto;
    }
}
