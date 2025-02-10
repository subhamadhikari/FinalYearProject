from fastapi import FastAPI,Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import os
import uvicorn

from db.configurations import SessionLocal,engine,Base


from schemas.user_schema import UserSchema

from controllers import auth_controller,segmentation_controller


app = FastAPI(bind=engine)

BASE_DIR = os.getcwd()
STATIC_DIR = os.path.join(BASE_DIR, "assets")
os.makedirs(STATIC_DIR, exist_ok=True)

# Mount the static files route. All files under STATIC_DIR are served at "/assets"
app.mount("/assets", StaticFiles(directory=STATIC_DIR), name="assets")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to specify which origins are allowed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

# def db_session():
#     session = SessionLocal()
#     try:
#         yield session
#     finally:
#         session.close()

# @app.post("/signup")
# def register(user:userschema.UserSchema,session:Session = Depends(db_session)):
#     hash_password,salt = encrypt_pass(user.password)
#     try:
#         new_user = usermodel.User(salt=salt,encrypt_password=hash_password,email = user.email)
#         session.add(new_user)
#         session.commit()
#         session.refresh(new_user)
#     except SQLAlchemyError as e:
#         print(f" errorxxx : {e.__dict__['orig']}")
#         return {"message":"User creation failed!","status":500,"error":f"{e.__dict__['orig']}"}
#     return {"message":"user created successfully","status":200}
print("HI")
app.include_router(auth_controller.router)
app.include_router(segmentation_controller.router)

# if __name__=="main":
#     uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)