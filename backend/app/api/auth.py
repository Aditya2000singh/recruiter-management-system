from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.models.recruiter import Recruiter

from app.schemas.recruiter import RecruiterRegister
from app.schemas.recruiter import RecruiterResponse

from app.core.security import hash_password

from app.schemas.recruiter import RecruiterLogin
from app.schemas.recruiter import TokenResponse

from app.core.security import verify_password
from app.core.security import create_access_token

from fastapi.security import OAuth2PasswordRequestForm


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=RecruiterResponse
)
def register(
    recruiter: RecruiterRegister,
    db: Session = Depends(get_db)
):

    existing_user = db.query(
        Recruiter
    ).filter(
        Recruiter.email == recruiter.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_recruiter = Recruiter(
        name=recruiter.name,
        email=recruiter.email,
        password_hash=hash_password(
            recruiter.password
        )
    )

    db.add(new_recruiter)

    db.commit()

    db.refresh(new_recruiter)

    return new_recruiter





# @router.post(
#     "/login",
#     response_model=TokenResponse
# )
@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    user = db.query(
        Recruiter
    ).filter(
        Recruiter.email == form_data.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
        form_data.password,
        user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {
            "sub": str(user.id)
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }