from flask import Flask, request, render_template
app = Flask(__name__)


@app.route('/')
def index():
    row_number_options = range(1, 9)
    column_number_options = range(2, 9, 2)

    default_row_number = 4

    return render_template('game-data-form.html',
                           row_number_options=row_number_options,
                           column_number_options=column_number_options,
                           default_row_number=default_row_number)


@app.route('/memory-game')
def memory_game():
    row_number = request.args.get('row-number')
    column_number = request.args.get('column-number')

    return render_template('memory-game.html',
                           row_number=row_number,
                           column_number=column_number)

if __name__ == '__main__':
    app.run(debug=True)