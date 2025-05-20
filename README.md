# Project Background
This project builds off the work done in this [repo](https://github.com/skumar1129/fantasy_football_predictor) with one caveat and hosts the solution in Google Cloud. The caveat is that now instead of storing the precomuted scores of players, we store the models themselves, send the data to the backend, and use the models in the backend to return the scores for the players.

## Tech Stack / Folder Explanation
backend: Python Flask application to load in models from GCS and predict a store based on data sent in from frontend
<br>
data store: GCS bucket to store the data from the webscraper as well as the models once constructed
<br>
model_trainer: Jupyter Notebook ran in GCP's Vertex AI notebook to construct the model
<br>
react-frontend: Frontend written in React hosted on firebase hosting
<br>
webscraper: Python script that uses beautiful soup to scrape data for model as well as load into GCS