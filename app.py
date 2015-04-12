from flask import Flask, send_file, request, jsonify
import nltk
import json

app = Flask(__name__)

@app.route("/")
def index():
    return send_file("static/index.html")

@app.route('/parsetree')
def parse_tree():
    sentence = request.args.get('sentence')
    return jsonify(sentence=sentence)

if __name__ == '__main__':
    app.run(debug=True)
