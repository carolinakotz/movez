package fiap.com.br.dao;

import fiap.com.br.model.Usuario;
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
public class UsuarioDao {

    private final DataSource dataSource;

    public UsuarioDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Long getNextVal(Connection conn) throws SQLException {
        String sql = "SELECT sq_tb_usuario.NEXTVAL FROM dual";
        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            if (rs.next()) {
                return rs.getLong(1);
            }
            throw new SQLException("Nao foi possivel obter o proximo valor da sequence sq_tb_usuario");
        }
    }

    public Usuario insert(Usuario usuario) throws SQLException {
        String sql = "INSERT INTO tb_usuario (cd_usuario, nm_usuario, ds_email, cd_perfil) VALUES (?, ?, ?, ?)";
        try (Connection conn = dataSource.getConnection()) {
            Long nextId = getNextVal(conn);
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setLong(1, nextId);
                ps.setString(2, usuario.getNmUsuario());
                ps.setString(3, usuario.getDsEmail());
                ps.setLong(4, usuario.getCdPerfil());
                ps.executeUpdate();
                usuario.setCdUsuario(nextId);
                return usuario;
            }
        }
    }

    public List<Usuario> findAll() throws SQLException {
        String sql = "SELECT u.cd_usuario, u.nm_usuario, u.ds_email, u.cd_perfil, p.nm_perfil " +
                "FROM tb_usuario u " +
                "JOIN tb_perfil p ON u.cd_perfil = p.cd_perfil " +
                "ORDER BY u.cd_usuario";
        List<Usuario> lista = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                lista.add(mapRow(rs));
            }
        }
        return lista;
    }

    public Optional<Usuario> findById(Long id) throws SQLException {
        String sql = "SELECT u.cd_usuario, u.nm_usuario, u.ds_email, u.cd_perfil, p.nm_perfil " +
                "FROM tb_usuario u " +
                "JOIN tb_perfil p ON u.cd_perfil = p.cd_perfil " +
                "WHERE u.cd_usuario = ?";
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

    public Optional<Usuario> findByEmail(String email) throws SQLException {
        String sql = "SELECT u.cd_usuario, u.nm_usuario, u.ds_email, u.cd_perfil, p.nm_perfil " +
                "FROM tb_usuario u " +
                "JOIN tb_perfil p ON u.cd_perfil = p.cd_perfil " +
                "WHERE LOWER(u.ds_email) = LOWER(?)";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, email);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapRow(rs));
                }
            }
        }
        return Optional.empty();
    }

    public List<Usuario> findByPerfilId(Long cdPerfil) throws SQLException {
        String sql = "SELECT u.cd_usuario, u.nm_usuario, u.ds_email, u.cd_perfil, p.nm_perfil " +
                "FROM tb_usuario u " +
                "JOIN tb_perfil p ON u.cd_perfil = p.cd_perfil " +
                "WHERE u.cd_perfil = ? " +
                "ORDER BY u.cd_usuario";
        List<Usuario> lista = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, cdPerfil);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    lista.add(mapRow(rs));
                }
            }
        }
        return lista;
    }

    public boolean update(Usuario usuario) throws SQLException {
        String sql = "UPDATE tb_usuario SET nm_usuario = ?, ds_email = ?, cd_perfil = ? WHERE cd_usuario = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, usuario.getNmUsuario());
            ps.setString(2, usuario.getDsEmail());
            ps.setLong(3, usuario.getCdPerfil());
            ps.setLong(4, usuario.getCdUsuario());
            return ps.executeUpdate() > 0;
        }
    }

    public boolean deleteById(Long id) throws SQLException {
        String sql = "DELETE FROM tb_usuario WHERE cd_usuario = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public int countAvaliacoesByUsuarioId(Long cdUsuario) throws SQLException {
        String sql = "SELECT COUNT(*) FROM tb_avaliacao WHERE cd_usuario = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, cdUsuario);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }
        }
        return 0;
    }

    public int countInterdicoesByUsuarioId(Long cdUsuario) throws SQLException {
        String sql = "SELECT COUNT(*) FROM tb_interdicao WHERE cd_usuario_aviso = ? OR cd_usuario_confirma = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, cdUsuario);
            ps.setLong(2, cdUsuario);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }
        }
        return 0;
    }

    private Usuario mapRow(ResultSet rs) throws SQLException {
        Usuario usuario = new Usuario(
                rs.getLong("cd_usuario"),
                rs.getString("nm_usuario"),
                rs.getString("ds_email"),
                rs.getLong("cd_perfil")
        );
        usuario.setNmPerfil(rs.getString("nm_perfil"));
        return usuario;
    }
}
