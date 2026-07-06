import mysql.connector

db_config = {
    'port': 3306,
    'user': 'root',
    'password': 'B@rst00!1245',
    'host': 'localhost',
    'database': 'LostAndFound',
    'auth_plugin': 'mysql_native_password'
}

def add_column():
    conn = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        
        print("--- Adding itemClaimed to Claims ---")
        try:
            alter_query = "ALTER TABLE Claims ADD COLUMN itemClaimed TINYINT DEFAULT 0"
            cursor.execute(alter_query)
            conn.commit()
            print("  [SUCCESS] Column added.")
        except mysql.connector.Error as err:
            print(f"  Error adding column: {err}")
            
    except mysql.connector.Error as err:
        print(f"Connection error: {err}")
    finally:
        if conn and conn.is_connected():
            conn.close()

if __name__ == "__main__":
    add_column()
