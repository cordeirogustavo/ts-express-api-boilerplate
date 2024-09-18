# Express API Boilerplate

This is a scalable and modular boilerplate for building APIs using **Express**, **TypeScript**, and **Tsyringe** (Dependency Injection). It also includes **Vitest** for testing and **Zod** for schema validation.

## Stack

- **Node.js** - JavaScript runtime
- **TypeScript** - Static typing for JavaScript
- **Express** - Web framework for building APIs
- **Tsyringe** - Dependency Injection library for TypeScript
- **Zod** - Schema validation
- **Vitest** - Testing framework

## Project Structure

The project follows a modular structure, where each module contains its own controllers, services, routes, and tests. Shared utilities, middlewares, and providers are placed in common directories to promote reusability.

```bash
src/
├── @types/                     # Global types
│   └── express.d.ts            # Express extension type
├── modules/                    # Modules from application
│   └── order/                  # Order module
│       ├── controllers/        # Module controller
│       │   ├── calculate-total-item.controller.ts
│       │   └── index.ts
│       ├── tests/              # Module tests (unit, integration)
│       │   └── index.ts
│       ├── order.container.ts  # Dependency injection settings from module
│       ├── order.router.ts     # Module routes
│       ├── order.schema-validate.ts # Zod Schema validate
│       ├── order.service.ts    # Service (use-case)
│       └── order.symbols.ts    # Symbols for dependency injection
├── shared/                     # Shared code
│   ├── app/                    # Container dependency injection
│   │   ├── app.container.ts
│   │   └── app.router.ts
│   ├── errors/                 # Error Handler
│   │   ├── enums/              # Error enums
│   │   │   ├── custom-error-codes.enum.ts
│   │   │   ├── http-status-codes.enum.ts
│   │   │   └── index.ts
│   │   ├── handlers/           # Error handler class
│   │   │   ├── base.error.ts
│   │   │   ├── cast.error.ts
│   │   │   ├── unauthorized.error.ts
│   │   │   └── unhandled.error.ts
│   │   └── interfaces/         # Error interfaces
│   │       ├── base-exception.interface.ts
│   │       └── custom-error-response.interface.ts
│   ├── interfaces/             # Shared interfaces
│   │   ├── container.interface.ts
│   │   ├── controller.interface.ts
│   │   ├── router.interface.ts
│   │   └── service.interface.ts
│   ├── middlewares/            # Middlewares
│   │   ├── express-error.middleware.ts
│   │   └── schema-validate.middleware.ts
│   └── providers/              # Providers
│       └── schema-validate-provider/ # Schema validation provider
│           ├── zod-schema-validate.provider.ts
│           └── schema-validate.provider.interface.ts
├── server.ts                   # Server start
├── .env-example                # .env example
├── .gitignore                  # Ignored files to git repository
├── .nvmrc                      # NVM Node version
├── nodemon.json                # Nodemon start
├── package.json
├── tsconfig.json                # TypeScript settings
├── vitest.config.mts            # Vitest settings
└── vitest.setup.ts             # Vitest setup to tests
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) >= 21.x
- [npm](https://www.npmjs.com/) >= 10.x

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/cordeirogustavo/ts-express-api-boilerplate.git
   ```

2. Install dependency

   ```bash
   npm i
   ```

3. Run locally

   ```bash
   npm run dev
   ```

4. Run tests

   ```bash
   npm run test
   ```

5. Build
   ```bash
   npm run build
   ```
