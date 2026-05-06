from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base
Base = declarative_base()

DATABASE_URL="postgresql://postgres:191700faB@localhost:5432/parcial1_Profmagni"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)