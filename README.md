# User CRUD with NestJS, Prisma, and PostgreSQL

This project is a simple CRUD application built with [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/), and [PostgreSQL](https://www.postgresql.org/). It provides API endpoints for managing users, including creating, reading, updating, and deleting user records.

## Features

- User CRUD operations (Create, Read, Update, Delete)
- Built with [NestJS](https://nestjs.com/) framework.
- Uses [Prisma ORM](https://www.prisma.io/) for database management.
- [PostgreSQL](https://www.postgresql.org/) as the database.
- Input validation using DTOs and class-validator.
- Error handling with custom exceptions.

## Technologies Used

- **[NestJS](https://nestjs.com/)**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **[Prisma ORM](https://www.prisma.io/)**: A modern ORM for Node.js and TypeScript.
- **[PostgreSQL](https://www.postgresql.org/)**: A powerful, open-source relational database system.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher) and npm (v7 or higher) or yarn installed on your machine.
- [PostgreSQL](https://www.postgresql.org/download/) (v12 or higher) server running locally.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/himanshu064/prisma-nest-crud.git
   cd prisma-nest-crud
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up environment variables:
   ```bash
   DATABASE_URL
   JWT_KEY
   ```
4. Set up the database schema:
   ```bash
   npx prisma migrate dev --name init
   ```
5. To start the server, run:
   ```bash
   nest start
   ```

