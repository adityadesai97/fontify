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

from flask import make_response
from functools import update_wrapper

def nocache(f):
    def new_func(*args, **kwargs):
        resp = make_response(f(*args, **kwargs))
        resp.cache_control.no_cache = True
        return resp
    return update_wrapper(new_func, f)

@app.route('/')
@nocache
def home():
    if 'logged_in' not in session:
        session['logged_in'] = False
    return render_template('index.html')

@app.route('/image', methods=['GET', 'POST'])
@nocache
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

            new_dirpath = os.path.join(dirpath, session['username'])

            if session['username'] not in os.listdir(dirpath):
                os.mkdir(new_dirpath)

            filepath = os.path.join(new_dirpath, filename)
            file.save(filepath)

            img = cv2.imread(filepath)

            imp.split(img, new_dirpath)
            imp.font_generate(session['username'], new_dirpath)

            return redirect('step3')

    return render_template('step2.html')

@app.route('/step1')
@nocache
def index():
    if session['logged_in']:
        return render_template('step1.html')
    else:
        return redirect("/login")

@app.route('/step2')
@nocache
def index1():
    return render_template('step2.html')

@app.route('/step3')
@nocache
def index5():
    return render_template('step3.html')

@app.route('/edit')
@nocache
def index2():
    return render_template('editor.html')

@app.route('/login')
@nocache
def index3():
    return render_template('login.html')

@app.route('/signup')
@nocache
def index4():
    return render_template('signup.html')

@app.route('/about')
@nocache
def aboutus():
    return render_template('about.html')

@app.route('/journey')
@nocache
def ourjourney():
    return render_template('journey.html')

@app.route('/check', methods=['POST'])
@nocache
def do_admin_login():
    POST_USERNAME = str(request.form['username'])
    POST_PASSWORD = str(request.form['password'])

    Session = sessionmaker(bind=engine)
    s = Session()
    query = s.query(User).filter(User.username.in_([POST_USERNAME]), User.password.in_([POST_PASSWORD]) )
    result = query.first()
    if result:
        session['logged_in'] = True
        session['username'] = POST_USERNAME
    else:
        flash('wrong password!')
    return redirect('/')

@app.route('/check1', methods=['POST'])
@nocache
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
@nocache
def logout():
    session['logged_in'] = False
    return redirect('/')

@app.route('/font', methods=['GET'])
@nocache
def get_font():
    dirpath = os.path.join(app.root_path, 'users')
    new_dirpath = os.path.join(dirpath, session['username'])
    filename = '{0}.ttf'.format(session['username'])
    return send_from_directory(directory=new_dirpath, filename=filename)


@app.route('/getusername', methods=['GET'])
@nocache
def getUsername():
    return session['username']
