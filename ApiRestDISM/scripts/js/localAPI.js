var express = require("express");
	var mysql = require('mysql');
	var app = express();
	var bp = require('body-parser');
	const cors = require('cors');
	app.use(cors());
	app.options('*', cors());
	app.use(bp.json());

	var connection = mysql.createConnection({
		 host : 'localhost',
		 user : 'root',
		 password : 'root',
		 database : 'dism',
		 port : '3311'

	});

	//Ejemplo: GET http://localhost:8080/estaciones
	app.get('/estaciones', function(req, resp) {
		connection.query('select * from estaciones', function(err, rows) {
			if (err) {
				console.log('Error en /estaciones '+err);
				resp.status(500);
				resp.send({message: "Error al obtener las estaciones"});
			}

				else {
					console.log('/estaciones');
					resp.status(200);
					resp.send(rows);
				}
		})
	});

	//Ejemplo: GET http://localhost:8080/observacion
	app.get('/observacion', function(req, resp) {
		connection.query('select * from observacion', function(err, rows) {
			if (err) {
				console.log('Error en /observacion '+err);
				resp.status(500);
				resp.send({message: "Error al obtener la observacion"});
			}

				else {
					console.log('/observacion');
					resp.status(200);
					resp.send(rows);
				}
		})
	});

	//Ejemplo: GET http://localhost:8080/municipios
	app.get('/municipios', function(req, resp) {
		connection.query('select * from municipios', function(err, rows) {
			if (err) {
				console.log('Error en /municipios '+err);
				resp.status(500);
				resp.send({message: "Error al obtener los municipios"});
			}

				else {
					console.log('/municipios');
					resp.status(200);
					resp.send(rows);
				}
		})
	});


	var server = app.listen(8080, function () {
	 console.log('Servidor iniciado en puerto 8080…');
	});
