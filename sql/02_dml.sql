-- =====================================================================
-- PROJETO INTEGRADOR - DESENVOLVIMENTO DE SISTEMAS ORIENTADO A OBJETOS
-- 2a ETAPA - MANIPULACAO DE DADOS (DML - Data Manipulation Language)
-- Sistema de Gestao Universitaria - MySQL 8.0+
--
-- Pre-requisito: executar antes o script 01_ddl.sql.
--
-- Os dados abaixo sao ficticios e servem so para demonstracao. Sao os
-- mesmos que aparecem nas telas do prototipo (pasta /prototipo), para
-- que a interface e o banco fiquem coerentes.
--
-- Os CPFs e CNPJs tambem sao inventados, mas com digito verificador
-- calculado pelo modulo 11. Assim eles passam em qualquer rotina de
-- validacao e da para testar as telas de cadastro de verdade.
-- =====================================================================

USE gestao_universitaria;

SET FOREIGN_KEY_CHECKS = 1;
START TRANSACTION;

-- =====================================================================
-- 1. CARGA INICIAL - PERFIS, USUARIO E TABELAS DE DOMINIO
-- Os perfis 2 a 5 correspondem aos atores do Diagrama de Caso de Uso.
-- =====================================================================

INSERT INTO perfil (id_perfil, nome, descricao) VALUES
 (1, 'ADMINISTRADOR',             'Acesso completo; assume o perfil do ator correspondente ao modulo em uso.'),
 (2, 'SECRETARIO_ACADEMICO',      'Gerencia o cadastro, a consulta, a atualizacao e a inativacao de alunos.'),
 (3, 'COORDENADOR_CURSO',         'Gerencia docentes e a atribuicao de disciplinas.'),
 (4, 'ASSISTENTE_ADMINISTRATIVO', 'Gerencia pessoas fisicas, pessoas juridicas e fornecedores.'),
 (5, 'GESTOR_PROJETO',            'Responsavel pelos requisitos, pedidos e validacao de fornecimento.');

-- Usuario unico do sistema. A senha padrao e '12345', gravada como hash
-- BCrypt (custo 10) gerado com a biblioteca bcryptjs. A senha em texto
-- puro nao existe em lugar nenhum do banco. E uma senha de demonstracao
-- e num sistema real deveria ser trocada no primeiro acesso.
INSERT INTO usuario (id_usuario, id_perfil, login, senha_hash, nome_exibicao, situacao) VALUES
 (1, 1, 'admin', '$2b$10$5sbCWtdQBwKx/LbXsQmpW.uov9qH5H.nqeMvvL0swDHc5sNNPSB3y',
  'Administrador do Sistema', 'ATIVO');

INSERT INTO curso (id_curso, nome, grau, duracao_semestres) VALUES
 (1, 'Analise e Desenvolvimento de Sistemas', 'TECNOLOGO',     5),
 (2, 'Sistemas para Internet',                'TECNOLOGO',     5),
 (3, 'Ciencia da Computacao',                 'BACHARELADO',   8),
 (4, 'Sistemas de Informacao',                'BACHARELADO',   8),
 (5, 'Licenciatura em Computacao',            'LICENCIATURA',  8);

-- Limite de carga horaria semestral por regime (regra validada no UC04).
INSERT INTO regime_trabalho (codigo, descricao, carga_horaria_maxima) VALUES
 ('HORISTA',  'Horista',              160),
 ('PARCIAL',  'Tempo parcial',        320),
 ('INTEGRAL', 'Dedicacao exclusiva',  480);

-- =====================================================================
-- 2. UC01 - CADASTRAR ALUNO
-- A insercao ocorre em tres niveis, refletindo a heranca
-- Pessoa -> PessoaFisica -> Aluno.
-- =====================================================================

INSERT INTO pessoa (id_pessoa, nome, endereco, email, telefone, tipo_pessoa) VALUES
 (1, 'Lorenzo Goncalves', 'Rua Apollo Melo, 981 - Recife/PE', 'lorenzo.goncalves@uni.edu.br', '(81) 92183-2200', 'FISICA'),
 (2, 'Maya Azevedo', 'Rua Henry Gabriel Teixeira, 1584 - Recife/PE', 'maya.azevedo@uni.edu.br', '(81) 93911-0653', 'FISICA'),
 (3, 'Maria Laura Camara', 'Avenida Isabel Casa Grande, 308 - Recife/PE', 'maria.camara@uni.edu.br', '(81) 93369-8002', 'FISICA'),
 (4, 'Fernando Pacheco', 'Alameda Caio Carvalho, 108 - Recife/PE', 'fernando.pacheco@uni.edu.br', '(81) 98733-6535', 'FISICA');

-- CPFs inventados, com digito verificador calculado pelo modulo 11.
INSERT INTO pessoa_fisica (id_pessoa, cpf, data_nascimento) VALUES
 (1, '01824975694', '2004-03-17'),
 (2, '31604782544', '2003-11-02'),
 (3, '08273196496', '2005-06-25'),
 (4, '93504672838', '2002-09-09');

-- Nas tres primeiras linhas a matricula e informada explicitamente; na
-- ultima ela e deixada em branco para demonstrar o gatilho trg_aluno_bi,
-- que gera o numero automaticamente (UC01, passo 6).
-- O aluno 2 entra em Sistemas de Informacao e e transferido para ADS
-- na secao 8.
INSERT INTO aluno (id_pessoa, matricula, id_curso, data_ingresso) VALUES
 (1, '2026000001', 1, '2026-02-10'),
 (2, '2026000002', 4, '2026-02-10'),
 (3, '2026000003', 2, '2026-02-10'),
 (4, '',           3, '2026-08-03');

-- Cenario alternativo CA01-A (CPF ja cadastrado): a instrucao abaixo e
-- rejeitada pela constraint uk_pessoa_fisica_cpf. Mantida comentada para
-- que o script execute integralmente; descomente para demonstrar o erro.
-- INSERT INTO pessoa_fisica (id_pessoa, cpf, data_nascimento)
--      VALUES (99, '01824975694', '1999-05-05');
-- ERRO ESPERADO (verificado no MySQL 8.0.46):
-- ERROR 1062 (23000): Duplicate entry '01824975694' for key 'pessoa_fisica.uk_pessoa_fisica_cpf'

-- =====================================================================
-- 3. UC03 - CADASTRAR DOCENTE
-- =====================================================================

INSERT INTO pessoa (id_pessoa, nome, endereco, email, telefone, tipo_pessoa) VALUES
 (5, 'Leonardo Oliveira', 'Alameda Davi Carvalho, 87 - Recife/PE', 'leonardo.oliveira@uni.edu.br', '(81) 3901-7297', 'FISICA'),
 (6, 'Sabrina Cunha', 'Alameda Ravi Nascimento, 144 - Recife/PE', 'sabrina.cunha@uni.edu.br', '(81) 3016-9472', 'FISICA'),
 (7, 'Murilo Mota', 'Rua Manuela Moura, 493 - Recife/PE', 'murilo.mota@uni.edu.br', '(81) 3342-8788', 'FISICA'),
 (8, 'Antonella Cassiano', 'Travessa Julia Costela, 1519 - Recife/PE', 'antonella.cassiano@uni.edu.br', '(81) 3974-7525', 'FISICA');

INSERT INTO pessoa_fisica (id_pessoa, cpf, data_nascimento) VALUES
 (5, '74652031807', '1979-08-12'),
 (6, '42376509106', '1982-02-27'),
 (7, '26453980738', '1975-10-05'),
 (8, '39084125797', '1988-06-19');

INSERT INTO docente (id_pessoa, codigo_identificacao, titulacao, area_atuacao, regime_trabalho) VALUES
 (5, 'DOC00001', 'DOUTORADO',      'Engenharia de Software', 'INTEGRAL'),
 (6, 'DOC00002', 'MESTRADO',       'Banco de Dados',         'PARCIAL'),
 (7, 'DOC00003', 'DOUTORADO',      'Redes de Computadores',  'INTEGRAL'),
 (8, 'DOC00004', 'ESPECIALIZACAO', 'Programacao Web',        'HORISTA');

-- =====================================================================
-- 4. DISCIPLINAS E UC04 - ATRIBUIR DISCIPLINA AO DOCENTE
-- =====================================================================

INSERT INTO disciplina (id_disciplina, codigo, nome, carga_horaria, periodo_letivo, id_curso) VALUES
 (1,  'ADS0101', 'Algoritmos e Logica de Programacao',  80, '2026/2', 1),
 (2,  'ADS0102', 'Programacao Orientada a Objetos',     80, '2026/2', 1),
 (3,  'ADS0103', 'Banco de Dados I',                    60, '2026/2', 1),
 (4,  'ADS0104', 'Engenharia de Software',              60, '2026/2', 1),
 (5,  'ADS0105', 'Analise e Projeto de Sistemas',       60, '2026/2', 1),
 (6,  'SPI0201', 'Desenvolvimento Web Front-end',       80, '2026/2', 2),
 (7,  'SPI0202', 'Interface e Experiencia do Usuario',  40, '2026/2', 2),
 (8,  'CCO0301', 'Redes de Computadores',               80, '2026/2', 3),
 (9,  'CCO0302', 'Sistemas Operacionais',               60, '2026/2', 3),
 -- as duas abaixo, mais a ADS0101 e a ADS0105, ficam sem docente: sao
 -- as que aparecem como disponiveis na tela de atribuicao (UC04)
 (10, 'ADS0106', 'Estruturas de Dados',                 40, '2026/2', 1),
 (11, 'SPI0203', 'Desenvolvimento Web Back-end',        60, '2026/2', 2);

-- Cada insercao dispara trg_alocacao_bi (valida o limite do regime) e
-- trg_alocacao_ai (atualiza docente.carga_horaria_total).
INSERT INTO alocacao_disciplina (id_docente, id_disciplina, id_usuario) VALUES
 (5, 2, 1),   -- Leonardo Oliveira  -> Programacao Orientada a Objetos    (80h)
 (5, 4, 1),   -- Leonardo Oliveira  -> Engenharia de Software             (60h)  total 140/480
 (6, 3, 1),   -- Sabrina Cunha      -> Banco de Dados I                   (60h)
 (6, 5, 1),   -- Sabrina Cunha      -> Analise e Projeto de Sistemas      (60h)  total 120/320
 (7, 8, 1),   -- Murilo Mota        -> Redes de Computadores              (80h)
 (7, 9, 1),   -- Murilo Mota        -> Sistemas Operacionais              (60h)  total 140/480
 (8, 6, 1),   -- Antonella Cassiano -> Desenvolvimento Web Front-end      (80h)
 (8, 7, 1);   -- Antonella Cassiano -> Interface e Experiencia do Usuario (40h)  total 120/160

-- Cenario alternativo CA04-A (carga horaria maxima excedida):
-- a docente Antonella Cassiano e HORISTA (limite 160h) e ja possui 120h.
-- Atribuir uma disciplina de 60h ultrapassaria o limite e o gatilho
-- trg_alocacao_bi interrompe a operacao com SIGNAL SQLSTATE '45000'.
-- Descomente a instrucao abaixo, que tenta atribuir a ela a disciplina
-- ADS0105 (60h), uma das que ficam sem docente apos a secao 9:
-- INSERT INTO alocacao_disciplina (id_docente, id_disciplina, id_usuario)
--      VALUES (8, 5, 1);
-- ERRO ESPERADO (verificado no MySQL 8.0.46):
-- ERROR 1644 (45000): CA04-A: carga horaria excedida. Atual: 120h | Disciplina: 60h | Limite do regime: 160h.
--
-- Ja a ADS0106, de 40h, cabe exatamente nas 40h restantes e e aceita.

-- =====================================================================
-- 5. GESTAO DE PESSOAS JURIDICAS E DE FORNECEDORES
-- As duas pessoas juridicas da base sao os dois fornecedores
-- homologados. Cada uma existe em tres tabelas, seguindo a heranca
-- Pessoa -> PessoaJuridica -> Fornecedor.
-- =====================================================================

INSERT INTO pessoa (id_pessoa, nome, endereco, email, telefone, tipo_pessoa) VALUES
 (9,  'TecnoInfo Suprimentos', 'Rua Thales Costela, 822 - Recife/PE', 'comercial@tecnoinfo.exemplo.br', '(81) 3844-6638', 'JURIDICA'),
 (10, 'MoveisPro Corporativo', 'Rua Agatha Araujo, 450 - Recife/PE', 'atendimento@moveispro.exemplo.br', '(81) 3450-6387', 'JURIDICA');

-- CNPJs inventados, com digito verificador calculado pelo modulo 11.
INSERT INTO pessoa_juridica (id_pessoa, cnpj, razao_social) VALUES
 (9,  '80459276000171', 'TecnoInfo Comercio de Suprimentos LTDA'),
 (10, '63847205000127', 'MoveisPro Industria e Comercio LTDA');

INSERT INTO fornecedor (id_pessoa, limite_gastos, requisitos_fornecimento, categoria, data_homologacao) VALUES
 (9,  150000.00, 'Entrega em ate 15 dias; garantia minima de 12 meses; nota fiscal eletronica.', 'Informatica', '2026-03-05'),
 (10, 220000.00, 'Montagem inclusa; garantia de 24 meses; certificacao NBR 13962.',              'Mobiliario',  '2026-04-02');

-- Cenario de erro "Procura de Fornecedores (CNPJ - Erros)": um CNPJ fora
-- do formato de 14 digitos e barrado pela constraint ck_pj_cnpj_formato.
-- INSERT INTO pessoa_juridica (id_pessoa, cnpj, razao_social)
--      VALUES (99, '1234', 'Fornecedor Invalido LTDA');
-- ERRO ESPERADO (verificado no MySQL 8.0.46):
-- ERROR 3819 (HY000): Check constraint 'ck_pj_cnpj_formato' is violated.

-- =====================================================================
-- 6. PROCESSO DE FORNECIMENTO
-- Requisitos -> Pedido -> Itens -> Apresentacao -> Validacao.
-- O requisito 2 recebeu duas propostas do mesmo fornecedor: a primeira
-- foi reprovada e a segunda esta aguardando validacao.
-- =====================================================================

INSERT INTO requisito_fornecimento (id_requisito, descricao, categoria, prazo_maximo_dias, valor_estimado, id_usuario_gestor, situacao) VALUES
 (1, 'Aquisicao de 30 notebooks para o laboratorio de desenvolvimento.', 'Informatica', 30, 135000.00, 1, 'EM_COTACAO'),
 (2, 'Substituicao de 120 cadeiras das salas de aula do bloco B.',       'Mobiliario',  45,  96000.00, 1, 'EM_COTACAO');

INSERT INTO pedido (id_pedido, numero, id_requisito, id_fornecedor, id_usuario_gestor, data_pedido, data_apresentacao, status) VALUES
 (1, 'PED-2026001', 1,  9, 1, '2026-08-10 09:15:00', '2026-08-14 10:00:00', 'APROVADO'),
 (2, 'PED-2026002', 2, 10, 1, '2026-08-12 14:40:00', '2026-08-18 09:30:00', 'REPROVADO'),
 (3, 'PED-2026003', 2, 10, 1, '2026-08-20 11:05:00', '2026-08-22 15:10:00', 'APRESENTADO'),
 (4, 'PED-2026004', 1,  9, 1, '2026-08-25 16:20:00', NULL,                  'RASCUNHO');

-- O gatilho trg_item_pedido_ai recalcula pedido.valor_total a cada item.
INSERT INTO item_pedido (id_pedido, descricao, quantidade, valor_unitario) VALUES
 (1, 'Notebook 16GB RAM / SSD 512GB / i7',      30,  4200.00),
 (1, 'Base refrigerada para notebook',          30,    89.90),
 (2, 'Cadeira giratoria ergonomica com apoio', 120,   690.00),
 (2, 'Frete e montagem no local',                1,  3500.00),
 (3, 'Cadeira giratoria ergonomica com apoio', 120,   610.00),
 (3, 'Frete e montagem no local',                1,  2900.00),
 (4, 'Notebook 16GB RAM / SSD 512GB / i7',      10,  4250.00),
 (4, 'Mochila para notebook 15 polegadas',      10,   129.90);

INSERT INTO validacao_pedido (id_pedido, id_usuario_validador, resultado, parecer, data_validacao) VALUES
 (1, 1, 'APROVADO',  'Proposta dentro do valor estimado e do prazo de 30 dias definido no requisito.', '2026-08-15 15:20:00'),
 (2, 1, 'REPROVADO', 'Valor apresentado supera em 12% o estimado e o prazo de entrega excede 45 dias.','2026-08-19 10:45:00');

-- =====================================================================
-- 7. UC02 - ATUALIZAR DADOS DO ALUNO
-- Cada atualizacao e acompanhada do registro de auditoria exigido pela
-- pos-condicao do caso de uso (data, hora e responsavel).
-- =====================================================================

UPDATE pessoa
   SET endereco = 'Avenida Isabel Casa Grande, 308 - Recife/PE',
       telefone = '(81) 93369-8002'
 WHERE id_pessoa = 3;

INSERT INTO log_alteracao (tabela_afetada, id_registro, operacao, campo_alterado, valor_anterior, valor_novo, id_usuario) VALUES
 ('pessoa', 3, 'ATUALIZACAO', 'endereco', 'Avenida Luana Siqueira, 82 - Recife/PE', 'Avenida Isabel Casa Grande, 308 - Recife/PE', 1),
 ('pessoa', 3, 'ATUALIZACAO', 'telefone', '(81) 98333-7712',                        '(81) 93369-8002',                             1);

-- Transferencia de curso do aluno de matricula 2026000002.
UPDATE aluno
   SET id_curso = 1
 WHERE matricula = '2026000002';

INSERT INTO log_alteracao (tabela_afetada, id_registro, operacao, campo_alterado, valor_anterior, valor_novo, id_usuario) VALUES
 ('aluno', 2, 'ATUALIZACAO', 'id_curso', 'Sistemas de Informacao', 'Analise e Desenvolvimento de Sistemas', 1);

-- =====================================================================
-- 8. CASOS DE USO "INATIVAR" E "REATIVAR"
-- A inativacao e logica (soft delete): o registro permanece na base
-- preservando o historico academico. Justamente por isso ela tem volta,
-- e a reativacao devolve o registro as rotinas ativas.
-- =====================================================================

-- O aluno de matricula 2026000004 continua inativo.
UPDATE pessoa
   SET situacao = 'INATIVO'
 WHERE id_pessoa = (SELECT id_pessoa FROM aluno WHERE matricula = '2026000004');

INSERT INTO log_alteracao (tabela_afetada, id_registro, operacao, campo_alterado, valor_anterior, valor_novo, id_usuario)
 VALUES ('pessoa', 4, 'INATIVACAO', 'situacao', 'ATIVO', 'INATIVO', 1);

-- O aluno de matricula 2026000002 trancou a matricula e depois retornou:
-- o ciclo completo fica registrado na auditoria.
UPDATE pessoa
   SET situacao = 'INATIVO'
 WHERE id_pessoa = 2;

INSERT INTO log_alteracao (tabela_afetada, id_registro, operacao, campo_alterado, valor_anterior, valor_novo, id_usuario)
 VALUES ('pessoa', 2, 'INATIVACAO', 'situacao', 'ATIVO', 'INATIVO', 1);

UPDATE pessoa
   SET situacao = 'ATIVO'
 WHERE id_pessoa = 2;

INSERT INTO log_alteracao (tabela_afetada, id_registro, operacao, campo_alterado, valor_anterior, valor_novo, id_usuario)
 VALUES ('pessoa', 2, 'REATIVACAO', 'situacao', 'INATIVO', 'ATIVO', 1);

-- =====================================================================
-- 9. REMOCAO DE ATRIBUICAO DE DISCIPLINA
-- Unica exclusao fisica do modelo: desfazer uma alocacao. O gatilho
-- trg_alocacao_ad devolve as horas ao saldo do docente. A disciplina
-- ADS0105 (60h) volta a ficar disponivel para atribuicao.
-- =====================================================================

DELETE FROM alocacao_disciplina
 WHERE id_docente = 6 AND id_disciplina = 5;

COMMIT;

-- =====================================================================
-- 10. CONSULTAS DE VERIFICACAO
-- Reproduzem as listagens exibidas nas telas do prototipo.
-- =====================================================================

-- Tela "Consultar Aluno" (UC - Consultar Aluno).
SELECT matricula, nome, cpf, curso, situacao
  FROM vw_aluno
 ORDER BY nome;

-- Tela "Atribuir Disciplina": saldo de carga horaria por docente (UC04).
SELECT codigo_identificacao, nome, regime,
       carga_horaria_total, carga_horaria_maxima, carga_disponivel
  FROM vw_docente_carga
 ORDER BY nome;

-- Disciplinas do periodo e seus responsaveis; as sem docente aparecem
-- como "NAO ATRIBUIDA" e sao as ofertadas na tela de atribuicao.
SELECT d.codigo, d.nome AS disciplina, d.carga_horaria, d.periodo_letivo,
       COALESCE(p.nome, 'NAO ATRIBUIDA') AS docente_responsavel
  FROM disciplina d
  LEFT JOIN alocacao_disciplina al ON al.id_disciplina = d.id_disciplina
  LEFT JOIN pessoa             p  ON p.id_pessoa       = al.id_docente
 ORDER BY d.codigo;

-- Tela "Consultar Fornecedor" com o total ja empenhado em pedidos.
SELECT f.cnpj, f.nome_fantasia, f.categoria, f.limite_gastos, f.situacao,
       COALESCE(SUM(ped.valor_total), 0) AS total_em_pedidos
  FROM vw_fornecedor f
  LEFT JOIN pedido ped ON ped.id_fornecedor = f.id_pessoa
                      AND ped.status <> 'CANCELADO'
 GROUP BY f.cnpj, f.nome_fantasia, f.categoria, f.limite_gastos, f.situacao
 ORDER BY f.nome_fantasia;

-- Tela "Validacao do Pedido": pedidos e o resultado da validacao.
SELECT numero, fornecedor, requisito, valor_total, limite_gastos,
       status, COALESCE(resultado_validacao, 'AGUARDANDO') AS validacao
  FROM vw_pedido
 ORDER BY numero;

-- Trilha de auditoria (pos-condicao do UC02).
SELECT l.data_hora, l.tabela_afetada, l.id_registro, l.operacao,
       l.campo_alterado, l.valor_anterior, l.valor_novo, u.nome_exibicao AS responsavel
  FROM log_alteracao l
  JOIN usuario u ON u.id_usuario = l.id_usuario
 ORDER BY l.data_hora, l.id_log;

-- Fim do DML.
