from flask_cors import CORS, cross_origin
from flask import Flask, jsonify, request
from sql import create_connection
from sql_initial_execution import execute_initial

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

connection = create_connection("sm_app.sqlite")


@app.route("/products")
@cross_origin()
def get_companies_info():
    return jsonify({})


@app.route("/stock_company", methods=['POST'])
@cross_origin()
def get_stock_company_info():
    data = request.json
    idx, amount, period, startDate, endDate, roa = data['ids'], data[
        'amount'], data['period'], data['startDate'], data['endDate'], data['roa']


print('starting...')

execute_initial(connection)
print('app.run()')
app.run()
