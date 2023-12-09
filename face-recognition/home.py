from deepface import DeepFace
from flask import Flask, request
from flask_cors import CORS
from PIL import Image
from io import BytesIO
from OpenSSL import SSL
import base64
import cv2
import numpy as np
import pymysql.cursors
import json
import os

host = 'host.docker.internal'
port = 3306
user = 'user'
password = 'password'
database = 'simply_online'

def buildModel():
    print("---------------------------building model---------------------------")
    print(host,port,user,password,database)
    connection = pymysql.connect(host=host, user=user, password=password, database=database, connect_timeout=100000)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT image_data,username FROM user WHERE image_data IS NOT NULL")
            results = cursor.fetchall()
            # Create a folder to store images if it doesn't exist
            output_folder = "images"
            os.makedirs(output_folder, exist_ok=True)

            existing_files = os.listdir(output_folder)
            for file in existing_files:
                file_path = os.path.join(output_folder, file)
                os.remove(file_path)
            for result in results:
                img_data = result[0]
                username = result[1]
                img_data = base64.b64decode(img_data.decode('utf-8').split(",")[1])
                image = Image.open(BytesIO(img_data))
                image.save(f"images/{username}.jpg")
    # Train the model with the fetched images
    DeepFace.find(model_name='Facenet', img_path="Ajay.jpg", db_path = "images")
    print("---------------------------Model building has completed---------------------------")

app = Flask(__name__)
CORS(app)
buildModel()
@app.route('/verify', methods=['POST'])
def verify_face():
    payloadJson = request.get_json()
    dataurl = payloadJson['data_url']
    # Decode the data URL to a binary string and convert it to a NumPy array
    img_data = base64.b64decode(dataurl.split(",")[1])
    nparr = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    test = DeepFace.find(model_name='Facenet', img_path=img, db_path = "images")
    result = []
    for item in test:
        result.append(item.to_json())
    return result
# if __name__ == '__main__':
#     # set the port number here
#     buildModel()
#     port = 5000
#     CORS(app)
#     print("yo")
#     # context = ('/etc/letsencrypt/live/simplyonline.tech/fullchain.pem', '/etc/letsencrypt/live/simplyonline.tech/privkey.pem')
#     # app.run(port=port,host='0.0.0.0', ssl_context=context)
#     app.run(port=port)