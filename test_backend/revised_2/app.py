from flask import Flask, render_template, request, jsonify
import mysql.connector

app = Flask(__name__)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="12345!"
)

if db.is_connected():
    print("Connected to MySQL database")

cursor = db.cursor()
cursor.execute("CREATE DATABASE IF NOT EXISTS sqmo")
cursor.execute("USE sqmo")


# =====================
# PAGE ROUTES
# =====================
@app.route("/")
def landing():
    return render_template("Landing_page.html")

@app.route("/login")
def login_page():
    return render_template("Login_page.html")

@app.route("/login_sqmo")
def login_sqmo():
    return render_template("Login_SQMO.html")

@app.route("/sqmostaff_report")
def staff_report():
    return render_template("SQMOStaff_report.html")

@app.route("/report_list")
def report_list():
    return render_template("Report_Lists.html")

@app.route("/sqmostaff_land")
def sqmostaff_land():
    return render_template("SQMOStaff_land.html")


# =====================
# REST API
# =====================
@app.route("/api/links/<key>", methods=["GET"])
def get_link(key):
    cursor = db.cursor()
    cursor.execute("SELECT url FROM report_links WHERE report_key=%s", (key,))
    row = cursor.fetchone()
    cursor.close()

    if row:
        return jsonify({"url": row[0]})
    return jsonify({"error": "Not found"}), 404


@app.route("/api/links", methods=["POST"])
def save_link():
    data = request.get_json()
    key = data.get("key")
    url = data.get("url")

    cursor = db.cursor()
    cursor.execute("""
        INSERT INTO report_links (report_key, url)
        VALUES (%s, %s)
        ON DUPLICATE KEY UPDATE url=%s
    """, (key, url, url))

    db.commit()
    cursor.close()
    return jsonify({"message": "Saved"})


@app.route("/api/links/<key>", methods=["DELETE"])
def delete_link(key):
    cursor = db.cursor()
    cursor.execute("DELETE FROM report_links WHERE report_key=%s", (key,))
    db.commit()
    cursor.close()
    return jsonify({"message": "Deleted"})


if __name__ == "__main__":
    app.run(debug=True)