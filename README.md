# Project-2-Clean

## Database Initialization
Data in .csv was retrieved from:
	<insert website 1>
	<insert website 2>

The .csv was then transformed to the proper table format using pandas. It was stored in TEXT to simplify the JSON process later. Using sqlite3 the db was created, and the data loaded.

## Serving the JSON
Flask and SQAlchemy was used to access the database, and transform it to JSON. Then it is served via API. Because Github Pages doesn't support flask, we had to use Frozen-Flask to create a static file to work from.

## Compressor Map

## Daily Flow Data