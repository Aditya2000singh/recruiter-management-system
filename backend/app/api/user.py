from fastapi import APIRouter
from fastapi import Depends

from app.core.dependencies import get_current_user

from app.models.recruiter import Recruiter


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/me")
def get_me(
    current_user: Recruiter = Depends(
        get_current_user
    )
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email
    }