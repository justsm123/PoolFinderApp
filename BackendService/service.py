from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os
import traceback

app = Flask(__name__)
CORS(app)

db_config = {
    'port': 3306,
    'user': 'root',
    'password': 'B@rst00!1245',
    'host': 'localhost',
    'database': 'LostAndFound',
    'auth_plugin': 'mysql_native_password'
}

#Adds a found item to the database
@app.route('/add_item', methods=['POST'])
def add_item():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    #Converts the base64 string to bytes for upload to database
    item_upload_bytes = None
    item_upload_str = data.get('itemUpload')
    if item_upload_str:
        try:
            import base64
            if item_upload_str.startswith('data:image'):
                header, encoded = item_upload_str.split(",", 1)
                item_upload_bytes = base64.b64decode(encoded)
            else:
                item_upload_bytes = base64.b64decode(item_upload_str)
        except Exception as e:
            print(f"Error decoding image: {e}")
            item_upload_bytes = None
            
    connection = None
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        #insert query to MySQL database
        insert_query = """
        INSERT INTO LostItems (itemName, categoryId, itemDescription, itemLocation, 
                               dateFound, itemUpload, firstName, lastName, phoneNumber, emailAddress) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        values = (
            data.get('itemName'),
            data.get('categoryId'),
            data.get('itemDescription'),
            data.get('itemLocation'),
            data.get('dateFound'),
            item_upload_bytes, 
            data.get('firstName'),
            data.get('lastName'),
            data.get('phoneNumber'),
            data.get('emailAddress'),
        )

        # Execute the query
        cursor.execute(insert_query, values)
        connection.commit()

        # returns the number of rows afftected to React
        return jsonify({"message": "Item added successfully!", "rows_affected": cursor.rowcount}), 201

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

# Searches the lost items list
@app.route('/search_items', methods=['POST'])
def search_items():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    connection = None
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        # MySQL query to do wild card search for items in database
        select_query = """
        SELECT id, itemName, itemLocation, categoryId, dateFound 
        FROM lostItems 
        WHERE ((itemName LIKE %s OR %s = '') AND (itemLocation LIKE %s OR itemLocation = %s) 
        AND (categoryId LIKE %s OR %s = '')) 
        AND dateFound LIKE %s
        AND (itemClaimed <> 1 OR itemClaimed IS NULL)
        """

        values = (
            f"%{data.get('itemName', '')}%",
            f"%{data.get('itemName', '')}%",
            f"%{data.get('itemLocation', '')}%",
            f"%{data.get('itemLocation', '')}%",
            f"%{data.get('categoryId', '')}%",
            f"%{data.get('categoryId', '')}%",
            f"%{data.get('dateFound', '')}%",
        )

        # Execute the query
        print(f"Executing: {select_query} with {values}")
        cursor.execute(select_query, values)
        myresult = cursor.fetchall()

        # Converts the results to json and sends to React
        return jsonify(myresult), 200

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

# Verifies the admin login
@app.route('/verify_user', methods=['POST'])
def verify_user():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    connection = None
    cursor = None
    try:
        print("Attempting DB connection for /verify_user...")
        print(f"Config used: host={db_config['host']}, user={db_config['user']}, db={db_config['database']}")

        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        select_query = """
            SELECT * FROM users WHERE userName = %s AND password = %s
        """
        values = (data.get('userName'), data.get('password'))
        cursor.execute(select_query, values)
        myresult = cursor.fetchall()
        numrows = len(myresult)
        print(f"Query successful - rows returned: {numrows}")

        return jsonify({"message": "Validation Successful!", "rows_returned": numrows}), 200

    except Exception as e:
        error_msg = f"Error in /verify_user: {str(e)}\nFull traceback:\n{traceback.format_exc()}"
        print(error_msg)

        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()

# Creates a new claim for a lost item
@app.route('/claim_item', methods=['POST'])
def claim_item():
    data = request.get_json() # Parse JSON request data

    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    item_upload_bytes = None
    item_upload_str = data.get('proofImage')
    if item_upload_str:
        try:
            import base64
            if item_upload_str.startswith('data:image'):
                header, encoded = item_upload_str.split(",", 1)
                item_upload_bytes = base64.b64decode(encoded)
            else:
                item_upload_bytes = base64.b64decode(item_upload_str)
        except Exception as e:
            print(f"Error decoding image: {e}")
            item_upload_bytes = None

    connection = None
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        insert_query = """
        INSERT INTO Claims (itemId, intention, dateLastSeen, studentId, 
                               firstName, lastName, schoolEmail, itemName, itemColor, locationLost, distinctiveFeatures, proofImage) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        values = (
            data.get('itemId'),
            data.get('intention'),
            data.get('dateLastSeen'),
            data.get('studentId'),
            data.get('firstName'),
            data.get('lastName'),
            data.get('schoolEmail'),
            data.get('itemName'),
            data.get('itemColor'),
            data.get('locationLost'),
            data.get('distinctiveFeatures'),
            item_upload_bytes,
        )

        cursor.execute(insert_query, values)
        connection.commit()

        return jsonify({"message": "Item added successfully!", "rows_affected": cursor.rowcount}), 201

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

# Retrieves claim details for a specific item
@app.route('/get_claim', methods=['POST'])
def get_claim():
    data = request.get_json() # Fetch requested item data

    if not data:
        return jsonify({"error": "No data provided"}), 400


    connection = None
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        

        select_query = """
        SELECT id, itemId, itemName, studentId, firstName, lastName, schoolEmail, itemColor, locationLost, dateLastSeen,
        distinctiveFeatures, proofImage
        FROM Claims WHERE itemId = %s
        """
        values = (
            data.get('itemId'),
        )

        cursor.execute(select_query, values)
        myresult = cursor.fetchall()
        
        if not myresult:
             return jsonify([]), 200

        import base64
        for row in myresult:
            if isinstance(row['proofImage'], bytes):
                row['proofImage'] = base64.b64encode(row['proofImage']).decode('utf-8')
        
        return jsonify(myresult), 200

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

# Submits a detailed inquiry about a specific item
@app.route('/inquire_item', methods=['POST'])
def inquire_item():
    data = request.get_json() # Extract request payload

    if not data:
        return jsonify({"error": "No data provided"}), 400

    connection = None
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        insert_query = """
        INSERT INTO Inquiries (itemId, internalMarkings, itemContents, uniqueDamage, 
                               digitalDetails, hiddenFeatures) 
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        
        values = (
            data.get('itemId'),
            data.get('internalMarkings'),
            data.get('itemContents'),
            data.get('uniqueDamage'),
            data.get('digitalDetails'),
            data.get('hiddenFeatures'),
        )

        cursor.execute(insert_query, values)
        connection.commit()

        return jsonify({"message": "Item added successfully!", "rows_affected": cursor.rowcount}), 201

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if connection and connection.is_connected():
            cursor.close()
            cursor.close()
            connection.close()

# Fetches all unclaimed lost items along with their claim counts
@app.route('/get_all_items', methods=['GET'])
def get_all_items():
    connection = None # Initialize database connection
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        select_query = """
        SELECT li.id, li.claimantName, c.categoryName, li.itemName, li.dateFound, li.itemLocation, 
        li.claimantPhone, li.firstName, li.lastName, li.emailAddress,li.phoneNumber, LENGTH(li.itemUpload) as hasImage,
        (SELECT COUNT(*) FROM Claims cl WHERE cl.itemId = li.id) AS claimCount FROM LostItems li
        join Category c on c.id = li.categoryId WHERE itemClaimed <> 1 ORDER BY dateFound DESC   
        """
        
        cursor.execute(select_query)
        myresult = cursor.fetchall()

        return jsonify(myresult), 200

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

# Retrieves and serves the uploaded image for a specific item
@app.route('/get_image', methods=['GET'])
def get_image():
    item_id = request.args.get('id') # Get item ID from query params
    if not item_id:
        return jsonify({"error": "Item ID required"}), 400
    
    connection = None
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        select_query = "SELECT itemUpload FROM LostItems WHERE id = %s"
        cursor.execute(select_query, (item_id,))
        result = cursor.fetchone()

        if not result or not result['itemUpload']:
            return jsonify({"error": "Image not found"}), 404

        image_data = result['itemUpload']
        
        import io
        from flask import send_file
        import base64
        
        if isinstance(image_data, (bytes, bytearray)):
            return send_file(io.BytesIO(image_data), mimetype='image/jpeg')
            
        elif isinstance(image_data, str):
            if image_data.startswith('data:image'):
                header, encoded = image_data.split(",", 1)
            else:
                encoded = image_data
            
            try:
                decoded_img = base64.b64decode(encoded)
                return send_file(io.BytesIO(decoded_img), mimetype='image/jpeg')
            except Exception as e:
                print(f"Error decoding base64 string: {e}")
                return jsonify({"error": "Failed to decode image"}), 500
            
        return jsonify({"error": "Unknown image format"}), 500

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

# Updates an item and its associated claims as successfully claimed
@app.route('/set_item_claimed', methods=['POST'])
def set_item_claimed():
    data = request.get_json() # Extract request data
    if not data or 'itemId' not in data:
        return jsonify({"error": "Item ID required"}), 400

    connection = None
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        update_lost_items = "UPDATE LostItems SET itemClaimed = 1 WHERE id = %s"
        cursor.execute(update_lost_items, (data['itemId'],))
        
        update_claims = "UPDATE Claims SET itemClaimed = 1 WHERE itemId = %s"
        cursor.execute(update_claims, (data['itemId'],))
        
        connection.commit()

        return jsonify({"message": "Item claimed status updated successfully"}), 200

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

# Deletes a specific lost item from the database
@app.route('/delete_item', methods=['POST'])
def delete_item():
    data = request.get_json() # Read JSON strictly
    if not data or 'id' not in data:
        return jsonify({"error": "Item ID required"}), 400

    connection = None
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        delete_query = "DELETE FROM lostItems WHERE id = %s"
        cursor.execute(delete_query, (data['id'],))
        connection.commit()

        if cursor.rowcount > 0:
            return jsonify({"message": "Item deleted successfully"}), 200
        else:
            return jsonify({"error": "Item not found"}), 404

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

# Removes a specific claim request from the database
@app.route('/delete_claim', methods=['POST'])
def delete_claim():
    data = request.get_json() # Retrieve payload
    if not data or 'id' not in data:
        return jsonify({"error": "Claim ID required"}), 400

    connection = None
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        delete_query = "DELETE FROM Claims WHERE id = %s"
        cursor.execute(delete_query, (data['id'],))
        connection.commit()

        if cursor.rowcount > 0:
            return jsonify({"message": "Claim deleted successfully"}), 200
        else:
            return jsonify({"error": "Claim not found"}), 404

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()



if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(debug=True, host='0.0.0.0', port=port)
