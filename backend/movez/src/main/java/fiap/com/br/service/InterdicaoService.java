package fiap.com.br.service;

import fiap.com.br.dao.InterdicaoDao;
import fiap.com.br.dao.TrechoDao;
import fiap.com.br.dao.UsuarioDao;
import fiap.com.br.dto.InterdicaoDto;
import fiap.com.br.dto.InterdicaoEncerramentoDto;
import fiap.com.br.exception.DataInvalidaException;
import fiap.com.br.exception.EntidadeNaoEncontradaException;
import fiap.com.br.exception.InterdicaoJaEncerradaException;
import fiap.com.br.exception.TrechoJaInterditadoException;
import fiap.com.br.exception.UsuarioConfirmacaoInvalidoException;
import fiap.com.br.model.Interdicao;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InterdicaoService {

    private final InterdicaoDao interdicaoDao;
    private final TrechoDao trechoDao;
    private final UsuarioDao usuarioDao;
    private final ModelMapper modelMapper;

    public InterdicaoService(InterdicaoDao interdicaoDao, TrechoDao trechoDao,
                             UsuarioDao usuarioDao, ModelMapper modelMapper) {
        this.interdicaoDao = interdicaoDao;
        this.trechoDao = trechoDao;
        this.usuarioDao = usuarioDao;
        this.modelMapper = modelMapper;
    }

    public InterdicaoDto insert(InterdicaoDto dto) {
        try {
            trechoDao.findById(dto.getCdTrecho())
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Trecho com ID " + dto.getCdTrecho() + " nao encontrado."));

            usuarioDao.findById(dto.getCdUsuarioAviso())
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Usuario que avisou com ID " + dto.getCdUsuarioAviso() + " nao encontrado."));

            if (dto.getDtPrevisaoFim().isBefore(dto.getDtInicio())) {
                throw new DataInvalidaException("A data de previsao de fim (" + dto.getDtPrevisaoFim() +
                        ") nao pode ser anterior a data de inicio (" + dto.getDtInicio() + ").");
            }

            // Regra R4: no maximo 1 interdicao ATIVA por trecho
            Optional<Interdicao> ativaExistente = interdicaoDao.findAtivaByTrechoId(dto.getCdTrecho());
            if (ativaExistente.isPresent()) {
                throw new TrechoJaInterditadoException(dto.getCdTrecho());
            }

            Interdicao entity = modelMapper.map(dto, Interdicao.class);
            entity.setStInterdicao("ATIVA");
            entity.setCdUsuarioConfirma(null);
            entity.setDtEncerramento(null);

            Interdicao inserida = interdicaoDao.insert(entity);
            return modelMapper.map(inserida, InterdicaoDto.class);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao cadastrar interdicao no banco de dados", e);
        }
    }

    public List<InterdicaoDto> findAll() {
        try {
            return interdicaoDao.findAll().stream()
                    .map(i -> modelMapper.map(i, InterdicaoDto.class))
                    .collect(Collectors.toList());
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar interdicoes no banco de dados", e);
        }
    }

    public InterdicaoDto findById(Long id) {
        try {
            Interdicao interdicao = interdicaoDao.findById(id)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Interdicao com ID " + id + " nao encontrada."));
            return modelMapper.map(interdicao, InterdicaoDto.class);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar interdicao no banco de dados", e);
        }
    }

    public List<InterdicaoDto> findByTrechoId(Long cdTrecho) {
        try {
            trechoDao.findById(cdTrecho)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Trecho com ID " + cdTrecho + " nao encontrado."));

            return interdicaoDao.findByTrechoId(cdTrecho).stream()
                    .map(i -> modelMapper.map(i, InterdicaoDto.class))
                    .collect(Collectors.toList());
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar interdicoes do trecho no banco de dados", e);
        }
    }

    public List<InterdicaoDto> findByUsuarioAvisoId(Long cdUsuario) {
        try {
            usuarioDao.findById(cdUsuario)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Usuario com ID " + cdUsuario + " nao encontrado."));

            return interdicaoDao.findByUsuarioAvisoId(cdUsuario).stream()
                    .map(i -> modelMapper.map(i, InterdicaoDto.class))
                    .collect(Collectors.toList());
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar interdicoes do usuario no banco de dados", e);
        }
    }

    public InterdicaoDto update(Long id, InterdicaoDto dto) {
        try {
            Interdicao interdicaoExistente = interdicaoDao.findById(id)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Interdicao com ID " + id + " nao encontrada para atualizacao."));

            if (!interdicaoExistente.isAtiva()) {
                throw new InterdicaoJaEncerradaException(id);
            }

            if (dto.getDtPrevisaoFim().isBefore(dto.getDtInicio())) {
                throw new DataInvalidaException("A data de previsao de fim (" + dto.getDtPrevisaoFim() +
                        ") nao pode ser anterior a data de inicio (" + dto.getDtInicio() + ").");
            }

            interdicaoExistente.setTpInterdicao(dto.getTpInterdicao());
            interdicaoExistente.setDsInterdicao(dto.getDsInterdicao());
            interdicaoExistente.setDtInicio(dto.getDtInicio());
            interdicaoExistente.setDtPrevisaoFim(dto.getDtPrevisaoFim());
            interdicaoExistente.setDsPassagemAlternativa(dto.getDsPassagemAlternativa());

            interdicaoDao.update(interdicaoExistente);
            return modelMapper.map(interdicaoExistente, InterdicaoDto.class);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao atualizar interdicao no banco de dados", e);
        }
    }

    public InterdicaoDto encerrar(Long id, InterdicaoEncerramentoDto dto) {
        try {
            Interdicao interdicao = interdicaoDao.findById(id)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Interdicao com ID " + id + " nao encontrada para encerramento."));

            if (!interdicao.isAtiva()) {
                throw new InterdicaoJaEncerradaException(id);
            }

            usuarioDao.findById(dto.getCdUsuarioConfirma())
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Usuario confirmador com ID " + dto.getCdUsuarioConfirma() + " nao encontrado."));

            // Regra R3: quem confirma deve ser diferente de quem avisou
            if (dto.getCdUsuarioConfirma().equals(interdicao.getCdUsuarioAviso())) {
                throw new UsuarioConfirmacaoInvalidoException("O usuario que confirma o restabelecimento do acesso deve ser diferente do usuario que cadastrou o aviso de interdicao.");
            }

            LocalDate dataEncerramento = (dto.getDtEncerramento() != null) ? dto.getDtEncerramento() : LocalDate.now();
            if (dataEncerramento.isBefore(interdicao.getDtInicio())) {
                throw new DataInvalidaException("A data de encerramento (" + dataEncerramento +
                        ") nao pode ser anterior a data de inicio da interdicao (" + interdicao.getDtInicio() + ").");
            }

            interdicaoDao.encerrar(id, dto.getCdUsuarioConfirma(), dataEncerramento);
            return findById(id);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao encerrar interdicao no banco de dados", e);
        }
    }

    public void deleteById(Long id) {
        try {
            interdicaoDao.findById(id)
                    .orElseThrow(() -> new EntidadeNaoEncontradaException("Interdicao com ID " + id + " nao encontrada para exclusao."));

            interdicaoDao.deleteById(id);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao excluir interdicao no banco de dados", e);
        }
    }
}
