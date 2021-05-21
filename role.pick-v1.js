var rolePickV1 = {
  run: function (creep) {
    if (
      creep.harvest(Game.getObjectById(creep.memory.assign)) == ERR_NOT_IN_RANGE
    ) {
      creep.moveTo(Game.getObjectById(creep.memory.assign), {
        visualizePathStyle: { stroke: '#00ff00' },
      })
    }
    /*
    if (sources.length > 1) {
      if (creep.memory.role == 'pick') {
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0], {
            visualizePathStyle: { stroke: '#ffaa00' },
          })
        }
      } else {
        if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[1], {
            visualizePathStyle: { stroke: '#ffaa00' },
          })
        }
      }
    } else {
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } })
      }
    }
    */
  },
}

module.exports = rolePickV1
