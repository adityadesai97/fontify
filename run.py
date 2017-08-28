from flask import Flask, render_template
app=Flask(__name__)

@app.route('/')
def initialise():
	return render_template('index.html')

@app.route('/step1')
def index():
    return render_template('step1.html')

if __name__=='__main__':
	app.run(debug = True)
