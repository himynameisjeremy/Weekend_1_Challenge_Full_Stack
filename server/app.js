var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

var connectionString;

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/employeeData';
}

pg.connect(connectionString, function(err, client, done){
  if (err) {
    console.log('Error connecting to DB!', err);
    //TODO end process with error code
  } else {
    var query = client.query('CREATE TABLE IF NOT EXISTS employee_data (' +
    'id SERIAL PRIMARY KEY,' +
    'name varchar(80) NOT NULL,' +
    'id_number varchar(20) NOT NULL,' +
    'job_title varchar(80) NOT NULL,' +
    'yearly_salary int NOT NULL,' +
    'status text);'
  );

  query.on('end', function(){
    console.log('Successfully ensured schema exists');
    done();
  });

  query.on('error', function() {
    console.log('Error creating schema!');
    //TODO exit(1)
    done();
  });
}
});

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/store', function(req, res) {
  console.log('body: ', req.body);
  var name = req.body.name;
  var id_number = req.body.id_number;
  var job_title = req.body.job_title;
  var yearly_salary = req.body.yearly_salary;
  var status = req.body.yearly_salary;

  pg.connect(connectionString, function(err, client, done){
  if (err) {
    done();
    console.log('Error connecting to DB: ', err);
    res.status(500).send(err);
  } else {
    var result = [];

    var query = client.query('INSERT INTO employee_data (name, id_number, job_title, yearly_salary, status) VALUES ($1, $2, $3, $4, $5) ' +
    'RETURNING id, name, id_number, job_title, yearly_salary, status', [name, id_number, job_title, yearly_salary, status]);

    query.on('row', function(row){
      result.push(row);
    });

    query.on('end', function() {
      done();
      res.send(result);
    });

    query.on('error', function(error) {
      console.log('Error running query:', error);
      done();
      res.status(500).send(error);
    });
  }
});
});

app.get('/store', function(req, res){
  // connect to DB
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      done();
      console.log('Error connecting to DB: ', err);
      res.status(500).send(err);
    } else {
      var result = [];
      var query = client.query('SELECT * FROM employee_data;');

      query.on('row', function(row){
        result.push(row);
      });

      query.on('end', function() {
        done();
        res.send(result);
      });

      query.on('error', function(error) {
        console.log('Error running query:', error);
        done();
        res.status(500).send(error);
      });
    }
  });
});

app.delete('/store', function(req, res) {
  console.log('body: ', req.body);
  var id = req.body.id;


  pg.connect(connectionString, function(err, client, done){
    if (err) {
      done();
      console.log('Error connecting to DB: ', err);
      res.status(500).send(err);
    } else {
      var result = [];

      var query = client.query('DELETE FROM employee_data WHERE id =($1)', [id]);

      query.on('row', function(row){
        result.push(row);
      });

      query.on('end', function() {
        done();
        res.send(result);
      });

      query.on('error', function(error) {
        console.log('Error running query:', error);
        done();
        res.status(500).send(error);
      });
    }
  });
});


app.get('/*', function(req, res){
  var filename = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, '/public/', filename)); // ..../server/public/filename
});

app.listen(port, function(){
  console.log('Listening for requests on port', port);
});
