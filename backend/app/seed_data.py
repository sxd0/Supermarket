import asyncio
import asyncpg
import os
# from app.config import settings

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASS = os.getenv("DB_PASSWORD", "postgres")
DB_NAME = os.getenv("DB_NAME", "aks_db")

# DB_HOST = settings.DB_HOST
# DB_PORT = settings.DB_PORT
# DB_USER = settings.DB_USER
# DB_PASS = settings.DB_PASS
# DB_NAME = settings.DB_NAME

async def check_and_seed_data():
    conn = await asyncpg.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASS,
        database=DB_NAME,
    )

    try:
        # Проверка существования данных
        category_count = await conn.fetchval("SELECT COUNT(*) FROM category;")
        if category_count > 0:
            print("Database already has data. Skipping seeding.")
        else:
            print("Database is empty. Seeding data...")
            with open("seed_data.sql", "r", encoding="utf-8") as f:
                sql_script = f.read()
            await conn.execute(sql_script)
            print("Database seeded successfully.")
    except Exception as e:
        print(f"Error during seeding: {e}")
    finally:
        await conn.close()


if __name__ == "__main__":
    asyncio.run(check_and_seed_data())

# DROP SCHEMA public CASCADE;
# CREATE SCHEMA public;
