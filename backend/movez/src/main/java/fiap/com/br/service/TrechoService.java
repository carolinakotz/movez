package fiap.com.br.service;

import fiap.com.br.dao.TrechoDao;
import fiap.com.br.dto.TrechoDto;
import fiap.com.br.exception.EntidadeEmUsoException;
import fiap.com.br.exception.EntidadeNaoEncontradaException;
import fiap.com.br.model.Trecho;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrechoService {

    private final TrechoDao trechoDao;
    private final ModelMapper modelMapper;

    public TrechoService(TrechoDao trechoDao, ModelMapper modelMapper) {
        this.trechoDao = trechoDao;
        this.modelMapper = modelMapper;
    }

    public TrechoDto insert(TrechoDto dto) {
        try {
            Trecho entity = modelMapper.map(dto, Trecho.class);
            Trecho inserido = trechoDao.insert(entity);
            return modelMapper.map(inserido, TrechoDto.class);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao cadastrar trecho no banco de dados", e);
        }
    }

    public List<TrechoDto> findAll() {
        try {
            return trechoDao.findAll().stream()
                    .map(t -> modelMapper.map(t, TrechoDto.class))
                    .collect(Collectors.toList());
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar trechos no banco de dados", e);
        }
    }

    public TrechoDto findById(Long id) {
        try {
            Trecho trecho = trechoDao.findById(id)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Trecho com ID " + id + " nao encontrado."));
            return modelMapper.map(trecho, TrechoDto.class);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar trecho no banco de dados", e);
        }
    }

    public TrechoDto update(Long id, TrechoDto dto) {
        try {
            Trecho trechoExistente = trechoDao.findById(id)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Trecho com ID " + id + " nao encontrado para atualizacao."));

            trechoExistente.setNmLogradouro(dto.getNmLogradouro());
            trechoExistente.setNmBairro(dto.getNmBairro());
            trechoExistente.setNmCidade(dto.getNmCidade());
            trechoExistente.setVlExtensaoM(dto.getVlExtensaoM());

            trechoDao.update(trechoExistente);
            return modelMapper.map(trechoExistente, TrechoDto.class);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao atualizar trecho no banco de dados", e);
        }
    }

    public void deleteById(Long id) {
        try {
            trechoDao.findById(id)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Trecho com ID " + id + " nao encontrado para exclusao."));

            int avaliacoes = trechoDao.countAvaliacoesByTrechoId(id);
            int interdicoes = trechoDao.countInterdicoesByTrechoId(id);

            if (avaliacoes > 0 || interdicoes > 0) {
                throw new EntidadeEmUsoException("Nao e possivel remover o trecho pois existem " +
                        avaliacoes + " avaliacao(oes) e " + interdicoes + " interdicao(oes) vinculadas a ele.");
            }

            trechoDao.deleteById(id);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao excluir trecho no banco de dados", e);
        }
    }
}
