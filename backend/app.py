from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app) #Permite peticiones desde otros dominios

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



db = SQLAlchemy(app) #instancia de sqlalchemy
frontend_folder = os.path.join(os.getcwd(),"..","frontend")
dist_folder = os.path.join(frontend_folder,"dist")

# Server static files from the "dist" folder under the "frontend" directory
@app.route("/",defaults={"filename":""})
@app.route("/<path:filename>")

def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder, filename)

import routes #importar las rutas

with app.app_context():
    db.create_all() #crear las tablas si no existem

if __name__ == "__main__":
    app.run(debug=True)

