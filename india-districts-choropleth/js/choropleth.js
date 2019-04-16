function runmap(){

  $('.loader').hide();

  //SETUP BASEMAP
  var map = L.map('map').setView([22.27, 80.37], 5);
  //var hybUrl='https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3VuZWV0bmFydWxhIiwiYSI6IldYQUNyd0UifQ.EtQC56soqWJ-KBQqHwcpuw';
  var hybUrl='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
  var hybAttrib='ESRI World Light Gray | Map data © <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors & <a href="http://datameet.org" target="_blank">Data{Meet}</a>';
  var hyb = new L.TileLayer(hybUrl, {minZoom: 2, maxZoom: 18, attribution: hybAttrib, opacity:1}).addTo(map);

  //ADD DISTRICT BOUNDARIES
  var gjLayerDist = L.geoJson(geodist,{style:styledist,onEachFeature:onEachDist});
  gjLayerDist.addTo(map);

  //ADD STATE BOUNDARIES
  var statelines = {
    "color":"#000",
    "weight":1,
    "opacity":1,
    "fill":false
  };

  var gjLayerStates = L.geoJson(geoStates,
    {style:statelines});
  gjLayerStates.addTo(map);

}

function popContent(feature) {
  //FOR DISTRICT POP UPS ON CLICK
  for (var i = 0;i<data.length;i++){
    if (data[i]["District"] == feature.properties["DISTRICT"]) {
      return '<h4>'+data[i]["District"]+'</h4><p>Some data that is important</p>';
    }
  }
}

function styledist(feature) {
  //CHOROPLETH COLORS BASED ON RANGE ONLY
  var color = "#EDE7F6";
  for (var i = 0;i<data.length;i++){
    if (data[i]["District"] == feature.properties["DISTRICT"]) {
      if (data[i]["Number-of-Reports"] > 85.0) color = "#311B92";
      else if (data[i]["Number-of-Reports"] >= 60.0 && data[i]["Number-of-Reports"] <= 85.0) color = "#5E35B1";
      else if (data[i]["Number-of-Reports"] >= 30.0 && data[i]["Number-of-Reports"] <= 59.0) color = "#7E57C2";
      else if (data[i]["Number-of-Reports"] < 30.0) color = "#B39DDB";
      else color = "#EDE7F6";
    }
  }
    return {
        fillColor: color,
        weight: 1,
        opacity: 0.4,
        color: 'black',
        dashArray: '1',
        fillOpacity: 0.8
    };
}

function onEachDist(feature, layer) {
  //CONNECTING TOOLTIP AND POPUPS TO DISTRICTS
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
        //click: zoomToFeature
    });
  layer.bindTooltip(feature.properties.DISTRICT+', '+feature.properties.ST_NM,{direction:'auto',className:'statelabel',permanent:false,sticky:true});
  layer.bindPopup(popContent(feature), {maxWidth:600});
}

function highlightFeature(e) {
  //DISTRICT HIGHLIGHT ON MOUSEOVER
    var layer = e.target;
      layer.setStyle({
          fillOpacity: 0.3
      });
    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    //RESET HIGHLIGHT ON MOUSEOUT
    var layer = e.target;
    layer.setStyle({
      fillOpacity: 0.6
    });
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
