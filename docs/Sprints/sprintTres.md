
## 🔴 Sprint 3 - Setor Administrativo

| Rank | Prioridade | Sprint | User Story | Estimativa | Requisitos do Parceiro |
| :--: | :--------: | :----: | :-------- | :--------: | :---------------------- |
| 1 | 🔴 Alta | 3 | Eu como administrativo, quero receber notificações automáticas de eventos com link, confirmação ou recusa justificada, conclusão após participação, formulário de avaliação e documento padrão de registro, para gerenciar todos os eventos de forma rápida e confiável | 8 | Sistema de eventos com notificações, formulários e geração automática de relatórios |
| 2 | 🔴 Alta | 3 | Eu como gestor, quero gerar relatórios específicos da minha área (comercial, operacional ou administrativa), para acompanhar indicadores e otimizar processos internos | 8 | Integração de dados comerciais e operacionais na mesma plataforma |
| 3 | 🟠 Média | 3 | Eu como cliente, quero visualizar a quantidade de funcionários e agregados, além dos veículos cadastrados, para realizar uma análise de perfil | 5 | Cadastro de funcionários, agregados e veículos com perfis atualizados |
| 4 | 🟡 Baixa | 3 | Eu como usuário, quero que a plataforma seja responsiva para mobile, para conseguir acessar e utilizar todas as funcionalidades pelo celular ou tablet | 4 | Responsividade da plataforma para dispositivos móveis |

---

# Cenários de Teste – Sprint 3

### User Story: US01 – Notificações automáticas de eventos

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| Receber notificação de evento | O cliente está cadastrado na plataforma | Um evento é agendado | O sistema envia notificação automática com link para confirmação ou recusa justificada |
| Concluir participação em evento | O cliente participou do evento | Ele marca presença e finaliza o evento | O sistema registra a participação e atualiza o status do evento |
| Formulário de avaliação enviado | O cliente concluiu o evento | O sistema disponibiliza o formulário de avaliação | O cliente preenche o formulário e o sistema armazena a avaliação |
| Gerar documento padrão de registro | Um evento foi concluído | O cliente ou gestor solicita o registro | O sistema gera documento padrão de registro automaticamente |

</details>

---

### User Story: US02 – Gerar relatórios específicos da área

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| Gerar relatório comercial | O gestor está na tela de relatórios | Ele seleciona "Comercial" e escolhe período | O sistema gera relatório específico da área comercial com dados corretos |
| Gerar relatório operacional | O gestor está na tela de relatórios | Ele seleciona "Operacional" e escolhe período | O sistema gera relatório específico da área operacional |
| Gerar relatório administrativo | O gestor está na tela de relatórios | Ele seleciona "Administrativa" e escolhe período | O sistema gera relatório específico da área administrativa |
| Falha ao gerar relatório | O gestor solicita um relatório | O sistema encontra erro de comunicação ou falta de dados | O sistema exibe mensagem de erro informando a falha |

</details>

---

### User Story: US03 – Visualizar quantidade de funcionários, agregados e veículos

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| Visualizar total de funcionários | O cliente acessa a tela de perfil | Ele seleciona visualizar funcionários | O sistema exibe a quantidade correta de funcionários cadastrados |
| Visualizar total de agregados | O cliente acessa a tela de perfil | Ele seleciona visualizar agregados | O sistema exibe a quantidade correta de agregados cadastrados |
| Visualizar total de veículos | O cliente acessa a tela de perfil | Ele seleciona visualizar veículos | O sistema exibe a quantidade correta de veículos cadastrados |
| Falha na exibição dos dados | O cliente acessa a tela de perfil | O sistema encontra inconsistência nos dados | O sistema exibe mensagem de erro informando a falha |

</details>

---

### User Story: US04 – Plataforma responsiva para mobile

<details>
<summary><b>Clique aqui para ver os cenários</b></summary>

| Título do Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- |
| Acessar plataforma pelo celular | O usuário abre a plataforma em um smartphone | Ele navega pelas telas | Todas as funcionalidades são exibidas corretamente e responsivas |
| Acessar plataforma pelo tablet | O usuário abre a plataforma em um tablet | Ele navega pelas telas | Todas as funcionalidades são exibidas corretamente e responsivas |
| Falha na responsividade | O usuário abre a plataforma em dispositivo móvel | Alguma tela não se ajusta | O sistema exibe elementos desalinhados e mensagem de alerta ou fallback de layout |

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
| **Funcionalidade Implementada** | Sistema de eventos com notificações automáticas (link, confirmação/recusa, formulários de avaliação e documentos de registro), geração de relatórios específicos por área (comercial, operacional, administrativa), visualização de funcionários, agregados e veículos para análise de perfil, e responsividade completa para dispositivos móveis foram desenvolvidos conforme acordado. |
| **Código Revisado** | O código foi revisado por pelo menos um membro da equipe e está em conformidade com os padrões do projeto. |
| **Dados Persistidos e Acessíveis** | Dados de eventos, notificações, formulários de avaliação, relatórios por área e cadastros de funcionários, agregados e veículos estão salvos e recuperáveis. |
| **Relatórios e Gráficos Gerados** | Relatórios específicos por área (comercial, operacional, administrativa) e documentos automáticos de eventos estão funcionando e exibindo dados corretamente. |
| **Validação do Master e da PO** | O master e a product owner da equipe validaram a entrega das funcionalidades e realizaram os testes necessários. |

---

## 🧪 Estratégia de Testes

**O que será testado?**  
- Todos os formulários e fluxos de envio de dados.  
- Visualização e geração de relatórios.  
- Responsividade da plataforma em dispositivos móveis.  
- Integração correta dos dados comerciais e administrativos.

**Como será testado?**  
- De forma manual, validando cada fluxo e funcionalidade.  

**Quando será testado?**  
- Após a implementação completa de cada User Story da Sprint 3.
