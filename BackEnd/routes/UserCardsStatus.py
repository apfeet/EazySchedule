from flask import Blueprint, request, jsonify, session
from dotenv import load_dotenv
import os
import pymongo

load_dotenv()

UserCardsStatus = Blueprint("UserCardsStatus", __name__)

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

myclient = pymongo.MongoClient(f"mongodb://{DB_USER}:{DB_PASSWORD}@localhost:27017/")
mydb = myclient["User"]
DBcollection = mydb['users']

@UserCardsStatus.route('/UserCardsStatus', methods=['POST'])
def check_UserCardsStatus():
    session_username = session.get('username')[0]


    if not session_username:
        return jsonify({"status": "fail", "message": "User not authenticated"}), 401

    user = DBcollection.find_one({"username": session_username})

    if not user:
        return jsonify({"status": "fail", "message": "User not found"}), 404

    statusCards = get_status_cards(user.get("ConnectedMedia", {}))

    return jsonify({"statusCards": statusCards}), 200


def get_status_cards(connected_media):
    statusCards = ["loading"] * 3

    statusCards[0] = "connected" if connected_media.get("instagram") else "connect"
    statusCards[1] = "connected" if connected_media.get("facebook") else "connect"
    statusCards[2] = "connected" if connected_media.get("linkedin") else "connect"

    return statusCards


@UserCardsStatus.route('/checkUserLogin', methods=['GET'])
def check_user_login():
    session.permanent = True 
    session_username = session.get('username')

    if session_username:
        return jsonify({"status": "success", "username": session_username}), 200
    else:
        return jsonify({"status": "error", "message": "User not authenticated"}), 200
