from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base


class Job(Base):

    __tablename__ = "jobs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String,
        nullable=False
    )

    description = Column(
        String,
        nullable=False
    )

    required_skills = Column(
        String,
        nullable=False
    )

    status = Column(
        String,
        default="OPEN"
    )

    owner_id = Column(
        Integer,
        ForeignKey("recruiters.id")
    )

    candidates = relationship(
        "Candidate",
        backref="job"
    )