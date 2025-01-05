from fastapi import FastAPI,Depends
from fastapi.middleware.cors import CORSMiddleware

from db.configurations import SessionLocal,engine,Base

app = FastAPI(bind=engine)

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to specify which origins are allowed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

def db_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

print("HI")
