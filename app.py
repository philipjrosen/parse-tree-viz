from flask import Flask, send_file

app = Flask(__name__)

@app.route("/")
def index():
    return send_file("client/app/index.html")

if __name__ == '__main__':
    app.run(debug=True)