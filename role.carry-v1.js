var roleCarryV1 = {
  /** @param {Creep} creep **/
  run: function (creep) {
    if (creep.store.getFreeCapacity() > 0 && creep.memory.action == 'loading') {
      var drops = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)
      if (Game.getObjectById(creep.memory.pickupTarget) == null) {
        creep.memory.pickupTarget = ''
      }
      if (creep.memory.pickupTarget == '') {
        creep.memory.pickupTarget = drops.id
      }
      if (Game.getObjectById(creep.memory.pickupTarget)) {
        if (
          creep.pickup(Game.getObjectById(creep.memory.pickupTarget)) ==
          ERR_NOT_IN_RANGE
        ) {
          creep.moveTo(Game.getObjectById(creep.memory.pickupTarget), {
            visualizePathStyle: { stroke: '#0000ff' },
          })
        }
        creep.memory.action = 'loading'
      } else {
        Unload(creep)
      }
    } else {
      Unload(creep)
    }
  },
}

function Unload(creep) {
  creep.memory.action = 'unloading'
  var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: (structure) => {
      return (
        (structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_CONTAINER ||
          structure.structureType == STRUCTURE_SPAWN ||
          structure.structureType == STRUCTURE_TOWER) &&
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      )
    },
  })
  if (Game.getObjectById(targets.id)) {
    if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets, {
        visualizePathStyle: { stroke: '#ffffff' },
      })
    }
  }
  if (creep.store.getCapacity() - creep.store.getFreeCapacity() == 0) {
    creep.memory.action = 'loading'
  }
}

module.exports = roleCarryV1
