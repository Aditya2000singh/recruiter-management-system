from pydantic import BaseModel


class ParsedResumeResponse(BaseModel):

    name: str

    email: str

    phone: str

    skills: list[str]

    experience: int




class ResumeResponse(BaseModel):

    name: str

    email: str

    skills: str

    experience: int