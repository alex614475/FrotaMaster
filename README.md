
# Sistema de Gestão de Frota

Este projeto é um **sistema de gestão de frota**, desenvolvido como demonstração prática de boas práticas e arquitetura moderna em Angular 20, com backend em C#/.NET, PostgreSQL e Docker.

O objetivo é apresentar um projeto organizado, escalável e modular, evidenciando conhecimento em Angular moderno, componentização, organização por domínios e integração com serviços e mapas, além de backend estruturado com Entity Framework, DTOs e controllers.

---

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
<img width="1890" height="857" alt="Captura de tela 2025-11-20 232055" src="https://github.com/user-attachments/assets/bb44b362-5176-4d32-a48e-705b9a4ef206" />


### Cadastro de Motorista
- **Descrição:** Tela para adicionar e gerenciar motoristas, incluindo dados pessoais e vinculação com veículos.
<img width="694" height="755" alt="Captura de tela 2025-11-20 232233" src="https://github.com/user-attachments/assets/dabadda1-46ae-4581-8819-9aeb6665200a" />


### Cadastro de Veículo
- **Descrição:** Tela para registrar novos veículos na frota, definir categoria, placa e dados técnicos.
<img width="724" height="804" alt="Captura de tela 2025-11-20 232252" src="https://github.com/user-attachments/assets/7d5b3840-ad80-4f7c-abe8-c21d1dd507b5" />


### Lista de Motoristas
- **Descrição:** Tela para visualizar todos os motoristas cadastrados, com opções de edição e remoção.
<img width="1919" height="540" alt="Captura de tela 2025-11-20 232212" src="https://github.com/user-attachments/assets/3aa632fe-134c-4331-b731-90a12766a52f" />


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

