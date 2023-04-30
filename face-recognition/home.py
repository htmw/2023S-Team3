from deepface import DeepFace
from flask import Flask, request
from flask_cors import CORS
import base64
import cv2
import numpy as np
import json
def buildModel():
    print("---------------------------building model---------------------------")
    DeepFace.find(model_name='Facenet', img_path="Ajay.jpg", db_path = "images")
    print("---------------------------Model building has completed---------------------------")

app = Flask(__name__)
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
if __name__ == '__main__':
    # set the port number here
    buildModel()
    port = 5000
    CORS(app)
    app.run(port=port)