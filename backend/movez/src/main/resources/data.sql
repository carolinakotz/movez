-- =====================================================================
-- CARGA INICIAL DE DADOS - MOV-EZ
-- =====================================================================

-- Perfis
INSERT INTO tb_perfil (cd_perfil, nm_perfil, ds_perfil) VALUES (1, 'IDOSO', 'Necessita de calcadas regulares, bancos de descanso, boa iluminacao e baixo esforco');
INSERT INTO tb_perfil (cd_perfil, nm_perfil, ds_perfil) VALUES (2, 'CARRINHO DE BEBE', 'Demanda calcadas largas, rampas de acesso suaves e protecao solar');
INSERT INTO tb_perfil (cd_perfil, nm_perfil, ds_perfil) VALUES (3, 'CADEIRANTE', 'Exige acessibilidade total, rampas rebaixadas, piso tatil e ausencia de obstaculos');
INSERT INTO tb_perfil (cd_perfil, nm_perfil, ds_perfil) VALUES (4, 'PEDESTRE COMUM', 'Prioriza seguranca, rapidez e conforto geral na caminhada urbana');

-- Usuarios
INSERT INTO tb_usuario (cd_usuario, nm_usuario, ds_email, cd_perfil) VALUES (1, 'Ana Clara Silveira', 'ana.silveira@email.com', 1);
INSERT INTO tb_usuario (cd_usuario, nm_usuario, ds_email, cd_perfil) VALUES (2, 'Bruno Henrique Dias', 'bruno.dias@email.com', 2);
INSERT INTO tb_usuario (cd_usuario, nm_usuario, ds_email, cd_perfil) VALUES (3, 'Carlos Eduardo Ramos', 'carlos.ramos@email.com', 3);
INSERT INTO tb_usuario (cd_usuario, nm_usuario, ds_email, cd_perfil) VALUES (4, 'Daniela Martins', 'daniela.martins@email.com', 4);
INSERT INTO tb_usuario (cd_usuario, nm_usuario, ds_email, cd_perfil) VALUES (5, 'Eduardo Souza', 'eduardo.souza@email.com', 1);
INSERT INTO tb_usuario (cd_usuario, nm_usuario, ds_email, cd_perfil) VALUES (6, 'Fernanda Lima', 'fernanda.lima@email.com', 2);
INSERT INTO tb_usuario (cd_usuario, nm_usuario, ds_email, cd_perfil) VALUES (7, 'Gabriel Rocha', 'gabriel.rocha@email.com', 3);
INSERT INTO tb_usuario (cd_usuario, nm_usuario, ds_email, cd_perfil) VALUES (8, 'Helena Costa', 'helena.costa@email.com', 4);

-- Trechos
INSERT INTO tb_trecho (cd_trecho, nm_logradouro, nm_bairro, nm_cidade, vl_extensao_m) VALUES (1, 'Avenida Paulista, 1000 a 1400', 'Bela Vista', 'Sao Paulo', 400.00);
INSERT INTO tb_trecho (cd_trecho, nm_logradouro, nm_bairro, nm_cidade, vl_extensao_m) VALUES (2, 'Rua Augusta, 500 a 800', 'Consolacao', 'Sao Paulo', 300.00);
INSERT INTO tb_trecho (cd_trecho, nm_logradouro, nm_bairro, nm_cidade, vl_extensao_m) VALUES (3, 'Rua Oscar Freire, 100 a 400', 'Cerqueira Cesar', 'Sao Paulo', 350.00);
INSERT INTO tb_trecho (cd_trecho, nm_logradouro, nm_bairro, nm_cidade, vl_extensao_m) VALUES (4, 'Alameda Santos, 1200 a 1600', 'Jardins', 'Sao Paulo', 450.00);
INSERT INTO tb_trecho (cd_trecho, nm_logradouro, nm_bairro, nm_cidade, vl_extensao_m) VALUES (5, 'Rua da Consolacao, 1800 a 2200', 'Consolacao', 'Sao Paulo', 500.00);
INSERT INTO tb_trecho (cd_trecho, nm_logradouro, nm_bairro, nm_cidade, vl_extensao_m) VALUES (6, 'Rua Bela Cintra, 700 a 1100', 'Consolacao', 'Sao Paulo', 400.00);
INSERT INTO tb_trecho (cd_trecho, nm_logradouro, nm_bairro, nm_cidade, vl_extensao_m) VALUES (7, 'Rua Haddock Lobo, 300 a 600', 'Cerqueira Cesar', 'Sao Paulo', 320.00);
INSERT INTO tb_trecho (cd_trecho, nm_logradouro, nm_bairro, nm_cidade, vl_extensao_m) VALUES (8, 'Avenida Brigadeiro Luis Antonio, 2000 a 2400', 'Jardim Paulista', 'Sao Paulo', 480.00);
INSERT INTO tb_trecho (cd_trecho, nm_logradouro, nm_bairro, nm_cidade, vl_extensao_m) VALUES (9, 'Rua Domingos de Morais, 1500 a 1900', 'Vila Mariana', 'Sao Paulo', 450.00);
INSERT INTO tb_trecho (cd_trecho, nm_logradouro, nm_bairro, nm_cidade, vl_extensao_m) VALUES (10, 'Rua Vergueiro, 2500 a 2900', 'Vila Mariana', 'Sao Paulo', 520.00);
INSERT INTO tb_trecho (cd_trecho, nm_logradouro, nm_bairro, nm_cidade, vl_extensao_m) VALUES (11, 'Avenida Ibirapuera, 800 a 1200', 'Moema', 'Sao Paulo', 600.00);
INSERT INTO tb_trecho (cd_trecho, nm_logradouro, nm_bairro, nm_cidade, vl_extensao_m) VALUES (12, 'Rua dos Pinheiros, 400 a 800', 'Pinheiros', 'Sao Paulo', 420.00);

-- Avaliacoes
INSERT INTO tb_avaliacao (cd_avaliacao, cd_trecho, cd_usuario, nr_sombra, nr_iluminacao, nr_calcada, nr_seguranca, nr_silencio, ds_comentario, dt_avaliacao)
VALUES (1, 1, 1, 4, 5, 5, 4, 2, 'Calcada ampla e muito bem iluminada a noite', DATE '2026-10-01');
INSERT INTO tb_avaliacao (cd_avaliacao, cd_trecho, cd_usuario, nr_sombra, nr_iluminacao, nr_calcada, nr_seguranca, nr_silencio, ds_comentario, dt_avaliacao)
VALUES (2, 1, 3, 3, 5, 5, 5, 2, 'Totalmente acessivel para cadeira de rodas, rampas adequadas', DATE '2026-10-02');
INSERT INTO tb_avaliacao (cd_avaliacao, cd_trecho, cd_usuario, nr_sombra, nr_iluminacao, nr_calcada, nr_seguranca, nr_silencio, ds_comentario, dt_avaliacao)
VALUES (3, 2, 2, 2, 3, 3, 3, 1, 'Muito barulho a noite e calcada irregular em alguns pontos', DATE '2026-10-03');
INSERT INTO tb_avaliacao (cd_avaliacao, cd_trecho, cd_usuario, nr_sombra, nr_iluminacao, nr_calcada, nr_seguranca, nr_silencio, ds_comentario, dt_avaliacao)
VALUES (4, 3, 4, 5, 5, 5, 5, 4, 'Excelente trecho, muito arborizado e agradavel', DATE '2026-10-05');

-- Interdicoes
INSERT INTO tb_interdicao (cd_interdicao, cd_trecho, cd_usuario_aviso, cd_usuario_confirma, tp_interdicao, ds_interdicao, dt_inicio, dt_previsao_fim, dt_encerramento, ds_passagem_alternativa, st_interdicao)
VALUES (1, 2, 1, NULL, 'OBRA', 'Reforma do piso da calcada pela prefeitura', DATE '2026-11-10', DATE '2026-11-25', NULL, 'Utilizar calcada oposta pela faixa de pedestres', 'ATIVA');
INSERT INTO tb_interdicao (cd_interdicao, cd_trecho, cd_usuario_aviso, cd_usuario_confirma, tp_interdicao, ds_interdicao, dt_inicio, dt_previsao_fim, dt_encerramento, ds_passagem_alternativa, st_interdicao)
VALUES (2, 5, 2, 4, 'BLOQUEIO', 'Queda de arvore obstruindo passagem de pedestres', DATE '2026-10-15', DATE '2026-10-17', DATE '2026-10-16', 'Desvio pela Alameda Santos', 'ENCERRADA');
