package fiap.com.br.service;

import fiap.com.br.dao.PerfilDao;
import fiap.com.br.dao.UsuarioDao;
import fiap.com.br.dto.UsuarioDto;
import fiap.com.br.exception.EmailJaCadastradoException;
import fiap.com.br.exception.EntidadeEmUsoException;
import fiap.com.br.exception.EntidadeNaoEncontradaException;
import fiap.com.br.model.Usuario;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioDao usuarioDao;
    private final PerfilDao perfilDao;
    private final ModelMapper modelMapper;

    public UsuarioService(UsuarioDao usuarioDao, PerfilDao perfilDao, ModelMapper modelMapper) {
        this.usuarioDao = usuarioDao;
        this.perfilDao = perfilDao;
        this.modelMapper = modelMapper;
    }

    public UsuarioDto insert(UsuarioDto dto) {
        try {
            perfilDao.findById(dto.getCdPerfil())
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Perfil com ID " + dto.getCdPerfil() + " nao encontrado."));

            Optional<Usuario> existente = usuarioDao.findByEmail(dto.getDsEmail());
            if (existente.isPresent()) {
                throw new EmailJaCadastradoException(dto.getDsEmail());
            }

            Usuario entity = modelMapper.map(dto, Usuario.class);
            Usuario inserido = usuarioDao.insert(entity);
            return findById(inserido.getCdUsuario());
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao cadastrar usuario no banco de dados", e);
        }
    }

    public List<UsuarioDto> findAll() {
        try {
            return usuarioDao.findAll().stream()
                    .map(u -> modelMapper.map(u, UsuarioDto.class))
                    .collect(Collectors.toList());
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar usuarios no banco de dados", e);
        }
    }

    public UsuarioDto findById(Long id) {
        try {
            Usuario usuario = usuarioDao.findById(id)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Usuario com ID " + id + " nao encontrado."));
            return modelMapper.map(usuario, UsuarioDto.class);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar usuario no banco de dados", e);
        }
    }

    public List<UsuarioDto> findByPerfilId(Long cdPerfil) {
        try {
            perfilDao.findById(cdPerfil)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Perfil com ID " + cdPerfil + " nao encontrado."));

            return usuarioDao.findByPerfilId(cdPerfil).stream()
                    .map(u -> modelMapper.map(u, UsuarioDto.class))
                    .collect(Collectors.toList());
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar usuarios por perfil no banco de dados", e);
        }
    }

    public UsuarioDto update(Long id, UsuarioDto dto) {
        try {
            Usuario usuarioExistente = usuarioDao.findById(id)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Usuario com ID " + id + " nao encontrado para atualizacao."));

            perfilDao.findById(dto.getCdPerfil())
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Perfil com ID " + dto.getCdPerfil() + " nao encontrado."));

            Optional<Usuario> porEmail = usuarioDao.findByEmail(dto.getDsEmail());
            if (porEmail.isPresent() && !porEmail.get().getCdUsuario().equals(id)) {
                throw new EmailJaCadastradoException(dto.getDsEmail());
            }

            usuarioExistente.setNmUsuario(dto.getNmUsuario());
            usuarioExistente.setDsEmail(dto.getDsEmail());
            usuarioExistente.setCdPerfil(dto.getCdPerfil());

            usuarioDao.update(usuarioExistente);
            return findById(id);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao atualizar usuario no banco de dados", e);
        }
    }

    public void deleteById(Long id) {
        try {
            usuarioDao.findById(id)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Usuario com ID " + id + " nao encontrado para exclusao."));

            int avaliacoes = usuarioDao.countAvaliacoesByUsuarioId(id);
            int interdicoes = usuarioDao.countInterdicoesByUsuarioId(id);

            if (avaliacoes > 0 || interdicoes > 0) {
                throw new EntidadeEmUsoException("Nao e possivel remover o usuario pois existem " +
                        avaliacoes + " avaliacao(oes) e " + interdicoes + " interdicao(oes) vinculadas a ele.");
            }

            usuarioDao.deleteById(id);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao excluir usuario no banco de dados", e);
        }
    }
}
