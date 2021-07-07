from flask import Flask, request, jsonify
import json
from flask_cors import CORS, cross_origin
from google.cloud import storage
import joblib
import pandas as pd
import numpy as np
from io import BytesIO


app = Flask(__name__)

cors = CORS(app)

storage_client = storage.Client()

model_bucket = storage_client.get_bucket('fantasy_football_models')

@app.route('/fantasyscore', methods=['POST'])
@cross_origin()
def fantasy_score():
    fantasy_model = joblib.load(BytesIO(model_bucket.get_blob('fantasyModel.joblib').download_as_bytes()))
    body = format_body(request.json)
    info = pd.Series(body)
    info = info.drop('name')
    info = np.array(info).reshape(1, -1)
    score = fantasy_model.predict(info)
    return jsonify({'fantasyScore': score[0], 'name': body['name']})
    
    

@app.route('/pprscore', methods=['POST'])
@cross_origin()
def ppr_score():
    ppr_model = joblib.load(BytesIO(model_bucket.get_blob('pprModel.joblib').download_as_bytes()))
    body = format_body(request.json)
    info = pd.Series(body)
    info = info.drop('name')
    info = np.array(info).reshape(1, -1)
    score = ppr_model.predict(info)
    return jsonify({'pprScore': score[0], 'name': body['name']})

@app.route('/draftkingscore', methods=['POST'])
@cross_origin()
def draft_kings_score():
    draft_kings_model = joblib.load(BytesIO(model_bucket.get_blob('draftking.joblib').download_as_bytes()))
    body = format_body(request.json)
    info = pd.Series(body)
    info = info.drop('name')
    info = np.array(info).reshape(1, -1)
    score = draft_kings_model.predict(info) 
    return jsonify({'draftKingScore': score[0], 'name': body['name']})
   
@app.route('/fanduelscore', methods=['POST'])
@cross_origin()
def fan_duel_score():
    fan_duel_model = joblib.load(BytesIO(model_bucket.get_blob('fanDuelModel.joblib').download_as_bytes()))
    body = format_body(request.json)
    info = pd.Series(body)
    info = info.drop('name')
    info = np.array(info).reshape(1, -1)
    score = fan_duel_model.predict(info)
    return jsonify({'fanDuelScore': score[0], 'name': body['name']})

def format_body(body):
    return {
        'name': body['name'],
        'age': body['age'],
        'gamesPlayed': body['gamesPlayed'],
        'gamesStarted': body['gamesStarted'],
        'passComp': body['passComp'],
        'passAtt': body['passAtt'],
        'passYrds': body['passYrds'],
        'passTds': body['passTds'],
        'passInts': body['passInts'],
        'rushAtt': body['rushAtt'],
        'rushYds': body['rushYds'],
        'rushYdsPerAtt': body['rushYdsPerAtt'],
        'rushTds': body['rushTds'],
        'recTgt': body['recTgt'],
        'recReceptions': body['recReceptions'],
        'recYards': body['recYards'],
        'recYdsPerAtt': body['recYdsPerAtt'],
        'recTds': body['recTds'],
        'fumbles': body['fumbles'],
        'fumblesLost': body['fumblesLost'],
        'scoringTds': body['scoringTds'],
        'scoringTwoPointConversation': body['scoringTwoPointConversation'],
        'scoringTwoPointPass': body['scoringTwoPointPass'],
        'fantasyPoints': body['fantasyPoints'],
        'pprPoints': body['pprPoints'],
        'draftKingPoints': body['draftKingPoints'],
        'fanDuelPoints': body['fanDuelPoints'],
        'vbd': body['vbd'],
        'positionRank': body['positionRank'],
        'overallRank': body['overallRank'],
        'QB': body['QB'],
        'RB': body['RB'],
        'TE': body['TE'],
        'WR': body['WR'],
    }