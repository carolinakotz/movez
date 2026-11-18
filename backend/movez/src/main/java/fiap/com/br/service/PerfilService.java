package fiap.com.br.service;

import fiap.com.br.dao.PerfilDao;
import fiap.com.br.dto.PerfilDto;
import fiap.com.br.exception.EntidadeEmUsoException;
import fiap.com.br.exception.EntidadeNaoEncontradaException;
import fiap.com.br.exception.NomePerfilJaCadastradoException;
import fiap.com.br.model.Perfil;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PerfilService {

    private final PerfilDao perfilDao;
    private final ModelMapper modelMapper;

    public PerfilService(PerfilDao perfilDao, ModelMapper modelMapper) {
        this.perfilDao = perfilDao;
        this.modelMapper = modelMapper;
    }

    public PerfilDto insert(PerfilDto dto) {
        try {
            Optional<Perfil> existente = perfilDao.findByNome(dto.getNmPerfil());
            if (existente.isPresent()) {
                throw new NomePerfilJaCadastradoException(dto.getNmPerfil());
            }

            Perfil entity = modelMapper.map(dto, Perfil.class);
            Perfil inserido = perfilDao.insert(entity);
            return modelMapper.map(inserido, PerfilDto.class);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao cadastrar perfil no banco de dados", e);
        }
    }

    public List<PerfilDto> findAll() {
        try {
            return perfilDao.findAll().stream()
                    .map(p -> modelMapper.map(p, PerfilDto.class))
                    .collect(Collectors.toList());
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao consultar perfis no banco de dados", e);
        }
    }

    public PerfilDto findById(Long id) {
        try {
            Perfil perfil = perfilDao.findById(id)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Perfil com ID " + id + " nao encontrado."));
            return modelMapper.map(perfil, PerfilDto.class);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar perfil no banco de dados", e);
        }
    }

    public PerfilDto update(Long id, PerfilDto dto) {
        try {
            Perfil perfilExistente = perfilDao.findById(id)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Perfil com ID " + id + " nao encontrado para atualizacao."));

            Optional<Perfil> porNome = perfilDao.findByNome(dto.getNmPerfil());
            if (porNome.isPresent() && !porNome.get().getCdPerfil().equals(id)) {
                throw new NomePerfilJaCadastradoException(dto.getNmPerfil());
            }

            perfilExistente.setNmPerfil(dto.getNmPerfil());
            perfilExistente.setDsPerfil(dto.getDsPerfil());

            perfilDao.update(perfilExistente);
            return modelMapper.map(perfilExistente, PerfilDto.class);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao atualizar perfil no banco de dados", e);
        }
    }

    public void deleteById(Long id) {
        try {
            Perfil perfil = perfilDao.findById(id)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Perfil com ID " + id + " nao encontrado para exclusao."));

            int usuariosVinculados = perfilDao.countUsuariosByPerfilId(id);
            if (usuariosVinculados > 0) {
                throw new EntidadeEmUsoException("Nao e possivel remover o perfil '" + perfil.getNmPerfil() +
                        "' pois existem " + usuariosVinculados + " usuario(s) associado(s).");
            }

            perfilDao.deleteById(id);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao excluir perfil no banco de dados", e);
        }
    }
}
