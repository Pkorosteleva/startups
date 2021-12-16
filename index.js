import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import {get as getProjection} from 'ol/proj';
import {fromLonLat} from 'ol/proj'; 
import {transform, Projection} from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import $ from 'jquery';
import {Fill, Stroke, Style, Text, Circle} from 'ol/style';
var fun = require('./functions_new.js');
import geostats from 'geostats';


var nodehost = 'http://localhost/startupsnode'
var year = 2010
var code_param = 1
var values = null
var stats = 'no'
var parameters = null
var years = null
var get_years = null
var capitals = null
var next_round = false
var serie1 = null
var breaks = null
var palette = {
  3: ["#fff7bc","#fec44f","#d95f0e"],
  4: ["#ffffd4","#fed98e","#fe9929","#cc4c02"],
  5: ["#ffffd4","#fed98e","#fe9929","#d95f0e","#993404"],
  6: ["#ffffd4","#fee391","#fec44f","#fe9929","#d95f0e","#993404"],
  7: ["#ffffd4","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#8c2d04"],
  8: ["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#8c2d04"],
  9: ["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"]
}
var pal = 'YlOrBr'
var method = 'quantile'

var colorbrewer = {YlGn: {
  3: ["#f7fcb9","#addd8e","#31a354"],
  4: ["#ffffcc","#c2e699","#78c679","#238443"],
  5: ["#ffffcc","#c2e699","#78c679","#31a354","#006837"],
  6: ["#ffffcc","#d9f0a3","#addd8e","#78c679","#31a354","#006837"],
  7: ["#ffffcc","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#005a32"],
  8: ["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#005a32"],
  9: ["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"]
  },YlGnBu: {
  3: ["#edf8b1","#7fcdbb","#2c7fb8"],
  4: ["#ffffcc","#a1dab4","#41b6c4","#225ea8"],
  5: ["#ffffcc","#a1dab4","#41b6c4","#2c7fb8","#253494"],
  6: ["#ffffcc","#c7e9b4","#7fcdbb","#41b6c4","#2c7fb8","#253494"],
  7: ["#ffffcc","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#0c2c84"],
  8: ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#0c2c84"],
  9: ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]
  },GnBu: {
  3: ["#e0f3db","#a8ddb5","#43a2ca"],
  4: ["#f0f9e8","#bae4bc","#7bccc4","#2b8cbe"],
  5: ["#f0f9e8","#bae4bc","#7bccc4","#43a2ca","#0868ac"],
  6: ["#f0f9e8","#ccebc5","#a8ddb5","#7bccc4","#43a2ca","#0868ac"],
  7: ["#f0f9e8","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#08589e"],
  8: ["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#08589e"],
  9: ["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"]
  },BuGn: {
  3: ["#e5f5f9","#99d8c9","#2ca25f"],
  4: ["#edf8fb","#b2e2e2","#66c2a4","#238b45"],
  5: ["#edf8fb","#b2e2e2","#66c2a4","#2ca25f","#006d2c"],
  6: ["#edf8fb","#ccece6","#99d8c9","#66c2a4","#2ca25f","#006d2c"],
  7: ["#edf8fb","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"],
  8: ["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"],
  9: ["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#006d2c","#00441b"]
  },PuBuGn: {
  3: ["#ece2f0","#a6bddb","#1c9099"],
  4: ["#f6eff7","#bdc9e1","#67a9cf","#02818a"],
  5: ["#f6eff7","#bdc9e1","#67a9cf","#1c9099","#016c59"],
  6: ["#f6eff7","#d0d1e6","#a6bddb","#67a9cf","#1c9099","#016c59"],
  7: ["#f6eff7","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016450"],
  8: ["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016450"],
  9: ["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016c59","#014636"]
  },PuBu: {
  3: ["#ece7f2","#a6bddb","#2b8cbe"],
  4: ["#f1eef6","#bdc9e1","#74a9cf","#0570b0"],
  5: ["#f1eef6","#bdc9e1","#74a9cf","#2b8cbe","#045a8d"],
  6: ["#f1eef6","#d0d1e6","#a6bddb","#74a9cf","#2b8cbe","#045a8d"],
  7: ["#f1eef6","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#034e7b"],
  8: ["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#034e7b"],
  9: ["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#045a8d","#023858"]
  },BuPu: {
  3: ["#e0ecf4","#9ebcda","#8856a7"],
  4: ["#edf8fb","#b3cde3","#8c96c6","#88419d"],
  5: ["#edf8fb","#b3cde3","#8c96c6","#8856a7","#810f7c"],
  6: ["#edf8fb","#bfd3e6","#9ebcda","#8c96c6","#8856a7","#810f7c"],
  7: ["#edf8fb","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#6e016b"],
  8: ["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#6e016b"],
  9: ["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c","#4d004b"]
  },RdPu: {
  3: ["#fde0dd","#fa9fb5","#c51b8a"],
  4: ["#feebe2","#fbb4b9","#f768a1","#ae017e"],
  5: ["#feebe2","#fbb4b9","#f768a1","#c51b8a","#7a0177"],
  6: ["#feebe2","#fcc5c0","#fa9fb5","#f768a1","#c51b8a","#7a0177"],
  7: ["#feebe2","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177"],
  8: ["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177"],
  9: ["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"]
  },PuRd: {
  3: ["#e7e1ef","#c994c7","#dd1c77"],
  4: ["#f1eef6","#d7b5d8","#df65b0","#ce1256"],
  5: ["#f1eef6","#d7b5d8","#df65b0","#dd1c77","#980043"],
  6: ["#f1eef6","#d4b9da","#c994c7","#df65b0","#dd1c77","#980043"],
  7: ["#f1eef6","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#91003f"],
  8: ["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#91003f"],
  9: ["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#980043","#67001f"]
  },OrRd: {
  3: ["#fee8c8","#fdbb84","#e34a33"],
  4: ["#fef0d9","#fdcc8a","#fc8d59","#d7301f"],
  5: ["#fef0d9","#fdcc8a","#fc8d59","#e34a33","#b30000"],
  6: ["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#e34a33","#b30000"],
  7: ["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#990000"],
  8: ["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#990000"],
  9: ["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"]
  },YlOrRd: {
  3: ["#ffeda0","#feb24c","#f03b20"],
  4: ["#ffffb2","#fecc5c","#fd8d3c","#e31a1c"],
  5: ["#ffffb2","#fecc5c","#fd8d3c","#f03b20","#bd0026"],
  6: ["#ffffb2","#fed976","#feb24c","#fd8d3c","#f03b20","#bd0026"],
  7: ["#ffffb2","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],
  8: ["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],
  9: ["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"]
  },YlOrBr: {
  3: ["#fff7bc","#fec44f","#d95f0e"],
  4: ["#ffffd4","#fed98e","#fe9929","#cc4c02"],
  5: ["#ffffd4","#fed98e","#fe9929","#d95f0e","#993404"],
  6: ["#ffffd4","#fee391","#fec44f","#fe9929","#d95f0e","#993404"],
  7: ["#ffffd4","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#8c2d04"],
  8: ["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#8c2d04"],
  9: ["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"]
  },Purples: {
  3: ["#efedf5","#bcbddc","#756bb1"],
  4: ["#f2f0f7","#cbc9e2","#9e9ac8","#6a51a3"],
  5: ["#f2f0f7","#cbc9e2","#9e9ac8","#756bb1","#54278f"],
  6: ["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#756bb1","#54278f"],
  7: ["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#4a1486"],
  8: ["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#4a1486"],
  9: ["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d"]
  },Blues: {
  3: ["#deebf7","#9ecae1","#3182bd"],
  4: ["#eff3ff","#bdd7e7","#6baed6","#2171b5"],
  5: ["#eff3ff","#bdd7e7","#6baed6","#3182bd","#08519c"],
  6: ["#eff3ff","#c6dbef","#9ecae1","#6baed6","#3182bd","#08519c"],
  7: ["#eff3ff","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"],
  8: ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"],
  9: ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"]
  },Greens: {
  3: ["#e5f5e0","#a1d99b","#31a354"],
  4: ["#edf8e9","#bae4b3","#74c476","#238b45"],
  5: ["#edf8e9","#bae4b3","#74c476","#31a354","#006d2c"],
  6: ["#edf8e9","#c7e9c0","#a1d99b","#74c476","#31a354","#006d2c"],
  7: ["#edf8e9","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#005a32"],
  8: ["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#005a32"],
  9: ["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"]
  },Oranges: {
  3: ["#fee6ce","#fdae6b","#e6550d"],
  4: ["#feedde","#fdbe85","#fd8d3c","#d94701"],
  5: ["#feedde","#fdbe85","#fd8d3c","#e6550d","#a63603"],
  6: ["#feedde","#fdd0a2","#fdae6b","#fd8d3c","#e6550d","#a63603"],
  7: ["#feedde","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#8c2d04"],
  8: ["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#8c2d04"],
  9: ["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704"]
  },Reds: {
  3: ["#fee0d2","#fc9272","#de2d26"],
  4: ["#fee5d9","#fcae91","#fb6a4a","#cb181d"],
  5: ["#fee5d9","#fcae91","#fb6a4a","#de2d26","#a50f15"],
  6: ["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#de2d26","#a50f15"],
  7: ["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"],
  8: ["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"],
  9: ["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"]
  },Greys: {
  3: ["#f0f0f0","#bdbdbd","#636363"],
  4: ["#f7f7f7","#cccccc","#969696","#525252"],
  5: ["#f7f7f7","#cccccc","#969696","#636363","#252525"],
  6: ["#f7f7f7","#d9d9d9","#bdbdbd","#969696","#636363","#252525"],
  7: ["#f7f7f7","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525"],
  8: ["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525"],
  9: ["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525","#000000"]
  }
}

proj4.defs('ESRI:102025', '+proj=aea +lat_1=15 +lat_2=65 +lat_0=30 +lon_0=95 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m no_defs');
register(proj4);
var AlbersProj = new Projection({
  code: 'ESRI:102025',
  units: 'm',
});
console.log(AlbersProj)

$( document ).ready(function() {
      get_param_by_year(2010);
      get_year_by_param(1);
  });

function get_param_by_year(year, stored_var){
  $.ajax({
    url: nodehost,
    type: 'POST',
    data: JSON.stringify({
      parameters: 'yes',
      year: year
    }),
    success: function(data) {
      parameters = data.rows;
      console.log('parameters:',parameters)
      let paramNode = document.getElementById("var");
      for (let i = 0; i < parameters.length; i++) {
        let element = document.createElement("option");
        element.value = parameters[i].code_param;
        element.text = parameters[i].param;
        paramNode.add(element);
        if (element.text == stored_var) {
          element.selected = "selected"
        }
      } 
      console.log('year:', year);
      // document.querySelector('#year').text = year;
    }
  });
}

function get_year_by_param(code_param, stored_year){
  $.ajax({
    url: nodehost,
    type: 'POST',
    data: JSON.stringify({
      get_years: 'yes',
      code_param: code_param
    }),
    success: function(data) {
      years = data.rows;
      console.log('years:',years)
      let yearNode = document.getElementById("year");
      for (let i = 0; i < years.length; i++) {
        let element = document.createElement("option");
        element.value = years[i].year;
        element.text = years[i].year;
        yearNode.add(element);
        if (element.text == stored_year) {
          element.selected = "selected"
        }
      }
      console.log('param:', code_param);
      // document.querySelector('#var').text = code_param;
    }
  });
}

$('#var').on("change", function(){ 
  code_param = this.value;
  var stored_year = $("#year option:selected").text();
  $("#year").empty();
  console.log('stored_year:', stored_year);
  get_year_by_param(code_param, stored_year);
  load_data(year, code_param);
  //vectorLayer.getSource().refresh(); 
});

$('#year').on("change", function(){ 
  year = this.value;
  var stored_var = $("#var option:selected").text();
  console.log('stored_var:', stored_var);
  $("#var").empty();
  get_param_by_year(year, stored_var);
  load_data(year, code_param);
  // vectorLayer.getSource().refresh(); 
});

$('#class').on("change", function(){ 
  method = this.value; 
  console.log(method);
  load_data(year, code_param);  
});
	
$('#myDropdown li').on("click", function(){ 
  pal = $("input").val(); 
  console.log(pal)
  palette = colorbrewer[pal]
  vectorLayer.getSource().changed();      
  var color_x  = palette[7];
  console.log(color_x)
  serie1.setColors(color_x);
  var content = serie1.getHtmlLegend(null, "Условные обозначения", true, null, null, 'DESC');
  jQuery('#newlegend div').empty();
  jQuery('#newlegend').append(content); 
});

var style = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.6)',
  }),
  stroke: new Stroke({
    color: '#319FD3',
    width: 1,
  }),
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: '#000',
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 3,
    }),
  }),
});

function getStandardDeviation (array) {
  const n = array.length
  const mean = array.reduce((a, b) => a + b) / n
  return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

function load_data(year, code_param) {
  $.ajax({
    url: nodehost,
    type: 'POST',
    data: JSON.stringify({
      year: year,
      code_param: code_param,
      stats: 'no'
    }),
    success: function(data) {
      values = data.rows;
      var array = [];
      for (let i = 0; i < values.length; i++) {
        var value = values[i].value;
        array.push(value);}
      console.log('values:',array);

      const removeNullUndefinedEmptyFromArray = (arrayToClean) => {
        const cleanedArray = [];
        arrayToClean.forEach((val) => {
          if(val !== null && typeof val !== "undefined" && (""+val).trim() !== ""){
            cleanedArray.push(val);
          }
        });
      
        return cleanedArray;
      }

      array = removeNullUndefinedEmptyFromArray(array);
      console.log('values:',array);
      console.log('std:', getStandardDeviation(array))
      serie1 = new geostats(array);
      next_round = false
      if (method == 'quantile') {
        breaks = serie1.getClassQuantile(7);
      } else if (method == 'equal') {
        breaks = serie1.getClassEqInterval(7);
      } else if (method == 'jenks') {
        breaks = serie1.getClassJenks(7);
      } else if (method == 'stdev') {
        breaks = serie1.getClassStdDeviation(7);
      };
      breaks = serie1.setClassManually(Jenks_Rounding(breaks, array));
      if (next_round == 3){
        serie1.setPrecision(3);
      } else if (next_round == 0) {
        serie1.setPrecision(0);
      } else if (next_round == 1) {
        serie1.setPrecision(1);
      } else if (next_round == 2) {
      serie1.setPrecision(2);
    }
      var color_x  = palette[7];
      console.log(color_x)
      serie1.setColors(color_x);
      var content = serie1.getHtmlLegend(null, "Условные обозначения", true, null, null, 'DESC');   
      jQuery('#newlegend div').empty();
      jQuery('#newlegend').append(content);
      console.log('breaks:',breaks);
      load_stats(year, code_param);
      //vectorLayer.getSource().refresh();
      console.log('changed')
    }
  })
}

function load_stats(year, code_param) {
  $.ajax({
    url: nodehost,
    type: 'POST',
    data: JSON.stringify({
      year: year,
      code_param: code_param,
      stats: 'yes'
    }),
    success: function(data) { 
      stats = data.rows;
      console.log('min',stats[0].min);
      console.log('max',stats[0].max);
      vectorLayer.getSource().changed();  
    }
  });   
}

var vectorsource = new VectorSource({
    format: new GeoJSON(),
    loader: function(extent, resolution, projection) {
        $.ajax({
            url: nodehost,
            type: 'POST',
            data: JSON.stringify({
              table:'geo'
            }),
            success: function(d) {
              console.log(d)
              var features = vectorsource.getFormat().readFeatures(d, {
                dataProjection: AlbersProj, featureProjection: AlbersProj
              });
              vectorsource.addFeatures(features);
              load_data(year,code_param);
              //map.zoomToExtent(vectorLayer.getDataExtent());
            }
        })
    }
  });

  var blanksource = new VectorSource({
    format: new GeoJSON(),
    loader: function(extent, resolution, projection) {
        $.ajax({
            url: nodehost,
            type: 'POST',
            data: JSON.stringify({
              table:'geo'
            }),
            success: function(d) {
              console.log(d)
              var features = blanksource.getFormat().readFeatures(d, {
                dataProjection: AlbersProj, featureProjection: AlbersProj
              });
              blanksource.addFeatures(features);
            }
        })
    }
  });

  var capitals_source = new VectorSource({
    format: new GeoJSON(),
    loader: function(extent, resolution, projection) {
        $.ajax({
            url: nodehost,
            type: 'POST',
            data: JSON.stringify({
              table:'geo',
              capitals:'yes'
            }),
            success: function(d) {
              console.log('capitals')
              console.log(d)
              var features = capitals_source.getFormat().readFeatures(d, {
                dataProjection: 'EPSG:4326', featureProjection: AlbersProj
              });
              capitals_source.addFeatures(features);
              //map.zoomToExtent(vectorLayer.getDataExtent());
            }
        })
    }
  });
  

  function regions_style(feature, resolution) { 
    var code = feature.get('code_region'); 
    if (values != null) {
      var rows = values.filter(function(r) {
        return r.code_region === code
      })
      var value
      if (rows[0]) {
        value = rows[0].value
      } else {
        value = null
      }

      //console.log(feature.get('region'))
      return new Style({
        fill: new Fill({
            color:  fun.select_unicolor(value, stats[0].min, stats[0].max, breaks, palette)
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 1)',
          width: 1
        })
      })
    }
    else {
      return new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.5)'
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 1)',
          width: 1
        })
      })
    }
  }  
var vectorLayer = new VectorLayer({
  source: vectorsource,
  style: regions_style,
  projection: AlbersProj
});

var blankLayer = new VectorLayer({
  source: blanksource,
  style: new Style({
    fill: new Fill({
        color: 'rgba(255, 255, 255, 1)'
    }),
    stroke: new Stroke({
      color: 'rgba(0, 0, 0, 1)',
      width: 1})
    }),
  projection: AlbersProj
});

var capitalStyle = new Style({
  image: new Circle({
    fill: new Fill({
      color: 'rgba(255,255,255,1)'
    }),
    stroke: new Stroke({
      color: '#000000',
      width: 1.25
    }),
    radius: 3
  }),
  fill: new Fill({
    color: 'rgba(255,255,255,1)'
  }),
  stroke: new Stroke({
    color: '#000000',
    width: 1.25
  }),
  text: new Text({
    offsetY: -10,
    offsetX: 10,
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: '#000',
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 3,
    }),
  }),
});


var capitalsLayer = new VectorLayer({
  source: capitals_source,
  projection: AlbersProj,
  style: function (feature) {
    capitalStyle.getText().setText(feature.get('name_rus'));
    return capitalStyle;
  },
  declutter: true,
});

var map = new Map({
  keyboardEventTarget: document,
  layers:[blankLayer, vectorLayer, capitalsLayer],
  target: 'map',
  view: new View({
    projection: AlbersProj,
    center: fromLonLat([100,65], AlbersProj),
    zoom: 4.5,
}),
});

var highlightStyle = new Style({
  stroke: new Stroke({
    color: '#3b5998',
    width: 1,
  }),
  fill: new Fill({
    color: 'rgba(102,153,204,0.1)',
  }),
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: '#000',
    }),
    stroke: new Stroke({
      color: '#3b5998',
      width: 1,
    }),
  }),
});

var featureOverlay = new VectorLayer({
  source: new VectorSource(),
  map: map,
  style: function (feature) {
    var code = feature.get('code_region'); 
    if (values != null) {
      var rows = values.filter(function(r) {
        return r.code_region === code
      })
    var value = rows[0].value;
    if (value % 1 != 0) {
      value = value.toFixed(1);
    };
    var region = feature.get('region');
    var info_string = region + ": " + value;
  }
    highlightStyle.getText().setText(info_string);
    return highlightStyle;
  },
});

var highlight;
var displayFeatureInfo = function (pixel) {
  var feature = map.forEachFeatureAtPixel(pixel, function (feature) {
    return feature;
  });

  var info = document.getElementById('info');
  if (feature) {
    var code = feature.get('code_region'); 
    if (values != null) {
      var rows = values.filter(function(r) {
        return r.code_region === code
      })
    var value = rows[0].value;
    var region = feature.get('region');
    var info_string = region + ": " + value;
    info.innerHTML = info_string;

  } else {
    info.innerHTML = '&nbsp;';
  }
}

  if (feature !== highlight) {
    if (highlight) {
      featureOverlay.getSource().removeFeature(highlight);
    }
    if (feature) {
      featureOverlay.getSource().addFeature(feature);
    }
    highlight = feature;
  }
};

map.on('pointermove', function (evt) {
  if (evt.dragging) {
    return;
  }
  var pixel = map.getEventPixel(evt.originalEvent);
  displayFeatureInfo(pixel);
});

map.on('click', function (evt) {
  displayFeatureInfo(evt.pixel);
});


function Jenks_Rounding(breaks, array) {
  var breaks_0 = breaks[0];
  var breaks_end = breaks[breaks.length - 1];
  console.log(breaks_0);
  console.log(breaks_end);
  breaks = breaks.slice(1, breaks.length - 1);
  console.log('breaks to round:', breaks);
  var range = breaks[breaks.length - 1] - breaks[1];
  var std = getStandardDeviation(array);
  var roundings_less_1 = [0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1];
  var roundings_small = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500];
  var roundings_big = [500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000];
  const getNumber = (arr, searchNum) => 
  arr.find(it => Math.abs(it - searchNum) === Math.min(...arr.map(it => Math.abs(it - searchNum))));

  function roundMultiple(num, multiple) {
    return(Math.round(num / multiple) * multiple);
  }
  var new_breaks = breaks.map((item, index) => {
    if (item > 1000) {
      var roundings = roundings_big;
      var round = getNumber(roundings, item/10);
      next_round = 0;
    } else if (item < 2) {
      var roundings = roundings_less_1;
      var round = getNumber(roundings, item/100);
    } else {
      var roundings = roundings_small;
      var round = getNumber(roundings, item/100);
    }
    if (item > 40 && (item % 50 < 5 || item %50 > 45)) { 
      round = 50;
    }
    if (item > 400 && (item % 500 < 50 || item % 500 > 450)) {
      round = 500;
    }
    if (item % 1 == 0) {
      round = 1;
    }
    if (round == 0.001 || round == 0.002 || round == 0.005){
      next_round = 3;
    } else if (round == 0.01 || round == 0.02 || round == 0.05){
      next_round = 2;
    } else if (round == 0.1 || round == 0.2 || round == 0.5){
      next_round = 1;
    } else {
      next_round = 0;
    }
    return roundMultiple(item, getNumber(roundings, round));
})
  new_breaks.splice(0, 0, breaks_0);
  new_breaks.push(breaks_end);
  console.log(new_breaks);
  return new_breaks;
}