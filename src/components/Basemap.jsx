import React, { Component } from 'react';
import { loadModules } from 'esri-loader';

const options = {
  url: 'https://js.arcgis.com/4.22/'
};

const styles =  {
  container: {
    height: '100vh',
    width: '100vw'
  },
  mapDiv: {
    padding: 5,
    margin: 0,
    height: '100%',
    width: '100%'
  },
}

class BaseMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'loading'
    }
  }

  componentDidMount() {
    loadModules(['esri/WebMap', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/widgets/Legend'], options)
    .then(([WebMap, MapView,FeatureLayer,Legend]) => {
      const url = "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/FatalAccidents2017/FeatureServer";
      const layer = new FeatureLayer({
        title: "Fatal car accidents (2017)",
        url
      });
      const colors = ["rgba(115, 0, 115, 0)", "#820082", "#910091", "#a000a0", "#af00af", "#c300c3", "#d700d7", "#eb00eb", "#ff00ff", "#ff58a0", "#ff896b", "#ffb935", "#ffea00"];

      layer.renderer = {
        type: "heatmap",
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
          blurRadius: 10,
          maxPixelIntensity: 111,
          minPixelIntensity: 0
        };


        const map = new WebMap({
          basemap: "streets",
          layers: [ layer ]
        });

        const view = new MapView({
          container: "viewDiv",
          center: [-76.495, 44.23],
          scale: 24111111,
          zoom:5,
          map
        });

        /*view.ui.add(
          new Legend({
            view
          }),
        "top-right");*/

          view.then(() => {
                this.setState({
                  map,
                  view,
                  status: 'loaded'
                });
            });
        });
  }
  renderMap() {
    if(this.state.status === 'loading') {
      return <div>loading</div>;
    }
  }

  render() {

    return(
          <div style={styles.container}>
            <div id='viewDiv' style={ styles.mapDiv } >
              {this.renderMap()}
            </div>
          </div>
    )
  }
}

export default BaseMap 