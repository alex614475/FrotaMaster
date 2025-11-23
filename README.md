Sistema de Gestão de Frota

Este projeto é um Sistema de Gestão de Frota completo, desenvolvido como demonstração prática de boas práticas, arquitetura moderna e componentização avançada utilizando Angular 20, C#/.NET, PostgreSQL e Docker.

O objetivo é apresentar uma solução organizada, escalável e modular, evidenciando domínio em:

Arquitetura limpa no frontend e backend

Componentes reutilizáveis (incluindo tabela genérica com filtros)

Domínios bem definidos

Integração com serviços, mapas e APIs

Backend estruturado com Entity Framework, DTOs, Repositories e Controllers

DeployD — Processo de Deploy Automatizado

O projeto conta com um fluxo de deploy estruturado, garantindo build otimizado e entrega contínua:

Etapas do Deploy

Build do Frontend (Angular 20)
Geração dos artefatos otimizados para produção.

Publicação da API .NET em modo Release
Compilação leve, rápida e preparada para execução em container.

Orquestração com Docker Compose

API .NET

Banco PostgreSQL

Criação das networks e volumes

Versionamento garantido dos containers

Deploy automatizado em ambiente de produção
Aplicação publicada e disponível online através da infraestrutura do Railway:

🔗 Acesso à aplicação:
https://frotamaster-production.up.railway.app/dashboard

## Tecnologias Utilizadas

### Frontend
- Angular 20 (standalone components)
- TypeScript
- Angular Router com lazy loading
- TailwindCSS
- Leaflet para mapas
- RxJS para programação reativa

### Backend
- C# / .NET 8
- ASP.NET Web API com controllers e DTOs
- Entity Framework Core para acesso a dados
- PostgreSQL como banco de dados
- Docker para containerização
- Preparado para autenticação JWT

---

## Estrutura do Projeto
A organização segue boas práticas para aplicações Angular e backend em .NET:

```
src/app/
 ├── core/                 # Serviços globais, guards, interceptors
 ├── shared/               # Componentes compartilhados, pipes, directives
 ├── features/             # Módulos por domínio do sistema
 │     ├── frota/
 │     │    ├── pages/
 │     │    ├── components/
 │     │    └── services/
 │     └── distribuicao-da-frota/
 ├── app.config.ts         # Configurações de rotas e providers
 ├── app.routes.ts         # Rotas principais
 └── main.ts               # Bootstrap da aplicação

Backend/
 ├── Controllers/          # Controllers para API
 ├── DTOs/                 # Objetos de transferência de dados
 ├── Models/               # Models e entidades do EF Core
 └── Migrations/           # Migrations do EF Core
```

Essa estrutura permite escalabilidade, testabilidade e organização clara por domínio.

---

## Funcionalidades Implementadas

- Listagem de veículos
- Cadastro de novos veículos
- Edição e remoção de veículos
- Listagem de rotas
- Visualização de veículos em rotas usando mapas
- Estrutura de backend com controllers, DTOs e Entity Framework pronta
- Preparação para autenticação JWT

---

## Telas do Sistema

### Dashboard
- **Descrição:** Tela principal do sistema, mostrando estatísticas da frota, veículos em rotas e alertas.
<img width="1900" height="875" alt="image" src="https://github.com/user-attachments/assets/9114ccaa-7dc1-44dd-b132-b97df802db91" />



### Cadastro de Motorista
- **Descrição:** Tela para adicionar e gerenciar motoristas, incluindo dados pessoais e vinculação com veículos.
<img width="694" height="755" alt="Captura de tela 2025-11-20 232233" src="https://github.com/user-attachments/assets/dabadda1-46ae-4581-8819-9aeb6665200a" />


### Cadastro de Veículo
- **Descrição:** Tela para registrar novos veículos na frota, definir categoria, placa e dados técnicos.
<img width="724" height="804" alt="Captura de tela 2025-11-20 232252" src="https://github.com/user-attachments/assets/7d5b3840-ad80-4f7c-abe8-c21d1dd507b5" />


### Lista de Veículos
- **Descrição:** Interface responsável por listar todos os veículos registrados no sistema, com recursos de filtro por coluna, busca global e ações rápidas de edição.
<img width="1866" height="876" alt="image" src="https://github.com/user-attachments/assets/dc7933af-848b-41d9-8149-1ad3d7082bca" />



---

## Boas Práticas Aplicadas
- Modularização por feature
- Componentização e services desacoplados
- Observables e programação reativa (RxJS)
- Lazy loading de módulos
- Tipagem rigorosa com TypeScript
- Backend estruturado em C#/.NET com Entity Framework, DTOs e controllers
- Containerização com Docker
- Uso de PostgreSQL como banco de dados

---

## Como Rodar o Projeto

### Frontend
```bash
npm install
ng serve
```
Acesse: `http://localhost:4200`

### Backend
- Configurar PostgreSQL
- Rodar migrations do Entity Framework
- Executar projeto C#/.NET via Docker ou localmente

---

## Objetivo
Demonstrar capacidade de estruturar projetos complexos em Angular 20 com backend em C#/.NET, aplicando boas práticas, organização modular, integração com mapas e serviços, Entity Framework, DTOs, controllers, Docker e PostgreSQL, com exemplos visuais do sistema.

---

## Contato
- Desenvolvedor: Alex Souza
- E-mail: alexsouza.notorio@gmail.com

