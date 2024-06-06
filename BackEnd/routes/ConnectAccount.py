from flask import Blueprint, request, jsonify
import pymongo
import os
import requests
from dotenv import load_dotenv
from datetime import datetime

load_dotenv() 

ConnectAccount = Blueprint("ConnectAccount", __name__)

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")

myclient = pymongo.MongoClient(f"mongodb://{DB_USER}:{DB_PASSWORD}@localhost:27017/")
mydb = myclient["User"]
DBcollection = mydb['users']

@ConnectAccount.route("/InstagramConnect", methods=['POST'])
def instagram_connect():
    code = request.json.get('code')
    if code:
        data = {
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'redirect_uri': REDIRECT_URI,
            'code': code
        }
        response = requests.post('https://api.instagram.com/oauth/access_token', data=data)
        if response.status_code == 200:
            access_token = response.json().get('access_token')
            DBcollection.update_one({'instagram_access_token': access_token}, {'$set': {'instagram_access_token': access_token}}, upsert=True)
            return jsonify({'message': 'Instagram connected', 'accessToken': access_token})
    return jsonify({'message': 'Failed to connect Instagram'}), 400

@ConnectAccount.route("/schedulePost", methods=['POST'])
def schedule_post():
    message = request.json.get('message')
    accessToken = request.json.get('accessToken')
    scheduledTime = datetime.now().isoformat()

    if message and accessToken:
        post = {
            'message': message,
            'scheduledTime': scheduledTime,
            'accessToken': accessToken
        }
        DBcollection.update_one({'instagram_access_token': accessToken}, {'$push': {'scheduledPosts': post}}, upsert=True)
        return jsonify(post)
    return jsonify({'message': 'Failed to schedule post'}), 400

@ConnectAccount.route("/UserCardsStatus", methods=['POST'])
def user_cards_status():
    # Simula il recupero dello stato delle card
    statusCards = ["connected", "connected", "connected"]
    return jsonify({'statusCards': statusCards})
