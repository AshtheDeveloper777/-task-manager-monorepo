# 🚀 Task Manager — Deployment & CI/CD

A production-ready full-stack Task Manager application built as a **DevOps and CI/CD learning project**.

This project demonstrates the complete application lifecycle — from local development and Git-based collaboration to automated code quality checks, cloud deployment, environment management, and production hosting.

---

## 📌 Project Overview

The application is built using a modern **Next.js monorepo architecture** and is designed to demonstrate professional development and deployment practices.

The primary focus of this project is not only building the application, but understanding how a modern full-stack application moves from:

```text
Local Development
       ↓
      Git
       ↓
     GitHub
       ↓
  Pull Request
       ↓
 GitHub Actions
       ↓
   CI Checks
       ↓
    Merge
       ↓
     Vercel
       ↓
   Production
       ↓
    Supabase
```

---

## ✨ Features

### Task Management

* Create tasks
* View tasks
* Update task status
* Delete tasks
* Responsive user interface
* Persistent data using Supabase

### Deployment & DevOps

* Development, Preview, and Production environments
* Production Supabase configuration
* Environment variable management
* Vercel deployment
* GitHub-based workflow
* Automated CI pipeline
* Pull Request validation
* Automated linting
* TypeScript type checking

---

## 🛠️ Tech Stack

| Technology         | Purpose                            |
| ------------------ | ---------------------------------- |
| **Next.js**        | Full-stack React framework         |
| **TypeScript**     | Type-safe development              |
| **Supabase**       | Database and backend services      |
| **PostgreSQL**     | Application database               |
| **pnpm**           | Package and workspace management   |
| **TurboRepo**      | Monorepo task orchestration        |
| **Git**            | Version control                    |
| **GitHub**         | Source code and collaboration      |
| **GitHub Actions** | Continuous Integration             |
| **Vercel**         | Application hosting and deployment |

---

## 🏗️ Architecture

This project uses a monorepo structure managed by **pnpm** and **TurboRepo**.

```text
task-manager-deployment/
│
├── apps/
│   └── web/
│       ├── app/
│       ├── components/
│       ├── public/
│       ├── package.json
│       └── ...
│
├── packages/
│   └── ui/
│       ├── src/
│       └── package.json
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── pnpm-lock.yaml
└── README.md
```

---

# 🌍 Deployment Environments

The project follows a three-environment approach.

### Development

Used during local development.

```text
Developer Machine
       ↓
localhost
       ↓
Development Supabase
```

### Preview

Used for testing changes before production.

```text
Feature Branch
       ↓
Pull Request
       ↓
Vercel Preview Deployment
```

### Production

Used by real users.

```text
main branch
     ↓
Vercel
     ↓
Production Application
     ↓
Production Supabase
```

This separation helps prevent development changes from directly affecting production data.

---

# 🔐 Environment Variables

Environment variables are used to store configuration that changes between environments.

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Sensitive values must never be committed to Git.

Local environment files should remain ignored:

```text
.env
.env.local
.env.production
```

> **Security:** Never expose or commit Supabase service-role/secret keys. They provide elevated privileges and should only be used in trusted server-side environments when genuinely required.

---

# 🔄 CI/CD Pipeline

This project implements a basic Continuous Integration pipeline using GitHub Actions.

## Continuous Integration

Whenever a Pull Request targets the `main` branch:

```text
Pull Request
      ↓
GitHub Actions
      ↓
Checkout Repository
      ↓
Setup Node.js
      ↓
Setup pnpm
      ↓
Install Dependencies
      ↓
Run Lint
      ↓
Run Type Check
      ↓
      ✅
```

The purpose of CI is to catch problems **before code is merged into the main branch**.

---

## Continuous Deployment

Vercel is connected to the GitHub repository.

After changes are merged into `main`:

```text
Pull Request
      ↓
CI Checks
      ↓
Merge
      ↓
main
      ↓
Vercel
      ↓
Production Build
      ↓
Production Deployment
```

This demonstrates the basic concept of Continuous Deployment.

---

# ⚙️ GitHub Actions

The CI workflow is located at:

```text
.github/workflows/ci.yml
```

The workflow automatically performs quality checks such as:

```bash
pnpm install
pnpm lint
pnpm type-check
```

TurboRepo is used to execute tasks efficiently across the monorepo.

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js
* pnpm
* Git
* A GitHub account
* A Supabase project

Verify the installations:

```bash
node --version
pnpm --version
git --version
```

---

## 1. Clone the Repository

```bash
git clone <your-repository-url>
```

Navigate into the project:

```bash
cd task-manager-deployment
```

---

## 2. Install Dependencies

From the repository root:

```bash
pnpm install
```

---

## 3. Configure Environment Variables

Create a local environment file:

```text
apps/web/.env.local
```

Add the required Supabase configuration:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Never commit `.env.local` to Git.

---

## 4. Run the Development Server

From the repository root:

```bash
pnpm dev
```

The application will be available locally at the development URL shown by Next.js.

---

# 🧪 Quality Checks

Run linting:

```bash
pnpm lint
```

Run TypeScript checking:

```bash
pnpm type-check
```

Build the application:

```bash
pnpm build
```

These commands should pass before creating a Pull Request.

---

# 🌳 Git Workflow

This project follows a feature-branch workflow.

```text
main
 │
 ├── feature/add-task
 │
 ├── feature/task-filter
 │
 └── feature/update-ui
```

Typical workflow:

```bash
git checkout -b feature/my-change
```

Make changes and commit:

```bash
git add .
git commit -m "add task filtering"
```

Push the branch:

```bash
git push -u origin feature/my-change
```

Then create a Pull Request targeting:

```text
feature/my-change → main
```

GitHub Actions automatically validates the Pull Request.

---

# ☁️ Vercel Deployment

The application is deployed using Vercel.

The Next.js application is located inside:

```text
apps/web
```

When configuring Vercel, the monorepo must be configured so that Vercel builds the correct application workspace.

Production environment variables are configured through the Vercel project settings rather than committed to the repository.

---

# 🗄️ Supabase

Supabase provides the backend services for the application.

It is responsible for:

* PostgreSQL database
* Data persistence
* Authentication when enabled
* Row Level Security
* Backend services

Development and production environments should use appropriate Supabase projects/configuration to avoid accidentally modifying production data during development.

---

# 📚 DevOps Concepts Demonstrated

This project demonstrates the following concepts:

### Version Control

```text
Git → GitHub → Branches → Pull Requests
```

### Continuous Integration

```text
Pull Request
     ↓
Automated Checks
     ↓
Lint + Type Check
```

### Continuous Deployment

```text
main
 ↓
Vercel
 ↓
Production
```

### Infrastructure & Hosting

```text
Vercel
 ↓
Next.js Application
```

### Environment Management

```text
Development
Preview
Production
```

### Monorepo Management

```text
pnpm
 ↓
Workspace Management

TurboRepo
 ↓
Task Orchestration
```

---

# 🎯 Learning Objectives

By completing this project, you should be able to:

* Understand development, preview, and production environments.
* Deploy a full-stack Next.js monorepo to Vercel.
* Configure production Supabase services.
* Manage environment variables securely.
* Understand the difference between CI and CD.
* Create GitHub Actions workflows.
* Automate linting and type checking.
* Work with feature branches and Pull Requests.
* Understand the relationship between GitHub, GitHub Actions, Vercel, and Supabase.
* Manage the lifecycle of a modern full-stack application from development to production.

---

# 📈 Future Improvements

Possible future enhancements include:

* Automated unit and integration tests
* End-to-end testing with Playwright
* Preview environment database strategy
* Automated database migrations
* Dependency caching in GitHub Actions
* Security scanning
* Code coverage
* Automated releases
* Docker-based deployment
* Monitoring and error tracking

---

# 👨‍💻 Learning Project

This project was created as part of a **Week 14 Deployment, CI/CD & DevOps learning module**.

The goal is to gain practical experience with the tools and workflow used to take a modern full-stack application from local development to a production environment.

---

## ⭐ Key Takeaway

The most important concept demonstrated by this project is:

```text
                 CODE
                   ↓
              Git Branch
                   ↓
             Pull Request
                   ↓
          ┌────────────────┐
          │ GitHub Actions │
          │      CI        │
          ├────────────────┤
          │ Install        │
          │ Lint           │
          │ Type Check     │
          └───────┬────────┘
                  ↓
                PASS
                  ↓
                MERGE
                  ↓
               VERCEL
                  ↓
              PRODUCTION
                  ↓
              SUPABASE
```

**Build locally. Validate automatically. Deploy confidently.**
