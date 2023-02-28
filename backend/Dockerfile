# Use an official Python runtime as a parent image
FROM python:3.10-alpine

# Set the working directory to /app
WORKDIR /app

# Install pipenv dependencies
COPY Pipfile Pipfile.lock ./
RUN python -m pip install --upgrade pip
RUN apk add --no-cache --virtual .build-deps \
    gcc \
    musl-dev \
    libffi-dev \
    openssl-dev \
    cargo \
    linux-headers \
    g++

# Install & use pipenv
RUN pip install pipenv && pipenv install --system --deploy --ignore-pipfile && apk del .build-deps

# Copy the current directory contents into the container at /app
COPY . /app

# Run the tests before deploying the application
RUN python manage.py test

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run app.py when the container launches
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]