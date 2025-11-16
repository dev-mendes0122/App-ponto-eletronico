from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()  # só cria o objeto, não o app ainda

def create_app():
    app = Flask(__name__, template_folder="views", static_folder="../public")

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres123@localhost:5433/aula_utf8'
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = 'secret'
    app.config['JWT_SECRET_KEY'] = 'secret'

    db.init_app(app)

    return app
