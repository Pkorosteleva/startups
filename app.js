const http = require('http');
var url = require('url');
const { Client } = require('pg');
var dbgeo = require('dbgeo');

const hostname = 'localhost';
const port = 4999; 


const server = http.createServer((req, res) => {
    
    var query = 'SELECT * FROM regions_gen'
    let reqdata = []
    req.on('data', chunk => {
      reqdata.push(chunk);
    });
  
    req.on('end', () => {

      console.log('start')

      var data = JSON.parse(reqdata)
      var table = data.table
      var stats = data.stats
      var parameters = data.parameters
      var capitals = data.capitals
      var get_years = data.get_years

      const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'startups',
        password: 'moons25',
        port: 5432,
      })
  
      client.connect();

      console.log(table)
      console.log('capitals',capitals)
      if (table != 'geo'){
        var year = data.year
        var code_param = data.code_param
        console.log(stats)
        console.log(get_years)
        if (stats == 'yes'){
          query = `select * from get_stats(${year}, ${code_param})`
      } else if (parameters == 'yes') {
          query = `select * from get_param_by_year(${year})`
      } else if (get_years == 'yes') {
            query = `select * from get_year_by_param(${code_param})`
      } else {
          query = `select * from get_param(${year}, ${code_param})`
        } 
      }
      else if (capitals == 'yes') {
        query = `select * from capitals`
      }
      console.log(query)
        
      client.query(query, (err, data) => {
        if (err) {
          return console.error('error happened during data query', err);
        } else if (table != 'geo') {
            client.end();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data))
       } else {
          dbgeo.parse(data.rows, { outputFormat: 'geojson', geometryColumn: 'geom' }, function(err, geojson) {
            client.end();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(geojson));
          });
        }
      });
    });
  });
  
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });