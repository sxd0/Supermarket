FROM python:3.11

RUN apt-get update && apt-get install -y netcat-openbsd

RUN mkdir /allsad

WORKDIR /allsad

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

CMD ["gunicorn", "app.main:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind=0.0.0.0:8080"]
