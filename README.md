## OCTO

### Description

Octo is a cutting-edge pull request (PR) automation system designed to streamline and enhance the workflow of software development teams. With Octo, teams can efficiently manage and trace the lifecycle of their pull requests, ensuring a seamless integration process and maintaining high code quality.

### Key Features

- Automated Pull Request Management:

       - Automatically create, update, and close pull requests based on predefined rules and triggers.
       - Integrate seamlessly with popular version control systems like GitHub.

- Dashboard for Traceability:

       - Comprehensive dashboard providing real-time visibility into the status of all pull requests.
       - Detailed tracking of PR metrics such as review time, merge frequency, and contributor activity.

### Techonology Stack

<img width="1103" alt="stack" src="https://github.com/user-attachments/assets/d29cad28-e344-4cc0-b05b-ea1a5ca5279b">

### Project Planning


Link: https://sharing.clickup.com/12910672/g/h/6-901702801572-7/01824822fe73391

<img width="1157" alt="planinng" src="https://github.com/user-attachments/assets/a53a1a4d-7cb6-4e95-9c96-fd03b6f47658">

### UX Low Design

<img width="1100" alt="Captura de pantalla 2024-08-04 a la(s) 23 32 41" src="https://github.com/user-attachments/assets/d4ee8efb-a29a-4c99-91d3-469c4f274bac">

### Demo

https://github.com/user-attachments/assets/28a02340-ba66-42a1-93e2-addf1a6dc52c

### Setup

1. Clone the repository:

```
git clone https://github.com/JorgeRojas827/octo.git
```

2. Install dependencies

Make sure to be in the root directory.

```
pnpm i
```

3. Setup enviroment variables

Take an example of each project on the **@deployment** directory and create an **.env**.

4. Run the project

```
pnpm dev
```


### Project Structure

#### Server
```
src
├── application
│   ├── common
│   └── user
├── domain
│   ├── common
│   │   └── interfaces
│   └── user
│       ├── interfaces
│       ├── model
│       └── services
├── infrastructure
│   ├── auth
│   │   ├── controller
│   │   ├── guards
│   │   ├── interfaces
│   │   ├── middleware
│   │   └── service
│   ├── common
│   │   ├── decorators
│   │   ├── dtos
│   │   ├── enums
│   │   ├── interceptors
│   │   └── utils
│   ├── configure
│   ├── database
│   │   └── prisma
│   ├── external-services
│   │   ├── github
│   │   │   ├── controller
│   │   │   ├── dtos
│   │   │   └── service
│   │   └── vercel
│   │       ├── schemas
│   │       └── service
│   ├── modules
│   │   └── user
│   └── repositories
└── lib
    └── i18n
        ├── en
        └── es
```

#### Client
```
├── app
│   ├── api
│   │   └── auth
│   │       └── [...nextauth]
│   └── dashboard
├── common
│   ├── components
│   │   ├── icons
│   │   ├── ui
│   │   └── utils
│   ├── helpers
│   ├── hooks
│   └── interfaces
├── lib
│   └── axios
└── modules
    ├── dashboard
    │   ├── components
    │   │   └── pull
    │   ├── interfaces
    │   ├── services
    │   └── store
    └── home
        └── components
```
