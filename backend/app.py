from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Backend Running Successfully"

@app.route('/translate', methods=['POST'])
def translate():

    data = request.json

    text = data.get('text')
    target_language = data.get('target')

    print("Received Text:", text)
    print("Target Language:", target_language)

    return jsonify({
        "translated_text": f"Translated ({target_language}): {text}"
    })

if __name__ == '__main__':
    app.run(debug=True)