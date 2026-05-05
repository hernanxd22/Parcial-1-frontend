import sys
import os
from app.auth import create_token
from fastapi import HTTPException
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from app.database import SessionLocal, engine, Base
from app import models  
from app.schemas import UserCreate, IngredienteCreate, IngredienteOut          
from app.crud import create_user, get_user_by_username,  get_current_user           
from app.auth import hash_password, verify_password
from app.models import Ingrediente

Base.metadata.create_all(bind=engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en desarrollo está bien
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 🔹 conexión a DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔹 ruta base
@app.get("/")
def root():
    return {"msg": "API funcionando"}

# 🔹 register
@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    hashed = hash_password(user.password)

    create_user(db, user.username, hashed, "CONSULTA")

    return {"msg": "Usuario creado"}


@app.post("/login")
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, user.username)

    if not db_user:
        raise HTTPException(status_code=400, detail="Credenciales inválidas")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Credenciales inválidas")


    token = create_token({
        "sub": db_user.username,
        "rol": db_user.rol
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }



@app.get("/ingredientes")
def get_ingredientes(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return db.query(Ingrediente).all()


@app.post("/ingredientes", response_model=IngredienteOut)
def create_ing(
    ing: IngredienteCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    if user["rol"] != "ADMIN":
        raise HTTPException(status_code=403, detail="No autorizado")

    nuevo = Ingrediente(
        nombre=ing.nombre,
        descripcion=ing.descripcion,
        es_alergeno=ing.es_alergeno
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    return nuevo

@app.put("/ingredientes/{id}")
def update_ing(id: int, ing: IngredienteCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    
    if user["rol"] != "ADMIN":
        raise HTTPException(status_code=403, detail="No autorizado")

    ingrediente = db.query(Ingrediente).filter(Ingrediente.id == id).first()

    ingrediente.nombre = ing.nombre
    ingrediente.descripcion = ing.descripcion
    ingrediente.es_alergeno = ing.es_alergeno

    db.commit()
    db.refresh(ingrediente)

    return ingrediente



@app.delete("/ingredientes/{id}")
def delete_ing(
    id: int,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    if user["rol"] != "ADMIN":
        raise HTTPException(status_code=403, detail="No autorizado")

    ing = db.query(Ingrediente).filter(Ingrediente.id == id).first()

    if not ing:
        raise HTTPException(status_code=404, detail="No encontrado")

    db.delete(ing)
    db.commit()

    return {"msg": "Eliminado"}