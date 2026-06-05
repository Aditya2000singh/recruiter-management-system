# TalentFlow AI

## Overview

TalentFlow AI is an AI-powered recruitment management platform designed to streamline the hiring process for recruiters and HR teams.

The system enables recruiters to manage candidates, create job openings, upload resumes, automatically extract candidate information using AI, assign candidates to jobs, and evaluate candidate-job fit through AI-based scoring.

The goal of the platform is to reduce manual screening effort and improve hiring efficiency through automation and intelligent candidate evaluation.

---

## Features

### Authentication

* Recruiter Registration
* Recruiter Login
* JWT Token Based Authentication
* Protected API Endpoints

### Candidate Management

* Create Candidate
* Edit Candidate
* Delete Candidate
* View Candidate Details
* Assign Candidates to Jobs

### Job Management

* Create Job Openings
* View Jobs
* Delete Jobs
* Manage Required Skills and Descriptions

### Resume Processing

* Upload PDF Resumes
* Extract Resume Text
* Parse Candidate Information
* Automatically Create Candidate Records
* Duplicate Candidate Detection

### AI Candidate Evaluation

* Resume Skill Analysis
* Job-Candidate Matching
* AI Fit Score Generation
* AI Fit Reason Generation

### Dashboard

* Total Jobs
* Active Jobs
* AI Screened Candidates
* Recruitment Overview Metrics

---

## Technology Stack

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* Alembic
* JWT Authentication
* OpenAI API

### Frontend

* React
* Vite
* TailwindCSS
* Axios
* React Router

### Database

* PostgreSQL

---

## Project Structure

backend/

* app/

  * api/
  * core/
  * db/
  * models/
  * schemas/
  * services/
* alembic/
* requirements.txt

frontend/

* src/

  * pages/
  * components/
  * services/

---

## Setup

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

OPENAI_API_KEY=your_openai_api_key
```

---

## Future Enhancements

The following features are planned for future releases:

### Candidate Ranking

Rank candidates automatically based on job requirements.

### Resume Version Tracking

Store multiple resume versions per candidate.

### Interview Management

Schedule and manage interviews directly from the platform.

### Email Notifications

Automated recruiter and candidate communication.

### AI Interview Question Generator

Generate role-specific interview questions using AI.

### Candidate Recommendation Engine

Recommend suitable candidates for new job openings.

### Advanced Analytics Dashboard

Hiring trends, recruiter performance, candidate pipeline metrics.

### Role Based Access Control

Admin, Recruiter, Hiring Manager roles.

### Multi-Tenant Architecture

Support multiple organizations using the same platform.

### Resume Embeddings & RAG

Vector database integration for semantic candidate search.

### AI Chat Assistant

Recruiter assistant capable of querying candidates and jobs using natural language.

---

## Author

Aditya Kumar Singh

Software Developer

Built as an AI-powered recruitment management solution using FastAPI, React, PostgreSQL and OpenAI.
