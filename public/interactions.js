'use strict'

AFRAME.registerComponent('grab',{

    schema:{
        position:{type:'string', default:'0 0.5 -3'},
    },

    init : function(){

        const THIS_COMPONENT = this;

        THIS_COMPONENT.items = document.querySelector('#box1');
        THIS_COMPONENT.grab = false;

        //THIS_COMPONENT.items.setAttribute('holdItem', { property:'color:#000000', enabled:false});
        //THIS_COMPONENT.items.setAttribute('position', {position:"0 5 -2", enabled:false});

        //let oldPosition = THIS_COMPONENT.items.getAttribute('position');

        THIS_COMPONENT.el.addEventListener('click', function(obj){
            let oldPosition = obj.srcElement.getAttribute('position');
            //console.log(oldPosition);

            //let newY = oldPosition.y + 5;
            
            if(THIS_COMPONENT.grab){
                // drop item
                let newY = oldPosition.y - 5;
                obj.srcElement.setAttribute('position', oldPosition.x + " " + newY + " " + oldPosition.z);

                //THIS_COMPONENT.items.setAttribute('holdItem', {enabled:false});
                THIS_COMPONENT.grab = false;
                console.log("Item dropped");
            }
            else{
                // pick up item
                let newY = oldPosition.y + 5;
                obj.srcElement.setAttribute('position', oldPosition.x + " " + newY + " " + oldPosition.z);
                console.log(obj.srcElement.getAttribute('position'));

                console.log("Item picked up");
                //THIS_COMPONENT.items.setAttribute('holdItem', {enabled:true});
                THIS_COMPONENT.grab = true;
                
            }
        });

        // this.items = document.querySelector('#box1');
        // this.grab = false;

        // //this.items.setAttribute('holdItem', { property:'translation.y = 10', enabled:false});
        // this.items.setAttribute('holdItem', { property: 'rotation.y', to:360, loop:true, dur:this.data.duration,
        // easing:'linear', enabled:false });

        // this.el.addEventListener('click', function(){
        //     console.log("this: ", this);
            
        //     if(this.grab){
        //         // drop item
        //         this.items.setAttribute('holdItem', {enabled:false});
        //         this.grab = false;
        //         console.log("Item dropped");
        //     }
        //     else{
        //         // pick up item
        //         console.log("Item picked up");
        //         this.items.setAttribute('holdItem', {enabled:true});
        //         this.grab = true;
                
        //     }
        // });

    }



});