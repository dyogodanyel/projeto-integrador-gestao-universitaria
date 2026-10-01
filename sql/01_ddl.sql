-- =====================================================================
-- PROJETO INTEGRADOR - DESENVOLVIMENTO DE SISTEMAS ORIENTADO A OBJETOS
-- 2a ETAPA - MODELO DE DADOS (DDL - Data Definition Language)
-- Sistema de Gestao Universitaria
-- SGBD: MySQL 8.0+   Charset: utf8mb4   Engine: InnoDB
--
-- Baseado no Diagrama de Classes e nos Diagramas de Caso de Uso da
-- 1a etapa.
--
-- Para mapear a heranca usamos Class Table Inheritance (uma tabela por
-- classe). A especializacao e feita por PK compartilhada, que tambem e
-- FK para a tabela da superclasse:
--   pessoa -> pessoa_fisica   -> aluno / docente
--   pessoa -> pessoa_juridica -> fornecedor
-- =====================================================================

DROP DATABASE IF EXISTS gestao_universitaria;
CREATE DATABASE gestao_universitaria
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_0900_ai_ci;
USE gestao_universitaria;

-- =====================================================================
-- 1. SEGURANCA E CONTROLE DE ACESSO
-- Atende a pre-condicao comum a todos os casos de uso da 1a etapa:
-- "O ator deve estar autenticado no sistema".
--
-- A tabela perfil guarda os quatro atores do Diagrama de Caso de Uso
-- mais o perfil administrador. O sistema tem um usuario so (admin),
-- que assume o perfil do ator conforme o modulo em uso. Os outros
-- perfis ficam cadastrados porque o modelo precisa suporta-los.
-- =====================================================================

CREATE TABLE perfil (
    id_perfil       TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome            VARCHAR(40)  NOT NULL,
    descricao       VARCHAR(150) NOT NULL,
    CONSTRAINT pk_perfil        PRIMARY KEY (id_perfil),
    CONSTRAINT uk_perfil_nome   UNIQUE (nome)
) ENGINE=InnoDB COMMENT='Perfis de acesso: administrador e os quatro atores do diagrama de caso de uso.';

CREATE TABLE usuario (
    id_usuario      INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_perfil       TINYINT UNSIGNED NOT NULL,
    login           VARCHAR(40)  NOT NULL,
    senha_hash      CHAR(60)     NOT NULL,
    nome_exibicao   VARCHAR(120) NOT NULL,
    situacao        ENUM('ATIVO','INATIVO') NOT NULL DEFAULT 'ATIVO',
    ultimo_acesso   DATETIME     NULL,
    CONSTRAINT pk_usuario        PRIMARY KEY (id_usuario),
    CONSTRAINT uk_usuario_login  UNIQUE (login),
    CONSTRAINT fk_usuario_perfil FOREIGN KEY (id_perfil)
        REFERENCES perfil (id_perfil) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB COMMENT='Credenciais de acesso; a senha nunca e gravada em texto claro, apenas o hash BCrypt.';

-- =====================================================================
-- 2. HIERARQUIA DE PESSOAS
-- Classe abstrata Pessoa -> PessoaFisica e PessoaJuridica.
-- O atributo situacao foi promovido para Pessoa porque a operacao
-- inativar() esta declarada na superclasse abstrata do diagrama.
-- =====================================================================

CREATE TABLE pessoa (
    id_pessoa        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome             VARCHAR(120) NOT NULL,
    endereco         VARCHAR(180) NOT NULL,
    email            VARCHAR(120) NOT NULL,
    telefone         VARCHAR(20)  NOT NULL,
    tipo_pessoa      ENUM('FISICA','JURIDICA') NOT NULL,
    situacao         ENUM('ATIVO','INATIVO')   NOT NULL DEFAULT 'ATIVO',
    data_cadastro    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                              ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_pessoa       PRIMARY KEY (id_pessoa),
    CONSTRAINT uk_pessoa_email UNIQUE (email),
    CONSTRAINT ck_pessoa_email CHECK (email LIKE '%_@_%._%')
) ENGINE=InnoDB COMMENT='Classe abstrata Pessoa: atributos e comportamentos comuns.';

CREATE INDEX ix_pessoa_nome     ON pessoa (nome);
CREATE INDEX ix_pessoa_situacao ON pessoa (situacao);

CREATE TABLE pessoa_fisica (
    id_pessoa       INT UNSIGNED NOT NULL,
    cpf             CHAR(11)     NOT NULL,
    data_nascimento DATE         NOT NULL,
    CONSTRAINT pk_pessoa_fisica     PRIMARY KEY (id_pessoa),
    CONSTRAINT uk_pessoa_fisica_cpf UNIQUE (cpf),
    CONSTRAINT fk_pessoa_fisica_pessoa FOREIGN KEY (id_pessoa)
        REFERENCES pessoa (id_pessoa) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT ck_pf_cpf_formato CHECK (cpf REGEXP '^[0-9]{11}$')
) ENGINE=InnoDB COMMENT='PessoaFisica: a UNIQUE em cpf implementa validarUnicidadeCPF().';

CREATE TABLE pessoa_juridica (
    id_pessoa    INT UNSIGNED NOT NULL,
    cnpj         CHAR(14)     NOT NULL,
    razao_social VARCHAR(150) NOT NULL,
    CONSTRAINT pk_pessoa_juridica      PRIMARY KEY (id_pessoa),
    CONSTRAINT uk_pessoa_juridica_cnpj UNIQUE (cnpj),
    CONSTRAINT fk_pessoa_juridica_pessoa FOREIGN KEY (id_pessoa)
        REFERENCES pessoa (id_pessoa) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT ck_pj_cnpj_formato CHECK (cnpj REGEXP '^[0-9]{14}$')
) ENGINE=InnoDB COMMENT='PessoaJuridica: unicidade de CNPJ exigida no UC de Fornecedores.';

-- =====================================================================
-- 3. DOMINIO ACADEMICO
-- =====================================================================

CREATE TABLE curso (
    id_curso          SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome              VARCHAR(100) NOT NULL,
    grau              ENUM('TECNOLOGO','BACHARELADO','LICENCIATURA') NOT NULL,
    duracao_semestres TINYINT UNSIGNED NOT NULL,
    situacao          ENUM('ATIVO','INATIVO') NOT NULL DEFAULT 'ATIVO',
    CONSTRAINT pk_curso         PRIMARY KEY (id_curso),
    CONSTRAINT uk_curso_nome    UNIQUE (nome),
    CONSTRAINT ck_curso_duracao CHECK (duracao_semestres BETWEEN 4 AND 12)
) ENGINE=InnoDB COMMENT='Normalizacao do atributo cursoPretendido (String) da classe Aluno.';

CREATE TABLE regime_trabalho (
    codigo               VARCHAR(10) NOT NULL,
    descricao            VARCHAR(60) NOT NULL,
    carga_horaria_maxima SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT pk_regime       PRIMARY KEY (codigo),
    CONSTRAINT ck_regime_carga CHECK (carga_horaria_maxima > 0)
) ENGINE=InnoDB COMMENT='Limite de carga horaria por regime (regra do UC04 / CA04-A).';

CREATE TABLE aluno (
    id_pessoa     INT UNSIGNED NOT NULL,
    matricula     CHAR(10)     NOT NULL,
    id_curso      SMALLINT UNSIGNED NOT NULL,
    data_ingresso DATE         NOT NULL,
    CONSTRAINT pk_aluno           PRIMARY KEY (id_pessoa),
    CONSTRAINT uk_aluno_matricula UNIQUE (matricula),
    CONSTRAINT fk_aluno_pessoa_fisica FOREIGN KEY (id_pessoa)
        REFERENCES pessoa_fisica (id_pessoa) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_aluno_curso FOREIGN KEY (id_curso)
        REFERENCES curso (id_curso) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB COMMENT='Aluno herda de PessoaFisica; matricula unica gerada no UC01.';

CREATE TABLE docente (
    id_pessoa            INT UNSIGNED NOT NULL,
    codigo_identificacao CHAR(8)      NOT NULL,
    titulacao            ENUM('GRADUACAO','ESPECIALIZACAO','MESTRADO',
                              'DOUTORADO','POS_DOUTORADO') NOT NULL,
    area_atuacao         VARCHAR(80)  NOT NULL,
    regime_trabalho      VARCHAR(10)  NOT NULL,
    carga_horaria_total  SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    CONSTRAINT pk_docente        PRIMARY KEY (id_pessoa),
    CONSTRAINT uk_docente_codigo UNIQUE (codigo_identificacao),
    CONSTRAINT fk_docente_pessoa_fisica FOREIGN KEY (id_pessoa)
        REFERENCES pessoa_fisica (id_pessoa) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_docente_regime FOREIGN KEY (regime_trabalho)
        REFERENCES regime_trabalho (codigo) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB COMMENT='Docente herda de PessoaFisica; carga_horaria_total derivada das alocacoes.';

CREATE TABLE disciplina (
    id_disciplina  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    codigo         CHAR(7)      NOT NULL,
    nome           VARCHAR(100) NOT NULL,
    carga_horaria  SMALLINT UNSIGNED NOT NULL,
    periodo_letivo CHAR(6)      NOT NULL,
    id_curso       SMALLINT UNSIGNED NOT NULL,
    situacao       ENUM('ATIVA','INATIVA') NOT NULL DEFAULT 'ATIVA',
    CONSTRAINT pk_disciplina PRIMARY KEY (id_disciplina),
    CONSTRAINT uk_disciplina_codigo_periodo UNIQUE (codigo, periodo_letivo),
    CONSTRAINT fk_disciplina_curso FOREIGN KEY (id_curso)
        REFERENCES curso (id_curso) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT ck_disciplina_carga   CHECK (carga_horaria BETWEEN 20 AND 200),
    CONSTRAINT ck_disciplina_periodo CHECK (periodo_letivo REGEXP '^[0-9]{4}/[12]$')
) ENGINE=InnoDB COMMENT='Disciplina ofertada em um periodo letivo (ex.: 2026/1).';

-- Associacao direcional Docente 1 -> 0..* Disciplina (UML da 1a etapa).
-- Guarda tambem quando e por quem a atribuicao foi feita, como o UC04
-- pede. A UNIQUE em id_disciplina mantem a multiplicidade 1 do lado do
-- docente: cada oferta de disciplina tem no maximo um responsavel.
CREATE TABLE alocacao_disciplina (
    id_alocacao     INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_docente      INT UNSIGNED NOT NULL,
    id_disciplina   SMALLINT UNSIGNED NOT NULL,
    data_atribuicao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_usuario      INT UNSIGNED NOT NULL,
    CONSTRAINT pk_alocacao            PRIMARY KEY (id_alocacao),
    CONSTRAINT uk_alocacao_disciplina UNIQUE (id_disciplina),
    CONSTRAINT fk_alocacao_docente FOREIGN KEY (id_docente)
        REFERENCES docente (id_pessoa) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_alocacao_disciplina FOREIGN KEY (id_disciplina)
        REFERENCES disciplina (id_disciplina) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_alocacao_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuario (id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB COMMENT='Materializa a associacao ministra entre Docente e Disciplina.';

-- =====================================================================
-- 4. DOMINIO DE FORNECIMENTO
-- Cobre os casos de uso da Secao 3 da 1a etapa (Gestao de Fornecedores).
-- =====================================================================

CREATE TABLE fornecedor (
    id_pessoa               INT UNSIGNED NOT NULL,
    limite_gastos           DECIMAL(12,2) NOT NULL,
    requisitos_fornecimento VARCHAR(255)  NOT NULL,
    categoria               VARCHAR(60)   NOT NULL,
    data_homologacao        DATE          NULL,
    CONSTRAINT pk_fornecedor PRIMARY KEY (id_pessoa),
    CONSTRAINT fk_fornecedor_pessoa_juridica FOREIGN KEY (id_pessoa)
        REFERENCES pessoa_juridica (id_pessoa) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT ck_fornecedor_limite CHECK (limite_gastos >= 0)
) ENGINE=InnoDB COMMENT='Fornecedor herda de PessoaJuridica.';

CREATE TABLE requisito_fornecimento (
    id_requisito      INT UNSIGNED NOT NULL AUTO_INCREMENT,
    descricao         VARCHAR(255) NOT NULL,
    categoria         VARCHAR(60)  NOT NULL,
    prazo_maximo_dias SMALLINT UNSIGNED NOT NULL,
    valor_estimado    DECIMAL(12,2) NOT NULL,
    id_usuario_gestor INT UNSIGNED NOT NULL,
    data_registro     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    situacao          ENUM('ABERTO','EM_COTACAO','ENCERRADO') NOT NULL DEFAULT 'ABERTO',
    CONSTRAINT pk_requisito PRIMARY KEY (id_requisito),
    CONSTRAINT fk_requisito_usuario FOREIGN KEY (id_usuario_gestor)
        REFERENCES usuario (id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT ck_requisito_valor CHECK (valor_estimado > 0)
) ENGINE=InnoDB COMMENT='UC Estabelecer Requisitos de Fornecimento.';

CREATE TABLE pedido (
    id_pedido         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    numero            CHAR(11)     NOT NULL,
    id_requisito      INT UNSIGNED NOT NULL,
    id_fornecedor     INT UNSIGNED NOT NULL,
    id_usuario_gestor INT UNSIGNED NOT NULL,
    data_pedido       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_apresentacao DATETIME NULL,
    valor_total       DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    status            ENUM('RASCUNHO','ENVIADO','APRESENTADO',
                           'APROVADO','REPROVADO','CANCELADO')
                      NOT NULL DEFAULT 'RASCUNHO',
    CONSTRAINT pk_pedido        PRIMARY KEY (id_pedido),
    CONSTRAINT uk_pedido_numero UNIQUE (numero),
    CONSTRAINT fk_pedido_requisito FOREIGN KEY (id_requisito)
        REFERENCES requisito_fornecimento (id_requisito) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_pedido_fornecedor FOREIGN KEY (id_fornecedor)
        REFERENCES fornecedor (id_pessoa) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_pedido_usuario FOREIGN KEY (id_usuario_gestor)
        REFERENCES usuario (id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB COMMENT='UC Contato com Fornecedores e Realizacao do Pedido.';

CREATE TABLE item_pedido (
    id_item        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_pedido      INT UNSIGNED NOT NULL,
    descricao      VARCHAR(150) NOT NULL,
    quantidade     SMALLINT UNSIGNED NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL,
    subtotal       DECIMAL(12,2) AS (quantidade * valor_unitario) STORED,
    CONSTRAINT pk_item_pedido PRIMARY KEY (id_item),
    CONSTRAINT fk_item_pedido FOREIGN KEY (id_pedido)
        REFERENCES pedido (id_pedido) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT ck_item_quantidade CHECK (quantidade > 0),
    CONSTRAINT ck_item_valor      CHECK (valor_unitario > 0)
) ENGINE=InnoDB COMMENT='Itens do pedido; subtotal e coluna gerada (STORED).';

CREATE TABLE validacao_pedido (
    id_validacao         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_pedido            INT UNSIGNED NOT NULL,
    id_usuario_validador INT UNSIGNED NOT NULL,
    resultado            ENUM('APROVADO','REPROVADO') NOT NULL,
    parecer              VARCHAR(255) NOT NULL,
    data_validacao       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_validacao PRIMARY KEY (id_validacao),
    CONSTRAINT fk_validacao_pedido FOREIGN KEY (id_pedido)
        REFERENCES pedido (id_pedido) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_validacao_usuario FOREIGN KEY (id_usuario_validador)
        REFERENCES usuario (id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB COMMENT='UC Validacao: aprovacao ou reprovacao do pedido apresentado.';

-- =====================================================================
-- 5. AUDITORIA
-- Atende a pos-condicao do UC02: "Um registro de alteracao e gerado com
-- data, hora e responsavel pela modificacao".
-- =====================================================================

CREATE TABLE log_alteracao (
    id_log         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    tabela_afetada VARCHAR(40)  NOT NULL,
    id_registro    INT UNSIGNED NOT NULL,
    operacao       ENUM('INSERCAO','ATUALIZACAO','INATIVACAO','REATIVACAO') NOT NULL,
    campo_alterado VARCHAR(40)  NULL,
    valor_anterior VARCHAR(255) NULL,
    valor_novo     VARCHAR(255) NULL,
    id_usuario     INT UNSIGNED NOT NULL,
    data_hora      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_log PRIMARY KEY (id_log),
    CONSTRAINT fk_log_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuario (id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB COMMENT='Trilha de auditoria das operacoes de manutencao de cadastro.';

CREATE INDEX ix_log_tabela_registro ON log_alteracao (tabela_afetada, id_registro);

-- =====================================================================
-- 6. PROCEDURES
-- Guardam as regras de negocio em um lugar so. Os triggers da secao 7
-- apenas chamam essas procedures, para nao repetir o mesmo codigo em
-- INSERT, UPDATE e DELETE.
-- =====================================================================

DELIMITER $$

-- Recalcula a carga horaria total do docente somando as alocacoes que
-- existem. Preferimos recalcular a somar/subtrair a cada operacao: se
-- um calculo incremental deixar de rodar, o valor fica errado para
-- sempre; o recalculo sempre chega ao numero certo.
CREATE PROCEDURE sp_recalcular_carga_docente(IN p_id_docente INT UNSIGNED)
BEGIN
    UPDATE docente d
       SET d.carga_horaria_total = (
             SELECT COALESCE(SUM(di.carga_horaria), 0)
               FROM alocacao_disciplina a
               JOIN disciplina di ON di.id_disciplina = a.id_disciplina
              WHERE a.id_docente = p_id_docente)
     WHERE d.id_pessoa = p_id_docente;
END$$

-- UC04, passo 5 e CA04-A: verifica se a atribuicao cabe no limite do
-- regime de trabalho. O parametro p_ignorar_alocacao serve para o caso
-- de UPDATE: ignora a propria alocacao que esta sendo alterada.
CREATE PROCEDURE sp_validar_carga_docente(
    IN p_id_docente        INT UNSIGNED,
    IN p_id_disciplina     SMALLINT UNSIGNED,
    IN p_ignorar_alocacao  INT UNSIGNED)
BEGIN
    DECLARE v_carga_atual  INT DEFAULT 0;
    DECLARE v_carga_maxima INT DEFAULT 0;
    DECLARE v_carga_nova   INT DEFAULT 0;
    DECLARE v_mensagem     VARCHAR(200);

    SELECT COALESCE(SUM(di.carga_horaria), 0) INTO v_carga_atual
      FROM alocacao_disciplina a
      JOIN disciplina di ON di.id_disciplina = a.id_disciplina
     WHERE a.id_docente  = p_id_docente
       AND a.id_alocacao <> COALESCE(p_ignorar_alocacao, 0);

    SELECT r.carga_horaria_maxima INTO v_carga_maxima
      FROM docente d
      JOIN regime_trabalho r ON r.codigo = d.regime_trabalho
     WHERE d.id_pessoa = p_id_docente;

    SELECT carga_horaria INTO v_carga_nova
      FROM disciplina
     WHERE id_disciplina = p_id_disciplina;

    IF (v_carga_atual + v_carga_nova) > v_carga_maxima THEN
        SET v_mensagem = CONCAT('CA04-A: carga horaria excedida. Atual: ',
                                v_carga_atual, 'h | Disciplina: ', v_carga_nova,
                                'h | Limite do regime: ', v_carga_maxima, 'h.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_mensagem;
    END IF;
END$$

-- Mantem pedido.valor_total coerente com a soma dos itens.
CREATE PROCEDURE sp_recalcular_pedido(IN p_id_pedido INT UNSIGNED)
BEGIN
    UPDATE pedido
       SET valor_total = (SELECT COALESCE(SUM(subtotal), 0)
                            FROM item_pedido
                           WHERE id_pedido = p_id_pedido)
     WHERE id_pedido = p_id_pedido;
END$$

DELIMITER ;

-- =====================================================================
-- 7. TRIGGERS
-- Cobrem as tres operacoes (INSERT, UPDATE e DELETE) de cada tabela,
-- para que nenhum caminho deixe o valor calculado desatualizado.
-- =====================================================================

DELIMITER $$

-- UC01, passo 6: geracao automatica do numero de matricula.
CREATE TRIGGER trg_aluno_bi
BEFORE INSERT ON aluno
FOR EACH ROW
BEGIN
    IF NEW.matricula IS NULL OR NEW.matricula = '' THEN
        SET NEW.matricula = CONCAT(YEAR(CURDATE()), LPAD(NEW.id_pessoa, 6, '0'));
    END IF;
END$$

CREATE TRIGGER trg_alocacao_bi
BEFORE INSERT ON alocacao_disciplina
FOR EACH ROW
BEGIN
    CALL sp_validar_carga_docente(NEW.id_docente, NEW.id_disciplina, 0);
END$$

CREATE TRIGGER trg_alocacao_ai
AFTER INSERT ON alocacao_disciplina
FOR EACH ROW
BEGIN
    CALL sp_recalcular_carga_docente(NEW.id_docente);
END$$

-- Remanejamento de disciplina entre docentes ou troca da disciplina
-- atribuida: a validacao ignora a propria alocacao em edicao.
CREATE TRIGGER trg_alocacao_bu
BEFORE UPDATE ON alocacao_disciplina
FOR EACH ROW
BEGIN
    IF NEW.id_docente <> OLD.id_docente OR NEW.id_disciplina <> OLD.id_disciplina THEN
        CALL sp_validar_carga_docente(NEW.id_docente, NEW.id_disciplina, OLD.id_alocacao);
    END IF;
END$$

CREATE TRIGGER trg_alocacao_au
AFTER UPDATE ON alocacao_disciplina
FOR EACH ROW
BEGIN
    CALL sp_recalcular_carga_docente(NEW.id_docente);
    IF NEW.id_docente <> OLD.id_docente THEN
        CALL sp_recalcular_carga_docente(OLD.id_docente);
    END IF;
END$$

CREATE TRIGGER trg_alocacao_ad
AFTER DELETE ON alocacao_disciplina
FOR EACH ROW
BEGIN
    CALL sp_recalcular_carga_docente(OLD.id_docente);
END$$

CREATE TRIGGER trg_item_pedido_ai
AFTER INSERT ON item_pedido
FOR EACH ROW
BEGIN
    CALL sp_recalcular_pedido(NEW.id_pedido);
END$$

CREATE TRIGGER trg_item_pedido_au
AFTER UPDATE ON item_pedido
FOR EACH ROW
BEGIN
    CALL sp_recalcular_pedido(NEW.id_pedido);
    IF NEW.id_pedido <> OLD.id_pedido THEN
        CALL sp_recalcular_pedido(OLD.id_pedido);
    END IF;
END$$

CREATE TRIGGER trg_item_pedido_ad
AFTER DELETE ON item_pedido
FOR EACH ROW
BEGIN
    CALL sp_recalcular_pedido(OLD.id_pedido);
END$$

DELIMITER ;

-- =====================================================================
-- 8. VISOES DE APOIO AS TELAS DO PROTOTIPO
-- Cada visao alimenta diretamente uma tela de consulta do prototipo.
-- =====================================================================

CREATE OR REPLACE VIEW vw_aluno AS
SELECT a.matricula,
       p.id_pessoa,
       p.nome,
       pf.cpf,
       pf.data_nascimento,
       p.email,
       p.telefone,
       p.endereco,
       c.nome AS curso,
       p.situacao,
       a.data_ingresso
  FROM aluno a
  JOIN pessoa_fisica pf ON pf.id_pessoa = a.id_pessoa
  JOIN pessoa        p  ON p.id_pessoa  = a.id_pessoa
  JOIN curso         c  ON c.id_curso   = a.id_curso;

CREATE OR REPLACE VIEW vw_docente_carga AS
SELECT d.codigo_identificacao,
       p.id_pessoa,
       p.nome,
       d.titulacao,
       d.area_atuacao,
       r.descricao AS regime,
       d.carga_horaria_total,
       r.carga_horaria_maxima,
       (r.carga_horaria_maxima - d.carga_horaria_total) AS carga_disponivel,
       p.situacao
  FROM docente d
  JOIN pessoa_fisica   pf ON pf.id_pessoa = d.id_pessoa
  JOIN pessoa          p  ON p.id_pessoa  = d.id_pessoa
  JOIN regime_trabalho r  ON r.codigo     = d.regime_trabalho;

CREATE OR REPLACE VIEW vw_fornecedor AS
SELECT p.id_pessoa,
       pj.cnpj,
       pj.razao_social,
       p.nome AS nome_fantasia,
       f.categoria,
       f.limite_gastos,
       f.requisitos_fornecimento,
       p.email,
       p.telefone,
       p.situacao
  FROM fornecedor f
  JOIN pessoa_juridica pj ON pj.id_pessoa = f.id_pessoa
  JOIN pessoa          p  ON p.id_pessoa  = f.id_pessoa;

CREATE OR REPLACE VIEW vw_pedido AS
SELECT ped.numero,
       ped.id_pedido,
       p.nome       AS fornecedor,
       rq.descricao AS requisito,
       ped.valor_total,
       f.limite_gastos,
       ped.status,
       ped.data_pedido,
       v.resultado  AS resultado_validacao
  FROM pedido ped
  JOIN fornecedor f  ON f.id_pessoa    = ped.id_fornecedor
  JOIN pessoa     p  ON p.id_pessoa    = f.id_pessoa
  JOIN requisito_fornecimento rq ON rq.id_requisito = ped.id_requisito
  LEFT JOIN validacao_pedido  v  ON v.id_pedido     = ped.id_pedido;

-- Fim do DDL.
