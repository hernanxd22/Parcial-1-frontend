from sqlalchemy import Column, Integer, String , Boolean
from app.database import Base

class Usuario(Base):
    __tablename__ = "usuarios_db"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    password = Column(String)
    rol = Column(String)


class Ingrediente(Base):
    __tablename__ = "ingredientes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    descripcion = Column(String)
    es_alergeno = Column(Boolean)