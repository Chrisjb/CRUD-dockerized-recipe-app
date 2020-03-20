var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    app = express();


// https://node-postgres.com/features/pooling
// https://node-postgres.com/features/connecting


const { Pool } = require('pg');
// only execute pool once when we start the server
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'recipedb',
  port: 5432
});

pool.query("CREATE TABLE IF NOT EXISTS recipes (id SERIAL PRIMARY KEY, name VARCHAR(225), ingredients VARCHAR(225), directions VARCHAR(225))",
(err, res) => {
  console.log(err, res);
});

// assign dust engine to .dust files
app.engine('dust', cons.dust);

// set default ext .dust
app.set('view engine', 'dust')
app.set('views', __dirname + '/views')

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async function(req, res){
    // pool query
    const { rows } = await pool.query('SELECT * FROM recipes');
    
    res.render('index', {recipes: rows});
    
})

app.post('/add', async function(req, res){
    // pool query
    try{
        const res = await pool.query('INSERT INTO recipes (name, ingredients, directions) VALUES ($1, $2, $3)',
        [req.body.name, req.body.ingredients, req.body.directions]);
    } catch (err) {
        console.log(err.stack);
    }
    
    res.redirect('/');
    
});

app.delete('/delete/:id', async (req,res) =>{
    try{
        const res = await pool.query('DELETE FROM recipes WHERE id = $1',
        [req.params.id]);
    } catch (err) {
        console.log(err.stack);
    }
    
    res.sendStatus(200);
});

app.post('/edit', async (req,res) =>{
    try{
        const res = await pool.query('UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE id = $4',
        [req.body.name, req.body.ingredients, req.body.directions, req.body.id]);
        // NB we make use of the hidden id field in html to get id
    } catch (err) {
        console.log(err.stack);
    }
    
    res.redirect('/');
});

// server
app.listen(5000, function(){
    console.log('server started on port 5000')
});