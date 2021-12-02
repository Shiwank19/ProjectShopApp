import pandas as pd
import numpy as np
import sqlite3
'''
['item_name', 'item_category', 'item_cost_price', 'item_retail_price',
       'item_image', 'item_id']
'''

'''
db = sqlite3.connect('../data/shopapp.db')
table = pd.read_sql_query("SELECT name FROM sqlite_master", db)
# db.close()

0            Items
1  sqlite_sequence
2         purchase
'''


# sql_file = open("../shopapp.db.sql", encoding='utf-8-sig')
# sql_as_string = sql_file.read()
# cursor.executescript(sql_as_string)
# db.commit()

def get_item_details_all():
    cnx = sqlite3.connect('../data/shopapp.db')
    df = pd.read_sql_query("SELECT * FROM Items", cnx)
    cnx.close()
    return df[['item_name', 'item_category', 'item_id', 'item_retail_price', 'description']].to_numpy()

def get_item_details(id):
    cnx = sqlite3.connect('../data/shopapp.db')
    df = pd.read_sql_query("SELECT * FROM Items where item_id = "+id, cnx)
    df['color'] = 'Black'
    cnx.close()
    return df[['item_name', 'item_category', 'item_id', 'item_retail_price', 'description', 'color' ]].to_numpy()