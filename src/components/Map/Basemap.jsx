import React, { Component } from 'react';
import { loadModules } from 'esri-loader';
import "./styles.css";

const options = {
  url: 'https://js.arcgis.com/4.22/'
};

const styles =  {
  container: {
    height: '100vh',
    width: '100vw'
  },
  mapDiv: {
    padding: 10,
    margin: 0,
    height: '100%',
    width: '100%'
  },
}

class BaseMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: ''
    }
  }
  
  componentDidMount() {
    loadModules(['esri/WebMap', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/widgets/Legend','esri/Graphic','esri/core/promiseUtils','esri/rest/locator','esri/geometry/Point'], options)
    .then(([WebMap, MapView,FeatureLayer,Legend,Graphic]) => {
      
      var json = require('./heatmapdata.json');
      //const colors = ["rgba(115, 0, 115, 0)", "#820082", "#910091", "#a000a0", "#af00af", "#c300c3", "#d700d7", "#eb00eb", "#ff00ff", "#ff58a0", "#ff896b", "#ffb935", "#ffea00"];
      var graphics = json.uploads.map(function (upload) {
        return new Graphic({
          attributes: {
            intensity:upload.intensity,
            ObjectId: upload.id,

          },
          geometry: {
            type: "point",
            longitude: upload.longitude,
            latitude: upload.latitude
          },
        });
      });
      var featureLayer = new FeatureLayer({
        source: graphics,
        objectIdField: "ObjectId",
        fields: [{
          name: "ObjectId",
          type: "oid"
          },
          {
            name: "intensity",
            type: "integer"
        }],
        title: "Intensity of sounds in Kingston ",
        renderer: {
          type: "simple", // autocasts as new SimpleRenderer()
          
          symbol: {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            color: [250, 250, 250],
            outline: {
              color: [255, 255, 255,.5],
              width: 0.5
            },
            size: 25
          },
          
          visualVariables: [
            {
              type: "color",
              field: "intensity",
              stops: [
                { value: 0, color: [150, 153, 186,0.5], label: "Quiet" },
                { value: 100, color: [255, 0, 0,0.5], label: "Loud" }
              ]
            }
          ]

        
        /*type: "heatmap",
        colorStops: [
          { color: colors[0], ratio: 0 },
          { color: colors[1], ratio: 0.083 },
          { color: colors[2], ratio: 0.166 },
          { color: colors[3], ratio: 0.249 },
          { color: colors[4], ratio: 0.332 },
          { color: colors[5], ratio: 0.415 },
          { color: colors[6], ratio: 0.498 },
          { color: colors[7], ratio: 0.581 },
          { color: colors[8], ratio: 0.664 },
          { color: colors[9], ratio: 0.747 },
          { color: colors[10], ratio: 0.83 },
          { color: colors[11], ratio: 0.913 },
          { color: colors[12], ratio: 1 }
          ],
          blurRadius: 7,
          maxPixelIntensity: 10,
          minPixelIntensity: 0
          */
        },

        
      });

        const map = new WebMap({
          basemap: "streets-vector",
          layers: [ featureLayer ]
        });

        const view = new MapView({
          container: "viewDiv",
          center: [-76.495, 44.23],
          scale: 2,
          zoom:13,
          map
        });
        
        view.ui.add(new Legend({
          view: view,
          style: 'classic',
          layout: 'auto'
        }),"top-right");
        });
  }


  render() {
    return(
          <div style={styles.container}>
            <div id='viewDiv' style={ styles.mapDiv }>
            </div>
          </div>
    )
  }
} 

export default BaseMap 