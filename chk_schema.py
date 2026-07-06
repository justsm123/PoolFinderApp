import mysql.connector

db_config = {
    'port': 3306,
    'user': 'root',
    'password': 'B@rst00!1245',
    'host': 'localhost',
    'database': 'LostAndFound',
    'auth_plugin': 'mysql_native_password'
}

def check_schema():
    conn = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        
        tables = ['LostItems', 'Claims']
        
        for table in tables:
            print(f"--- Checking table: {table} ---")
            try:
                cursor.execute(f"DESCRIBE {table}")
                columns = cursor.fetchall()
                found = False
                for col in columns:
                    field = col[0]
                    type_ = col[1]
                    if field == 'itemClaimed':
                        print(f"  [FOUND] itemClaimed: {type_}")
                        found = True
                if not found:
                    print(f"  [MISSING] itemClaimed")
            except mysql.connector.Error as err:
                print(f"  Error describing table: {err}")
            print("")

    except mysql.connector.Error as err:
        print(f"Connection error: {err}")
    finally:
        if conn and conn.is_connected():
            conn.close()

if __name__ == "__main__":
    check_schema()
