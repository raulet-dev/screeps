var spawnControl = {

    
    run: function() {


        var standardBody;
        var pickBody;
        var carryBody;

        for(const c in Game.rooms){

            //var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            var maintenancers = _.filter(Game.creeps, (creep) => creep.memory.role == 'maintenancer');
            var pickS1s = _.filter(Game.creeps, (creep) => creep.memory.role == 'pickS1');
            var carrys = _.filter(Game.creeps, (creep) => creep.memory.role == 'carry');
            var sources = Game.rooms[c].find(FIND_SOURCES);
            var pickS2s = _.filter(Game.creeps, (creep) => creep.memory.role == 'pickS2');
            var constructions = Game.rooms[c].find(FIND_CONSTRUCTION_SITES);

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

            if(pickS1s.length < 1 && enerA > 150) {
                var newName = 'pickS1' + Game.time;
                console.log('Spawning new pickS1: ' + newName);
                for(var spw in Game.spawns){
                    Game.spawns[spw].spawnCreep([MOVE,WORK], newName, {memory: {role: 'pickS1'}});
                }
            }

            if(pickS1s.length > 0 && pickS1s.length < 2 && carrys.length < 1 && enerA > 100) {
                var newName = 'carry' + Game.time;
                console.log('Spawning new carry: ' + newName);
                for(var spw in Game.spawns){
                    Game.spawns[spw].spawnCreep([MOVE,CARRY], newName, {memory: {role: 'carry'}});
                }
            } 

            if(enerA > cost){

                /*if(harvesters.length < 2) {
                    var newName = 'Harvester' + Game.time;
                    console.log('Spawning new harvester: ' + newName);
                    //Game.spawns['spw1'].spawnCreep(standardBody, newName, {memory: {role: 'harvester'}});
                    for(var spw in Game.spawns){
                        Game.spawns[spw].spawnCreep(standardBody, newName, {memory: {role: 'harvester'}});
                    }
                }*/

                if(pickS1s.length > 0 && carrys.length < 4) {
                    var newName = 'carry' + Game.time;
                    console.log('Spawning new carry: ' + newName);
                    for(var spw in Game.spawns){
                        Game.spawns[spw].spawnCreep(carryBody, newName, {memory: {role: 'carry'}});
                    }
                } 

                if(pickS1s.length < 2 && carrys.length > 0) {
                    var newName = 'pickS1' + Game.time;
                    console.log('Spawning new pickS1: ' + newName);
                    for(var spw in Game.spawns){
                        Game.spawns[spw].spawnCreep(pickBody, newName, {memory: {role: 'pickS1'}});
                    }
                }
            
                if(pickS1s.length >= 2 && pickS2s.length < 2 && sources.length > 1 && carrys.length > 1) {
                    var newName = 'pickS2' + Game.time;
                    console.log('Spawning new pickS2: ' + newName);
                    for(var spw in Game.spawns){
                        Game.spawns[spw].spawnCreep(pickBody, newName, {memory: {role: 'pickS2'}});
                    }
                } 
                
                if(carrys.length >= 2 && upgraders.length < 2) {
                    var newName = 'Upgrader' + Game.time;
                    console.log('Spawning new upgrader: ' + newName);
                    for(var spw in Game.spawns){
                        Game.spawns[spw].spawnCreep(standardBody, newName, {memory: {role: 'upgrader'}});
                    }
                }
            
                if(carrys.length >= 2 && upgraders.length >= 1 && builders.length < 2 && constructions.length > 0) {
                    var newName = 'Builder' + Game.time;
                    console.log('Spawning new builder: ' + newName);
                    for(var spw in Game.spawns){
                        Game.spawns[spw].spawnCreep(standardBody, newName, {memory: {role: 'builder'}});
                    }
                }
            
                if(carrys.length > 1 && upgraders.length >= 1 && maintenancers.length < 3) {
                    var newName = 'Maintenancer' + Game.time;
                    console.log('Spawning new maintenancer: ' + newName);
                    for(var spw in Game.spawns){
                        Game.spawns[spw].spawnCreep(standardBody, newName, {memory: {role: 'maintenancer'}});
                    }
                    
                }

            }
            
        }

	}
};

module.exports = spawnControl;