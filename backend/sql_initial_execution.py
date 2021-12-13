
import pandas as pd
from sql import execute_query
from sqlite3 import Error
import random
from random import randint
from datetime import datetime, timedelta, date

random.seed(7)

prod_dict = dict()


def store_products():
    global prod_dict
    space_count = 2
    seen_name = False
    prod_name, prod_price = None, None
    with open('../data/items.txt', 'r') as f:
        count = 1
        for idx, line in enumerate(f.read().split('\n')):
            if space_count == 2:
                prod_name = line.split(':')[0]
                prod_price = line.split(':')[1].strip()
                space_count = 0
                seen_name = True
            elif seen_name:
                seen_name = False
                prod_dict[count] = {
                    'prod': prod_name,
                    'price': prod_price,
                    'desc': line
                }
                count = count + 1
            else:
                space_count = space_count + 1
    return sorted([(k, v) for k, v in prod_dict.items()])


def get_random_items(item_count):
    global prod_dict
    items_set = set()
    while len(items_set) != item_count:
        item_sno = randint(1, len(prod_dict.keys()))
        items_set.add(item_sno)

    items_array = list()
    for item_sno in items_set:
        items_array.append({'sno': item_sno, 'count': randint(1, 3)})

    return items_array


def generate_transaction(date, tr_uniq, item_count):
    items = get_random_items(item_count)
    final_list = list()
    for item in items:
        final_list.append([item['sno'], item['count'], date, f'TR-{tr_uniq}'])

    return final_list


def get_dates():
    end_dt = datetime.now()
    duration_obj = datetime.strptime(str(end_dt.year-1), '%Y')
    start_dt = end_dt - timedelta(days=365)
    return start_dt, end_dt


def generate_data(start_dt, end_dt):
    count = 1
    transactions = []
    while start_dt < end_dt:
        duration = str(randint(1, 23))
        duration_obj = datetime.strptime(duration, '%H')

        start_dt = start_dt + timedelta(hours=duration_obj.hour,
                                        minutes=duration_obj.minute, seconds=duration_obj.second)
        #print(f'Start: {start_dt}')

        items = randint(1, 3)

        transaction = generate_transaction(start_dt, count, items)
        transactions.extend(transaction)
        count = count + 1
        # print('==================================')
    return transactions


def execute_initial(connection):
    global prod_dict

    create_products_table = """
    CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prod_id INTEGER NOT NULL,
    prod_name REAL,
    prod_description REAL
    );
    """

    create_inventory_table = """
    CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prod_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    prod_cost_price REAL,
    prod_selling_price REAL
    );
    """

    create_transaction_table = """
    CREATE TABLE IF NOT EXISTS product_transaction (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tr_id REAL NOT NULL,
    prod_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    total REAL NOT NULL,
    profit REAL NOT NULL,
    tr_date REAL NOT NULL
    );
    """
    execute_query(connection, create_products_table)
    execute_query(connection, create_inventory_table)
    execute_query(connection, create_transaction_table)

    out = store_products()
    product_data = [(row[0], row[1]['prod'], row[1]['desc']) for row in out]
    inventory_data = [(row[0], randint(
        1, 50), row[1]['price'], round(float(row[1]['price'])*1.2, 2)) for row in out]

    start_dt, end_dt = get_dates()
    # print(start_dt)
    # print(end_dt)
    transactions = generate_data(start_dt, end_dt)

    print(len(transactions))
    df = pd.DataFrame(transactions, columns=['prod_id', 'qt', 'date', 'tr_id'])

    transaction_data = [[row['tr_id'],
                         row['prod_id'],
                         row['qt'],
                         round(
        int(row['qt'])*round(float(prod_dict[int(row['prod_id'])]['price'])*1.2, 2), 2),
        round(int(row['qt'])*round(float(prod_dict[int(row['prod_id'])]['price']), 2)*1.2 -
              round(int(row['qt'])*round(float(prod_dict[int(row['prod_id'])]['price'])), 2), 2),
        row['date'].strftime('%Y-%m-%d %H:%M:%S')] for idx, row in df.iterrows()]
    for row in transaction_data[:10]:
        print(row)

    connection.executemany(
        "INSERT INTO products (prod_id, prod_name, prod_description) VALUES (?, ?, ?)", product_data)
    connection.executemany(
        "INSERT INTO inventory (prod_id, quantity, prod_cost_price, prod_selling_price) VALUES (?, ?, ?, ?)", inventory_data)
    connection.executemany(
        "INSERT INTO product_transaction (tr_id, prod_id, quantity, total, profit, tr_date) VALUES (?, ?, ?, ?, ?, ?)", transaction_data)
    return connection


def interested_in_wrapper():
    #df['date'] = pd.to_datetime(df['date'])
    prod_id = 1
    #interested_in = interested_in_analysis(df, prod_id)
    # print(interested_in)


def interested_in_analysis(df, prod_id, top_x=2):
    transactions_with_prod = df[df.prod_id == prod_id].tr_id
    # print(transactions_with_prod.shape)
    #transactions_with_prod.to_csv('2.csv', index = False)
    transactions_with_prod = df[(
        df.prod_id != prod_id) & df.tr_id.isin(transactions_with_prod)]
    # print(transactions_with_prod.shape)
    #transactions_with_prod.to_csv('3.csv', index = False)
    counts = transactions_with_prod['prod_id'].value_counts(sort=True)
    return counts[:top_x]


def get_last_date(year, month):
    month_days_dict = {1: 31, 2: 28, 3: 31, 4: 30, 5: 31,
                       6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31}
    last_date = month_days_dict[month]
    if month == 2 and (year % 400 == 0 or year % 4 == 0 and year % 100 != 0):
        last_date = last_date + 1
    return last_date


def data_distribution(df):
    start_dt = df.iloc[0]['date']
    end_dt = df.iloc[len(df)-1]['date']

    monthly_data = []
    while start_dt < end_dt or start_dt.month == end_dt.month:
        last_date = get_last_date(start_dt.year, start_dt.month)
        last_dt = datetime.strptime(
            f'{start_dt.year}:{start_dt.month}:{last_date} 23:59:59', '%Y:%m:%d %H:%M:%S')
        data = df[(df.date >= start_dt) & (
            df.date <= last_dt)][['prod_id', 'qt']]
        grp = data.groupby('prod_id', dropna=False)
        y = grp.sum()
        y['prod_id'] = y.index
        print(y)
        # y.to_csv('5.csv')
        monthly_data.append(
            [f'{start_dt.strftime("%B")}-{start_dt.year}', y.to_numpy()])
        start_dt = last_dt + timedelta(days=1)
        start_dt = datetime.strptime(
            f'{start_dt.year}:{start_dt.month}:{start_dt.day} 00:00:00', '%Y:%m:%d %H:%M:%S')



def select_from_table(connection):
    cursor = connection.cursor()
    query_select_product = "SELECT * FROM products"
    query_select_inventory = "SELECT * FROM inventory"
    query_select_product_transaction = "SELECT * FROM product_transaction"
    
    result_product = cursor.execute(query_select_product)
    result_product = result_product.fetchall()[0]
    print("result from product table: ")
    print(result_product)
    
    result_inventory = cursor.execute(query_select_inventory)
    result_inventory = result_inventory.fetchall()[0]
    print("result from inventory table: ")
    print(result_inventory)
    
    result_product_transaction = cursor.execute(query_select_product_transaction)
    result_product_transaction = result_product_transaction.fetchall()[0]
    print("result from transaction table: ")
    print(result_product_transaction)
    
    
    return connection

def check_if_available(connection, product_name):
    cursor = connection.cursor()
    # query_select_productid = "SELECT prod_id FROM products where prod_name == ?", [product_name]
    query_select_productid = "SELECT prod_id FROM products where prod_name == 'OnePlus Nord CE 5G'"
    
    prod_id_result = cursor.execute(query_select_productid)
    prod_id_result = prod_id_result.fetchall()[0][0]
    
    query_select_quatity = "SELECT quantity FROM inventory WHERE prod_id == ?", [prod_id_result]
    prod_quantity_result = cursor.execute(query_select_quatity)
    prod_quantity_result = prod_quantity_result.fetchall()[0][0]
    
    if prod_quantity_result>0 and prod_quantity_result<5:
        print('Very few left')
    elif prod_quantity_result==0:
        print('Out of stock')
    else:
        print('Currently Available')
    return connection
    
