from flask import Flask, send_file, request, jsonify
import nltk
from nltk import Tree
from stat_parser import Parser
import sys
import json

app = Flask(__name__)

@app.route("/")
def index():
    return send_file("static/index.html")

parser = Parser()

#converts an nltk Tree to a dictionary
def tree2dict(tree):
    return {tree.label(): [tree2dict(t)  if isinstance(t, Tree) else t
                        for t in tree]}

@app.route('/parsetree')
def parse_tree():
    sentence = request.args.get('sentence')
    tree = parser.parse(sentence)
    d = tree2dict(tree)
    #log to the console for testing
    json.dump(d, sys.stdout, indent=2)
    return jsonify(sentence=d)

if __name__ == '__main__':
    app.run(debug=True)
