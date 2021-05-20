var roleCarryV1 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        


	    if(creep.store.getFreeCapacity() > 0 && creep.memory.action == 'loading') {
            var drops = creep.room.find(FIND_DROPPED_RESOURCES);
            if(drops.length > 0){
                if(creep.pickup(drops[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(drops[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                creep.memory.action = 'loading';
            } else {
                Unload(creep);
            }
        }
        else {
            Unload(creep);
        }
	}
};

function Unload(creep){

    creep.memory.action = 'unloading';
    var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && 
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
    });
    if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    if(creep.store.getCapacity() - creep.store.getFreeCapacity() == 0){
        creep.memory.action = 'loading';
    }

}

module.exports = roleCarryV1;