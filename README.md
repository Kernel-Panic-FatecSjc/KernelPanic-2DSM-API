# FATEC Profº Jessen Vidal - São José dos Campos - 2º Semestre DSM - 2025

<p>Projeto desenvolvido para a API (Aprendizagem por Projeto Integrado) do 2° Semestre do curso Desenvolvimento de Software Multiplataforma (DSM) em parceria com a empresa <b>Newe Log</b>, no projeto de <b>Plataforma Integrada de Gestão</b>.</p>

> _A API se trata de um projeto submetido à metodologia de ensino em implantação na Fatec São José dos Campos, do qual os alunos formam equipes baseadas na metodologia ágil SCRUM, tendo um aluno como Scrum Master, um sendo o Product Owner e o restante dos integrantes como Dev Team._

## Visão Geral
Este projeto tem como objetivo desenvolver uma plataforma única que centralize e padronize processos administrativos, comerciais e operacionais da Newe Log, garantindo maior eficiência e controle para a empresa. A solução permitirá a visualização de informações, notificações e relatórios de forma integrada.

Atualmente, a Newe Log utiliza diversas ferramentas separadas para gerenciar checklists e cadastros, como o Microsoft Lists, Google Forms e Microsoft Forms. Essa fragmentação de processos e dados causa descentralização e falta de padronização, o que pode levar a retrabalho, erros e relatórios imprecisos. O projeto busca solucionar esse desafio, oferecendo uma solução integrada que simplifique o acesso e padronize as informações.

## Objetivo do produto
O sistema tem como objetivo principal centralizar todos os processos e dados da empresa em uma única plataforma, oferecendo uma visão integrada da parte administrativa, comercial e operacional. Entre os principais recursos, destacam-se:
- Centralização de dados e processos em um único ambiente.

- Automação de eventos administrativos e treinamentos.

- Gestão de clientes e vendas (CRM) com histórico completo e funil comercial.

- Unificação de checklists operacionais dispersos em diferentes ferramentas.
- Relatórios estratégicos e dashboards em tempo real.

<span id="backlog">

## 📋 Backlog do Produto
| Rank | Prioridade | Sprint | User Story | Estimativa | Requisitos do Parceiro | Status |
| :--: | :--------: | :----: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--: |
| 1 | 🔴 Alta | 1 | Eu como comercial, quero realizar o cadastro completo de clientes e do departamento responsável, para incluí-los no sistema | 4 | Sistema de cadastro de clientes com campos completos | ✅ |
| 2 | 🔴 Alta | 1 | Eu como comercial, quero gerenciar os clientes cadastrados, para visualizar, atualizar e deletar clientes | 6 | Sistema de cadastro de clientes com campos completos | ✅ |
| 3 | 🔴 Alta | 2 | Eu como gestor, quero unificar e padronizar todos os checklists e cadastros atualmente utilizados em ferramentas distintas, para centralizar as informações | 5 | Centralização, padronização e unificação de checklists e cadastros | ✅ |
| 4 | 🔴 Alta | 2 | Eu como gestor, quero eleger as permissões customizáveis que cada liderado terá dentro do sistema, para controlar o nível de acesso conforme a função de cada colaborador | 8 | Controle de permissões customizáveis por usuário | ✅ |
| 5 | 🔴 Alta | 3 | Eu como administrativo, quero receber notificações automáticas de eventos com link, confirmação ou recusa justificada, conclusão após participação, formulário de avaliação e documento padrão de registro, para gerenciar todos os eventos de forma rápida e confiável | 8 | Sistema de eventos com notificações, formulários e geração automática de relatórios | ❌ |
| 6 | 🔴 Alta | 3 | Eu como gestor, quero gerar relatórios específicos da minha área (comercial, operacional ou administrativa), para acompanhar indicadores e otimizar processos internos | 8 | Integração de dados comerciais e operacionais na mesma plataforma | ❌ |
| 7 | 🟠 Média | 1 | Eu como comercial, quero ver e classificar meus clientes em um funil de vendas com as etapas: Prospects, Inicial, Potencial, Manutenção, Em Negociação, Follow Up, Vendas e Não Vendas, para visualizar insights sobre o ciclo de vendas do cliente | 8 | Funil de vendas com etapas definidas e classificações de clientes | ✅ |
| 8 | 🟠 Média | 2 | Eu como operacional e comercial, quero acessar informações da parte comercial e operacional em um só ambiente, para obter insights a partir desses dados | 6 | Integração de dados comerciais e operacionais na mesma plataforma | ✅ |
| 9 | 🟠 Média | 2 | Eu como operacional, quero cadastrar agregados com devolutiva automática após a conclusão do processo de cadastro, para facilitar o controle e acompanhamento dos cadastros | 6 | Cadastro de agregados com feedback automático | ✅ |
| 10 | 🟠 Média | 2 | Eu como operacional e comercial, quero calcular a cotação de um frete de forma automática, para agilizar a criação de cotações e eliminar cálculos manuais | 4 | Cotação com cálculo automático de custos, valores e adicionais | ✅ |
| 11 | 🟠 Média | 3 | Eu como administrativo, quero visualizar a quantidade de funcionários e agregados, além dos veículos cadastrados, para realizar uma análise de perfil | 5 | Cadastro de funcionários, agregados e veículos com perfis atualizados | ❌ |
| 12 | 🟡 Baixa | 1 | Eu como gestor, quero visualizar relatórios e gráficos quantitativos de interações, vendas efetuadas, clientes cadastrados, clientes por cidade e segmento, com filtros por dia, mês ou ano, para medir o desempenho de meus vendedores | 7 | Relatórios e dashboards com filtros e agrupamentos customizáveis | ✅ |
| 13 | 🟡 Baixa | 1 | Eu como comercial, quero agendar tarefas e configurar lembretes, para acompanhar os próximos contatos com clientes | 6 | Sistema de agendamento e lembretes integrado ao cadastro e histórico de clientes | ✅ |
| 14 | 🟡 Baixa | 1 | Eu como comercial, quero medir o rendimento e a taxa de conversão das visitas em vendas do setor comercial, para avaliar o desempenho dos vendedores | 6 | Relatórios de desempenho do setor comercial com indicadores de conversão e faturamento | ✅ |
| 15 | 🟡 Baixa | 1 | Eu como comercial, quero gerenciar o histórico completo das interações com clientes e relatórios detalhados das interações, para possibilitar futura auditoria | 5 | Visualização do histórico completo de interações com o cliente | ✅ |
| 16 | 🟡 Baixa | 3 | Eu como usuário, quero que a plataforma seja responsiva para mobile, para conseguir acessar e utilizar todas as funcionalidades pelo celular ou tablet | 4 | Responsividade da plataforma para dispositivos móveis | ❌ |


## 📅 Cronograma de Sprints <a id="sprint"></a>

| Sprint          |    Período    | Documentação                                     |
| --------------- | :-----------: | ------------------------------------------------ |
| **SPRINT 1** | 08/09 - 28/09 | [Sprint 1 Docs](docs/Sprints/sprintUm.md) |
| **SPRINT 2** | 06/10 - 26/10 | [Sprint 2 Docs](docs/Sprints/sprintDois.md) |
| **SPRINT 3** | 03/11 - 23/11 | [Sprint 3 Docs](docs/Sprints/sprintTres.md) |

---

## ⏳ Status do projeto: 2/3 Sprint

---


## 🟢 Sprint 1 - Setor Comercial
<details>
  <summary><b>Clique aqui</b></summary>

**Video Demostrativo:**
<br>
[Assistir no YouTube](https://youtu.be/yuDfMSC-joM)
<br>
[Assistir no YouTube](https://youtu.be/ywFObLK5jC4)

| Rank | Prioridade | Sprint | User Story | Estimativa | Requisitos do Parceiro |
| :--: | :--------: | :----: | :-------- | :--------: | :---------------------- |
| 1 | 🔴 Alta | 1 | Eu como comercial, quero realizar o cadastro completo de clientes e do departamento responsável, para incluí-los no sistema | 4 | Sistema de cadastro de clientes com campos completos |
| 2 | 🔴 Alta | 1 | Eu como comercial, quero gerenciar os clientes cadastrados, para visualizar, atualizar e deletar informações dos clientes | 6 | Sistema de cadastro de clientes com campos completos |
| 3 | 🟠 Média | 1 | Eu como comercial, quero classificar meus clientes em um funil de vendas com as etapas: Prospects, Inicial, Potencial, Manutenção, Em Negociação, Follow Up, Vendas e Não Vendas, para visualizar insights sobre o ciclo de vendas do cliente | 8 | Funil de vendas com etapas definidas e classificações de clientes |
| 4 | 🟠 Média | 1 | Eu como gestor comercial, quero visualizar relatórios e gráficos quantitativos de interações, vendas efetuadas, clientes cadastrados, clientes por cidade e segmento, com filtros por dia, mês ou ano, para medir o desempenho dos meus vendedores | 7 | Relatórios e dashboards com filtros e agrupamentos customizáveis |
| 5 | 🟡 Baixa | 1 | Eu como comercial, quero agendar tarefas e configurar lembretes, para acompanhar os próximos contatos com clientes | 6 | Sistema de agendamento e lembretes integrado ao cadastro e histórico de clientes |
| 6 | 🟡 Baixa | 1 | Eu como comercial, quero medir o rendimento e a taxa de conversão das visitas em vendas do setor comercial, para avaliar o desempenho dos vendedores | 6 | Relatórios de desempenho do setor comercial com indicadores de conversão e faturamento |
| 7 | 🟡 Baixa | 1 | Eu como comercial, quero gerenciar o histórico completo das interações com clientes e relatórios detalhados das interações, para possibilitar futura auditoria | 5 | Visualização do histórico completo de interações com o cliente |

</details>

---
## 🟡 Sprint 2 - Setor Comercial
<details>
  <summary><b>Clique aqui</b></summary>

| Rank | Prioridade | Sprint | User Story | Estimativa | Requisitos do Parceiro |
| :--: | :--------: | :----: | :-------- | :--------: | :---------------------- |
| 1 | 🔴 Alta | 2 | Eu como gestor, quero unificar e padronizar todos os checklists e cadastros atualmente utilizados em ferramentas distintas, para centralizá-los em uma única plataforma | 5 | Centralização, padronização e unificação de checklists e cadastros |
| 2 | 🔴 Alta | 2 | Eu como gestor, quero eleger as permissões customizáveis que cada liderado terá dentro do sistema, para controlar o nível de acesso conforme a função de cada colaborador | 8 | Controle de permissões customizáveis por usuário |
| 3 | 🟠 Média | 2 | Eu como cliente, quero acessar informações da parte comercial e operacional em um só ambiente, para obter insights a partir desses dados | 6 | Integração de dados comerciais e operacionais na mesma plataforma |
| 4 | 🟠 Média | 2 | Eu como cliente, quero cadastrar agregados com devolutiva automática após a conclusão do processo de cadastro, para facilitar o controle e acompanhamento dos cadastros | 6 | Cadastro de agregados com feedback automático |
| 5 | 🟠 Média | 2 | Eu como cliente, quero calcular a cotação de um frete de forma automática, para agilizar a criação de cotações e eliminar cálculos manuais | 4 | Cotação com cálculo automático de custos, valores e adicionais |

</details>

---
## 🔴 Sprint 3 - Setor Administrativo
<details>
  <summary><b>Clique aqui</b></summary>

| Rank | Prioridade | Sprint | User Story | Estimativa | Requisitos do Parceiro |
| :--: | :--------: | :----: | :-------- | :--------: | :---------------------- |
| 1 | 🔴 Alta | 3 | Eu como administrativo, quero receber notificações automáticas de eventos com link, confirmação ou recusa justificada, conclusão após participação, formulário de avaliação e documento padrão de registro, para gerenciar todos os eventos de forma rápida e confiável | 8 | Sistema de eventos com notificações, formulários e geração automática de relatórios |
| 2 | 🔴 Alta | 3 | Eu como gestor, quero gerar relatórios específicos da minha área (comercial, operacional ou administrativa), para acompanhar indicadores e otimizar processos internos | 8 | Integração de dados comerciais e operacionais na mesma plataforma |
| 3 | 🟠 Média | 3 | Eu como cliente, quero visualizar a quantidade de funcionários e agregados, além dos veículos cadastrados, para realizar uma análise de perfil | 5 | Cadastro de funcionários, agregados e veículos com perfis atualizados |
| 4 | 🟡 Baixa | 3 | Eu como usuário, quero que a plataforma seja responsiva para mobile, para conseguir acessar e utilizar todas as funcionalidades pelo celular ou tablet | 4 | Responsividade da plataforma para dispositivos móveis |

</details>

---

## Tecnologias Utilizadas
<div align="center">
<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white&color=043873">
<img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white&color=043873">
<img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white&color=043873">
<img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white&color=043873">
<img src="https://img.shields.io/badge/MySQL-0000?style=for-the-badge&logo=MySQL&logoColor=white&color=043873">
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white&color=043873">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&color=043873">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white&color=043873">
<img src="https://img.shields.io/badge/TypeORM-E55230?style=for-the-badge&logo=typeorm&logoColor=white&color=043873">
</div>

## Estrutura do Projeto 

<details>

```
├── 📁 ApiServer
│   ├── 📁 src
│   │   ├── 📁 API
│   │   │   ├── 📁 Configuration
│   │   │   ├── 📁 Controllers
│   │   │   ├── 📁 Jobs
│   │   │   ├── 📁 Properpeties
│   │   │   └── 📁 Routes
│   │   ├── 📁 Business
│   │   │   ├── 📁 Interfaces
│   │   │   └── 📁 Services
│   │   ├── 📁 DAL
│   │   │   ├── 📁 DTOs
│   │   │   ├── 📁 Enums
│   │   │   ├── 📁 Migrations
│   │   │   ├── 📁 Models
│   │   │   ├── 📁 Repository
│   │   │   ├── 📁 Scripts
├── 📁 docs
│   ├── 📁 Contribution Rules
│   ├── 📁 Data Base Model
│   ├── 📁 Sprints
│   ├── 📁 Value Proposition Canvas
├── 📁 views
│   ├── 📁 frontend-app
│   │   ├── 📁 app
│   │   │   ├── 📁 agendamento
│   │   │   ├── 📁 checklists
│   │   │   ├── 📁 cliente
│   │   │   ├── 📁 formulario-abertura
│   │   │   ├── 📁 formulario-diario
│   │   │   ├── 📁 formulario-fechamento
│   │   │   ├── 📁 formulario-manutencaox
│   │   │   ├── 📁 funil-vendas
│   │   │   ├── 📁 gerenciar-permissao
│   │   │   ├── 📁 gestao
│   │   │   ├── 📁 grafico
│   │   │   ├── 📁 interacoes
│   │   │   ├── 📁 login-funcionario
│   │   │   ├── 📁 login-gestor
│   │   │   ├── 📁 login-master
│   │   │   ├── 📁 vendas
│   │   ├── 📁 components
│   │   │   └── 📁 layout
│   │   │       ├── 📁 CalculadoraCotacao
│   │   │       ├── 📁 Calendar
│   │   │       ├── 📁 FunilVendas
│   │   │       ├── 📁 Grafico
│   │   │       ├── 📁 Kanban
│   │   │       ├── 📁 LateralBar
│   │   │       ├── 📁 Login
│   │   ├── 📁 public
│   │   │   ├── 📁 images
│   └── 📁 styles
├── ⚙️ .gitignore
└── 📝 README.md
```

</details>

## ✅ DoR - Definition of Ready <a id="dor"></a>

| Critério | Descrição |
| :--- | :--- |
| **Clareza na Descrição** | A User Story está escrita no formato de forma clara e objetiva. |
| **Critérios de Aceitação Definidos** | A história possui critérios objetivos que indicam o que é necessário para considerá-la concluída. |
| **Independente** | A história pode ser implementada sem depender de outra tarefa da mesma Sprint. |
| **Compreensão Compartilhada** | Toda a equipe (incluindo PO e devs) compreende o propósito da história. |
| **Estimável** | A história foi pontuada no Planning Poker ou tem uma estimativa clara. |
| **Documentos de Apoio** | Se necessário, mockups, fluxos ou modelos de dados estão anexados na pasta de documentos (dosc) |
| **Critérios técnicos acordados** | As necessidades de Frontend e Backend foram claramente separadas (quando aplicável). |

---

## ✅ DoD - Definition of Done <a id="dod"></a>

| Critério | Descrição |
| :--- | :--- |
| **Critérios de Aceitação atendidos** | Todos os cenários de teste da história foram executados e aprovados. |
| **Testes manuais realizados** | Os testes manuais propostos foram concluidos. |
| **Código revisado** | O código foi revisado por pela equipe. |
| **Documentação atualizada** | Documentos atualizados ao longo de cada sprint e conferidos no final de cada uma. |
| **Integração com outras partes testadas** | As interfaces entre Frontend e Backend foram validadas. |
| **Validação do PO e do Scrum Master** | O Product Owner e o Scrum Master validaram que foi uma entrega de valor. |
| **Pronto para deploy** | O item está testado, validado e pode ser integrado ao produto final. |

## Equipe <a name="equipe"><a>
|  Foto        |     Função    |           Nome            |                            LinkedIn                            |                      GitHub                       |
| :----: | :-----------: | :-----------------------: | :------------------------------------------------------------: | :-----------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/106409918?v=4" width="75px"> | Scrum Master  | Vitor Serpa da Silva |  [Linkedin](https://www.linkedin.com/in/vitor-serpa-925b46322/)  | [GitHub](https://github.com/VitorSerpa) |
| <img src="https://avatars.githubusercontent.com/u/119637682?v=4" width="75px"> | Product Owner | Heloisa Cardillo | [Linkedin](https://www.linkedin.com/in/heloisa-cardillo-lima/) | [GitHub](https://github.com/heloisa-cardillo) |
| <img src="https://avatars.githubusercontent.com/u/162122368?v=4" width="75px"> | Dev Team      | Daniel Porto Renó Sás Piloto | [Linkedin](https://www.linkedin.com/in/daniel-piloto-98b717226/)  | [GitHub](https://github.com/danprsp) |
| <img src="https://avatars.githubusercontent.com/u/140865436?v=4" width="75px"> | Dev Team      | Henry Vilela Silva Tito |  [Linkedin](https://www.linkedin.com/in/henry-tito-989b4b354/)  | [GitHub](https://github.com/HenryTito)  |
| <img src="https://avatars.githubusercontent.com/u/163298566?v=4" width="75px"> | Dev Team      | João Victor Dos Reis Santos | [Linkedin](https://www.linkedin.com/in/joão-victor-dos-reis-santos-1823532b4) | [GitHub](https://github.com/Templasan) |
| <img src="https://avatars.githubusercontent.com/u/144951743?v=4" width="75px"> | Dev Team      | Miguel Tomio Toledo Nonaka |  [Linkedin](https://www.linkedin.com/in/miguel-nonaka)  | [GitHub](https://github.com/miguelnonaka)    |
| <img src="https://avatars.githubusercontent.com/u/102493225?v=4" width="75px"> | Dev Team      | Paula Emy Tamay |  [Linkedin](https://www.linkedin.com/in/paula-tamay-7a168228a/)  | [GitHub](https://github.com/PaulaEmy)    |
| <img src="https://avatars.githubusercontent.com/u/163305926?v=4" width="75px"> | Dev Team      | Vinícius da Silva Leite |  [Linkedin](https://www.linkedin.com/in/vinícius-leite-4792b02ba/)  | [GitHub](https://github.com/vinislvleite)    |
|