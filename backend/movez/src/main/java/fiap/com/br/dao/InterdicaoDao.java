package fiap.com.br.dao;

import fiap.com.br.model.Interdicao;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class InterdicaoDao {

    private final DataSource dataSource;

    public InterdicaoDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Long getNextVal(Connection conn) throws SQLException {
        String sql = "SELECT sq_tb_interdicao.NEXTVAL FROM dual";
        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            if (rs.next()) {
                return rs.getLong(1);
            }
            throw new SQLException("Nao foi possivel obter o proximo valor da sequence sq_tb_interdicao");
        }
    }

    public Interdicao insert(Interdicao interdicao) throws SQLException {
        String sql = "INSERT INTO tb_interdicao (cd_interdicao, cd_trecho, cd_usuario_aviso, " +
                "cd_usuario_confirma, tp_interdicao, ds_interdicao, dt_inicio, dt_previsao_fim, " +
                "dt_encerramento, ds_passagem_alternativa, st_interdicao) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = dataSource.getConnection()) {
            Long nextId = getNextVal(conn);
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setLong(1, nextId);
                ps.setLong(2, interdicao.getCdTrecho());
                ps.setLong(3, interdicao.getCdUsuarioAviso());

                if (interdicao.getCdUsuarioConfirma() != null) {
                    ps.setLong(4, interdicao.getCdUsuarioConfirma());
                } else {
                    ps.setNull(4, Types.NUMERIC);
                }

                ps.setString(5, interdicao.getTpInterdicao());
                ps.setString(6, interdicao.getDsInterdicao());
                ps.setDate(7, Date.valueOf(interdicao.getDtInicio()));
                ps.setDate(8, Date.valueOf(interdicao.getDtPrevisaoFim()));

                if (interdicao.getDtEncerramento() != null) {
                    ps.setDate(9, Date.valueOf(interdicao.getDtEncerramento()));
                } else {
                    ps.setNull(9, Types.DATE);
                }

                ps.setString(10, interdicao.getDsPassagemAlternativa());
                String status = (interdicao.getStInterdicao() != null) ? interdicao.getStInterdicao() : "ATIVA";
                ps.setString(11, status);

                ps.executeUpdate();
                interdicao.setCdInterdicao(nextId);
                interdicao.setStInterdicao(status);
                return interdicao;
            }
        }
    }

    public List<Interdicao> findAll() throws SQLException {
        String sql = "SELECT cd_interdicao, cd_trecho, cd_usuario_aviso, cd_usuario_confirma, " +
                "tp_interdicao, ds_interdicao, dt_inicio, dt_previsao_fim, dt_encerramento, " +
                "ds_passagem_alternativa, st_interdicao " +
                "FROM tb_interdicao ORDER BY cd_interdicao";
        List<Interdicao> lista = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                lista.add(mapRow(rs));
            }
        }
        return lista;
    }

    public Optional<Interdicao> findById(Long id) throws SQLException {
        String sql = "SELECT cd_interdicao, cd_trecho, cd_usuario_aviso, cd_usuario_confirma, " +
                "tp_interdicao, ds_interdicao, dt_inicio, dt_previsao_fim, dt_encerramento, " +
                "ds_passagem_alternativa, st_interdicao " +
                "FROM tb_interdicao WHERE cd_interdicao = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapRow(rs));
                }
            }
        }
        return Optional.empty();
    }

    public List<Interdicao> findByTrechoId(Long cdTrecho) throws SQLException {
        String sql = "SELECT cd_interdicao, cd_trecho, cd_usuario_aviso, cd_usuario_confirma, " +
                "tp_interdicao, ds_interdicao, dt_inicio, dt_previsao_fim, dt_encerramento, " +
                "ds_passagem_alternativa, st_interdicao " +
                "FROM tb_interdicao WHERE cd_trecho = ? ORDER BY cd_interdicao";
        List<Interdicao> lista = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, cdTrecho);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    lista.add(mapRow(rs));
                }
            }
        }
        return lista;
    }

    public Optional<Interdicao> findAtivaByTrechoId(Long cdTrecho) throws SQLException {
        String sql = "SELECT cd_interdicao, cd_trecho, cd_usuario_aviso, cd_usuario_confirma, " +
                "tp_interdicao, ds_interdicao, dt_inicio, dt_previsao_fim, dt_encerramento, " +
                "ds_passagem_alternativa, st_interdicao " +
                "FROM tb_interdicao WHERE cd_trecho = ? AND st_interdicao = 'ATIVA'";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, cdTrecho);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapRow(rs));
                }
            }
        }
        return Optional.empty();
    }

    public List<Interdicao> findByUsuarioAvisoId(Long cdUsuario) throws SQLException {
        String sql = "SELECT cd_interdicao, cd_trecho, cd_usuario_aviso, cd_usuario_confirma, " +
                "tp_interdicao, ds_interdicao, dt_inicio, dt_previsao_fim, dt_encerramento, " +
                "ds_passagem_alternativa, st_interdicao " +
                "FROM tb_interdicao WHERE cd_usuario_aviso = ? ORDER BY cd_interdicao";
        List<Interdicao> lista = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, cdUsuario);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    lista.add(mapRow(rs));
                }
            }
        }
        return lista;
    }

    public boolean update(Interdicao interdicao) throws SQLException {
        String sql = "UPDATE tb_interdicao SET tp_interdicao = ?, ds_interdicao = ?, dt_inicio = ?, " +
                "dt_previsao_fim = ?, ds_passagem_alternativa = ? WHERE cd_interdicao = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, interdicao.getTpInterdicao());
            ps.setString(2, interdicao.getDsInterdicao());
            ps.setDate(3, Date.valueOf(interdicao.getDtInicio()));
            ps.setDate(4, Date.valueOf(interdicao.getDtPrevisaoFim()));
            ps.setString(5, interdicao.getDsPassagemAlternativa());
            ps.setLong(6, interdicao.getCdInterdicao());
            return ps.executeUpdate() > 0;
        }
    }

    public boolean encerrar(Long id, Long cdUsuarioConfirma, LocalDate dtEncerramento) throws SQLException {
        String sql = "UPDATE tb_interdicao SET st_interdicao = 'ENCERRADA', cd_usuario_confirma = ?, " +
                "dt_encerramento = ? WHERE cd_interdicao = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, cdUsuarioConfirma);
            ps.setDate(2, Date.valueOf(dtEncerramento));
            ps.setLong(3, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean deleteById(Long id) throws SQLException {
        String sql = "DELETE FROM tb_interdicao WHERE cd_interdicao = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate() > 0;
        }
    }

    private Interdicao mapRow(ResultSet rs) throws SQLException {
        Date dtInicio = rs.getDate("dt_inicio");
        Date dtPrevisaoFim = rs.getDate("dt_previsao_fim");
        Date dtEncerramento = rs.getDate("dt_encerramento");

        Long usuarioConfirma = rs.getLong("cd_usuario_confirma");
        if (rs.wasNull()) {
            usuarioConfirma = null;
        }

        return new Interdicao(
                rs.getLong("cd_interdicao"),
                rs.getLong("cd_trecho"),
                rs.getLong("cd_usuario_aviso"),
                usuarioConfirma,
                rs.getString("tp_interdicao"),
                rs.getString("ds_interdicao"),
                (dtInicio != null) ? dtInicio.toLocalDate() : null,
                (dtPrevisaoFim != null) ? dtPrevisaoFim.toLocalDate() : null,
                (dtEncerramento != null) ? dtEncerramento.toLocalDate() : null,
                rs.getString("ds_passagem_alternativa"),
                rs.getString("st_interdicao")
        );
    }
}
