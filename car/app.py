from flask import Flask, render_template, jsonify, request
from modles import db, CarModel
import json
# from flask_cors import CORS


app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://admin:admin@db:3306/lesson'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
# response.headers.add('Access-Control-Allow-Headers',
#                      'Content-Type,Authorization')
# response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
# disable cors


# disable cors
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


@app.before_first_request
def create_table():
    db.create_all()


# @app.route('/')
# def index():
#     return render_template("index.html")


@app.route("/", methods=["GET"])
def hello():
    return jsonify({"Hello": "World"})


@app.route("/car", methods=["GET"])
def get_all_car():
    car = CarModel.query.all()
    return jsonify([i.serialize for i in car])


@app.route("/car/<id>", methods=["GET"])
def get_car(id):
    car = CarModel.query.get(id)
    return jsonify(car.serialize)


@app.route("/car/add", methods=["POST"])
def add():
    data = json.loads(request.data)
    name = data["name"]
    price = data["price"]
    image = data["image"]
    car = CarModel(name=name, price=price, image=image)
    db.session.add(car)
    db.session.commit()
    return jsonify({"message": "the car is added", "data": data["name"] + data["price"] + data["image"]})


@app.route("/car/<id>", methods=["DELETE"])
def delete(id):
    db.session.query(CarModel).filter_by(id=id).delete()
    db.session.commit()
    return "Element supprimé avec succeès"


if __name__ == "__main__":

    app.run('0.0.0.0', port=5000, debug=True)
