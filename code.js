var panorama, panorama1, panorama2, viewer, container, infospot, controlButton, modeButton, audioPlay, audioStop, videoButton;

container = document.querySelector ( '#container');
controlButton = document.querySelector( '#controlButton');
modeButton = document.querySelector ('#modeButton');
panorama1 =  document.querySelector ('#panorama1button');
panorama2 = document.querySelector ('#panorama2button');
playAudioButton = document.querySelector('#audioPlay');
stopButton = document.querySelector('#audioStop');

panorama_video = new PANOLENS.VideoPanorama( 'https://www.youtube.com/watch?v=BMU7CXiIbT4');


panorama = new PANOLENS.ImagePanorama('https://live.staticflickr.com/65535/48501203321_cd550a3ec8_o.jpg');
panorama1 = new PANOLENS.ImagePanorama( 'https://live.staticflickr.com/65535/48501207836_00db8ec7f3_o.jpg' );
panorama2 = new PANOLENS.ImagePanorama( 'https://static1.squarespace.com/static/553fb34be4b01d70400fc6dd/t/5ba011bf8985838f944c8735/1537216979517/WarpRing.png' );
viewer = new PANOLENS.Viewer ( { container: container,
output:'console',
autoRotate: true, autoRateSpeed: 0.8,
autoRotateActivationDuration: 800});
viewer.add ( panorama );
viewer.add ( panorama1 );
viewer.add( panorama2 );
viewer.addUpdateCallback(function(){
});
infospot = new PANOLENS.Infospot ( 350, PANOLENS.DataImage.Info );
infospot.position.set ( 0, 0, -5000);
infospot.addHoverText ('The City of Angels', 30);
panorama.add ( infospot );
var controlIndex = PANOLENS.CONTROLS.ORBIT;
var modeIndex = 0;
;
/* Activation position fixe */

controlButton.addEventListener('click', function() {
    controlIndex = controlIndex >= 1 ? 0 :
    controlIndex + 1;
    switch (controlIndex) {
        case 0: viewer.enableControl(PANOLENS.CONTROLS.ORBIT); break;
        case 1: viewer.enableControl(PANOLENS.CONTROLS.DEVICEORIENTATION); break;

    }
});

/* Activation changement de vue */

modeButton.addEventListener ('click', function() {
    modeIndex = modeIndex >= 2 ? 0 : modeIndex +1;
    switch ( modeIndex ) {
        case 0: viewer.disableEffect(); break;
        case 1: viewer.enableEffect( PANOLENS.MODES.CARDBOARD ); break;
        case 2: viewer.enableEffect(PANOLENS.MODES.STEREO); break;
        default: break;
    }
});

/* Activation changement de vue Iphone */

modeButton.addEventListener ('touchstart', function() {
    modeIndex = modeIndex >= 2 ? 0 : modeIndex +1;
    switch ( modeIndex ) {
        case 0: viewer.disableEffect(); break;
        case 1: viewer.enableEffect( PANOLENS.MODES.CARDBOARD ); break;
        case 2: viewer.enableEffect(PANOLENS.MODES.STEREO); break;
        default: break;
    }
});

/*changement Panorama */

panorama1button.addEventListener ('click', 
function() {
    viewer.setPanorama(panorama1);
});
panorama2button.addEventListener('click', 
function() {
    viewer.setPanorama(panorama2);
});

/* Panorama Iphone */ 
panorama1button.addEventListener ('touchstart', 
function() {
    viewer.setPanorama(panorama1);
});
panorama2button.addEventListener('touchstart', 
function() {
    viewer.setPanorama(panorama2);
});

/* Ajout de l'audio */

var listener = new THREE.AudioListener();
viewer.getCamera().add(listener);
var audioLoader = new THREE.AudioLoader();
var sound = new THREE.PositionalAudio(listener);
audioLoader.load('https://threejs.org/examples/sounds/358232_j_s_song.mp3', function(buffer) {
    audioBuffer = buffer;
    sound.setBuffer(buffer);
    playAudioButton.addEventListener('click', function(){
        sound.play();
    });

    stopButton.addEventListener('click', function(){
        sound.stop();
    });
});

/* Ajout de Video */

