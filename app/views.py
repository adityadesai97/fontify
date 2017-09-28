from __future__ import print_function
import cv2
import os
import sys

from app import app
from flask import render_template, redirect, flash, request, send_from_directory, session, abort
from werkzeug.utils import secure_filename
from sqlalchemy.orm import sessionmaker

from fontify import image_process as imp
from tabledef import *

@app.route('/')
def home():
    if 'logged_in' not in session:
        session['logged_in'] = False
    return render_template('index.html')

@app.route('/image', methods=['GET', 'POST'])
def submit_image():
    print(request.method, file=sys.stdout)
    if request.method == 'POST':

        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']

        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)

        if file:
            filename = secure_filename(file.filename)
            dirpath = os.path.join(app.root_path, 'users')
            filepath = os.path.join(dirpath, filename)
            file.save(filepath)

            img = cv2.imread(filepath)

            imp.split(img, dirpath)
            imp.font_generate('user.ttf', dirpath)

            return redirect('step3')

    return render_template('step2.html')

@app.route('/step1')
def index():
    if session['logged_in']:
        return render_template('step1.html')
    else:
        return redirect("/login")

@app.route('/step2')
def index1():
    return render_template('step2.html')

@app.route('/step3')
def index5():
    return render_template('step3.html')

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
    global POST_USERNAME
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
    return redirect('/')

@app.route('/check1', methods=['POST'])
def do_admin_signup():
    POST_USERNAME = str(request.form['username'])
    POST_PASSWORD = str(request.form['password'])

    Session = sessionmaker(bind=engine)
    session = Session()
    user = User(POST_USERNAME,POST_PASSWORD)
    session.add(user)
    session.commit()
    return redirect('/login')

@app.route("/logout")
def logout():
    session['logged_in'] = False
    return redirect('/')

@app.route('/font', methods=['GET'])
def get_font():
    dirpath = os.path.join(app.root_path, 'users')
    filename = '{0}.ttf'.format(POST_USERNAME)
    return send_from_directory(directory=dirpath, filename=filename)


@app.route('/getusername', methods=['GET'])
def getUsername():
    return POST_USERNAME
