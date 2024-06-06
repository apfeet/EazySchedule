FROM python:latest

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
RUN pip install uwsgi

RUN mkdir -p /var/log/uwsgi && chmod -R 755 /var/log/uwsgi

COPY . /app

CMD ["uwsgi", "--socket", ":5000", "--protocol=http", "--wsgi-file", "main.py", "--callable", "app", "--processes", "4", "--threads", "2", "--buffer-size", "32768", "--stats", ":9191"]
