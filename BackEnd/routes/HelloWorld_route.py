from flask import Blueprint, session, jsonify

HelloWorld = Blueprint('HelloWorld',__name__)

@HelloWorld.route('/helloworld', methods=['GET'])
def hello_world():
    return jsonify({"message": "Hello World"})
