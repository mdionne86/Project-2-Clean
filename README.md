# Project-2-Clean

Natural gas helps us heat our homes, cook our food, and powers generation stations responsible for over 35% of the nation's power.  The gas is supplied from many different parts of the country; from off shore wells in the Gulf of Mexico to horizontal fracking in the Northeast.  The gas is "gathered", sometimes refined, and makes its way into large intrastate gas pipelines.  These pipelines are regulated by the federal government, and because of that there is a responsibility placed on pipelines to share information about where the gas is moving.

Interstate pipeline hold this information on electronic bulletin boards (EBB's) where they are free to download by anyone.  There are two parts to the information.  The first part of information is details on the locations.  The location file contains usually around 20 data points, but the most important for this project are a federally given number to indentify the location ("LOC").  The information further describes the loc with a name, a state and county where it is located, it describes wheter the meter is set up for delivery or reciept, the pipe can also place it in a self described zone, and finally it is categorized by type.  Type is important as it can tell you if gas is coming onto a pipeline from a wellhead, from another pipeline, or from in ground storage.  The type can tell you if gas is leaving to be consumed by a gas plant, an LDC (your local gas company) or being consumed to create LNG for export.  

The second part of information is provided much more regularly and describes the flows on the pipe.  The flows are updated hourly.  The flows file uses the LOC to show gas moving on the pipeline.  LOC's are further catergorized by how large the points are.  A loc might be able to move 100,000 mmBtu through a certain point, but on a given day it might be zero, and in special occassions could be larger than 100,000 mmBtu. 

Taken together this information creates a picture of usage on a pipe.  

Our project hopes to show a few different ways visualizing this data.  We hope you have a better understanding of gas flows after using our website. 

## Database Initialization
Data in .csv was retrieved from:
	https://infopost.spectraenergy.com/infopost/TEHome.asp?Pipe=TE

The .csv was then transformed to the proper table format using pandas. It was stored in TEXT to simplify the JSON process later. Using sqlite3 the db was created, and the data loaded.

## Serving the JSON
Flask and SQAlchemy was used to access the database, and transform it to JSON. Then it is served via API. Because Github Pages doesn't support flask, we had to use Frozen-Flask to create a static file to work from.

## Compressor Map
The compressor map's lat/lon was gathered from:
	https://hifld-geoplatform.opendata.arcgis.com/datasets/natural-gas-compressor-stations
This is public information as people have a right to know what is located in their backyards.  However, actual pipe GIS information is not found freely on the internet due to the threat of terrorism.  The API is called into our website and then fully displayed.  We have included markers that show the pipeline owners name.

For an FYI here is a map of some of the interstate pipelines that criss-cross NJ.
    https://rethinkenergynj.org/wp-content/uploads/2015/11/RENJ_Map_30x40_09222016_5.jpg

## Daily Flow Data
The daily flow data is powered by the SQLite file generated in our database.  A person wanting to better understand the intricacies of natural gas trading would greatly benefit from a table that was interactive: That was able to sort and collate data.  We were able to incorporate handsontable:
https://handsontable.com/

We will let them describe themselves:

Handsontable is a data grid with spreadsheet features and look&feel. Handsontable is written in JavaScript and works with the most popular frameworks such as Angular, Vue and React. It can be easily modified or extended with custom plugins. It binds to any data source using the JSON format and handles large amounts of records. It supports operations like filtering, sorting and CRUD (Create, Read, Update, Delete), and advanced ones - multi-column sorting, creating custom cell types and adding data summaries. 

We are showing 30 days of flow data from August.  In the later parts of this month hurricanes were in the Gulf Of Mexico.  Because of this supply was curtailed in the southern region of the pipeline.  More supply had to make up for this because usage didn't move lower.  Where did the gas come from? Our table displays this and a trader would use this information to find other ways of getting supply onto the pipeline. 
