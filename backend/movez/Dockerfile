# =====================================================================
# Estagio 1: Build da aplicacao (Multi-stage)
# =====================================================================
FROM eclipse-temurin:21-jdk-jammy AS builder

WORKDIR /app

# Copia arquivos do Maven Wrapper e POM para cache das dependencias
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B || true

# Copia o codigo fonte e compila o pacote
COPY src/ ./src/
RUN ./mvnw clean package -DskipTests -B

# =====================================================================
# Estagio 2: Imagem final enxuta de execucao (JRE 21)
# =====================================================================
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Cria usuario nao-root por seguranca
RUN useradd -m -u 1001 movezuser && \
    chown -R movezuser:movezuser /app

# Copia o artefato .jar gerado no estagio anterior
COPY --from=builder --chown=movezuser:movezuser /app/target/*.jar app.jar

USER movezuser

# Variaveis de ambiente padrao
ENV PORT=8080 \
    JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
