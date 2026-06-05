from pydantic import BaseModel
from pydantic import EmailStr


class CandidateCreate(BaseModel):

    name: str

    email: EmailStr

    phone: str

    skills: str | None = None

    experience: int | None = None


class CandidateResponse(BaseModel):

    id: int

    name: str

    email: EmailStr

    phone: str

    skills: str | None = None

    experience: int | None = None

    fit_score: int | None = None

    fit_reason: str | None = None

    job_id: int | None = None

    class Config:

        from_attributes = True


class CandidateUpdate(BaseModel):
    name: str
    email: str
    phone: str
    skills: str
    experience: int