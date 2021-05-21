var rolePickV1 = {
  run: function (creep) {
    if (
      creep.harvest(Game.getObjectById(creep.memory.assign)) == ERR_NOT_IN_RANGE
    ) {
      creep.moveTo(Game.getObjectById(creep.memory.assign), {
        visualizePathStyle: { stroke: '#00ff00' },
      })
    }
  },
}

module.exports = rolePickV1
