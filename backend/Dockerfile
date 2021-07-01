FROM python:3.8-slim
RUN pip install pipenv
COPY / /
RUN pipenv install --system --deploy --ignore-pipfile
EXPOSE 5000
ENV PORT 5000
WORKDIR /src
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 30 wsgi