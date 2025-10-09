# Video Demostrativo:
[Assistir no YouTube](https://youtu.be/yuDfMSC-joM)
<br>
[Assistir no YouTube](https://youtu.be/ywFObLK5jC4)

# Backlog da Primeira Sprint 

| Rank | Prioridade | User Story | Estimativa | Sprint | Requisitos do Parceiro |
| :--: | :--------: | :--- | :---: | :----: | :--- |
| 1 | 🔴 Alta | Eu como comercial, quero realizar o cadastro completo de clientes e departamento responsável, para incluí-los no sistema | 4 | 1 | Sistema de cadastro de clientes com campos completos |
| 2 | 🔴 Alta | Eu como comercial quero poder gerenciar os clientes cadastrados, para ver, atualizar e deletar clientes | 6 | 1 | Registro e consulta de histórico detalhado de interações com clientes |
| 3 | 🟠 Média | Eu como comercial, quero ver e classificar meus clientes em um funil de vendas com classificação: Prospects, Inicial, Potencial, Manutenção, Em Negociação e Follow Up, para visualizar insights sobre o ciclo de vendas do cliente | 8 | 1 | Funil de vendas com etapas definidas e classificações de clientes --> *Aqui que acho que ficaria bom colocar também um quadro parecido com o do Jira, para mostrar onde cada cliente está* |
| 4 | 🟠 Média | Eu como gestor comercial, quero poder visualizar relatórios e gráficos quantitativos de interações, vendas efetuadas, clientes cadastrados, clientes por cidade e segmento, com filtros por dia, mês ou ano, afim de medir o desempenho de meus vendedores | 7 | 1 | Relatórios e dashboards com filtros e agrupamentos customizáveis |
| 5 | 🟡 Baixa | Eu como comercial, quero agendar tarefas e configurar lembretes, afim de acompanhar próximos contatos com clientes | 6 | 1 | Sistema de agendamento e lembretes integrado ao cadastro e histórico de clientes |
| 6 | 🟡 Baixa | Eu como comercial, quero medir o rendimento e a taxa de conversão das visitas em vendas do setor comercial, para medir o desempenho dos vendedores | 6 | 1 | Relatórios de desempenho do setor comercial com indicadores de conversão e faturamento |
| 7 | 🟡 Baixa | Eu como comercial, quero gerenciar o histórico completo das interações com clientes e relatórios detalhados das interações, para possibilitar futura auditoria | 5 | 1 | Visualização do histórico completo de interações com o cliente |

---

# Cenários de Teste

### User Story: US01 – Eu como comercial, quero realizar o cadastro completo de clientes e departamento responsável, para incluí-los no sistema.

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| **Cadastro com dados obrigatórios** | O comercial está na tela de cadastro de cliente | Ele preenche todos os campos obrigatórios | O sistema cadastra o cliente com sucesso e exibe mensagem de confirmação |
| **Tentativa de cadastro sem todos os dados obrigatórios** | O comercial está na tela de cadastro de cliente | Ele não preenche todos os campos obrigatórios | O sistema exibe uma mensagem de alerta dizendo que todos os campos obrigatórios precisam estar preenchidos |
| **Cadastro com e-mail já existente** | O comercial está na tela de cadastro de cliente | Ele preenche os dados com um e-mail que já existe no sistema e tenta salvar | O sistema impede o cadastro e exibe uma mensagem de erro informando que o e-mail já está em uso |

</details>

<hr>

### User Story: US02 – Eu como comercial, quero poder gerenciar os clientes cadastrados, para ver, atualizar e deletar clientes.

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| **Visualização de clientes cadastrados** | Um ou mais clientes estão cadastrados | O comercial abre a tela de gerenciamento dos clientes | O sistema exibe os clientes cadastrados |
| **Visualização sem clientes cadastrados** | Nenhum cliente está cadastrado | O comercial abre a tela de gerenciamento dos clientes | O sistema emite um aviso dizendo que não há nenhum cliente cadastrado |
| **Tentativa de excluir cliente de outro comercial** | O comercial está na tela de gerenciamento e tenta excluir um cliente que pertence a outro vendedor | O sistema identifica que o cliente pertence a outro usuário | O sistema impede a exclusão e exibe uma mensagem de erro de acesso negado |

</details>

<hr>

### User Story: US03 – Eu como comercial, quero ver e classificar meus clientes em um funil de vendas com classificação: Prospects, Inicial, Potencial, Manutenção, Em Negociação e Follow Up, para visualizar insights sobre o ciclo de vendas do cliente.</h3>

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| **Avanço de cliente no funil** | O comercial está na visualização do funil de vendas | Ele arrasta um cliente da etapa "Inicial" para a etapa "Em Negociação" | O cliente é movido para a nova coluna, e o funil reflete a mudança de status |
| **Tentativa de mover cliente para etapa inválida** | O comercial está na visualização do funil de vendas | Ele tenta arrastar um cliente para uma etapa que não é a próxima no ciclo de vendas | O sistema impede a ação e exibe uma mensagem de erro indicando que a transição não é permitida |

</details>

<hr>

### User Story: US04 – Eu como gestor comercial, quero visualizar relatórios e gráficos quantitativos de interações, vendas efetuadas, clientes cadastrados, clientes por cidade e segmento, com filtros por dia, mês ou ano, a fim de medir o desempenho de meus vendedores.

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| **Gerar relatório de vendas do mês** | O gestor está na tela de relatórios | Ele seleciona o relatório de "Vendas Efetuadas" e aplica o filtro "Mês" | O sistema gera e exibe um gráfico de barras com as vendas por vendedor para o mês selecionado |
| **Nenhum dado para o período** | O gestor está na tela de relatórios e aplica um filtro de data | O período selecionado não possui dados de interações ou vendas | O sistema exibe um gráfico vazio com a mensagem "Não há dados para o período selecionado" |
| **Erro de carregamento do relatório** | O gestor está na tela de relatórios | Ele tenta gerar um relatório e ocorre uma falha na comunicação com o servidor | O sistema exibe uma mensagem de erro informando que não foi possível carregar o relatório |

</details>

<hr>

### User Story: US05 – Eu como comercial, quero agendar tarefas e configurar lembretes, a fim de acompanhar próximos contatos com clientes.

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| **Agendar uma ligação para cliente** | O comercial está na tela de um cliente e clica para agendar uma tarefa | Ele define o tipo de tarefa como "ligação" e configura um lembrete para o próximo dia | A tarefa é criada e o sistema envia uma notificação push no dia e hora agendados |
| **Falha ao agendar tarefa sem data** | O comercial está na tela de agendamento de tarefas | Ele tenta agendar a tarefa sem uma data | O sistema impede o agendamento e exibe uma mensagem de erro indicando que o campo de data está ausente |
| **Falha ao agendar tarefa com data retroativa** | O comercial está na tela de agendamento de tarefas | Ele tenta salvar uma tarefa com uma data e hora no passado | O sistema impede o agendamento e exibe uma mensagem de erro informando que a data é inválida |

</details>

<hr>

### User Story: US06 – Eu como comercial, quero medir o rendimento e a taxa de conversão das visitas em vendas do setor comercial, para medir o desempenho dos vendedores.

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| **Visualização da taxa de conversão** | O comercial está na tela de cadastro de cliente | Ele preenche todos os campos obrigatórios e salva | O sistema cadastra a venda com sucesso |
| **Falha na exibição dos dados de rendimento** | O comercial acessa a tela de métricas de desempenho | Ele filtra o dashboard por período | O sistema exibe a taxa de conversão de clientes por vendedor em um gráfico |
| **Tentativa de visualização de rendimento de outro comercial** | O comercial acessa a tela de rendimento | Ele tenta ver o desempenho de um colega de equipe | O sistema impede a visualização e exibe uma mensagem de erro de acesso negado |

</details>

<hr>

### User Story: US07 – Eu como comercial, quero gerenciar o histórico completo das interações com clientes e relatórios detalhados das interações, para possibilitar futura auditoria.

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| **Visualização do histórico completo** | Um ou mais itens estão registrados no histórico | O comercial seleciona para ver o histórico de interações com ou sem filtro | O sistema exibe todo o histórico de interações com ou sem filtro aplicado |
| **Nenhum item no histórico** | Não há nenhum item no histórico, ou o filtro não se aplica a nenhum item | O comercial seleciona para ver o histórico de interações com ou sem filtro | O sistema emite um aviso que não há nenhum item no histórico de interações |
| **Tentativa de edição de histórico** | O comercial está na tela de histórico | Ele tenta editar ou excluir uma interação já registrada | O sistema impede a alteração e exibe uma mensagem de erro de acesso negado, pois o histórico é imutável |

</details>

<hr>

## ✅ DoR - Definition of Ready <a id="dor"></a>

| Critério | Descrição |
| :--- | :--- |
| **User Story Bem Definida** | A história de usuário está clara e compreensível, descrevendo quem é o usuário, o que ele quer fazer e por quê, de acordo com o backlog. |
| **Estimativa Definida** | A história de usuário foi avaliada em Story Points. |
| **Cenários de Teste Especificados** | A história possui cenários de teste detalhados (`Dado, Quando, Então`) para validar os requisitos, conforme os exemplos fornecidos. |
| **Regras de Negócio Claras** | As regras de negócio e validações, como as permissões de acesso e a imutabilidade do histórico de interações, estão documentadas. |
| **Compreensão Compartilhada** | A equipe, o gestor e o parceiro compreendem o propósito da história e seus objetivos. |

---

## ✅ DoD - Definition of Done <a id="dod"></a>

| Critério | Descrição |
| :--- | :--- |
| **Critérios de Aceitação Atendidos** | Todos os cenários de teste foram executados e aprovados com sucesso. |
| **Funcionalidade Implementada** | A funcionalidade do backlog foi totalmente desenvolvida, seguindo o que foi acordado. |
| **Código Revisado** | O código foi revisado por pelo menos um membro da equipe e está em conformidade com os padrões. |
| **Testes Automatizados Aprovados** | Testes de unidade e/ou integração para a funcionalidade foram criados e executados com sucesso. |
| **Dados Persistidos e Acessíveis** | Os dados da funcionalidade (por exemplo, clientes cadastrados, histórico de interações) estão corretamente salvos e recuperáveis. |
| **Relatórios e Gráficos Gerados** | A extração e visualização dos dados para os relatórios e gráficos funcionam como esperado. |
| **Validação do Gestor** | O gestor ou o parceiro validou a entrega e confirmou que ela atende aos requisitos. |

---

## 🧪 Estratégia de Testes

**O que será testado?**
- Todos os tipos de formulário de envio, para garantir a integridade dos dados no banco.
- Todas as requisições usando o banco de dados com dados e sem dados.

**Como será testado?**
- Será testado de forma manual.

**Quando será testado?**
- Após o desenvolvimento da User Story, serão realizados os testes necessários.
