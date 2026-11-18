package fiap.com.br.dao;

import fiap.com.br.model.Trecho;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class TrechoDao {

    private final DataSource dataSource;

    public TrechoDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Long getNextVal(Connection conn) throws SQLException {
        String sql = "SELECT sq_tb_trecho.NEXTVAL FROM dual";
        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            if (rs.next()) {
                return rs.getLong(1);
            }
            throw new SQLException("Nao foi possivel obter o proximo valor da sequence sq_tb_trecho");
        }
    }

    public Trecho insert(Trecho trecho) throws SQLException {
        String sql = "INSERT INTO tb_trecho (cd_trecho, nm_logradouro, nm_bairro, nm_cidade, vl_extensao_m) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = dataSource.getConnection()) {
            Long nextId = getNextVal(conn);
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setLong(1, nextId);
                ps.setString(2, trecho.getNmLogradouro());
                ps.setString(3, trecho.getNmBairro());
                ps.setString(4, trecho.getNmCidade());
                ps.setDouble(5, trecho.getVlExtensaoM());
                ps.executeUpdate();
                trecho.setCdTrecho(nextId);
                return trecho;
            }
        }
    }

    public List<Trecho> findAll() throws SQLException {
        String sql = "SELECT cd_trecho, nm_logradouro, nm_bairro, nm_cidade, vl_extensao_m FROM tb_trecho ORDER BY cd_trecho";
        List<Trecho> lista = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                lista.add(mapRow(rs));
            }
        }
        return lista;
    }

    public Optional<Trecho> findById(Long id) throws SQLException {
        String sql = "SELECT cd_trecho, nm_logradouro, nm_bairro, nm_cidade, vl_extensao_m FROM tb_trecho WHERE cd_trecho = ?";
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

    public boolean update(Trecho trecho) throws SQLException {
        String sql = "UPDATE tb_trecho SET nm_logradouro = ?, nm_bairro = ?, nm_cidade = ?, vl_extensao_m = ? WHERE cd_trecho = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, trecho.getNmLogradouro());
            ps.setString(2, trecho.getNmBairro());
            ps.setString(3, trecho.getNmCidade());
            ps.setDouble(4, trecho.getVlExtensaoM());
            ps.setLong(5, trecho.getCdTrecho());
            return ps.executeUpdate() > 0;
        }
    }

    public boolean deleteById(Long id) throws SQLException {
        String sql = "DELETE FROM tb_trecho WHERE cd_trecho = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public int countAvaliacoesByTrechoId(Long cdTrecho) throws SQLException {
        String sql = "SELECT COUNT(*) FROM tb_avaliacao WHERE cd_trecho = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, cdTrecho);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }
        }
        return 0;
    }

    public int countInterdicoesByTrechoId(Long cdTrecho) throws SQLException {
        String sql = "SELECT COUNT(*) FROM tb_interdicao WHERE cd_trecho = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, cdTrecho);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }
        }
        return 0;
    }

    private Trecho mapRow(ResultSet rs) throws SQLException {
        return new Trecho(
                rs.getLong("cd_trecho"),
                rs.getString("nm_logradouro"),
                rs.getString("nm_bairro"),
                rs.getString("nm_cidade"),
                rs.getDouble("vl_extensao_m")
        );
    }
}
