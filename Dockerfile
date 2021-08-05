FROM python:3.8

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

# command to run on container start
CMD ["uvicorn", "server.web:app", "--host", "0.0.0.0"]
