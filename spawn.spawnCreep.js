var spawnControlPick = require('./spawn.control.pick')

var spawnCreep = {
  run: function (spw, body, role, cost, priority) {
    if (role === 'pick') {
      spawnControlPick.run(spw, body, role, cost, priority)
    } else {
      var name = `${role}_${Game.time}`
      Game.spawns[spw].spawnCreep(body, name, {
        memory: { role: role, priority: priority },
      })
      console.log(`Spawn new ${role}: ${name}, cost: ${cost}`)
    }
  },
}

module.exports = spawnCreep
