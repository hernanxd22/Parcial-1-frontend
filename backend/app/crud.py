from sqlalchemy.orm import Session
from app.models import Usuario
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.auth import verify_token

def create_user(db: Session, username: str, password: str, rol: str):
    user = Usuario(username=username, password=password, rol=rol)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_user_by_username(db: Session, username: str):
    return db.query(Usuario).filter(Usuario.username == username).first()


security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    return verify_token(token)