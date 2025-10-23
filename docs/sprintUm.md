# Video Demostrativo:
[Assistir no YouTube](https://youtu.be/yuDfMSC-joM)
<br>
[Assistir no YouTube](https://youtu.be/ywFObLK5jC4)

# Backlog da Primeira Sprint 

| Rank | Prioridade | User Story | Estimativa | Sprint | Requisitos do Parceiro |
| :--: | :--------: | :--- | :---: | :----: | :--- |
| 1 | 🔴 Alta | Eu como comercial, quero realizar o cadastro completo de clientes e departamento responsável, para incluí-los no sistema | 4 | 1 | Sistema de cadastro de clientes com campos completos |
| 2 | 🔴 Alta | Eu como comercial quero poder gerenciar os clientes cadastrados, para ver, atualizar e deletar clientes | 6 | 1 | Registro e consulta de histórico detalhado de interações com clientes |
| 3 | 🟠 Média | Eu como comercial, quero ver e classificar meus clientes em um funil de vendas com classificação: Prospects, Inicial, Potencial, Manutenção, Em Negociação e Follow Up, para visualizar insights sobre o ciclo de vendas do cliente | 8 | 1 | Funil de vendas com etapas definidas e classificações de clientes |
| 4 | 🟠 Média | Eu como gestor comercial, quero poder visualizar relatórios e gráficos quantitativos de interações, vendas efetuadas, clientes cadastrados, clientes por cidade e segmento, com filtros por dia, mês ou ano, afim de medir o desempenho de meus vendedores | 7 | 1 | Relatórios e dashboards com filtros e agrupamentos customizáveis |
| 5 | 🟡 Baixa | Eu como comercial, quero agendar tarefas e configurar lembretes, afim de acompanhar próximos contatos com clientes | 6 | 1 | Sistema de agendamento e lembretes integrado ao cadastro e histórico de clientes |
| 6 | 🟡 Baixa | Eu como comercial, quero medir o rendimento e a taxa de conversão das visitas em vendas do setor comercial, para medir o desempenho dos vendedores | 6 | 1 | Relatórios de desempenho do setor comercial com indicadores de conversão e faturamento |
| 7 | 🟡 Baixa | Eu como comercial, quero gerenciar o histórico completo das interações com clientes e relatórios detalhados das interações, para possibilitar futura auditoria | 5 | 1 | Visualização do histórico completo de interações com o cliente |

---

# Cenários de Teste – Sprint 1

### User Story: US01 – Cadastro completo de clientes

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| Cadastro válido | O comercial está na tela de cadastro de cliente | Ele preenche todos os campos obrigatórios | O sistema cadastra o cliente com sucesso e exibe mensagem de confirmação |
| Campos faltando | O comercial está na tela de cadastro de cliente | Ele não preenche todos os campos obrigatórios | O sistema exibe uma mensagem de alerta dizendo que todos os campos obrigatórios precisam estar preenchidos |
| E-mail já existente | O comercial está na tela de cadastro de cliente | Ele preenche os dados com um e-mail que já existe no sistema e tenta salvar | O sistema impede o cadastro e exibe uma mensagem de erro informando que o e-mail já está em uso |

</details>

---

### User Story: US02 – Gerenciar clientes cadastrados

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| Visualizar clientes | Um ou mais clientes estão cadastrados | O comercial abre a tela de gerenciamento dos clientes | O sistema exibe os clientes cadastrados |
| Sem clientes | Nenhum cliente está cadastrado | O comercial abre a tela de gerenciamento dos clientes | O sistema emite um aviso dizendo que não há nenhum cliente cadastrado |
| Excluir cliente inválido | O comercial está na tela de gerenciamento e tenta excluir um cliente que pertence a outro vendedor | O sistema identifica que o cliente pertence a outro usuário | O sistema impede a exclusão e exibe uma mensagem de erro de acesso negado |

</details>

---

### User Story: US03 – Funil de vendas

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| Avançar cliente | O comercial está na visualização do funil de vendas | Ele arrasta um cliente da etapa "Inicial" para a etapa "Em Negociação" | O cliente é movido para a nova coluna, e o funil reflete a mudança de status |
| Etapa inválida | O comercial está na visualização do funil de vendas | Ele tenta arrastar um cliente para uma etapa que não é a próxima no ciclo de vendas | O sistema impede a ação e exibe uma mensagem de erro indicando que a transição não é permitida |

</details>

---

### User Story: US04 – Relatórios e gráficos quantitativos

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| Gerar relatório | O gestor está na tela de relatórios | Ele seleciona o relatório de "Vendas Efetuadas" e aplica o filtro "Mês" | O sistema gera e exibe um gráfico de barras com as vendas por vendedor para o mês selecionado |
| Sem dados | O gestor aplica um filtro de data | O período selecionado não possui dados de interações ou vendas | O sistema exibe um gráfico vazio com a mensagem "Não há dados para o período selecionado" |
| Erro no relatório | O gestor tenta gerar um relatório | Ocorre uma falha na comunicação com o servidor | O sistema exibe uma mensagem de erro informando que não foi possível carregar o relatório |

</details>

---

### User Story: US05 – Agendar tarefas e lembretes

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| Agendar ligação | O comercial está na tela de um cliente | Ele define o tipo de tarefa como "ligação" e configura um lembrete para o próximo dia | A tarefa é criada e o sistema envia notificação no dia e hora agendados |
| Sem data | O comercial tenta agendar sem data | Ele tenta salvar a tarefa | O sistema impede o agendamento e exibe uma mensagem de erro indicando que o campo de data está ausente |
| Data retroativa | O comercial tenta salvar uma tarefa com data no passado | Ele clica em salvar | O sistema impede o agendamento e exibe uma mensagem de erro informando que a data é inválida |

</details>

---

### User Story: US06 – Taxa de conversão de visitas

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| Visualizar conversão | O comercial está na tela de cadastro de cliente | Ele preenche todos os campos obrigatórios e salva | O sistema cadastra a venda com sucesso |
| Exibir métricas | O comercial acessa a tela de métricas de desempenho | Ele filtra o dashboard por período | O sistema exibe a taxa de conversão de clientes por vendedor em um gráfico |
| Acesso negado | O comercial tenta ver desempenho de outro | Ele tenta visualizar outro colega | O sistema impede a visualização e exibe uma mensagem de erro |

</details>

---

### User Story: US07 – Histórico de interações

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| Visualizar histórico | Um ou mais itens estão registrados | O comercial seleciona para ver o histórico | O sistema exibe todo o histórico de interações |
| Sem histórico | Não há nenhum item no histórico | O comercial seleciona para ver o histórico | O sistema emite aviso que não há nenhum item no histórico |
| Editar histórico | O comercial tenta editar ou excluir | Ele clica em editar/excluir uma interação | O sistema impede a alteração e exibe uma mensagem de erro |

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
