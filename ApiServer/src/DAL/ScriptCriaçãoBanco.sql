-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2025-09-12 20:13:44.675

-- tables
-- Table: AgendamentoInteracao
CREATE TABLE AgendamentoInteracao (
    agendamento_interacao_ID int  NOT NULL,
    data_marcada datetime  NOT NULL,
    tipo_interacao varchar(20)  NOT NULL,
    status varchar(20)  NOT NULL,
    notas varchar(255)  NULL,
    cliente_ID int  NOT NULL,
    funcionario_ID int  NOT NULL,
    CONSTRAINT CustomerInteractionSchedule_pk PRIMARY KEY (agendamento_interacao_ID)
);

-- Table: Cliente
CREATE TABLE Cliente (
    cliente_ID int  NOT NULL,
    nome nvarchar(100)  NOT NULL,
    endereco nvarchar(255)  NOT NULL,
    funcionario_ID int  NOT NULL,
    funil_ID int  NOT NULL,
    CONSTRAINT Costumer_pk PRIMARY KEY (cliente_ID)
);

-- Table: ContatoCliente
CREATE TABLE ContatoCliente (
    Contato_cliente_ID int  NOT NULL,
    tipo_contato varchar(20)  NOT NULL,
    valor_contato nvarchar(255)  NOT NULL,
    cliente_ID int  NOT NULL,
    CONSTRAINT CustomerContact_pk PRIMARY KEY (Contato_cliente_ID)
);

-- Table: EventoTreinamento
CREATE TABLE EventoTreinamento (
    evento_ID int  NOT NULL,
    titulo varchar(100)  NOT NULL,
    descricao longtext  NULL,
    data_inicio datetime  NOT NULL,
    duracao_horas float  NOT NULL,
    evento_link longtext  NOT NULL,
    status varchar(20)  NOT NULL,
    organizador_ID int  NOT NULL,
    CONSTRAINT EventTraining_pk PRIMARY KEY (evento_ID)
);

-- Table: Funcionario
CREATE TABLE Funcionario (
    funcionario_ID int  NOT NULL,
    nome nvarchar(100)  NOT NULL,
    genero varchar(10)  NOT NULL,
    endereco nvarchar(255)  NOT NULL,
    numero_telefone varchar(20)  NOT NULL,
    cargo varchar(50)  NOT NULL,
    email varchar(50)  NOT NULL,
    senha_hash nvarchar(255)  NOT NULL,
    nivel_acesso nvarchar(255)  NOT NULL,
    localizacao_funcionario varchar(100)  NOT NULL,
    gerente_ID int  NULL,
    UNIQUE INDEX email (email),
    CONSTRAINT Funcionario_pk PRIMARY KEY (funcionario_ID)
);

-- Table: FuncionariosConvidados
CREATE TABLE FuncionariosConvidados (
    evento_ID int  NOT NULL,
    funcionario_ID int  NOT NULL,
    CONSTRAINT FuncionariosConvidados_pk PRIMARY KEY (funcionario_ID,evento_ID)
);

-- Table: FunilVendas
CREATE TABLE FunilVendas (
    funil_ID int  NOT NULL,
    estagio_nome varchar(20)  NOT NULL,
    CONSTRAINT CustomerStage_pk PRIMARY KEY (funil_ID)
);

-- Table: HistoricoFunil
CREATE TABLE HistoricoFunil (
    historico_ID int  NOT NULL,
    data_movimentacao timestamp  NOT NULL,
    cliente_ID int  NOT NULL,
    funil_venda_ID int  NOT NULL,
    CONSTRAINT HistoricoFunil_pk PRIMARY KEY (historico_ID)
);

-- Table: InteracaoCliente
CREATE TABLE InteracaoCliente (
    interacao_ID int  NOT NULL,
    data_interacao date  NOT NULL,
    tipo_interacao varchar(20)  NOT NULL,
    relatorio_interacao varchar(255)  NOT NULL,
    funcionario_ID int  NOT NULL,
    cliente_ID int  NOT NULL,
    agendamento_interacao_ID int  NULL,
    CONSTRAINT CustomerInteraction_pk PRIMARY KEY (interacao_ID)
);

-- Table: Notificacao
CREATE TABLE Notificacao (
    notificacao_ID int  NOT NULL,
    titulo_notificacao varchar(100)  NOT NULL,
    corpo_notificacao longtext  NULL,
    evento_ID int  NOT NULL,
    CONSTRAINT Notification_pk PRIMARY KEY (notificacao_ID)
);

-- Table: NotificacaoConvidados
CREATE TABLE NotificacaoConvidados (
    notificacao_ID int  NOT NULL,
    funcionario_ID int  NOT NULL,
    evento_ID int  NOT NULL,
    status_leitura bool  NOT NULL,
    data_leitura datetime  NULL,
    prioridade varchar(20)  NOT NULL,
    CONSTRAINT NotificacaoConvidados_pk PRIMARY KEY (funcionario_ID,evento_ID,notificacao_ID)
);

-- Table: Presenca
CREATE TABLE Presenca (
    presenca_ID int  NOT NULL,
    presente bool  NOT NULL,
    razao_recusa longtext  NULL,
    data_termino datetime  NULL,
    link_feedback longtext  NULL,
    funcionario_ID int  NOT NULL,
    evento_ID int  NOT NULL,
    CONSTRAINT Attendance_pk PRIMARY KEY (presenca_ID)
);

-- Table: Vendas
CREATE TABLE Vendas (
    venda_ID int  NOT NULL,
    data_venda date  NOT NULL,
    valor_total decimal(10,2)  NOT NULL,
    status varchar(20)  NOT NULL,
    cliente_ID int  NOT NULL,
    funcionario_ID int  NOT NULL,
    CONSTRAINT Sale_pk PRIMARY KEY (venda_ID)
);

-- foreign keys
-- Reference: AgendamentoInteracao_Cliente (table: AgendamentoInteracao)
ALTER TABLE AgendamentoInteracao ADD CONSTRAINT AgendamentoInteracao_Cliente FOREIGN KEY AgendamentoInteracao_Cliente (cliente_ID)
    REFERENCES Cliente (cliente_ID);

-- Reference: AgendamentoInteracao_Funcionario (table: AgendamentoInteracao)
ALTER TABLE AgendamentoInteracao ADD CONSTRAINT AgendamentoInteracao_Funcionario FOREIGN KEY AgendamentoInteracao_Funcionario (funcionario_ID)
    REFERENCES Funcionario (funcionario_ID);

-- Reference: CLIENTE_CustomerStage (table: Cliente)
ALTER TABLE Cliente ADD CONSTRAINT CLIENTE_CustomerStage FOREIGN KEY CLIENTE_CustomerStage (funil_ID)
    REFERENCES FunilVendas (funil_ID);

-- Reference: Costumer_Employee (table: Cliente)
ALTER TABLE Cliente ADD CONSTRAINT Costumer_Employee FOREIGN KEY Costumer_Employee (funcionario_ID)
    REFERENCES Funcionario (funcionario_ID);

-- Reference: CustomerContact_Costumer (table: ContatoCliente)
ALTER TABLE ContatoCliente ADD CONSTRAINT CustomerContact_Costumer FOREIGN KEY CustomerContact_Costumer (cliente_ID)
    REFERENCES Cliente (cliente_ID);

-- Reference: CustomerInteraction_Costumer (table: InteracaoCliente)
ALTER TABLE InteracaoCliente ADD CONSTRAINT CustomerInteraction_Costumer FOREIGN KEY CustomerInteraction_Costumer (cliente_ID)
    REFERENCES Cliente (cliente_ID);

-- Reference: CustomerInteraction_Employee (table: InteracaoCliente)
ALTER TABLE InteracaoCliente ADD CONSTRAINT CustomerInteraction_Employee FOREIGN KEY CustomerInteraction_Employee (funcionario_ID)
    REFERENCES Funcionario (funcionario_ID);

-- Reference: EventoTreinamento_Funcionario (table: EventoTreinamento)
ALTER TABLE EventoTreinamento ADD CONSTRAINT EventoTreinamento_Funcionario FOREIGN KEY EventoTreinamento_Funcionario (organizador_ID)
    REFERENCES Funcionario (funcionario_ID);

-- Reference: Funcionario_Funcionario (table: Funcionario)
ALTER TABLE Funcionario ADD CONSTRAINT Funcionario_Funcionario FOREIGN KEY Funcionario_Funcionario (gerente_ID)
    REFERENCES Funcionario (funcionario_ID);

-- Reference: FuncionariosConvidados_EventoTreinamento (table: FuncionariosConvidados)
ALTER TABLE FuncionariosConvidados ADD CONSTRAINT FuncionariosConvidados_EventoTreinamento FOREIGN KEY FuncionariosConvidados_EventoTreinamento (evento_ID)
    REFERENCES EventoTreinamento (evento_ID);

-- Reference: FuncionariosConvidados_Funcionario (table: FuncionariosConvidados)
ALTER TABLE FuncionariosConvidados ADD CONSTRAINT FuncionariosConvidados_Funcionario FOREIGN KEY FuncionariosConvidados_Funcionario (funcionario_ID)
    REFERENCES Funcionario (funcionario_ID);

-- Reference: HistoricoFunil_Cliente (table: HistoricoFunil)
ALTER TABLE HistoricoFunil ADD CONSTRAINT HistoricoFunil_Cliente FOREIGN KEY HistoricoFunil_Cliente (cliente_ID)
    REFERENCES Cliente (cliente_ID);

-- Reference: HistoricoFunil_FunilVendas (table: HistoricoFunil)
ALTER TABLE HistoricoFunil ADD CONSTRAINT HistoricoFunil_FunilVendas FOREIGN KEY HistoricoFunil_FunilVendas (funil_venda_ID)
    REFERENCES FunilVendas (funil_ID);

-- Reference: InteracaoCliente_AgendamentoInteracao (table: InteracaoCliente)
ALTER TABLE InteracaoCliente ADD CONSTRAINT InteracaoCliente_AgendamentoInteracao FOREIGN KEY InteracaoCliente_AgendamentoInteracao (agendamento_interacao_ID)
    REFERENCES AgendamentoInteracao (agendamento_interacao_ID);

-- Reference: NotificacaoConvidados_FuncionariosConvidados (table: NotificacaoConvidados)
ALTER TABLE NotificacaoConvidados ADD CONSTRAINT NotificacaoConvidados_FuncionariosConvidados FOREIGN KEY NotificacaoConvidados_FuncionariosConvidados (funcionario_ID,evento_ID)
    REFERENCES FuncionariosConvidados (funcionario_ID,evento_ID);

-- Reference: NotificacaoConvidados_Notificacao (table: NotificacaoConvidados)
ALTER TABLE NotificacaoConvidados ADD CONSTRAINT NotificacaoConvidados_Notificacao FOREIGN KEY NotificacaoConvidados_Notificacao (notificacao_ID)
    REFERENCES Notificacao (notificacao_ID);

-- Reference: Notification_EventoTreinamento (table: Notificacao)
ALTER TABLE Notificacao ADD CONSTRAINT Notification_EventoTreinamento FOREIGN KEY Notification_EventoTreinamento (evento_ID)
    REFERENCES EventoTreinamento (evento_ID);

-- Reference: Presenca_FuncionariosConvidados (table: Presenca)
ALTER TABLE Presenca ADD CONSTRAINT Presenca_FuncionariosConvidados FOREIGN KEY Presenca_FuncionariosConvidados (funcionario_ID,evento_ID)
    REFERENCES FuncionariosConvidados (funcionario_ID,evento_ID);

-- Reference: Vendas_Cliente (table: Vendas)
ALTER TABLE Vendas ADD CONSTRAINT Vendas_Cliente FOREIGN KEY Vendas_Cliente (cliente_ID)
    REFERENCES Cliente (cliente_ID);

-- Reference: Vendas_Funcionario (table: Vendas)
ALTER TABLE Vendas ADD CONSTRAINT Vendas_Funcionario FOREIGN KEY Vendas_Funcionario (funcionario_ID)
    REFERENCES Funcionario (funcionario_ID);

-- End of file.