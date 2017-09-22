from flask import Flask, redirect, render_template, request, session, abort, flash
import os
from sqlalchemy.orm import sessionmaker
from tabledef import *
engine = create_engine('sqlite:///tutorial.db', echo=True)
app=Flask(__name__)

@app.route('/')
def initialise():
	return render_template('index.html')
# def home():
#     if not session.get('logged_in'):
#         return render_template('login.html')
#     else:
#         return "Hello Boss!  <a href='/logout'>Logout</a>"

@app.route('/step1')
def index():
    return render_template('step1.html')

@app.route('/step2')
def index1():
    return render_template('step2.html')

@app.route('/edit')
def index2():
    return render_template('editor.html')

@app.route('/login')
def index3():
    return render_template('login.html')

@app.route('/signup')
def index4():
    return render_template('signup.html')

@app.route('/check', methods=['POST'])
def do_admin_login():
    POST_USERNAME = str(request.form['username'])
    POST_PASSWORD = str(request.form['password'])

    Session = sessionmaker(bind=engine)
    s = Session()
    query = s.query(User).filter(User.username.in_([POST_USERNAME]), User.password.in_([POST_PASSWORD]) )
    result = query.first()
    if result:
        session['logged_in'] = True
    else:
        flash('wrong password!')
    return initialise()

@app.route('/check1', methods=['POST'])
def do_admin_login():
    POST_USERNAME = str(request.form['username'])
    POST_PASSWORD = str(request.form['password'])

    Session = sessionmaker(bind=engine)
	session = Session()
    user = User(POST_USERNAME,POST_PASSWORD)
	session.add(user)
    session.commit()
	session.commit()
    return do_admin_login()

@app.route("/logout")
def logout():
    session['logged_in'] = False
    return initialise()


if __name__=='__main__':
	app.secret_key = os.urandom(12)
	app.run(debug = True)
