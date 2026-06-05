from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.core.dependencies import get_current_user

from app.models.recruiter import Recruiter
from app.models.job import Job
from app.models.candidate import Candidate


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("")
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: Recruiter = Depends(
        get_current_user
    )
):

    total_jobs = db.query(
        Job
    ).filter(
        Job.owner_id == current_user.id
    ).count()

    total_candidates = db.query(
        Candidate
    ).filter(
        Candidate.owner_id == current_user.id
    ).count()

    assigned_candidates = db.query(
        Candidate
    ).filter(
        Candidate.owner_id == current_user.id,
        Candidate.job_id.isnot(None)
    ).count()

    return {
        "total_jobs": total_jobs,
        "total_candidates": total_candidates,
        "assigned_candidates": assigned_candidates
    }