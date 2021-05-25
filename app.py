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

@app.route('/api/cupcakes/<int:cupcake_id>')
def show_one_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = cupcake.serialize_cupcake()
    return jsonify(cupcake=serialized)

@app.route('/api/cupcakes', methods=['POST'])
def post_a_cupcake():

    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = request.json["rating"]
    try: 
        image = request.json["image"]
    except:
        inage = 'https://www.bakedbyrachel.com/wp-content/uploads/2018/01/chocolatecupcakesccfrosting1_bakedbyrachel.jpg' 
    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating)
    serialized = new_cupcake.serialize_cupcake()
    db.session.add(serialized)
    db.session.commit()
    return (jsonify(cupcake=serialized), 201)


