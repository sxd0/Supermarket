from pydantic import Field, model_validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASS: str
    DB_NAME: str
    DATABASE_URL: str = Field(default=None, init=False)

    @model_validator(mode='before')
    def set_database_url(cls, values):
        values['DATABASE_URL'] = f"postgresql+asyncpg://{values['DB_USER']}:{values['DB_PASS']}@{values['DB_HOST']}:{values['DB_PORT']}/{values['DB_NAME']}"
        return values

    SECRET_KEY: str
    ALGORITHM: str
    
    class Config:
        env_file = ".env"

settings = Settings()