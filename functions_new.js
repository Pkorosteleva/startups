const convert = require('color-convert');
var Blues = {
  3: ["#deebf7","#9ecae1","#3182bd"],
  4: ["#eff3ff","#bdd7e7","#6baed6","#2171b5"],
  5: ["#eff3ff","#bdd7e7","#6baed6","#3182bd","#08519c"],
  6: ["#eff3ff","#c6dbef","#9ecae1","#6baed6","#3182bd","#08519c"],
  7: ["#eff3ff","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"],
  8: ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"],
  9: ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"]
  }

var YlGn = {
  3: ["#f7fcb9","#addd8e","#31a354"],
  4: ["#ffffcc","#c2e699","#78c679","#238443"],
  5: ["#ffffcc","#c2e699","#78c679","#31a354","#006837"],
  6: ["#ffffcc","#d9f0a3","#addd8e","#78c679","#31a354","#006837"],
  7: ["#ffffcc","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#005a32"],
  8: ["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#005a32"],
  9: ["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"]
  }

var YlOrBr = {
  3: ["#fff7bc","#fec44f","#d95f0e"],
  4: ["#ffffd4","#fed98e","#fe9929","#cc4c02"],
  5: ["#ffffd4","#fed98e","#fe9929","#d95f0e","#993404"],
  6: ["#ffffd4","#fee391","#fec44f","#fe9929","#d95f0e","#993404"],
  7: ["#ffffd4","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#8c2d04"],
  8: ["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#8c2d04"],
  9: ["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"]
}

// var RdPuBu = {
//   3: ["#710060","#5A0092","#91bfdb"],
//   4: ["#710060","#650079","#5A0092","#2c7bb6"],
//   5: ["#710060","#650079","#5A0092","#451B93","#2c7bb6"],
//   6: ["#710060","#650079","#5A0092","#4C1293","#3E2494","#4575b4"],
//   7: ["#710060","#690070","#610081","#5A0092","#4C1293","#3E2494","#4575b4"],
//   8: ["#710060","#690070","#610081","#5A0092","#4F0D92","#451B93","#3B2894","#4575b4"],
//   9: ["#710060","#6B006C","#650079","5F0085","#5A0092","#4F0D92","#451B93","#3B2894","#4575b4"],
//   10: ["#710060","#6B006C","#650079","#5F0085","#5A0092","#510A92","#491593","#412093","#392B94","#313695"],
//   11: ["#710060","#510A92","#491593","#412093","#392B94","#5A0092","#510A92","#491593","#412093","#392B94","#313695"]
// }
  
var YlGnBu =  {
  3: ["#edf8b1","#7fcdbb","#2c7fb8"],
  4: ["#ffffcc","#a1dab4","#41b6c4","#225ea8"],
  5: ["#ffffcc","#a1dab4","#41b6c4","#2c7fb8","#253494"],
  6: ["#ffffcc","#c7e9b4","#7fcdbb","#41b6c4","#2c7fb8","#253494"],
  7: ["#ffffcc","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#0c2c84"],
  8: ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#0c2c84"],
  9: ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]
  }
  
var GnBu = {
  3: ["#e0f3db","#a8ddb5","#43a2ca"],
  4: ["#f0f9e8","#bae4bc","#7bccc4","#2b8cbe"],
  5: ["#f0f9e8","#bae4bc","#7bccc4","#43a2ca","#0868ac"],
  6: ["#f0f9e8","#ccebc5","#a8ddb5","#7bccc4","#43a2ca","#0868ac"],
  7: ["#f0f9e8","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#08589e"],
  8: ["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#08589e"],
  9: ["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"]
  }
var BuGn = {
  3: ["#e5f5f9","#99d8c9","#2ca25f"],
  4: ["#edf8fb","#b2e2e2","#66c2a4","#238b45"],
  5: ["#edf8fb","#b2e2e2","#66c2a4","#2ca25f","#006d2c"],
  6: ["#edf8fb","#ccece6","#99d8c9","#66c2a4","#2ca25f","#006d2c"],
  7: ["#edf8fb","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"],
  8: ["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"],
  9: ["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#006d2c","#00441b"]
  }
  
var PuBuGn = {
  3: ["#ece2f0","#a6bddb","#1c9099"],
  4: ["#f6eff7","#bdc9e1","#67a9cf","#02818a"],
  5: ["#f6eff7","#bdc9e1","#67a9cf","#1c9099","#016c59"],
  6: ["#f6eff7","#d0d1e6","#a6bddb","#67a9cf","#1c9099","#016c59"],
  7: ["#f6eff7","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016450"],
  8: ["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016450"],
  9: ["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016c59","#014636"]
  }
  
var PuBu = {
  3: ["#ece7f2","#a6bddb","#2b8cbe"],
  4: ["#f1eef6","#bdc9e1","#74a9cf","#0570b0"],
  5: ["#f1eef6","#bdc9e1","#74a9cf","#2b8cbe","#045a8d"],
  6: ["#f1eef6","#d0d1e6","#a6bddb","#74a9cf","#2b8cbe","#045a8d"],
  7: ["#f1eef6","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#034e7b"],
  8: ["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#034e7b"],
  9: ["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#045a8d","#023858"]
  }
  
var BuPu = {
  3: ["#e0ecf4","#9ebcda","#8856a7"],
  4: ["#edf8fb","#b3cde3","#8c96c6","#88419d"],
  5: ["#edf8fb","#b3cde3","#8c96c6","#8856a7","#810f7c"],
  6: ["#edf8fb","#bfd3e6","#9ebcda","#8c96c6","#8856a7","#810f7c"],
  7: ["#edf8fb","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#6e016b"],
  8: ["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#6e016b"],
  9: ["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c","#4d004b"]
  }
  
var RdPu = {
  3: ["#fde0dd","#fa9fb5","#c51b8a"],
  4: ["#feebe2","#fbb4b9","#f768a1","#ae017e"],
  5: ["#feebe2","#fbb4b9","#f768a1","#c51b8a","#7a0177"],
  6: ["#feebe2","#fcc5c0","#fa9fb5","#f768a1","#c51b8a","#7a0177"],
  7: ["#feebe2","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177"],
  8: ["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177"],
  9: ["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"]
  }
  
var PuRd =  {
  3: ["#e7e1ef","#c994c7","#dd1c77"],
  4: ["#f1eef6","#d7b5d8","#df65b0","#ce1256"],
  5: ["#f1eef6","#d7b5d8","#df65b0","#dd1c77","#980043"],
  6: ["#f1eef6","#d4b9da","#c994c7","#df65b0","#dd1c77","#980043"],
  7: ["#f1eef6","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#91003f"],
  8: ["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#91003f"],
  9: ["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#980043","#67001f"]
  }

var  OrRd = {
  3: ["#fee8c8","#fdbb84","#e34a33"],
  4: ["#fef0d9","#fdcc8a","#fc8d59","#d7301f"],
  5: ["#fef0d9","#fdcc8a","#fc8d59","#e34a33","#b30000"],
  6: ["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#e34a33","#b30000"],
  7: ["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#990000"],
  8: ["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#990000"],
  9: ["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"]
  }
  
var YlOrRd = {
  3: ["#ffeda0","#feb24c","#f03b20"],
  4: ["#ffffb2","#fecc5c","#fd8d3c","#e31a1c"],
  5: ["#ffffb2","#fecc5c","#fd8d3c","#f03b20","#bd0026"],
  6: ["#ffffb2","#fed976","#feb24c","#fd8d3c","#f03b20","#bd0026"],
  7: ["#ffffb2","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],
  8: ["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],
  9: ["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"]
  }

var  Purples = {
  3: ["#efedf5","#bcbddc","#756bb1"],
  4: ["#f2f0f7","#cbc9e2","#9e9ac8","#6a51a3"],
  5: ["#f2f0f7","#cbc9e2","#9e9ac8","#756bb1","#54278f"],
  6: ["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#756bb1","#54278f"],
  7: ["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#4a1486"],
  8: ["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#4a1486"],
  9: ["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d"]
  }
  
var Greens = {
  3: ["#e5f5e0","#a1d99b","#31a354"],
  4: ["#edf8e9","#bae4b3","#74c476","#238b45"],
  5: ["#edf8e9","#bae4b3","#74c476","#31a354","#006d2c"],
  6: ["#edf8e9","#c7e9c0","#a1d99b","#74c476","#31a354","#006d2c"],
  7: ["#edf8e9","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#005a32"],
  8: ["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#005a32"],
  9: ["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"]
  }
  
var Oranges = {
  3: ["#fee6ce","#fdae6b","#e6550d"],
  4: ["#feedde","#fdbe85","#fd8d3c","#d94701"],
  5: ["#feedde","#fdbe85","#fd8d3c","#e6550d","#a63603"],
  6: ["#feedde","#fdd0a2","#fdae6b","#fd8d3c","#e6550d","#a63603"],
  7: ["#feedde","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#8c2d04"],
  8: ["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#8c2d04"],
  9: ["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704"]
  }
  
var Reds = {
  3: ["#fee0d2","#fc9272","#de2d26"],
  4: ["#fee5d9","#fcae91","#fb6a4a","#cb181d"],
  5: ["#fee5d9","#fcae91","#fb6a4a","#de2d26","#a50f15"],
  6: ["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#de2d26","#a50f15"],
  7: ["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"],
  8: ["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"],
  9: ["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"]
  }
  
var Greys = {
  3: ["#f0f0f0","#bdbdbd","#636363"],
  4: ["#f7f7f7","#cccccc","#969696","#525252"],
  5: ["#f7f7f7","#cccccc","#969696","#636363","#252525"],
  6: ["#f7f7f7","#d9d9d9","#bdbdbd","#969696","#636363","#252525"],
  7: ["#f7f7f7","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525"],
  8: ["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525"],
  9: ["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525","#000000"]
  }
  
var PuOr = {
  3: ["#f1a340","#f7f7f7","#998ec3"],
  4: ["#e66101","#fdb863","#b2abd2","#5e3c99"],
  5: ["#e66101","#fdb863","#f7f7f7","#b2abd2","#5e3c99"],
  6: ["#b35806","#f1a340","#fee0b6","#d8daeb","#998ec3","#542788"],
  7: ["#b35806","#f1a340","#fee0b6","#f7f7f7","#d8daeb","#998ec3","#542788"],
  8: ["#b35806","#e08214","#fdb863","#fee0b6","#d8daeb","#b2abd2","#8073ac","#542788"],
  9: ["#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788"],
  10: ["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"],
  11: ["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"]
  };
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

var out82 = false;
var out86 = false;

function get_color(value, min, max, breaks, palette, reverse = 0, nan_color = '#e6e6e6') {
  var nbins = breaks.length-1;
  //console.log('value', value);
  var breaks_new = breaks.concat(value) 

  breaks_new.sort(function(a, b) {
    return a - b;
  });
  //console.log(breaks_new)
  var bin = breaks_new.indexOf(value) - 1;
  if (value <= min) {
    bin = 1;
  } else if (value >= max) {
    bin = nbins - 1;
  }
  //console.log(bin)
    
  if (value == null){
    return nan_color
  }

  if (nbins <= 11) {
    if (reverse == 1) {
      return palette[nbins].reverse()[bin];
    } else {
      return palette[nbins][bin];
      console.log(palette[nbins][bin]);
    }
  } else {
    var k = Math.floor(nbins / 9) + 1;

    var nbins_new = Math.ceil(nbins/k) + 1;
    var bin_new = Math.floor((value - min) * nbins_new / (max - min));

    bin_new = bin_new < 0 ? 0 : bin_new;
    bin_new = bin_new >= nbins_new ? nbins_new - 1 : bin_new;

    bin_new2 = (bin_new == nbins_new - 1) ? bin_new : bin_new + 1;

    var colors = palette[nbins_new];
    console.log('colors:', colors)
    if (reverse == 1) colors = colors.reverse();

    var hsl1 = convert.hex.rgb(colors[bin_new]);
    var hsl2 = convert.hex.rgb(colors[bin_new2]);

    var w = 1 - (bin % k) / k // weighting coefficient

    var hsl = [
      Math.floor(w * hsl1[0] + (1-w) * hsl2[0]),
      Math.floor(w * hsl1[1] + (1-w) * hsl2[1]),
      Math.floor(w * hsl1[2] + (1-w) * hsl2[2]),
    ];

    return '#' + convert.rgb.hex(hsl);

  }
}

function select_unicolor(z, min, max, breaks, pal = YlOrBr) {
    return(get_color(z, min, max, breaks, pal))
}

function select_color(z, min, mean, max, breaks, pal1 = RdPuBu, pal2 = YlOrBr) {
  if (z < mean) {
    return(get_color(z, min, mean, breaks, pal1))
  } else {
    return(get_color(z, mean, max, breaks, pal2))
  }
}

function get_colors(palette, min, max, step) {
  var val = min + step/2;
  var arr = [];
  while (val < max){
    arr.push(get_color(palette, val, min, max, step))
    val += step;
  }
  return arr;
}

function get_values(from, to, by){
  var arr = [];
  var val = from;
  while (to - val >= - 0.5 * by) {
    arr.push(round(val,1));
    val += by;
  }
  return arr;
}

function get_text_color(z) {
  if (z > 0) {
    return '#000';
  } else {
    return '#FFFFFF';
  }
}

module.exports = {
  get_color, get_colors, get_values, round, get_text_color, select_color, select_unicolor
}
