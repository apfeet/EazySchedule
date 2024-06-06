from flask import Blueprint, request, jsonify, session
import pymongo
import os
from dotenv import load_dotenv
import json
from functions.CheckIfPasswordPassRequirements import CheckPasswordRequirements

load_dotenv() 

RegisterPage = Blueprint("RegisterPage", __name__)

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

myclient = pymongo.MongoClient(f"mongodb://{DB_USER}:{DB_PASSWORD}@localhost:27017/")
mydb = myclient["User"]
DBcollection = mydb['users']

@RegisterPage.route("/register", methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')
        
        uniqueID = data.get('uniqueID')

        print(data)
        # If the user is registering with Google, use uniqueID as the password
        if uniqueID:
            password = uniqueID
        else:
            res, password_strength = CheckPasswordRequirements(password)
            if not res:
                return jsonify({"status": "error", "message": password_strength['message']}), 400
        
        # Check if the email already exists
        existing_user_by_email = DBcollection.find_one({"email": email})
        if existing_user_by_email:
            return jsonify({"status": "error", "message": "Email already exists"}), 400
        
        # Check if the username already exists
        existing_user_by_username = DBcollection.find_one({"username": username})
        if existing_user_by_username:
            return jsonify({"status": "error", "message": "Username already exists"}), 400

        # Save user in the database without hashing the password
        user = {
            "email": email,
            "username": username,
            "password": password,
            "ConnectedMedia": {
                "instagram": False,
                "facebook": False,
                "linkedin": False
            }
        }
        DBcollection.insert_one(user)
        
        # Initialize the session if it does not exist and add the username to the session
        if 'username' not in session:
            session['username'] = []
        session['username'].append(username)
        session.modified = True
        session.permanent = True
        
        print(f"Session after registration: {session}")

        return jsonify({"status": "success"}), 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred", "message": str(e)}), 500

@RegisterPage.route("/login", methods=['POST'])
def login():
    try:
        data = request.get_json()
        if isinstance(data, str):
            try:
                data = json.loads(data)
            except json.JSONDecodeError:
                return jsonify({"error": "An error occurred", "message": "Invalid JSON"}), 400
        elif not isinstance(data, dict):
            return jsonify({"error": "An error occurred", "message": "Expected a JSON object"}), 400

        username = data.get('username')
        password = data.get('password')

        # Find the user in the database
        user = DBcollection.find_one({"username": username})
        if not user:
            return jsonify({"status": "error", "message": "User does not exist"}), 400

        # Check the password
        if user['password'] != password:
            return jsonify({"status": "error", "message": "Incorrect password"}), 400

        # Add the username to the session
        if 'username' not in session:
            session['username'] = []
        session['username'].append(username)
        session.modified = True
        session.permanent = True
        
        print(f"Session after login: {session}")

        return jsonify({"status": "success"}), 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": str(e), "message": str(e)}), 500


@RegisterPage.route("/is_logged_in", methods=['POST'])
def is_logged_in():
    session.permanent = True 
    session_username = session.get('username')

    if session_username:
        return jsonify({"status": "success", "username": session_username}), 200
    else:
        return jsonify({"status": "error", "message": "User not authenticated"}), 200

@RegisterPage.route("/logout", methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({"status": "success"}), 200
