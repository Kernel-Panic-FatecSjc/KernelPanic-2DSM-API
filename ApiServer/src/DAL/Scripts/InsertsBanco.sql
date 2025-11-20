USE api2dsm;

-- ======================
-- SEED DE DADOS INICIAIS
-- ======================

-- 1. Tabela: funil_vendas
INSERT INTO funil_vendas (estagio_nome) VALUES
('Prospeccao'),
('Inicial'),
('Potencial'),
('Manutencao'),
('Negociacao'),
('FollowUp'),
('Vendas'),
('NaoVendas');

-- 2. Tabela: perfil
INSERT INTO perfil (nome, descricao) VALUES
('master', 'Acesso total ao sistema')
ON DUPLICATE KEY UPDATE descricao = VALUES(descricao);

INSERT INTO perfil (nome, descricao) VALUES
('vendedor', 'Pode cadastrar e gerenciar clientes')
ON DUPLICATE KEY UPDATE descricao = VALUES(descricao);

INSERT INTO perfil (nome, descricao) VALUES
('gestor', 'Acesso intermediario entre master e vendedor')
ON DUPLICATE KEY UPDATE descricao = VALUES(descricao);

-- 3. Tabela: funcionario (sem definir ID)
INSERT INTO funcionario 
(nome, genero, endereco, numero_telefone, cargo, email, senha_hash, localizacao_funcionario, gerente_ID) 
VALUES
('Carlos Silva', 'Masculino', 'Rua A, 123', '11999999999', 'Gerente de Vendas', 'carlos@empresa.com', '$2b$10$QjuumfTaMDQUKeUTs9HQ8O0FpgjZiET9ExG8h1pUuUzYqQxTc6VDq', 'São Paulo', NULL),
('Ana Oliveira', 'Feminino', 'Rua B, 456', '11888888888', 'Vendedor', 'ana@empresa.com', '$2b$10$QjuumfTaMDQUKeUTs9HQ8O0FpgjZiET9ExG8h1pUuUzYqQxTc6VDq', 'São Paulo', 1),
('João Souza', 'Masculino', 'Rua C, 789', '11777777777', 'Consultor', 'joao@empresa.com', '$2b$10$QjuumfTaMDQUKeUTs9HQ8O0FpgjZiET9ExG8h1pUuUzYqQxTc6VDq', 'Rio de Janeiro', 1);

-- 4. Tabela: funcionario_perfis (associando funcionários aos perfis)
INSERT INTO funcionario_perfis (funcionario_ID, perfil_ID) VALUES
(1, 1),
(2, 2),
(3, 3)
ON DUPLICATE KEY UPDATE perfil_ID = VALUES(perfil_ID);

-- 5. Tabela: cliente
INSERT INTO cliente (nome, endereco, segmento_atuacao, funcionario_id, funil_id) VALUES
('Empresa Alpha', 'Av. Paulista, 1000', 'Congelados', 2, 1),
('Empresa Beta', 'Av. Rio Branco, 200', 'Metalúrgia', 3, 2);

-- 6. Tabela: contato_cliente
INSERT INTO contato_cliente (tipo_contato, valor_contato, cliente_id) VALUES
('email', 'contato@alpha.com', 1),
('telefone', '1133334444', 1),
('email', 'comercial@beta.com', 2);

-- 7. Tabela: interacao_cliente
INSERT INTO interacao_cliente (data_interacao, tipo_interacao, relatorio_interacao, funcionario_id, cliente_id) VALUES
('2025-09-20', 'Reunião', 'Cliente interessado, pediu revisão da proposta.', 2, 1),
('2025-09-22', 'Chamada', 'Cliente não atendeu, reagendado.', 3, 2);

-- 8. Tabela: historico_funil
INSERT INTO historico_funil (data_movimentacao, cliente_id, funil_id) VALUES
(CURRENT_TIMESTAMP, 1, 1),
(CURRENT_TIMESTAMP, 2, 2);

-- 9. Tabela: evento_treinamento
INSERT INTO evento_treinamento (titulo, descricao, dataHora, duracao_horas, evento_link, status, organizador_id) VALUES
('Treinamento de Vendas Consultivas', 'Curso avançado de técnicas de vendas.', '2025-09-25 09:00:00', 4, 'https://evento.com/vendas', 'Ativo', 1);

-- 10. Tabela: funcionarios_convidados
INSERT INTO funcionarios_convidados (evento_id, funcionario_id) VALUES
(1, 2),
(1, 3);

-- 11. Tabela: presenca
INSERT INTO presenca (presente, razao_recusa, data_termino, link_feedback, funcionario_id, evento_id) VALUES
(TRUE, NULL, '2025-09-25 13:00:00', 'https://evento.com/feedback1', 2, 1),
(FALSE, 'Conflito de agenda', NULL, NULL, 3, 1);

-- 12. Tabela: notificacao
INSERT INTO notificacao (titulo_notificacao, corpo_notificacao, evento_id) VALUES
('Lembrete: Treinamento', 'Não se esqueça do treinamento agendado.', 1);

-- 13. Tabela: notificacao_convidados
INSERT INTO notificacao_convidados (notificacao_id, funcionario_id, evento_id, status_leitura, data_leitura, prioridade) VALUES
(1, 2, 1, TRUE, '2025-09-24 10:00:00', 'Alta'),
(1, 3, 1, FALSE, NULL, 'Alta');

-- 14. Tabela: vendas
INSERT INTO vendas (data_venda, valor_total, status, cliente_id, funcionario_id) VALUES
('2025-09-15', 5000.00, 'Fechada', 1, 2),
('2025-09-16', 3200.00, 'Em negociação', 2, 3);