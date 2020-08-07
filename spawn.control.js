var spawnControl = {

    
    run: function() {


        var standardBody;
        var pickBody;
        var carryBody;

        for(const c in Game.rooms){
            var enerA = Game.rooms[c].energyAvailable; 
            var enerT = Game.rooms[c].energyCapacityAvailable;
            var cost = 0;
            if(enerT >= 400 ){
                standardBody = [MOVE,MOVE,WORK,WORK,CARRY,CARRY];
                pickBody = [MOVE,MOVE,WORK,WORK,WORK];
                carryBody = [MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY];
                cost = 400;
            } else {
                standardBody = [MOVE,WORK,CARRY];
                pickBody = [MOVE,WORK];
                carryBody = [MOVE,MOVE,CARRY,CARRY];
                cost = 200;
            }

            if(enerA > cost){


                //try this
                //Game.rooms[c].spawns[0].spawnCreep(standardBody, newName, {memory: {role: 'harvester'}});
                //change num for var in top of spawns
                //remove harvester.


                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
                //console.log('Harvesters: ' + harvesters.length);

                if(harvesters.length < 2) {
                    var newName = 'Harvester' + Game.time;
                    console.log('Spawning new harvester: ' + newName);
                    //Game.spawns['spw1'].spawnCreep(standardBody, newName, {memory: {role: 'harvester'}});
                    Game.rooms[c].spawns[0].spawnCreep(standardBody, newName, {memory: {role: 'harvester'}});
                }
                
                var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
                //console.log('Upgraders: ' + upgraders.length);
            
                if(harvesters.length >= 2 && upgraders.length < 2) {
                    var newName = 'Upgrader' + Game.time;
                    console.log('Spawning new upgrader: ' + newName);
                    Game.spawns['spw1'].spawnCreep(standardBody, newName, {memory: {role: 'upgrader'}});
                }
                
                var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
                //console.log('Builders: ' + builders.length);
            
                if(harvesters.length >= 2 && upgraders.length >= 1 && builders.length < 2) {
                    var newName = 'Builder' + Game.time;
                    console.log('Spawning new builder: ' + newName);
                    Game.spawns['spw1'].spawnCreep(standardBody, newName, {memory: {role: 'builder'}});
                }

                var maintenancers = _.filter(Game.creeps, (creep) => creep.memory.role == 'maintenancer');
                //console.log('Builders: ' + builders.length);
            
                if(harvesters.length > 1 && upgraders.length >= 1 && builders.length > 1 && maintenancers.length < 3) {
                    var newName = 'Maintenancer' + Game.time;
                    console.log('Spawning new maintenancer: ' + newName);
                    Game.spawns['spw1'].spawnCreep(standardBody, newName, {memory: {role: 'maintenancer'}});
                    
                }
                /*
                var pickS1s = _.filter(Game.creeps, (creep) => creep.memory.role == 'pickS1');
                //console.log('Builders: ' + builders.length);
            
                if(pickS1s.length < 2) {
                    var newName = 'pickS1' + Game.time;
                    console.log('Spawning new pickS1: ' + newName);
                    Game.spawns['spw1'].spawnCreep(pickBody, newName, {memory: {role: 'pickS1'}});
                }
                var carrys = _.filter(Game.creeps, (creep) => creep.memory.role == 'carry');

                if(pickS1s.length > 0 carrys.lenght < 4) {
                    var newName = 'pickS2' + Game.time;
                    console.log('Spawning new pickS2: ' + newName);
                    Game.spawns['spw1'].spawnCreep(pickBody, newName, {memory: {role: 'pickS2'}});
                } 

                if(pickS1s.length < 2 && carrys.lenght > 0) {
                    var newName = 'pickS1' + Game.time;
                    console.log('Spawning new pickS1: ' + newName);
                    Game.spawns['spw1'].spawnCreep(pickBody, newName, {memory: {role: 'pickS1'}});
                }
                
                var sources = Game.rooms[c].find(FIND_SOURCES);
                var pickS2s = _.filter(Game.creeps, (creep) => creep.memory.role == 'pickS2');
                //console.log('Builders: ' + builders.length);
            
                if(pickS1s.length >= 2 && pickS2s.length < 2 && sources.length > 1) {
                    var newName = 'pickS2' + Game.time;
                    console.log('Spawning new pickS2: ' + newName);
                    Game.spawns['spw1'].spawnCreep(pickBody, newName, {memory: {role: 'pickS2'}});
                } 
                
                
                */

            }
            
        }

	}
};

module.exports = spawnControl;