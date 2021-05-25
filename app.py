from flask import Flask, request, render_template, jsonify
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
    """ show details of a specific cupcake """
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = cupcake.serialize_cupcake()
    return jsonify(cupcake=serialized)

@app.route('/api/cupcakes', methods=['POST'])
def post_a_cupcake():
    """ POST route for the cupcakes """
    flavor = request.json['flavor']
    size = request.json['size']
    rating = request.json['rating']
    try: 
        image = request.json['image']
    except:
        image = 'https://www.bakedbyrachel.com/wp-content/uploads/2018/01/chocolatecupcakesccfrosting1_bakedbyrachel.jpg' 
    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
    db.session.add(new_cupcake)
    db.session.commit()
    return (jsonify(cupcake=new_cupcake.serialize_cupcake()), 201)

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def update_a_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    cupcake.flavor = request.json.get('flavor', cupcake.flavor)
    cupcake.size = request.json.get('size', cupcake.size)
    cupcake.rating = request.json.get('rating', cupcake.rating)
    cupcake.image = request.json.get('image', cupcake.image)
    db.session.commit()
    return jsonify(cupcake=cupcake.serialize_cupcake())

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['DELETE'])
def delete_a_cupcake(cupcake_id):
    deleted_cupcake = Cupcake.query.get_or_404(cupcake_id)
    db.session.delete(deleted_cupcake)
    db.session.commit()
    return jsonify(message='Deleted Cupcake')



