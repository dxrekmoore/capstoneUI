import React from 'react';
import './record.css';
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

var lat;
var long;
var mp3file;

function success(pos){
  var crd = pos.coords;
  lat = crd.latitude;
  long = crd.longitude;
}
function error(err){
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
if (window.navigator.geolocation) { //get location on recording start
  window.navigator.geolocation
  .getCurrentPosition(success, error);
 } 

class Record extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
    };
  }
  
  start = () => {

    if (this.state.isBlocked) { //mic not enabled
      console.log('Permission Denied');
    } else { //start recording
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };
  

  stop = () => { //stop recording clicked
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        mp3file = new File([blob], "audiofile.mp3");
        this.setState({ blobURL, isRecording: false });

        console.log(mp3file);
        console.log("lat: " + lat);
        console.log("long: " + long);
        
      }).catch((e) => console.log(e));
  };
  
  componentDidMount() {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => { 
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.start} disabled={this.state.isRecording}>Record</button>
          <button onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
          <audio src={this.state.blobURL} controls="controls" />
        </header>
      </div>
    );
  }
}

export default Record;
