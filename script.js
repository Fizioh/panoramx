
/* setup the panorama*/

var panorama, panorama1, panorama2, viewer, container, infospot, controlButton, modeButton,
audioStopButton, audioPlayButton, audioBuffer, panorama_video;

var controlIndex = PANOLENS.CONTROLS.ORBIT;
var modeIndex = 0;

container = document.querySelector( '#container' );
controlButton = document.querySelector( '#controlButton' );
modeButton = document.querySelector( '#modeButton' );
panorama1Button = document.querySelector( '#btn1' );
panorama2Button = document.querySelector( '#btn2' );
playAudioButton = document.querySelector( '#audio-play-button' );
stopButton = document.querySelector( '#audio-stop-button' );
PlayVideoButton = document.querySelector( '#video-play-button' );

panorama = new PANOLENS.ImagePanorama('https://live.staticflickr.com/65535/48501203321_cd550a3ec8_o.jpg');


    
panorama_video = new PANOLENS.VideoPanorama( 'https://pchen66.github.io/Panolens/examples/asset/textures/video/1941-battle-low.mp4');

/* add hover text */

infospot = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );
infospot.addHoverText( 'The City of Angels', 30 );
infospot.position.set( 0, -2000, -5000 );


panorama.add( infospot );


viewer = new PANOLENS.Viewer( { container: container, output: 'console', 
autoRotate: true, autoRotateSpeed: 1, autoRotateActivationDuration: 5000 } );
viewer.add( panorama, panorama1, panorama2, panorama_video );

viewer.addUpdateCallback(function(){
  
});


/* Camera Controls*/ /*

// How far you can orbit vertically, upper and lower limits.Range is 0 to Math.PI radians.
viewer.OrbitControls.minPolarAngle = Math.PI / 3;
viewer.OrbitControls.maxPolarAngle = Math.PI * 2 / 3;

// How far you can orbit horizontally, upper and lower limits. If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
viewer.OrbitControls.minAzimuthAngle = - Math.PI / 3;
viewer.OrbitControls.maxAzimuthAngle = Math.PI / 3;

// Momentum 
viewer.OrbitControls.momentumDampingFactor = 0.75;
viewer.OrbitControls.momentumScalingFactor = -0.01;
viewer.OrbitControls.momentumKeydownFactor = 10;

// Fov
viewer.OrbitControls.minFov = 50;
viewer.OrbitControls.maxFov = 160;

// Zoom
viewer.OrbitControls.noZoom = true;

/* End camera controls */



/* end hover text */

// Method to set new panorama
panorama1Button.addEventListener( 'click', function(){
    viewer.setPanorama( panorama1 );

});

panorama2Button.addEventListener( 'click', function(){
    viewer.setPanorama( panorama2 );

});

PlayVideoButton.addEventListener( 'click', function(){
    viewer.setPanorama( panorama_video );
    //video.play();

});

/* trigger the fix position control */

// Method to trigger control
controlButton.addEventListener( 'click', function(){

  controlIndex = controlIndex >= 1 ? 0 : controlIndex + 1;
  
  switch ( controlIndex ) {
      
    case 0: viewer.enableControl( PANOLENS.CONTROLS.ORBIT ); break;
    case 1: viewer.enableControl( PANOLENS.CONTROLS.DEVICEORIENTATION ); break;
    default: break;
      
  }

} );

/* end fix position control */

/* trigger the change in modes */

modeButton.addEventListener( 'click', function(){
  
  modeIndex = modeIndex >= 2 ? 0 : modeIndex + 1;
  
  switch ( modeIndex ) {
      
    case 0: viewer.disableEffect(); break;
    case 1: viewer.enableEffect( PANOLENS.MODES.CARDBOARD ); break;
    case 2: viewer.enableEffect( PANOLENS.MODES.STEREO ); break;
    default: break;
      
  }

} );

/* end change in modes */

/* add audio */

var listener = new THREE.AudioListener();
viewer.getCamera().add( listener );

var audioLoader = new THREE.AudioLoader();
var sound = new THREE.PositionalAudio( listener );
audioLoader.load( 'https://threejs.org/examples/sounds/358232_j_s_song.mp3', function( buffer ) {
audioBuffer = buffer;
sound.setBuffer( buffer );


playAudioButton.addEventListener( 'click', function(){
    sound.play();
});
    
stopButton.addEventListener( 'click', function(){
    sound.stop();
});

  });

/* end audio */



