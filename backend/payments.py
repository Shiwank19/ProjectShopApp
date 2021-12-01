import razorpay
import hmac
import hashlib
import pandas as pd
import base64

def create_order(amount=100):
    r = pd.read_csv('../data/rzp.csv').iloc[0]
    razpay_key, razpay_secret = r['key_id'], r['key_secret']

    client = razorpay.Client(auth=(razpay_key, razpay_secret))
    client.set_app_details({"title": "Sagar WebStore", "version": "1.0"})
    order_amount = int(amount)
    order_currency = 'INR'
    order_receipt = 'order_rcptid_11'
    payment = client.order.create(dict(amount=order_amount, currency=order_currency, receipt=order_receipt, payment_capture='1'))
    payment['key'] = razpay_key
    print(payment)
    return payment

def verify(order_id, razorpay_payment_id):
    r = pd.read_csv('../data/rzp.csv').iloc[0]
    razpay_key, razpay_secret = r['key_id'], r['key_secret']

    client = razorpay.Client(auth=(razpay_key, razpay_secret))

    #if (generated_signature == razorpay_signature) {
    #payment is successful
    #}

    dig = hmac.new(bytes(razpay_secret), msg=order_id + "|" + razorpay_payment_id, digestmod=hashlib.sha256).digest()
    print(dig)
    print(dig)
    print(base64.b64encode(dig).decode())
    #client.utility.verify_payment_signature(params_dict)