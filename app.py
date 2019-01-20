# import necessary libraries
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
from pymongo import MongoClient
import pymongo
import JobVizzY
from JobVizzY import scrapListFrameDict
from userInput import jobListSampleCut
from userInput import cityListSampleCut

# create instance of Flask app
app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/jobViz_app"
mongo = PyMongo(app)
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.jobViz_db
# Run scraped functions
# fulljobVizdata = JobVizzY.scrapListFrameDict(
#     jobListSampleCut, cityListSampleCut)
print('')
# print(len(fulljobVizdata))
print('apprx 300 jobs test count')
print('')
# Insert job listings into mongoDb
# db.collection.drop()
# db.collection.insert_many(fulljobVizdata)


@app.route("/")
def home():

    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
