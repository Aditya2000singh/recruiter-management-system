from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.db.database import Base
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy import Text

class Candidate(Base):

    __tablename__ = "candidates"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    phone = Column(
        String,
        nullable=False
    )

    skills = Column(
        String,
        nullable=True
    )

    experience = Column(
        Integer,
        nullable=True
    )

    owner_id = Column(
    Integer,
    ForeignKey("recruiters.id")
    )

    job_id = Column(
    Integer,
    ForeignKey("jobs.id"),
    nullable=True
    )

    resume_text = Column(
    String,
    nullable=True
    )

    fit_score = Column(
    Integer,
    nullable=True
    )

    fit_reason = Column(
        Text,
        nullable=True
    )