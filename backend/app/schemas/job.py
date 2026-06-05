from pydantic import BaseModel


class JobCreate(BaseModel):

    title: str

    description: str

    required_skills: str


class JobResponse(BaseModel):

    id: int

    title: str

    description: str

    required_skills: str

    status: str

    class Config:

        from_attributes = True


class JobUpdate(BaseModel):

    title: str

    description: str

    required_skills: str

    status: str