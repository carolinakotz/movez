-- =====================================================================
-- GLOBAL SOLUTION - MOV-EZ: MAPA DE CONFORTO DAS RUAS
-- SCRIPT DE CRIACAO DE TABELAS, SEQUENCES E CONSTRAINTS (ORACLE)
-- =====================================================================

-- 1.1 Perfil de Pedestre
CREATE TABLE tb_perfil (
    cd_perfil  NUMBER(3)     NOT NULL,
    nm_perfil  VARCHAR2(30)  NOT NULL,
    ds_perfil  VARCHAR2(150) NOT NULL,
    CONSTRAINT pk_perfil    PRIMARY KEY (cd_perfil),
    CONSTRAINT ux_perfil_nm UNIQUE (nm_perfil)
);

-- 1.2 Usuario (1 perfil : N usuarios)
CREATE TABLE tb_usuario (
    cd_usuario  NUMBER(6)     NOT NULL,
    nm_usuario  VARCHAR2(100) NOT NULL,
    ds_email    VARCHAR2(120) NOT NULL,
    cd_perfil   NUMBER(3)     NOT NULL,
    CONSTRAINT pk_usuario       PRIMARY KEY (cd_usuario),
    CONSTRAINT ux_usuario_email UNIQUE (ds_email),
    CONSTRAINT fk_usuario_perfil FOREIGN KEY (cd_perfil)
        REFERENCES tb_perfil (cd_perfil)
);

-- 1.3 Trecho de rua
CREATE TABLE tb_trecho (
    cd_trecho      NUMBER(6)     NOT NULL,
    nm_logradouro  VARCHAR2(100) NOT NULL,
    nm_bairro      VARCHAR2(60)  NOT NULL,
    nm_cidade      VARCHAR2(60)  NOT NULL,
    vl_extensao_m  NUMBER(7,2)   NOT NULL,
    CONSTRAINT pk_trecho    PRIMARY KEY (cd_trecho),
    CONSTRAINT ck_trecho_ext CHECK (vl_extensao_m > 0)
);

-- 1.4 Avaliacao de conforto (1 trecho : N avaliacoes; 1 usuario : N avaliacoes)
-- R1: notas de 1 a 5; no silencio, 5 e o mais silencioso
CREATE TABLE tb_avaliacao (
    cd_avaliacao    NUMBER(8)     NOT NULL,
    cd_trecho       NUMBER(6)     NOT NULL,
    cd_usuario      NUMBER(6)     NOT NULL,
    nr_sombra       NUMBER(1)     NOT NULL,
    nr_iluminacao   NUMBER(1)     NOT NULL,
    nr_calcada      NUMBER(1)     NOT NULL,
    nr_seguranca    NUMBER(1)     NOT NULL,
    nr_silencio     NUMBER(1)     NOT NULL,
    ds_comentario   VARCHAR2(200),
    dt_avaliacao    DATE          NOT NULL,
    CONSTRAINT pk_avaliacao      PRIMARY KEY (cd_avaliacao),
    CONSTRAINT fk_aval_trecho    FOREIGN KEY (cd_trecho)
        REFERENCES tb_trecho (cd_trecho),
    CONSTRAINT fk_aval_usuario   FOREIGN KEY (cd_usuario)
        REFERENCES tb_usuario (cd_usuario),
    CONSTRAINT ck_aval_sombra    CHECK (nr_sombra      BETWEEN 1 AND 5),
    CONSTRAINT ck_aval_ilum      CHECK (nr_iluminacao  BETWEEN 1 AND 5),
    CONSTRAINT ck_aval_calcada   CHECK (nr_calcada     BETWEEN 1 AND 5),
    CONSTRAINT ck_aval_seguranca CHECK (nr_seguranca   BETWEEN 1 AND 5),
    CONSTRAINT ck_aval_silencio  CHECK (nr_silencio    BETWEEN 1 AND 5)
);

-- 1.5 Interdicao temporaria (1 trecho : N interdicoes;
--     1 usuario avisa : N interdicoes; 1 usuario confirma : N interdicoes)
-- R2: ATIVA sem encerramento e sem confirmador; ENCERRADA com os dois
-- R3: quem confirma e diferente de quem avisou
-- R5: passagem alternativa opcional (sem NOT NULL)
CREATE TABLE tb_interdicao (
    cd_interdicao            NUMBER(6)     NOT NULL,
    cd_trecho                NUMBER(6)     NOT NULL,
    cd_usuario_aviso         NUMBER(6)     NOT NULL,
    cd_usuario_confirma      NUMBER(6),
    tp_interdicao            VARCHAR2(20)  NOT NULL,
    ds_interdicao            VARCHAR2(200) NOT NULL,
    dt_inicio                DATE          NOT NULL,
    dt_previsao_fim          DATE          NOT NULL,
    dt_encerramento          DATE,
    ds_passagem_alternativa  VARCHAR2(200),
    st_interdicao            VARCHAR2(10)  DEFAULT 'ATIVA' NOT NULL,
    CONSTRAINT pk_interd           PRIMARY KEY (cd_interdicao),
    CONSTRAINT fk_interd_trecho    FOREIGN KEY (cd_trecho)
        REFERENCES tb_trecho (cd_trecho),
    CONSTRAINT fk_interd_aviso     FOREIGN KEY (cd_usuario_aviso)
        REFERENCES tb_usuario (cd_usuario),
    CONSTRAINT fk_interd_confirma  FOREIGN KEY (cd_usuario_confirma)
        REFERENCES tb_usuario (cd_usuario),
    CONSTRAINT ck_interd_tipo      CHECK (tp_interdicao IN ('OBRA', 'ALAGAMENTO', 'BLOQUEIO')),
    CONSTRAINT ck_interd_prazo     CHECK (dt_previsao_fim >= dt_inicio),
    CONSTRAINT ck_interd_status    CHECK (
        (st_interdicao = 'ATIVA'
            AND dt_encerramento IS NULL
            AND cd_usuario_confirma IS NULL)
        OR
        (st_interdicao = 'ENCERRADA'
            AND dt_encerramento IS NOT NULL
            AND cd_usuario_confirma IS NOT NULL
            AND dt_encerramento >= dt_inicio)),
    CONSTRAINT ck_interd_confirma  CHECK (
        cd_usuario_confirma IS NULL OR cd_usuario_confirma <> cd_usuario_aviso)
);

-- 1.6 Tabela associativa do N:N entre perfil e trecho (PK composta)
-- R7 (parte do banco): perfil nao adequado exige a restricao escrita
CREATE TABLE tb_perfil_trecho (
    cd_perfil     NUMBER(3)     NOT NULL,
    cd_trecho     NUMBER(6)     NOT NULL,
    fl_adequado   CHAR(1)       NOT NULL,
    ds_restricao  VARCHAR2(200),
    CONSTRAINT pk_pftrecho        PRIMARY KEY (cd_perfil, cd_trecho),
    CONSTRAINT fk_pftrecho_perfil FOREIGN KEY (cd_perfil)
        REFERENCES tb_perfil (cd_perfil),
    CONSTRAINT fk_pftrecho_trecho FOREIGN KEY (cd_trecho)
        REFERENCES tb_trecho (cd_trecho),
    CONSTRAINT ck_pftrecho_adeq   CHECK (fl_adequado IN ('S', 'N')),
    CONSTRAINT ck_pftrecho_restr  CHECK (fl_adequado = 'S' OR ds_restricao IS NOT NULL)
);

-- =====================================================================
-- 2. SEQUENCES
-- =====================================================================
CREATE SEQUENCE sq_tb_perfil     START WITH 5  INCREMENT BY 1 NOCACHE NOCYCLE;
CREATE SEQUENCE sq_tb_usuario    START WITH 9  INCREMENT BY 1 NOCACHE NOCYCLE;
CREATE SEQUENCE sq_tb_trecho     START WITH 13 INCREMENT BY 1 NOCACHE NOCYCLE;
CREATE SEQUENCE sq_tb_avaliacao  START WITH 21 INCREMENT BY 1 NOCACHE NOCYCLE;
CREATE SEQUENCE sq_tb_interdicao START WITH 9  INCREMENT BY 1 NOCACHE NOCYCLE;

-- =====================================================================
-- 3. INDICE UNICO (R4): no maximo 1 interdicao ATIVA por trecho
-- =====================================================================
CREATE UNIQUE INDEX ux_interd_ativa
    ON tb_interdicao (CASE WHEN st_interdicao = 'ATIVA' THEN cd_trecho END);

-- =====================================================================
-- 4. COMENTARIOS NAS TABELAS
-- =====================================================================
COMMENT ON TABLE tb_perfil IS 'Perfis de quem caminha: idoso, carrinho de bebe, cadeirante e pedestre comum';
COMMENT ON TABLE tb_usuario IS 'Moradores que usam o MovEz, cada um com um perfil';
COMMENT ON TABLE tb_trecho IS 'Trechos de rua do mapa de conforto';
COMMENT ON TABLE tb_avaliacao IS 'Avaliacoes de conforto (notas de 1 a 5) feitas pelos usuarios em cada trecho';
COMMENT ON TABLE tb_interdicao IS 'Avisos de interdicao temporaria de um trecho (obra, alagamento ou bloqueio)';
COMMENT ON TABLE tb_perfil_trecho IS 'Associativa N:N: adequacao de cada trecho a cada perfil, com a restricao quando nao serve';
