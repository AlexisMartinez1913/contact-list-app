from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app) #Permite peticiones desde otros dominios

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



db = SQLAlchemy(app) #instancia de sqlalchemy
import routes #importar las rutas

with app.app_context():
    db.create_all() #crear las tablas si no existem

if __name__ == "__main__":
    app.run(debug=True)

