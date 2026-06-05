# TalentFlow AI

AI-powered recruitment platform built with FastAPI, React, PostgreSQL, and OpenAI.

## Features

* Recruiter Signup/Login
* JWT Authentication
* Candidate Management
* Job Management
* Resume Upload (PDF)
* AI Resume Parsing
* AI Candidate Scoring
* Dashboard Analytics
* Candidate-Job Assignment

## Tech Stack

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* JWT Authentication
* OpenAI API

### Frontend

* React
* Vite
* Tailwind CSS
* Axios

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file using `.env.example`.

Run migrations and start the server:

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Main Modules

* Authentication
* Dashboard
* Candidates
* Jobs
* Resume Upload
* AI Scoring

## Author

Aditya Kumar Singh
