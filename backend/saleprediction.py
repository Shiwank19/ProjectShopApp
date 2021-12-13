import pandas as pd
from datetime import datetime
import sqlite3 as sql


def get_predictions():
  dataframe =  pd. read_csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQsW5ym4eu9VK_NuMYj0iyHGlXc555eBHzGJpi-SrJgVk9WKhhvcoLkk6H9PKS9xF0ClhHX_LnHcgXS/pub?output=csv')
  
  sale_counts = dict(dataframe.pivot_table(index = ['Item Name'],aggfunc='size'))

  start_date = datetime.strptime(dataframe.loc[0].Date,"%Y-%m-%d")
  end_date = datetime.strptime(dataframe.loc[len(dataframe)-1].Date,"%Y-%m-%d")
  number_of_months = (end_date.year - start_date.year)*12 + (end_date.month - start_date.month)

  sale_score = {key: value/number_of_months for key,value in sale_counts.items()}

  ids = {}
  conn = sql.connect("../data/shopapp.db")
  cursor = conn.cursor()
  result = cursor.execute("Select item_id,item_name from items").fetchall()
  for row in result:
    for entry in dataframe.values:
      if row[1].lower() == entry[2].replace('_',''):
        ids[row[0]] = entry[2]

  #id for items that are not in item table in database
  id_counter = 73
  for entry in dataframe.values:
    if entry[2] not in ids.values():
      ids[id_counter] = entry[2]
      id_counter +=1

  current_items = []
  for row in result:
    if row[1].lower() not in current_items:
      current_items.append(row[1])

  sale_score_id = {}
  for id in ids:
    if ids[id].replace('_','') in ids.values() and ids[id].replace('_','') in sale_score:
      sale_score_id[id] = sale_score[ids[id].replace('_','')]
    else:
      sale_score_id[id] = 0

  pred_item_id = []
  sorted_items = sorted(sale_score_id.items(), key = lambda x: x[1] ,reverse = True)
  for item_pair in sorted_items:
    if ids[item_pair[0]] not in current_items and item_pair[1] >0.6:
      pred_item_id.append(item_pair[0])

  next_purchase_id = pred_item_id
  discount_id = [r[0] for r in sorted_items[-1:-6:-1]]

  print('Next Purchase : ',next_purchase_id)
  print('Discount Items',discount_id )
  return next_purchase_id, discount_id

