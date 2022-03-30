import React from 'react';
import './record.css';
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

//export const lat =  0;
//export const long =  0;
//export const mp3file =  0;
export var lat;
export var long;
export var mp3file;

//export const newVar = mp3file;

navigator.getUserMedia =  navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia

// Older browsers might not implement mediaDevices at all, so we set an empty object first
if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function(constraints) {

    // First get ahold of the legacy getUserMedia, if present
    var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    // Some browsers just don't implement it - return a rejected promise with an error
    // to keep a consistent interface
    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

    // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
    return new Promise(function(resolve, reject) {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}


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

        console.log('mp3file');
        console.log(mp3file);

        console.log("lat: " + lat);
        console.log("long: " + long);
        

        
      }).catch((e) => console.log(e));
  };
  


  componentDidMount() {

    navigator.mediaDevices.getUserMedia({ audio: true },
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
