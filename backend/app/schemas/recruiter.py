from pydantic import BaseModel
from pydantic import EmailStr


class RecruiterRegister(BaseModel):
    name: str
    email: EmailStr
    password: str


class RecruiterResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True



class RecruiterLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str