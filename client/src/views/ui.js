var Map = require('../models/map');
var Diseases = require('../models/diseases');

var UI = function() {  
  var container = document.getElementById('map');
  var center = {lat: 32.584902, lng:71.918695};
  var diseaseList = new Diseases();
  this.diseases;
  var map = new Map(container, center, 1);
  map.generate21stCenturyMap();
  map.googleMap.setZoom(2);

  this.loadData(diseaseList, map, this.selectDropdown);
 
  var resetBtn = document.getElementById('reset');
  resetBtn.onclick = function (){
    map.deleteMarkers();
    var dropdown = document.getElementById('disease-select').value = "disabled";
    var dropdown2 = document.querySelector('#diseasios');
    dropdown2.style.display = "none";
    dropdown2.value = "disabled";
    var dropdown3 = document.querySelector('#diseasiosios');
    dropdown3.style.display = "none";
  };
  
  var viewAllBtn = document.getElementById('view-all');
  viewAllBtn.onclick = function (){
    map.deleteMarkers();
    var dropdown = document.getElementById('disease-select').value = "disabled";
    var dropdown2 = document.querySelector('#diseasios');
    dropdown2.style.display = "none";
    dropdown2.value = "disabled";
    var dropdown3 = document.querySelector('#diseasiosios');
    dropdown3.style.display = "none";
    this.showAll(this.diseases, map);
  }.bind(this);
}

UI.prototype = {
  loadData: function(diseaseList, map, callback){
    diseaseList.all(function(data){
      var self = this;
        this.diseases = data;
        callback(map, self);
    }.bind(this));
  },

  selectDropdown: function (map, newThis) {
    var self = newThis;
    var select = document.querySelector('select');
    select.onchange = function() {
      var value = (select.selectedIndex);
      self.handleSelectChanged(event, self.diseases, map, value, select);
    }.bind(this);  
  },
  showAll: function(diseaseList, map){
    for(disease of diseaseList){
      this.getCountry(disease, map);
    }
  },

  handleSelectChanged: function(event, diseases, map, value, select) {
    map.deleteMarkers();
    var option = select.options[value].value;
    for(disease of diseases) { 
      if(option === disease.name) {
        var diseasio = [disease];
        this.getDisease(diseasio, map)
      }
    } 
    this.addDropdown(map, select, value);
  },
  addDropdown: function(map, select) {
    var dropdown2 = document.querySelector('#diseasios');
    dropdown2.style.display = "block";
    dropdown2.onchange = function(){
      var value = (dropdown2.selectedIndex);
      this.handleSelectChangio(event, this.diseases, map, value, dropdown2)
    }.bind(this);

  },
  handleSelectChangio: function(event, diseases, map, value, dropdown2) {
    var option = dropdown2.options[value].value;
    for(disease of diseases) {  
      if(option === disease.name) {
        var diseasio = [disease];
        this.getDisease(diseasio, map)
      }
    } 
    this.addDropdownio(event, diseases, map, value);
  },

  addDropdownio: function(event, diseases, map) {
    var dropdown3 = document.querySelector('#diseasiosios');
    dropdown3.style.visibility = "visible";
    dropdown3.style.display = "block";
    dropdown3.onchange = function() {
      var value = (dropdown3.selectedIndex);
      this.handleSelectChangioio(event, this.diseases, map, value, dropdown3);
    }.bind(this)
  }, 

  handleSelectChangioio: function(event, diseases, map, value, dropdown3) {
    var option = dropdown3.options[value].value;
    for(disease of diseases) {  
      if(option === disease.name) {
        var diseasio = [disease];
        this.getDisease(diseasio, map)
      }
    } 
  },

  createMarker: function(country, map, disease) {
      map.addMarker(country, map, disease);
  },

  getDisease: function(disease, map) { 
    for(diseasio of disease) {
      this.getCountry(diseasio, map);
    }
  },

 getCountry: function(disease, map) {
  var slider = document.querySelector('#dateslider'); 
  var countries = disease.presentDay;
  slider.oninput = function() {
    if (slider.value === '1800') {
        countries = disease.nineteenthCentury; 
        map.generate19thCenturyMap();
      }
      else if (slider.value === '1900') {
        countries = disease.twentiethCentury;
        map.generate20thCenturyMap();
      }
      else if (slider.value === '2000') {
        countries = disease.presentDay;
        map.generate21stCenturyMap();
     }
      else if (slider.value === '2100') {
        countries = disease.twentySecondCentury; 
        map.generate22ndCenturyMap();
    }
    for(country of countries) { 
      map.deleteMarkers();
      this.createMarker(country, map, disease)
    }
  }.bind(this);
 }
}

module.exports = UI;