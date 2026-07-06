import mysql.connector

db_config = {
    'port': 3306,
    'user': 'root',
    'password': 'B@rst00!1245',
    'host': 'localhost',
    'database': 'LostAndFound',
    'auth_plugin': 'mysql_native_password'
}

def check_users():
    conn = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        
        print("--- Checking users table ---")
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        
        if not users:
            print("  [WARNING] No users found in 'users' table.")
        else:
            print(f"  [INFO] Found {len(users)} users.")
            for user in users:
                print(f"    - id: {user['id']}, userName: {user['userName']}")

    except mysql.connector.Error as err:
        print(f"Connection error: {err}")
    finally:
        if conn and conn.is_connected():
            conn.close()

if __name__ == "__main__":
    check_users()
