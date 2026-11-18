package fiap.com.br.dao;

import fiap.com.br.model.Perfil;
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
public class PerfilDao {

    private final DataSource dataSource;

    public PerfilDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Long getNextVal(Connection conn) throws SQLException {
        String sql = "SELECT sq_tb_perfil.NEXTVAL FROM dual";
        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            if (rs.next()) {
                return rs.getLong(1);
            }
            throw new SQLException("Nao foi possivel obter o proximo valor da sequence sq_tb_perfil");
        }
    }

    public Perfil insert(Perfil perfil) throws SQLException {
        String sql = "INSERT INTO tb_perfil (cd_perfil, nm_perfil, ds_perfil) VALUES (?, ?, ?)";
        try (Connection conn = dataSource.getConnection()) {
            Long nextId = getNextVal(conn);
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setLong(1, nextId);
                ps.setString(2, perfil.getNmPerfil());
                ps.setString(3, perfil.getDsPerfil());
                ps.executeUpdate();
                perfil.setCdPerfil(nextId);
                return perfil;
            }
        }
    }

    public List<Perfil> findAll() throws SQLException {
        String sql = "SELECT cd_perfil, nm_perfil, ds_perfil FROM tb_perfil ORDER BY cd_perfil";
        List<Perfil> lista = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                lista.add(mapRow(rs));
            }
        }
        return lista;
    }

    public Optional<Perfil> findById(Long id) throws SQLException {
        String sql = "SELECT cd_perfil, nm_perfil, ds_perfil FROM tb_perfil WHERE cd_perfil = ?";
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

    public Optional<Perfil> findByNome(String nome) throws SQLException {
        String sql = "SELECT cd_perfil, nm_perfil, ds_perfil FROM tb_perfil WHERE UPPER(nm_perfil) = UPPER(?)";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, nome);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapRow(rs));
                }
            }
        }
        return Optional.empty();
    }

    public boolean update(Perfil perfil) throws SQLException {
        String sql = "UPDATE tb_perfil SET nm_perfil = ?, ds_perfil = ? WHERE cd_perfil = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, perfil.getNmPerfil());
            ps.setString(2, perfil.getDsPerfil());
            ps.setLong(3, perfil.getCdPerfil());
            return ps.executeUpdate() > 0;
        }
    }

    public boolean deleteById(Long id) throws SQLException {
        String sql = "DELETE FROM tb_perfil WHERE cd_perfil = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public int countUsuariosByPerfilId(Long cdPerfil) throws SQLException {
        String sql = "SELECT COUNT(*) FROM tb_usuario WHERE cd_perfil = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, cdPerfil);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }
        }
        return 0;
    }

    private Perfil mapRow(ResultSet rs) throws SQLException {
        return new Perfil(
                rs.getLong("cd_perfil"),
                rs.getString("nm_perfil"),
                rs.getString("ds_perfil")
        );
    }
}
