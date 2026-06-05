from fastapi import FastAPI

from app.db.database import Base
from app.db.database import engine

from app.db import base

from app.api.auth import router as auth_router
from app.api.user import router as user_router
from app.models.candidate import Candidate
from app.api.candidates import router as candidate_router
from app.api.jobs import router as jobs_router
from app.api.dashboard import router as dashboard_router
from fastapi.middleware.cors import CORSMiddleware

from app.api.resume import (
    router as resume_router
)


app = FastAPI(
    title="Recruiter Management System"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(candidate_router)
app.include_router(jobs_router)
app.include_router(dashboard_router)
app.include_router(
    resume_router
)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {
        "message": "Recruiter Management System API"
    }
