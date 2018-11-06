var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZG42QGdjbG91ZC51YS5lcyIsImp0aSI6IjU1NzYwMzJiLWI1NzctNDg5Ny04ZDFiLTIyZWU1OGIwZWNhNiIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNTM3MzUyNzU1LCJ1c2VySWQiOiI1NTc2MDMyYi1iNTc3LTQ4OTctOGQxYi0yMmVlNThiMGVjYTYiLCJyb2xlIjoiIn0.Y4ENJfQUnpaZVQNPyMl41mplUcjbpeLbp0X4SxcW6xs';

//FUNCION TABLA MUNICIPIOS
function tabla_municipios() {

    var datos;
    var datosfiltrados = [];
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/municipios",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }

        $.ajax(settings).done(function (response) {
            var j = 0;

            //Parseo a objeto para filtrar y meter en datatable
            datos = JSON.parse(response);
            //Filtro los municipios que tengan mas de 50k hab
            datos.forEach(function (entry) {
                if (entry.num_hab > 50000) {
                    datosfiltrados[j] = entry;
                    j = j + 1;
                }
            });
            tabla = $('#dataGrid1').DataTable({
                responsive: true,
                "data": datosfiltrados,
                "columns": [
                    {
                        "data": "nombre"
                    },
                    {

                        "data": "latitud"
                    },
                    {

                        "data": "longitud"
                    },
                    {

                        "data": "num_hab"
                    }

                ]
            });
        });
    }

//FUNCION TABLA ESTACIONES
function tabla_estaciones() {

        var datos;
	    var datosfiltrados = [];
		var settings = {
            "async": true,
			"crossDomain": true,
            "url": "https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones?api_key=" + key,
			"method": "GET",
			"headers": {
            "cache-control": "no-cache"
			}
		}

            $.ajax(settings).done(function (response) {

                var settings2 = {
                    "async": true,
                    "crossDomain": true,
                    "responsive": true,
                    "url": response.datos,
                    "method": "GET",
                    "headers": {
                        "cache-control": "no-cache"
                    }
                }

                $.ajax(settings2).done(function (response2) {
                    var j = 0;
                    //Parseo a objeto para filtrar y meter en datatable
                    datos = JSON.parse(response2);
                    datos.forEach(function (entry) {
                        datosfiltrados[j] = entry;
                        j = j + 1;
                    });

                    tabla = $('#dataGrid2').DataTable({
                        responsive: true,
                        "data": datosfiltrados,
                        "columns": [
                            {
                                 "data": "nombre", render: function (data, type, row) {
                                    return ' <a href="#popup2" onclick="GetMap2(this.textContent);" class="ui-btn ui-shadow ui-corner-all">'+ data + '</a>'
                             }

                            },
                            {

                                "data": "latitud"
                            },
                            {

                                "data": "longitud"
                            },
                            {

                                "data": "indicativo"
                            }

                        ]
                    });
                })
            })
        }

//FUNCIONES DERIVADAS DEL MAPA
function GetMap() {
    var map = new Microsoft.Maps.Map('#myMap', {
        credentials: 'Alzk2MkaIFo0VKh4f1DVwBeWaWo70iXtYSZ3k6ErbzMZwEuT8UBcyEY_gR_LJ0xX'
    });

    //Create an infobox at the center of the map but don't show it.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

     //Assign the infobox to a map instance.
    infobox.setMap(map);

    //peticion de las coordenadas de las estaciones
    var datos;
    var datosfiltrados = [];
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZG42QGdjbG91ZC51YS5lcyIsImp0aSI6IjU1NzYwMzJiLWI1NzctNDg5Ny04ZDFiLTIyZWU1OGIwZWNhNiIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNTM3MzUyNzU1LCJ1c2VySWQiOiI1NTc2MDMyYi1iNTc3LTQ4OTctOGQxYi0yMmVlNThiMGVjYTYiLCJyb2xlIjoiIn0.Y4ENJfQUnpaZVQNPyMl41mplUcjbpeLbp0X4SxcW6xs",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        var settings2 = {
            "async": true,
            "crossDomain": true,
            "responsive": true,
            "url": response.datos,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings2).done(function (response2) {
            var j = 0;
            //Parseo a objeto para filtrar y meter en datatable
            datos = JSON.parse(response2);
            datos.forEach(function (entry) {
                datosfiltrados[j] = entry;

                /*Nos guardamos la lat y la long que nos devuelve la peticion.
                *Llamamos al metodo obtener_coordenadas 
                *para darles el formato que acepta la api de bing maps
                */

                var latitud = datosfiltrados[j].latitud;
                latdeg = latitud.substring(0, 2);
                latmin = latitud.substring(2, 4);
                latsec = latitud.substring(4, 6);
                latdir = latitud.substring(6, 7);
                latitud = obtener_coordenadas(latdeg, latmin, latsec, latdir);


                var longitud = datosfiltrados[j].longitud;
                londeg = longitud.substring(0, 2);
                lonmin = longitud.substring(2, 4);
                lonsec = longitud.substring(4, 6);
                londir = longitud.substring(6, 7);
                longitud = obtener_coordenadas(londeg, lonmin, lonsec, londir);

                //definimos loc con la latitud y long ya formateadas
                var loc = new Microsoft.Maps.Location(latitud, longitud);
                //Add a pushpin at locations.
                var pin = new Microsoft.Maps.Pushpin(loc);

                //Store some metadata with the pushpin.
                pin.metadata = {
                    title: datosfiltrados[j].nombre,
                    showCloseButton: false,
                    description: 'Altitud: ' + datosfiltrados[j].altitud + ' metros.'
                };

                //Add a click event handler to the pushpin.
                Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

                map.entities.push(pin);
                j = j + 1;
              
            });
        })
    });
}

function obtener_coordenadas(grados, minutos, segundos, direccion) {
        var dd = Number(grados) + Number(minutos) / 60 + Number(segundos) / (60 * 60);

        if (direccion == "W" || direccion == "S") {
            dd = dd * -1;
        } 
        return dd;
}

function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

//FUNCIONES DERIVADAS DE LAS OBESERVACIONES
function form_observaciones() {
    $.ajax({

        url: "https://opendata.aemet.es/opendata/api/observacion/convencional/datos/estacion/" + document.getElementById("idema").value + "?api_key=" + key,
        type: 'GET',
        success: function (response) {
            var settings4 = {
                "async": true,
                "crossDomain": true,
                "url": response.datos,
                "method": "GET",
                "headers": {
                    "cache-control": "no-cache"
                }
            }

            $.ajax(settings4).done(function (response2) {
                datos = JSON.parse(response2);
                tabla = $('#dataGrid3').DataTable({
                    responsive: true,
                    "data": datos,
                    "columns": [
                        {
                            "data": "idema"
                        },
                        {
                            "data": "ubi"
                        },
                        {
                            "data": "fint"
                        },
                        {
                            "data": "ta"
                        }
                    ]
                });
            });
        },
        error: function (jqXHR, textStatus, error) {
            var response = JSON.parse(jqXHR.responseText);
            var settings4 = {
                "async": true,
                "crossDomain": true,
                "url": response.datos,
                "method": "GET",
                "headers": {
                    "cache-control": "no-cache"
                }
            }

            $.ajax(settings4).done(function (response2) {
                datos = JSON.parse(response2);
                tabla = $('#dataGrid3').DataTable({
                    responsive: true,
                    "data": datos,
                    "columns": [
                        {
                            "data": "idema"
                        },
                        {
                            "data": "ubi"
                        },
                        {
                            "data": "fint"
                        },
                        {
                            "data": "ta"
                        }
                    ]
                });
            });
        }
    });
}

function borrarDT(x) {
    var table = $('#dataGrid' + x).DataTable();
    table.destroy();
}


//MAPA TABLA ESTACIONES
function GetMap2(nom) {
    var map = new Microsoft.Maps.Map('#myMap2', {
        credentials: 'Alzk2MkaIFo0VKh4f1DVwBeWaWo70iXtYSZ3k6ErbzMZwEuT8UBcyEY_gR_LJ0xX'
    });

    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    infobox.setMap(map);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones?api_key=" + key,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        var settingsX = {
            "async": true,
            "crossDomain": true,
            "url": response.datos,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settingsX).done(function (response2) {
            var datoFiltrado;
            datos = JSON.parse(response2);
            datos.forEach(function (entry) {
                if (entry.nombre.localeCompare(nom) == 0) {
                    datoFiltrado = entry;

                    var latitud = datoFiltrado.latitud;
                    latdeg = latitud.substring(0, 2);
                    latmin = latitud.substring(2, 4);
                    latsec = latitud.substring(4, 6);
                    latdir = latitud.substring(6, 7);
                    latitud = obtener_coordenadas(latdeg, latmin, latsec, latdir);

                    var longitud = datoFiltrado.longitud;
                    londeg = longitud.substring(0, 2);
                    lonmin = longitud.substring(2, 4);
                    lonsec = longitud.substring(4, 6);
                    londir = longitud.substring(6, 7);
                    longitud = obtener_coordenadas(londeg, lonmin, lonsec, londir);

                    //definimos loc con la latitud y long ya formateadas
                    var loc = new Microsoft.Maps.Location(latitud, longitud);

                    //Centramos el mapa en el pin
                    map.setView({
                        center: new Microsoft.Maps.Location(latitud, longitud),
                        zoom: 12
                    });

                    var pushpin = new Microsoft.Maps.Pushpin(loc, {
                        icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
                        anchor: new Microsoft.Maps.Point(12, 39)
                    });

                    pushpin.metadata = {
                        title: datoFiltrado.nombre,
                        showCloseButton: true,
                        description: 'Provincia: ' + datoFiltrado.provincia
                    };

                    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);

                    map.entities.push(pushpin);
                }
            });
        });
    });
}