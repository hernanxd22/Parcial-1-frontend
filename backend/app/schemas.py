from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str


class IngredienteBase(BaseModel):
    nombre: str
    descripcion: str
    es_alergeno: bool


class IngredienteCreate(IngredienteBase):
    pass


class IngredienteOut(IngredienteBase):
    id: int

    class Config:
        from_attributes = True