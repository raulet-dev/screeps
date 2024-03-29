var roleBuilder = {

    

    /** @param {Creep} creep **/
    run: function() {
        // Configuracion      
        var tiempoRefresco = 5;
        // funcion
        if(Memory.overviewEnabled != true && Memory.overviewEnabled != false){
            Memory.overviewEnabled = false;
        }
        var gTime = Memory.gTime;
        var mTime = Memory.mTime;
        if(gTime == undefined){
            Memory.gTime = Game.time;
        }
        if(mTime == undefined){
            Memory.mTime = Game.time;
        }

        if(Game.time - mTime > 5){
            for(var i in Memory.creeps) {
                if(!Game.creeps[i]) {
                    delete Memory.creeps[i];
                }
            }
            Memory.mTime = Game.time;
        }

        if(Memory.overviewEnabled == true){
            if(Game.time - gTime > tiempoRefresco){
                console.log('*******************************');
                console.log('* room  *       energy        *');
                for(const c in Game.rooms){
                    var enerA = Game.rooms[c].energyAvailable; 
                    var enerT = Game.rooms[c].energyCapacityAvailable;
                    console.log('* ' + Game.rooms[c].name + ' * ' + ("         " + enerA).slice(-9) + '/' +("         " + enerT).slice(-9) + ' *');
                }
                console.log('*******************************');
                Memory.gTime = Game.time;
            }
        }
    },

};

module.exports = roleBuilder;