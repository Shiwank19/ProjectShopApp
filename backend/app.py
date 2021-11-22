from flask_cors import CORS, cross_origin
from flask import Flask, jsonify, request
from sql import create_connection
from sql_initial_execution import execute_initial, select_from_table, check_if_available
import pandas as pd

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

connection = create_connection("sm_app.sqlite")


@app.route("/category-wise-item-count")
@cross_origin()
def get_category_wise_items_sold_count():
    dataset = pd.read_csv("./data/Sagar Shop Purchase - Sheet1.csv")
    Total_classes_category = pd.value_counts(dataset['category'], sort = True)
    
    return Total_classes_category.to_json()

@app.route("/item-wise-item-count")
@cross_origin()
def get_item_wise_items_sold_count():
    dataset = pd.read_csv("./data/Sagar Shop Purchase - Sheet1.csv")
    Total_classes_category = pd.value_counts(dataset['Item Name'], sort = True)
    
    return Total_classes_category.to_json()

@app.route("/category-wise-purchase")
@cross_origin()
def get_category_wise_purchase():
    dataset = pd.read_csv("./data/Sagar Shop Purchase - Sheet1.csv").drop(columns=['S No'])
    df_cat = dataset.dropna()
    return df_cat.groupby('category').sum().to_json()


@app.route("/item-wise-purchase")
@cross_origin()
def get_item_wise_purchase():
    dataset = pd.read_csv("./data/Sagar Shop Purchase - Sheet1.csv").drop(columns=['S No'])
    df_cat = dataset.dropna()
    return df_cat.groupby('Item Name').sum().to_json()


# @app.route("/stock_company", methods=['POST'])
# @cross_origin()
# def get_stock_company_info():
#     data = request.json
#     idx, amount, period, startDate, endDate, roa = data['ids'], data[
#         'amount'], data['period'], data['startDate'], data['endDate'], data['roa']


print('starting...')

execute_initial(connection)
print('app.run()')
app.run()
