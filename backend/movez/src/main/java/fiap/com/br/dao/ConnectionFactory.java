package fiap.com.br.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {
    private static Connection connection;

    public static void closeConnection() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
            }
        } catch (Exception e) {
            System.err.println("Erro ao fechar conexao: " + e.getMessage());
        }
    }

    public static Connection getConnection() {
        try {
            if (connection != null && !connection.isClosed()) {
                return connection;
            }
            Class.forName("oracle.jdbc.driver.OracleDriver");

            String url = System.getenv("DB_URL");
            final String user = System.getenv("DB_USER");
            final String pass = System.getenv("DB_PASSWORD");
            if (url == null || user == null || pass == null) {
                throw new RuntimeException("Variaveis de ambiente do banco nao configuradas");
            }
            connection = DriverManager.getConnection(url, user, pass);
        } catch (SQLException e) {
            System.err.println("Erro de SQL: " + e.getMessage());
        } catch (ClassNotFoundException e) {
            System.err.println("Erro nome da classe: " + e.getMessage());
        }
        return connection;
    }
}
