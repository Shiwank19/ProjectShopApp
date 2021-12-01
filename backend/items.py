import pandas as pd
import numpy as np
import sqlite3
'''
['item_name', 'item_category', 'item_cost_price', 'item_retail_price',
       'item_image', 'item_id']
'''
def get_item_details_all():
    cnx = sqlite3.connect('../data/shopapp.db')
    df = pd.read_sql_query("SELECT * FROM Items", cnx)
    cnx.close()
    return df[['item_name', 'item_category', 'item_id', 'item_retail_price' ]].to_numpy()

def get_item_details(id):
    cnx = sqlite3.connect('../data/shopapp.db')
    df = pd.read_sql_query("SELECT * FROM Items where item_id = "+id, cnx)
    df['description'] = 'This description will be populated later.'
    df['color'] = 'Black'
    cnx.close()
    return df[['item_name', 'item_category', 'item_id', 'item_retail_price', 'description', 'color' ]].to_numpy()