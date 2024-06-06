from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_session import Session
from routes.HelloWorld_route import HelloWorld
from routes.Register import RegisterPage
from routes.UserCardsStatus import UserCardsStatus
from routes.ConnectAccount import ConnectAccount

app = Flask(__name__)
app.secret_key = "Secret_Key"
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

app.config['CORS_ENABLE_LOGGING'] = True

cors = CORS(app, resources={r"/*": {
    "origins": [
        "http://localhost:5173",
        "http://frontend:5173",
        "http://nginx:8000",
        "http://localhost:8000"
    ],
    "supports_credentials": True
}})


@app.before_request
def before_request_logging():
    app.logger.debug(f"Request Headers: {request.headers}")
    app.logger.debug(f"Request Origin: {request.origin}")

# Test endpoint for CORS
@app.route('/is_logged_in', methods=['GET'])
def is_logged_in():
    response = jsonify({"status": "success", "message": "CORS is working"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

app.register_blueprint(HelloWorld)
app.register_blueprint(RegisterPage)
app.register_blueprint(UserCardsStatus)
app.register_blueprint(ConnectAccount)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
