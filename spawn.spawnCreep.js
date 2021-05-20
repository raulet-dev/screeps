var spawnCreep = {
  function(spw, body, role, cost) {
    var creep = Game.spawns[spw].spawnCreep(body, `${role}${Game.time}`, {
      memory: { role: role },
    })
    console.log(`Spwn new creep: ${creep.name}, cost: ${cost}`)
  },
}

module.exports = spawnCreep
