
# Backlog da Segunda Sprint 

| Rank | Prioridade | Sprint | User Story | Estimativa | Requisitos do Parceiro |
| :--: | :--------: | :----: | :-------- | :--------: | :---------------------- |
| 1 | 🔴 Alta | 2 | Eu como gestor, quero unificar e padronizar todos os checklists e cadastros atualmente utilizados em ferramentas distintas, para centralizá-los em uma única plataforma | 5 | Centralização, padronização e unificação de checklists e cadastros |
| 2 | 🔴 Alta | 2 | Eu como gestor, quero eleger as permissões customizáveis que cada liderado terá dentro do sistema, para controlar o nível de acesso conforme a função de cada colaborador | 8 | Controle de permissões customizáveis por usuário |
| 3 | 🟠 Média | 2 | Eu como cliente, quero acessar informações da parte comercial e operacional em um só ambiente, para obter insights a partir desses dados | 6 | Integração de dados comerciais e operacionais na mesma plataforma |
| 4 | 🟠 Média | 2 | Eu como cliente, quero cadastrar agregados com devolutiva automática após a conclusão do processo de cadastro, para facilitar o controle e acompanhamento dos cadastros | 6 | Cadastro de agregados com feedback automático |
| 5 | 🟠 Média | 2 | Eu como cliente, quero calcular a cotação de um frete de forma automática, para agilizar a criação de cotações e eliminar cálculos manuais | 4 | Cotação com cálculo automático de custos, valores e adicionais |

---

# Cenários de Teste

### User Story: US01 – Unificar e padronizar checklists e cadastros

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| **Centralizar checklists e cadastros** | O gestor acessa a plataforma | Ele importa ou visualiza os checklists e cadastros de diferentes ferramentas | O sistema unifica e exibe todos os cadastros em uma única plataforma |
| **Verificação de padronização** | Os checklists e cadastros foram centralizados | O gestor acessa cada checklist | O sistema garante que todos sigam um padrão único definido |
| **Falha na importação de dados** | O gestor tenta centralizar dados | O sistema encontra inconsistências nos cadastros | O sistema exibe uma mensagem de erro informando quais dados precisam de ajuste |

</details>

---

### User Story: US02 – Permissões customizáveis por usuário

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| **Atribuir permissões a liderados** | O gestor está na tela de permissões | Ele seleciona um colaborador e define permissões específicas | O sistema aplica as permissões escolhidas e impede ações não autorizadas |
| **Alterar permissões existentes** | Um colaborador já possui permissões | O gestor modifica as permissões | O sistema atualiza o acesso do usuário conforme as alterações |
| **Tentativa de acesso não autorizado** | Um colaborador tenta acessar área sem permissão | Ele executa a ação | O sistema bloqueia o acesso e exibe uma mensagem de erro de permissão |

</details>

---

### User Story: US03 – Acesso integrado a informações comerciais e operacionais

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| **Visualizar informações integradas** | O cliente acessa o sistema | Ele abre a tela de informações comerciais e operacionais | O sistema exibe dados integrados de ambos os setores |
| **Gerar insights a partir dos dados** | Há dados comerciais e operacionais registrados | O cliente aplica filtros e gera relatórios | O sistema apresenta insights e métricas relevantes |
| **Falha na integração** | O cliente tenta acessar os dados integrados | O sistema não consegue buscar os dados de algum setor | O sistema exibe mensagem de erro indicando falha na integração |

</details>

---

### User Story: US04 – Cadastro de agregados com devolutiva automática

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| **Cadastrar agregados com feedback** | O cliente está na tela de cadastro | Ele preenche todos os dados do agregado | O sistema cadastra e envia devolutiva automática confirmando o cadastro |
| **Falha ao cadastrar sem dados obrigatórios** | O cliente tenta cadastrar um agregado | Ele deixa campos obrigatórios vazios | O sistema impede o cadastro e exibe mensagem informando os campos faltantes |
| **Erro de comunicação durante cadastro** | O cliente envia os dados para cadastro | O sistema não consegue processar devido a falha de servidor | O sistema exibe mensagem de erro de cadastro não concluído |

</details>

---

### User Story: US05 – Cotação de frete automática

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| **Calcular cotação de frete** | O cliente está na tela de cotação | Ele insere origem, destino e peso | O sistema calcula automaticamente o valor do frete e exibe o resultado |
| **Alterar parâmetros e recalcular** | O cliente alterou algum dado da cotação | Ele confirma a alteração | O sistema recalcula e exibe nova cotação atualizada |
| **Erro no cálculo automático** | O cliente insere dados para cotação | O sistema encontra inconsistência nos dados | O sistema exibe mensagem de erro informando a necessidade de revisão |

</details>

<hr>

## ✅ DoR - Definition of Ready

| Critério | Descrição |
| :--- | :--- |
| **User Story Bem Definida** | Cada User Story está clara e compreensível, descrevendo quem é o usuário, o que ele quer fazer e por quê, de acordo com o backlog. |
| **Estimativa Definida** | A história de usuário foi avaliada e estimada em Story Points pela Dev Team. |
| **Cenários de Teste Especificados** | A história possui cenários de teste detalhados (`Dado, Quando, Então`) para validar os requisitos. |
| **Regras de Negócio Claras** | As regras de negócio e validações estão documentadas e compreendidas pela equipe. |
| **Mockup Validado com o Cliente** | O mockup da sprint foi apresentado e validado com o cliente antes do início das atividades da Dev Team. |
| **DoD Definido** | Cada User Story possui critérios claros de Definition of Done específicos para sua conclusão. |
| **Compreensão Compartilhada** | O Scrum Master, a Product Owner e a Dev Team compreendem o propósito da história e seus objetivos. |

---

## ✅ DoD - Definition of Done

| Critério | Descrição |
| :--- | :--- |
| **Critérios de Aceitação Atendidos** | Todos os cenários de teste foram executados e aprovados com sucesso. |
| **Funcionalidade Implementada** | Unificação e padronização de checklists e cadastros, sistema de permissões customizáveis por usuário, integração de dados comerciais e operacionais, cadastro de agregados com devolutiva automática e cálculo automático de cotação de frete foram desenvolvidos conforme acordado. |
| **Código Revisado** | O código foi revisado por pelo menos um membro da equipe e está em conformidade com os padrões do projeto. |
| **Dados Persistidos e Acessíveis** | Dados de checklists, cadastros unificados, permissões de usuários, agregados e cotações estão salvos e recuperáveis. |
| **Visualização integrada** | Visualização integrada de dados comerciais e operacionais está funcionando corretamente. |
| **Validação do Master e da PO** | O master e a product owner da equipe validaram a entrega das funcionalidades e realizaram os testes necessários. |

---

## 🧪 Estratégia de Testes

**O que será testado?**  
- Todos os tipos de formulário de envio, para garantir a integridade dos dados no banco.  
- Todas as requisições usando o banco de dados com dados e sem dados.

**Como será testado?**  
- Será testado de forma manual.
