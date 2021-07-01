from bs4 import BeautifulSoup
import requests
import json
import csv
from google.cloud import storage
from google.oauth2 import service_account
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('./fantasy_football_firebase_creds.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

credentials = service_account.Credentials.from_service_account_file(
    './fantasy_football_bucket.json')

storage_client = storage.Client(credentials=credentials)

year = 1995
for x in range(year,2021):
    url = 'https://www.pro-football-reference.com/years/'+str(x)+'/fantasy.htm'
    its = 1



    response = requests.get(url, timeout = 5)
    content = BeautifulSoup(response.content, 'html.parser')
    table = BeautifulSoup(str(content.select('tbody')),'html.parser')
    table_rows = table.find_all('tr')
    players = []
    for i in range(0,308):
        
        if (i==29 or i==60 or i==91 or i==122 or i==153 or i==184 or i==215 or i==246 or i==277):
            i = i+1
            its = its-1
        
        name = table_rows[i].find('td').a
        team_name = name.find_next('td')
        position = team_name.find_next('td')
        age = position.find_next('td')
        games_played = age.find_next('td')
        games_start = games_played.find_next('td')
        pass_comp = games_start.find_next('td')
        pass_att = pass_comp.find_next('td')
        pass_yrds = pass_att.find_next('td')
        pass_td = pass_yrds.find_next('td')
        pass_int = pass_td.find_next('td')
        rush_att = pass_int.find_next('td')
        rush_yds = rush_att.find_next('td')
        rush_yds_per_att = rush_yds.find_next('td')
        rush_tds = rush_yds_per_att.find_next('td')
        rec_tgt = rush_tds.find_next('td')
        rec_receptions = rec_tgt.find_next('td')
        rec_yards = rec_receptions.find_next('td')
        rec_yrds_per_reception = rec_yards.find_next('td')
        rec_tds = rec_yrds_per_reception.find_next('td')
        fumbles = rec_tds.find_next('td')
        fumbles_lost = fumbles.find_next('td')
        scoring_tds = fumbles_lost.find_next('td')
        scoring_two_point_conversation = scoring_tds.find_next('td')
        scoring_two_point_passes = scoring_two_point_conversation.find_next('td')
        fantasy_points = scoring_two_point_passes.find_next('td')
        ppr_points = fantasy_points.find_next('td')
        draft_king_points = ppr_points.find_next('td')
        fan_duel_points = draft_king_points.find_next('td')
        vbd = fan_duel_points.find_next('td')
        position_rank = vbd.find_next('td')
        overall_rank = int(position_rank.find_next('td').string) if position_rank.find_next('td').string else its
        its = its + 1
        player = {
            "name": name.string,
            "teamName": team_name.string,
            "position": position.string if position.string else 'N/A',
            "age": int(age.string),
            "gamesPlayed": int(games_played.string),
            "gamesStarted": int(games_start.string) if games_start.string else 0,
            "passComp": int(pass_comp.string),
            "passAtt": int(pass_att.string),
            "passYrds": int(pass_yrds.string),
            "passTds": int(pass_td.string),
            "passInts": int(pass_int.string),
            "rushAtt": int(rush_att.string),
            "rushYds": int(rush_yds.string),
            "rushYdsPerAtt": float(rush_yds_per_att.string) if rush_yds_per_att.string else 0.0,
            "rushTds": int(rush_tds.string),
            "recTgt": int(rec_tgt.string) if rec_tgt.string else 0,
            "recReceptions": int(rec_receptions.string),
            "recYards": int(rec_yards.string) if rec_yards.string else 0,
            "recYdsPerAtt": float(rec_yrds_per_reception.string) if rec_yrds_per_reception.string else 0.0,
            "recTds": int(rec_tds.string),
            "fumbles": int(fumbles.string) if fumbles.string else 0,
            "fumblesLost": int(fumbles_lost.string) if fumbles_lost.string else 0,
            "scoringTds": int(scoring_tds.string) if scoring_tds.string else 0,
            "scoringTwoPointConversation": int(scoring_two_point_conversation.string) if scoring_two_point_conversation.string else 0,
            "scoringTwoPointPass": int(scoring_two_point_passes.string) if scoring_two_point_passes.string else 0,
            "fantasyPoints": float(fantasy_points.string) if fantasy_points.string else 0.0,
            "pprPoints": float(ppr_points.string) if ppr_points.string else 0.0,
            "draftKingPoints": float(draft_king_points.string) if ppr_points.string else 0.0,
            "fanDuelPoints": float(fan_duel_points.string) if fan_duel_points.string else 0.0,
            "vbd": int(vbd.string) if vbd.string else 0,
            "positionRank": int(position_rank.string),
            "overallRank": overall_rank
        }
        players.append(player)
    with open('fantasyStats'+str(x)+'.json', 'w') as outputfile: json.dump(players, outputfile)

year = 1995
for x in range(year,2021):
    bucket = storage_client.bucket('fantasy_football_data')
    blob = bucket.blob('fantasyStats'+str(x)+'.json')
    blob.upload_from_filename('./fantasyStats'+str(x)+'.json')


with open('./fantasyStats2020.json') as f:
    player_data_2020 = json.load(f)


player_data_2020 = [x for x in player_data_2020 if x['position'] != 'N/A']

for data in player_data_2020:
    doc_ref = db.collection('players').document(data['name'])
    doc_ref.set({
        'name': data['name'],
        'teamName': data['teamName'],
        'position': data['position'],
        'age': data['age'],
        'gamesPlayed': data['gamesPlayed'],
        'gamesStarted': data['gamesStarted'],
        'passComp': data['passComp'],
        'passAtt': data['passAtt'],
        'passYrds': data['passYrds'],
        'passTds': data['passTds'],
        'passInts': data['passInts'],
        'rushAtt': data['rushAtt'],
        'rushYds': data['rushYds'],
        'rushYdsPerAtt': data['rushYdsPerAtt'],
        'rushTds': data['rushTds'],
        'recTgt': data['recTgt'],
        'recReceptions': data['recReceptions'],
        'recYards': data['recYards'],
        'recYdsPerAtt': data['recYdsPerAtt'],
        'recTds': data['recTds'],
        'fumbles': data['fumbles'],
        'fumblesLost': data['fumblesLost'],
        'scoringTds': data['scoringTds'],
        'scoringTwoPointConversation': data['scoringTwoPointConversation'],
        'scoringTwoPointPass': data['scoringTwoPointPass'],
        'fantasyPoints': data['fantasyPoints'],
        'pprPoints': data['pprPoints'],
        'draftKingPoints': data['draftKingPoints'],
        'fanDuelPoints': data['fanDuelPoints'],
        'vbd': data['vbd'],
        'positionRank': data['positionRank'],
        'overallRank': data['overallRank'],
    })


