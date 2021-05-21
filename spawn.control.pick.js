var spawnControlPick = {
  run: function (spw, body, role, cost, queue) {
    var sources = Game.spawns[spw].room.find(FIND_SOURCES)
    var creepsInRoom = Game.spawns[spw].room.find(FIND_MY_CREEPS)
    var sourcesIds = []
    var emptyRoom = false
    for (var s in sources) {
      sourcesIds.push(sources[s].id)
    }
    for (var id in sourcesIds) {
      var count = 0
      for (var sameIdCreep in creepsInRoom) {
        if (
          creepsInRoom[sameIdCreep].memory.assign != null &&
          creepsInRoom[sameIdCreep].memory.assign == sourcesIds[id]
        ) {
          count++
        }
      }
      if (count < 2) {
        var name = `${role}_${Game.time}`
        var spawn = Game.spawns[spw].spawnCreep(body, name, {
          memory: { role: role, assign: sourcesIds[id] },
        })
        console.log(
          `Spawn new ${role}: ${name}, cost: ${cost}, assigned to: ${sourcesIds[id]}`
        )
        emptyRoom = true
        break
      }
    }
    if (!emptyRoom) {
      console.log('all sources busy')
    }
  },
}

module.exports = spawnControlPick
