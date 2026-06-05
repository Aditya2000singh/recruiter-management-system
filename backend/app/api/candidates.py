from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.models.candidate import Candidate
from fastapi import HTTPException
from app.schemas.candidate import CandidateUpdate
from app.core.dependencies import get_current_user
from app.models.recruiter import Recruiter
from app.models.job import Job

from app.schemas.candidate import (
    CandidateCreate,
    CandidateResponse
)

router = APIRouter(
    prefix="/candidates",
    tags=["Candidates"]
)



@router.post(
    "",
    response_model=CandidateResponse
)
def create_candidate(
    candidate: CandidateCreate,
    db: Session = Depends(get_db),
    current_user: Recruiter = Depends(
        get_current_user
    )
):

    existing_candidate = db.query(
        Candidate
    ).filter(
        Candidate.email == candidate.email
    ).first()

    if existing_candidate:
        raise HTTPException(
            status_code=400,
            detail="Candidate email already exists"
        )

    new_candidate = Candidate(
        name=candidate.name,
        email=candidate.email,
        phone=candidate.phone,
        skills=candidate.skills,
        experience=candidate.experience,
        owner_id=current_user.id
    )

    db.add(new_candidate)

    db.commit()

    db.refresh(new_candidate)

    return new_candidate



@router.get(
    "",
    response_model=list[CandidateResponse]
)
def get_candidates(
    db: Session = Depends(get_db),
    current_user: Recruiter = Depends(
        get_current_user
    )
):

    candidates = db.query(
        Candidate
    ).filter(
        Candidate.owner_id == current_user.id
    ).all()

    return candidates



@router.get(
    "/my-candidates",
    response_model=list[CandidateResponse]
)
def get_my_candidates(
    db: Session = Depends(get_db),
    current_user: Recruiter = Depends(
        get_current_user
    )
):

    candidates = db.query(
        Candidate
    ).filter(
        Candidate.owner_id == current_user.id
    ).all()

    return candidates




@router.get(
    "/{candidate_id}",
    response_model=CandidateResponse
)
def get_candidate(
    candidate_id: int,
    db: Session = Depends(get_db),
    current_user: Recruiter = Depends(
        get_current_user
    )
):

    candidate = db.query(
        Candidate
    ).filter(
        Candidate.id == candidate_id,
        Candidate.owner_id == current_user.id
    ).first()

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    return candidate



@router.put(
    "/{candidate_id}",
    response_model=CandidateResponse
)
def update_candidate(
    candidate_id: int,
    candidate_data: CandidateUpdate,
    db: Session = Depends(get_db),
    current_user: Recruiter = Depends(
        get_current_user
    )
):

    candidate = db.query(
        Candidate
    ).filter(
        Candidate.id == candidate_id
    ).first()

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    if candidate.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    candidate.name = candidate_data.name
    candidate.email = candidate_data.email
    candidate.phone = candidate_data.phone
    candidate.skills = candidate_data.skills
    candidate.experience = candidate_data.experience

    db.commit()

    db.refresh(candidate)

    return candidate




@router.delete(
    "/{candidate_id}"
)
def delete_candidate(
    candidate_id: int,
    db: Session = Depends(get_db),
    current_user: Recruiter = Depends(
        get_current_user
    )
):

    candidate = db.query(
        Candidate
    ).filter(
        Candidate.id == candidate_id
    ).first()

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    if candidate.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    db.delete(candidate)

    db.commit()

    return {
        "message": "Candidate deleted successfully"
    }



@router.put(
    "/{candidate_id}/assign-job/{job_id}"
)
def assign_candidate_to_job(
    candidate_id: int,
    job_id: int,
    db: Session = Depends(get_db)
):

    candidate = db.query(
        Candidate
    ).filter(
        Candidate.id == candidate_id
    ).first()

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    job = db.query(
        Job
    ).filter(
        Job.id == job_id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    candidate.job_id = job.id

    db.commit()

    db.refresh(candidate)

    return {
        "message": "Candidate assigned successfully"
    }


