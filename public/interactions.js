'use strict'

AFRAME.registerComponent('grab',{


    init : function(){

            const THIS_COMPONENT = this;

            THIS_COMPONENT.items = document.querySelectorAll('.interactive');

            THIS_COMPONENT.grab = false;

            let buttons = document.querySelector('#interaction-buttons');
            THIS_COMPONENT.el.addEventListener('click', function(){

                let oldPosition = THIS_COMPONENT.el.getAttribute('position');

                
                let newPos = moveObjToCam(THIS_COMPONENT.el, 3);

                if(THIS_COMPONENT.grab){
                    // drop item
                    buttons.style.display = 'none';

                    // drop sound
                    document.querySelector('#drop-sound').components.sound.playSound();

                    dropObj(THIS_COMPONENT.el);
                    
                    console.log("Item dropped");
                    
                }
                else{
                    
                    for(let i=0; i<THIS_COMPONENT.items.length; i++){
                        // drop all items
                        THIS_COMPONENT.el.setAttribute('position', oldPosition.x + " 0 " + oldPosition.z);
                        dropObj(THIS_COMPONENT.items[i]);
                    }

                    // pick up this item
                    document.querySelector('#grab-sound').components.sound.playSound();// grab sound
                    //THIS_COMPONENT.el.setAttribute('position', newPos[0] + " " + newPos[1] + " " + newPos[2]);
                    THIS_COMPONENT.el.setAttribute('animation', "property: position; to: "+ newPos[0] + " " + newPos[1] + " " + newPos[2] + "; dur: 200; easing: easeInQuad;")
                    THIS_COMPONENT.grab = true;
                    buttons.style.display = 'block';
                    THIS_COMPONENT.el.setAttribute('class', THIS_COMPONENT.el.getAttribute('class') + " selectedItem");
                    
                    console.log("Item picked up");
                }
            
            });

    },

});

const throwObj = function(){

    // throw sound
    document.querySelector('#throw-sound').components.sound.playSound();

    let throwButton = document.querySelector('#throw-button');
    let selectedObj = document.querySelector('.selectedItem');
    
    let newPos = moveObj(selectedObj, 7);

    //selectedObj.setAttribute('position', newPos[0] + " 0 " + newPos[2]);
    selectedObj.setAttribute('animation', "property: position; to: "+ newPos[0] + " 0 " + newPos[2] + "; dur: 200; easing: easeInQuad;")
    

    selectedObj.classList.remove("selectedItem");

    selectedObj.components['grab'].grab = false;
    document.querySelector('#interaction-buttons').style.display = 'none';

    throwButton.setAttribute('throw-obj', true);

    console.log("object thrown");
}

const dropObj = function(myObj){
    let currentPos = myObj.getAttribute('position');
    //myObj.setAttribute('position', currentPos.x + " " + objHeight/2 + " " + currentPos.z);
    myObj.setAttribute('animation', "property: position; to: "+ currentPos.x + " 0 " + currentPos.z + "; dur: 100; easing: easeInQuad;")
    
    myObj.classList.remove("selectedItem");
    myObj.components['grab'].grab = false;
    
    console.log("object dropped");
}

const eatObj = function(){
    let selectedObj = document.querySelector('.selectedItem');

    let newPosition = moveObj(selectedObj, -5);
    console.log("newposition: ", newPosition);

    selectedObj.setAttribute('animation', "property: position; to: "+ newPosition[0] + " " + (newPosition[1]-1) + " " + newPosition[2] + "; dur: 1000; easing: easeInQuad;")
    document.querySelector('#interaction-buttons').style.display = 'none';

    // eating sound
    document.querySelector('#eating-sound').components.sound.playSound();

    // delete object from scene
    setTimeout(function(){
        selectedObj.parentNode.removeChild(selectedObj);
    }, 2000);

    console.log("object eaten");
}

const meow = function(){
    document.querySelector('#meow-sound').components.sound.playSound();
}

const moveObj = function(obj, moveFactor){ 
    let objPos = obj.getAttribute('position');
    let cameraPos = document.querySelector('#camera').getAttribute('position');

    // Find a new position for the object based on the vector from the camera's position to the object's current position
    let vectCamToItem = [objPos.x - cameraPos.x, objPos.y - cameraPos.y, objPos.z - cameraPos.z];
    let magCamToItem = Math.sqrt(Math.pow(vectCamToItem[0], 2) + Math.pow(vectCamToItem[1], 2) + Math.pow(vectCamToItem[2], 2));
    let normVectCamToItem = [vectCamToItem[0]/magCamToItem, vectCamToItem[1]/magCamToItem, vectCamToItem[2]/magCamToItem];
    let newPos = [objPos.x + moveFactor*normVectCamToItem[0], objPos.y + moveFactor*normVectCamToItem[1], objPos.z + moveFactor*normVectCamToItem[2]];
    return newPos;
}

const moveObjToCam = function(obj, moveFactor){ 
    let objPos = obj.getAttribute('position');
    let cameraPos = document.querySelector('#camera').getAttribute('position');

    let vectCamToItem = [objPos.x - cameraPos.x, objPos.y - cameraPos.y, objPos.z - cameraPos.z];
    let magCamToItem = Math.sqrt(Math.pow(vectCamToItem[0], 2) + Math.pow(vectCamToItem[1], 2) + Math.pow(vectCamToItem[2], 2));
    let normVectCamToItem = [vectCamToItem[0]/magCamToItem, vectCamToItem[1]/magCamToItem, vectCamToItem[2]/magCamToItem];
    let newPos = [cameraPos.x + moveFactor*normVectCamToItem[0], cameraPos.y + moveFactor*normVectCamToItem[1], cameraPos.z + moveFactor*normVectCamToItem[2]];
    return newPos;
}