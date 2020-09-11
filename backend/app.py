import numpy as np
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, and_

from flask import Flask, jsonify

################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///resources/ngdbp2.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
dailyFlo = Base.classes.dailyFlo

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

@app.route("/api/ngdbp2")
def flos():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query for the daily flows and compressor info values
    results =   session.query(  dailyFlo.gas_date, dailyFlo.loc,\
    						 	dailyFlo.locName, dailyFlo.locZone,\
    						 	dailyFlo.dirFlo, dailyFlo.locType,\
    						 	dailyFlo.Total_Design_Capacity,\
    						 	dailyFlo.Total_Scheduled_Quantity).\
                order_by(dailyFlo.gas_date).all()

    # Convert to list of dictionaries to jsonify
    flo_date_list = []

    for gas_date, loc, locName, locZone, dirFlo, locType, Total_Design_Capacity, Total_Scheduled_Quantity in results:
        new_dict = {}
        new_dict["gas_date"] = gas_date
        new_dict["loc"] = loc
        new_dict["locName"] = locName
        new_dict["locZone"] = locZone
        new_dict["dirFlo"] = dirFlo
        new_dict["locType"] = locType
        new_dict["Total_Design_Capacity"] = Total_Design_Capacity
        new_dict["Total_Scheduled_Quantity"] = Total_Scheduled_Quantity
        flo_date_list.append(new_dict)

    session.close()

    return jsonify(flo_date_list)


from flask_frozen import Freezer # Added
...
freezer = Freezer(app) # Added
...
# Modified Main
if __name__ == '__main__':
    freezer.freeze()