from flask import Flask
from sqlalchemy.orm import sessionmaker
from tabledef import *
engine = create_engine('sqlite:///tutorial.db', echo=True)

app = Flask(__name__)
from app import views
