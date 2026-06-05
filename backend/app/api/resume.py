from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

from pypdf import PdfReader

from app.services.ai_service import (
    parse_resume_text
)


from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.models.candidate import Candidate
from app.models.recruiter import Recruiter

from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: Recruiter = Depends(
        get_current_user
    )
):

    reader = PdfReader(
        file.file
    )

    resume_text = ""

    for page in reader.pages:

        text = page.extract_text()

        if text:
            resume_text += text

    parsed = parse_resume_text(
        resume_text
    )

    existing_candidate = db.query(
        Candidate
    ).filter(
        Candidate.email == parsed["email"]
    ).first()

    if existing_candidate:
        return {
            "message": "Candidate already exists",
            "candidate_id": existing_candidate.id
        }

    candidate = Candidate(
        name=parsed["name"],
        email=parsed["email"],
        phone=parsed["phone"],
        skills=", ".join(
            parsed["skills"]
        ),
        experience=parsed["experience"],
        resume_text=resume_text,
        owner_id=current_user.id
    )

    db.add(candidate)

    db.commit()

    db.refresh(candidate)

    return {
        "message": "Candidate created successfully",
        "candidate_id": candidate.id,
        "parsed_data": parsed
    }