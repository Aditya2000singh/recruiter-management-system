from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.models.job import Job
from app.models.recruiter import Recruiter
from fastapi import HTTPException

from app.models.candidate import Candidate

from app.services.ai_service import (
    score_candidate_fit
)



from app.schemas.job import (
    JobCreate,
    JobResponse,
    JobUpdate
)

from app.core.dependencies import get_current_user


router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


@router.post(
    "",
    response_model=JobResponse
)
def create_job(
    job: JobCreate,
    db: Session = Depends(get_db),
    current_user: Recruiter = Depends(
        get_current_user
    )
):

    new_job = Job(
        title=job.title,
        description=job.description,
        required_skills=job.required_skills,
        owner_id=current_user.id
    )

    db.add(new_job)

    db.commit()

    db.refresh(new_job)

    return new_job



@router.get(
    "",
    response_model=list[JobResponse]
)
def get_jobs(
    db: Session = Depends(get_db)
):

    jobs = db.query(
        Job
    ).all()

    return jobs



@router.put(
    "/{job_id}",
    response_model=JobResponse
)
def update_job(
    job_id: int,
    job_data: JobUpdate,
    db: Session = Depends(get_db),
    current_user: Recruiter = Depends(
        get_current_user
    )
):

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

    if job.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    job.title = job_data.title
    job.description = job_data.description
    job.required_skills = job_data.required_skills
    job.status = job_data.status

    db.commit()

    db.refresh(job)

    return job


@router.get(
    "/my-jobs",
    response_model=list[JobResponse]
)
def get_my_jobs(
    db: Session = Depends(get_db),
    current_user: Recruiter = Depends(
        get_current_user
    )
):

    jobs = db.query(
        Job
    ).filter(
        Job.owner_id == current_user.id
    ).all()

    return jobs


@router.get(
    "/{job_id}",
    response_model=JobResponse
)
def get_job(
    job_id: int,
    db: Session = Depends(get_db)
):

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

    return job



@router.get(
    "/{job_id}/candidates"
)
def get_job_candidates(
    job_id: int,
    db: Session = Depends(get_db)
):

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

    return job.candidates




@router.delete(
    "/{job_id}"
)
def delete_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: Recruiter = Depends(
        get_current_user
    )
):

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

    if job.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    db.delete(job)

    db.commit()

    return {
        "message": "Job deleted successfully"
    }





@router.post(
    "/{job_id}/score/{candidate_id}"
)
def score_candidate(
    job_id: int,
    candidate_id: int,
    db: Session = Depends(get_db),
    current_user: Recruiter = Depends(
        get_current_user
    )
):

    job = db.query(
        Job
    ).filter(
        Job.id == job_id,
        Job.owner_id == current_user.id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

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

    result = score_candidate_fit(
    job.description,
    candidate.skills,
    candidate.experience
    )

    candidate.fit_score = result["fit_score"]

    candidate.fit_reason = result["recommendation"]

    db.commit()

    db.refresh(candidate)

    return result