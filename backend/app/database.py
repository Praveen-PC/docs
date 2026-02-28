from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,declarative_base
from dotenv import load_dotenv
import os
from pathlib import Path


BASE_DIR=Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

DATABASE_URL=os.getenv("DATABASE_URL")
# engine=create_engine(DATABASE_URL,echo=True)

engine = create_engine(
    DATABASE_URL,
    echo=False,              # disable logging
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True       # VERY IMPORTANT
)
sessionLocal=sessionmaker(bind=engine,autoflush=False,autocommit=False)
Base=declarative_base()


def get_db():
    db=sessionLocal()
    try:
        yield db
        
    finally:
        db.close()
