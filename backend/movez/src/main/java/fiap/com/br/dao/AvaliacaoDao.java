package fiap.com.br.dao;

import fiap.com.br.model.Avaliacao;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class AvaliacaoDao {

    private final DataSource dataSource;

    public AvaliacaoDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Long getNextVal(Connection conn) throws SQLException {
        String sql = "SELECT sq_tb_avaliacao.NEXTVAL FROM dual";
        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            if (rs.next()) {
                return rs.getLong(1);
            }
            throw new SQLException("Nao foi possivel obter o proximo valor da sequence sq_tb_avaliacao");
        }
    }

    public Avaliacao insert(Avaliacao avaliacao) throws SQLException {
        String sql = "INSERT INTO tb_avaliacao (cd_avaliacao, cd_trecho, cd_usuario, nr_sombra, " +
                "nr_iluminacao, nr_calcada, nr_seguranca, nr_silencio, ds_comentario, dt_avaliacao) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = dataSource.getConnection()) {
            Long nextId = getNextVal(conn);
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setLong(1, nextId);
                ps.setLong(2, avaliacao.getCdTrecho());
                ps.setLong(3, avaliacao.getCdUsuario());
                ps.setInt(4, avaliacao.getNrSombra());
                ps.setInt(5, avaliacao.getNrIluminacao());
                ps.setInt(6, avaliacao.getNrCalcada());
                ps.setInt(7, avaliacao.getNrSeguranca());
                ps.setInt(8, avaliacao.getNrSilencio());
                ps.setString(9, avaliacao.getDsComentario());
                LocalDate dt = (avaliacao.getDtAvaliacao() != null) ? avaliacao.getDtAvaliacao() : LocalDate.now();
                ps.setDate(10, Date.valueOf(dt));
                ps.executeUpdate();
                avaliacao.setCdAvaliacao(nextId);
                avaliacao.setDtAvaliacao(dt);
                return avaliacao;
            }
        }
    }

    public List<Avaliacao> findAll() throws SQLException {
        String sql = "SELECT cd_avaliacao, cd_trecho, cd_usuario, nr_sombra, nr_iluminacao, " +
                "nr_calcada, nr_seguranca, nr_silencio, ds_comentario, dt_avaliacao " +
                "FROM tb_avaliacao ORDER BY cd_avaliacao";
        List<Avaliacao> lista = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                lista.add(mapRow(rs));
            }
        }
        return lista;
    }

    public Optional<Avaliacao> findById(Long id) throws SQLException {
        String sql = "SELECT cd_avaliacao, cd_trecho, cd_usuario, nr_sombra, nr_iluminacao, " +
                "nr_calcada, nr_seguranca, nr_silencio, ds_comentario, dt_avaliacao " +
                "FROM tb_avaliacao WHERE cd_avaliacao = ?";
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

    public List<Avaliacao> findByTrechoId(Long cdTrecho) throws SQLException {
        String sql = "SELECT cd_avaliacao, cd_trecho, cd_usuario, nr_sombra, nr_iluminacao, " +
                "nr_calcada, nr_seguranca, nr_silencio, ds_comentario, dt_avaliacao " +
                "FROM tb_avaliacao WHERE cd_trecho = ? ORDER BY cd_avaliacao";
        List<Avaliacao> lista = new ArrayList<>();
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

    public List<Avaliacao> findByUsuarioId(Long cdUsuario) throws SQLException {
        String sql = "SELECT cd_avaliacao, cd_trecho, cd_usuario, nr_sombra, nr_iluminacao, " +
                "nr_calcada, nr_seguranca, nr_silencio, ds_comentario, dt_avaliacao " +
                "FROM tb_avaliacao WHERE cd_usuario = ? ORDER BY cd_avaliacao";
        List<Avaliacao> lista = new ArrayList<>();
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

    public boolean update(Avaliacao avaliacao) throws SQLException {
        String sql = "UPDATE tb_avaliacao SET nr_sombra = ?, nr_iluminacao = ?, nr_calcada = ?, " +
                "nr_seguranca = ?, nr_silencio = ?, ds_comentario = ? WHERE cd_avaliacao = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, avaliacao.getNrSombra());
            ps.setInt(2, avaliacao.getNrIluminacao());
            ps.setInt(3, avaliacao.getNrCalcada());
            ps.setInt(4, avaliacao.getNrSeguranca());
            ps.setInt(5, avaliacao.getNrSilencio());
            ps.setString(6, avaliacao.getDsComentario());
            ps.setLong(7, avaliacao.getCdAvaliacao());
            return ps.executeUpdate() > 0;
        }
    }

    public boolean deleteById(Long id) throws SQLException {
        String sql = "DELETE FROM tb_avaliacao WHERE cd_avaliacao = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate() > 0;
        }
    }

    private Avaliacao mapRow(ResultSet rs) throws SQLException {
        Date dt = rs.getDate("dt_avaliacao");
        return new Avaliacao(
                rs.getLong("cd_avaliacao"),
                rs.getLong("cd_trecho"),
                rs.getLong("cd_usuario"),
                rs.getInt("nr_sombra"),
                rs.getInt("nr_iluminacao"),
                rs.getInt("nr_calcada"),
                rs.getInt("nr_seguranca"),
                rs.getInt("nr_silencio"),
                rs.getString("ds_comentario"),
                (dt != null) ? dt.toLocalDate() : null
        );
    }
}
