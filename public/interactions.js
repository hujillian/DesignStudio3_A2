'use strict'

AFRAME.registerComponent('grab',{

    schema:{
        position:{type:'string', default:'0 0.5 -3'},
    },

    init : function(){

        const THIS_COMPONENT = this;

        THIS_COMPONENT.items = document.querySelector('#box1');
        THIS_COMPONENT.grab = false;
        let oldPosition = THIS_COMPONENT.items.getAttribute('position');

        let itemHeight = THIS_COMPONENT.items.getAttribute('height');

        let cameraRef = document.querySelector('#camera');
        let cameraPos = cameraRef.getAttribute('position');
        
        

        THIS_COMPONENT.el.addEventListener('click', function(obj){

            // Find a new position for the object based on the vector from the camera's position to the object's current position
            let vectCamToItem = [oldPosition.x - cameraPos.x, oldPosition.y - cameraPos.y, oldPosition.z - cameraPos.z];
            let magCamToItem = Math.sqrt(Math.pow(vectCamToItem[0], 2) + Math.pow(vectCamToItem[1], 2) + Math.pow(vectCamToItem[2], 2));
            let normVectCamToItem = [vectCamToItem[0]/magCamToItem, vectCamToItem[1]/magCamToItem, vectCamToItem[2]/magCamToItem];
            let newPos = [cameraPos.x + 2*normVectCamToItem[0], cameraPos.y + 2*normVectCamToItem[1], cameraPos.z + 2*normVectCamToItem[2]];
            // Multiplying the normal vector by 2 because that's a good distance of the object to the camera

            if(THIS_COMPONENT.grab){
                // drop item
                //let newY = oldPosition.y - 2;
                //obj.srcElement.setAttribute('position', oldPosition.x + " " + newY + " " + oldPosition.z);
                obj.srcElement.setAttribute('position', newPos[0] + " " + itemHeight/2 + " " + newPos[2]);
                //THIS_COMPONENT.items.setAttribute('holdItem', {enabled:false});
                THIS_COMPONENT.grab = false;
                console.log("Item dropped");
            }
            else{
                // pick up item
                //let newY = oldPosition.y + 2;
                //obj.srcElement.setAttribute('position', (cameraPos.x) + " " + newY + " " + (cameraPos.z - 2));
                obj.srcElement.setAttribute('position', newPos[0] + " " + newPos[1] + " " + newPos[2]);
                console.log(obj.srcElement.getAttribute('position'));

                console.log("Item picked up");
                //THIS_COMPONENT.items.setAttribute('holdItem', {enabled:true});
                THIS_COMPONENT.grab = true;
                
            }
        });

    }



});