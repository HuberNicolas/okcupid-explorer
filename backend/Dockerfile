FROM python:3.13-slim

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

WORKDIR /app
ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy UV_PROJECT_ENVIRONMENT=/opt/venv PATH="/opt/venv/bin:$PATH"

COPY pyproject.toml uv.lock .python-version ./
RUN uv sync --frozen --no-dev --no-group notebooks

# The API reads the SQLite database next to app.py and the cleaned CSV from pipeline/data
COPY src/app.py src/okcupid.sqlite src/
COPY src/templates src/templates
COPY pipeline/data pipeline/data

# Hugging Face Spaces expect port 7860; override PORT elsewhere
ENV PORT=7860
EXPOSE 7860
RUN useradd --create-home app
USER app
CMD ["sh", "-c", "gunicorn --chdir src --bind 0.0.0.0:${PORT} --workers 2 --timeout 120 app:app"]
