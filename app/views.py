import cv2
import os

from app import app
from flask import render_template, redirect, flash, request, send_from_directory
from werkzeug.utils import secure_filename

from fontify import image_process as imp

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/image', methods=['GET', 'POST'])
def submit_image():
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

            return render_template('download_page.html')
    
    return render_template('upload_page.html')

@app.route('/font', methods=['GET'])
def get_font():
    dirpath = os.path.join(app.root_path, 'users')
    filename = 'user.ttf'

    return send_from_directory(directory=dirpath, filename=filename)





