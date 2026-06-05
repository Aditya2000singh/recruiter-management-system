from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.db.database import Base
from sqlalchemy.orm import relationship


class Recruiter(Base):
    __tablename__ = "recruiters"

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

    password_hash = Column(
        String,
        nullable=False
    )

    candidates = relationship(
    "Candidate",
    backref="owner"
    )
    
    jobs = relationship(
    "Job",
    backref="owner"
    )