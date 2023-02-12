AFRAME.registerComponent('start-experience', {
    init : function(){
        console.log("scene loaded");
        // default state is display:none, and we change to display:block when scene is loaded
        // otherwise the code will run before the scene has loaded
        document.querySelector('#user-gesture-button').style.display = 'block'; 
    }
});

// this function is called by enter experience button click
// objectives: remove overlay and start ambient (autoplay) sounds
const startExperience = function(){
    // hide overlay/button
    document.querySelector('#user-gesture-overlay').style.display = 'none';

    // find all, loop through, and start ambient sounds
    const ambientSounds = document.querySelectorAll('.ambient-music');
    ambientSounds.forEach(function(soundEntity){
        soundEntity.components.sound.playSound();
    });
};