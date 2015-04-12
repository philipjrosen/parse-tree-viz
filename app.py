from flask import Flask, send_file, request, jsonify
import nltk
from nltk import Tree
import sys
import json

app = Flask(__name__)

@app.route("/")
def index():
    return send_file("static/index.html")

groucho_grammar = nltk.CFG.fromstring("""
    S -> NP VP
    PP -> P NP
    NP -> Det N | Det N PP | 'I'
    VP -> V NP | VP PP
    Det -> 'an' | 'my'
    N -> 'elephant' | 'pajamas'
    V -> 'shot'
    P -> 'in'
""")

sent = ['I', 'shot', 'an', 'elephant', 'in', 'my', 'pajamas']
parser = nltk.ChartParser(groucho_grammar)

trees = []

for tree in parser.parse(sent):
    trees.append(tree)

def tree2dict(tree):
    return {tree.label(): [tree2dict(t)  if isinstance(t, Tree) else t
                        for t in tree]}
result = tree2dict(trees[0])
json.dump(result, sys.stdout, indent=2)


@app.route('/parsetree')
def parse_tree():
    # sentence = request.args.get('sentence')
    return jsonify(sentence=result)

if __name__ == '__main__':
    app.run(debug=True)
