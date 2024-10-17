from flask import Flask, jsonify, request
from flask_cors import CORS
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

notifications = []

@app.route('/notificacoes', methods=['GET'])
def get_notifications():
    return jsonify(notifications)

@app.route('/notificacoes', methods=['POST'])
def create_notification():
    data = request.json

    if not data.get('valor') or not data.get('tipo'):
        return jsonify({"error": "Valor e tipo são obrigatórios"}), 400

    notification = {
        'id': len(notifications) + 1,
        'valor': data.get('valor'),
        'data': datetime.now().strftime('%Y-%m-%d'),
        'hora': datetime.now().strftime('%H:%M:%S'),
        'tipo': data.get('tipo'),
    }

    if data.get('tipo') == 'enviada' and data.get('destinatario'):
        notification['destinatario'] = data.get('destinatario')

    notifications.append(notification)
    return jsonify(notification), 201

if __name__ == '__main__':
    app.run(debug=True)
