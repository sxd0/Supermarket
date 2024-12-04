from pydantic import BaseModel, EmailStr


class SUserRegister(BaseModel):
    email: EmailStr
    password: str
    name: str
    surname: str

class SUserLogin(BaseModel):
    email: EmailStr
    password: str