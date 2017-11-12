import flask

public_views = flask.Blueprint('public_views', __name__)

@public_views.route('/')
def home():
    return flask.render_template('index.html')
