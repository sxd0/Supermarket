FROM python:3.11

RUN mkdir /allsad

WORKDIR /allsad

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN chmod a+x /allsad/docker/*.sh

CMD ["gunicorn", "app.main:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind=0.0.0.0:8000"]
