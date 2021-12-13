from flask_cors import CORS, cross_origin
from flask import Flask, jsonify, request
from sql import create_connection
from sql_initial_execution import execute_initial
from items import get_item_details_all, get_item_details
from payments import create_order
from saleprediction import get_predictions

import pandas as pd
import cv2
import os

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

connection = create_connection("sm_app.sqlite")


@app.route("/category-wise-item-count")
@cross_origin()
def get_category_wise_items_sold_count_service():
    dataset = pd.read_csv("../data/Sagar Shop Purchase - Sheet1.csv")
    Total_classes_category = pd.value_counts(dataset['category'], sort=True)
    return Total_classes_category.to_json()


@app.route("/item-wise-item-count")
@cross_origin()
def get_item_wise_items_sold_count_service():
    dataset = pd.read_csv("../data/Sagar Shop Purchase - Sheet1.csv")
    Total_classes_category = pd.value_counts(dataset['Item Name'], sort=True)
    return Total_classes_category.to_json()


@app.route("/category-wise-purchase")
@cross_origin()
def get_category_wise_purchase_service():
    dataset = pd.read_csv(
        "../data/Sagar Shop Purchase - Sheet1.csv").drop(columns=['S No'])
    df_cat = dataset.dropna()
    return df_cat.groupby('category').sum().to_json()


@app.route("/item-wise-purchase")
@cross_origin()
def get_item_wise_purchase_service():
    dataset = pd.read_csv(
        "../data/Sagar Shop Purchase - Sheet1.csv").drop(columns=['S No'])
    df_cat = dataset.dropna()
    return df_cat.groupby('Item Name').sum().to_json()


@app.route("/item-details-all")
@cross_origin()
def get_item_details_all_service():
    return jsonify(get_item_details_all().tolist())


@app.route("/item-details")
@cross_origin()
def get_item_details_service():
    return jsonify(get_item_details(request.args.get('id')).tolist())


@app.route("/create-order")
@cross_origin()
def create_order_service():
    id = request.args.get('id')
    # cost = get_item_details(request.args.get('id')).tolist()[3]
    return jsonify(create_order())


@app.route("/item-predict")
@cross_origin()
def item_predict_service():
    next_purchase_id, discount_id = get_predictions()
    return jsonify({
        'next_purchase_id': next_purchase_id,
        'discount_id': discount_id
    })


'''
razorpay_order_id: "order_ISFCTR8XXXX"
razorpay_payment_id: "pay_ISFD8sU83fXXXX"
razorpay_signature: "XXXXXXXXXXXXXXXXXXXXx"
'''


@app.route("/save-payment-details", methods=['POST'])
@cross_origin()
def save_order_service():
    data = request.form
    return jsonify({})
    # save in the db


@app.route("/add-item", methods=['POST'])
@cross_origin()
def add_new_item_service():
    data = request.form.get('imageone', 'fdgdgdgdfg')
    print(data)
    print(request.files)
    image_path = "../ui/dist/sagar-shop-app/assets/product_images"

    # os.mkdir(image_path)
    cv2.imwrite(os.path.join(image_path, 'waka.jpg'), data)
    cv2.waitKey(0)
    return jsonify({})


print('starting...')

execute_initial(connection)
print('app.run()')
app.run()
