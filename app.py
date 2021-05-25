from flask import Flask, request, render_template, redirect, flash, jsonify
from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SECRET_KEY'] = 'development_key'

connect_db(app)

@app.route('/api/cupcakes')
def show_all_cupcake_data():
    """ shows all of the cupcake information in the API """
    all_cupcakes = Cupcake.query.all()
    serialized = [cupcake.serialize_cupcake() for cupcake in all_cupcakes]
    return jsonify(cupcakes=serialized)