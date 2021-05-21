var spawnCreep = require('./spawn.spawnCreep')
var utils = require('./utils')

var spawnControl = {
  run: function () {
    for (const c in Game.rooms) {
      var room = Game.rooms[c]
      if (room.memory.queue == undefined) {
        room.memory.queue = { pick: 0, carry: 0, upgrade: 0 }
      }
      var roomQueue = room.memory.queue

      var enerA = Game.rooms[c].energyAvailable
      var enerT = Game.rooms[c].energyCapacityAvailable
      var sources = Game.rooms[c].find(FIND_SOURCES)
      var myCreeps = Game.rooms[c].find(FIND_MY_CREEPS)

      for (var spw in Game.spawns) {
        var thisSpawn = Game.spawns[spw]
        if (thisSpawn.spawning === null) {
          thisSpawn.memory.spawnType = 'none'
        }
        if (enerA > 100) {
          var picks = _.filter(myCreeps, (creep) => creep.memory.role == 'pick')
          var carrys = _.filter(
            myCreeps,
            (creep) => creep.memory.role == 'carry'
          )
          var upgraders = _.filter(
            myCreeps,
            (creep) => creep.memory.role == 'upgrade'
          )
          if (picks.length < sources.length * 2) {
            var name = 'pick'
            if (roomQueue[name] == 1 && thisSpawn.memory.spawnType == 'none') {
              if (enerA > 150) {
                var body = [MOVE, WORK]

                thisSpawn.memory.spawnType = name
                spawnCreep.run(spw, body, name, utils.bodyCost(body))
                roomQueue[name] = 0
              }
            } else {
              if (roomQueue[name] != 1 && thisSpawn.memory.spawnType != name) {
                roomQueue[name] = 1
                console.log(`add ${name} to queue`)
              }
            }
          } else if (carrys.length < sources.length) {
            var name = 'carry'
            if (roomQueue[name] == 1 && thisSpawn.memory.spawnType == 'none') {
              if (enerA > 100) {
                var body = [MOVE, CARRY]

                thisSpawn.memory.spawnType = name
                spawnCreep.run(spw, body, name, utils.bodyCost(body))
                roomQueue[name] = 0
              }
            } else {
              if (roomQueue[name] != 1 && thisSpawn.memory.spawnType != name) {
                roomQueue[name] = 1
                console.log(`add ${name} to queue`)
              }
            }
          } else if (upgraders.length < 1) {
            var name = 'upgrade'
            if (roomQueue[name] == 1 && thisSpawn.memory.spawnType == 'none') {
              if (enerA > 200) {
                var body = [MOVE, CARRY, WORK]

                thisSpawn.memory.spawnType = name
                spawnCreep.run(spw, body, name, utils.bodyCost(body))
                roomQueue[name] = 0
              }
            } else {
              if (roomQueue[name] != 1 && thisSpawn.memory.spawnType != name) {
                roomQueue[name] = 1
                console.log(`add ${name} to queue`)
              }
            }
          }
        }
      }

      /*
      //var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
      var upgraders = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == 'upgrade'
      )
      var builders = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == 'build'
      )
      var maintenancers = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == 'mantain'
      )
      var pickS1s = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == 'pick'
      )
      var carrys = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == 'carry'
      )
      var sources = Game.rooms[c].find(FIND_SOURCES)
      var pickS2s = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == 'pickT2'
      )
      var constructions = Game.rooms[c].find(FIND_CONSTRUCTION_SITES)

      if (pickS1s.length < 1 && enerA > 150) {
        for (var spw in Game.spawns) {
          var body = [MOVE, WORK]
          var name = 'pickT1'
          spawnCreep(spw, body, name, utils.bodyCost(body), 1)
        }
      }

      if (
        pickS1s.length > 0 &&
        pickS1s.length < 2 &&
        carrys.length < 1 &&
        enerA > 100
      ) {
        var newName = 'carry' + Game.time
        console.log('Spawning new carry: ' + newName)
        for (var spw in Game.spawns) {
          Game.spawns[spw].spawnCreep([MOVE, CARRY], newName, {
            memory: { role: 'carry' },
          })
        }
      }

      if (enerA > cost) {
        /*if(harvesters.length < 2) {
                    var newName = 'Harvester' + Game.time;
                    console.log('Spawning new harvester: ' + newName);
                    //Game.spawns['spw1'].spawnCreep(standardBody, newName, {memory: {role: 'harvester'}});
                    for(var spw in Game.spawns){
                        Game.spawns[spw].spawnCreep(standardBody, newName, {memory: {role: 'harvester'}});
                    }
                }*/
      /*
        if (pickS1s.length > 0 && carrys.length < 4) {
          var newName = 'carry' + Game.time
          console.log(`Spawning new carry: ${newName} cost: ${cost}`)
          for (var spw in Game.spawns) {
            Game.spawns[spw].spawnCreep(carryBody, `carry${Game.time}`, {
              memory: { role: 'carry' },
            })
          }
        }

        if (pickS1s.length < 2 && carrys.length > 0) {
          var newName = 'pickS1' + Game.time
          console.log('Spawning new pickS1: ' + newName)
          for (var spw in Game.spawns) {
            Game.spawns[spw].spawnCreep(pickBody, newName, {
              memory: { role: 'pickS1' },
            })
          }
        }

        if (
          pickS1s.length >= 2 &&
          pickS2s.length < 2 &&
          sources.length > 1 &&
          carrys.length > 1
        ) {
          var newName = 'pickS2' + Game.time
          console.log('Spawning new pickS2: ' + newName)
          for (var spw in Game.spawns) {
            Game.spawns[spw].spawnCreep(pickBody, newName, {
              memory: { role: 'pickS2' },
            })
          }
        }

        if (carrys.length >= 2 && upgraders.length < 2) {
          var newName = 'Upgrader' + Game.time
          console.log('Spawning new upgrader: ' + newName)
          for (var spw in Game.spawns) {
            Game.spawns[spw].spawnCreep(standardBody, newName, {
              memory: { role: 'upgrader' },
            })
          }
        }

        if (
          carrys.length >= 2 &&
          upgraders.length >= 1 &&
          builders.length < 2 &&
          constructions.length > 0
        ) {
          var newName = 'Builder' + Game.time
          console.log('Spawning new builder: ' + newName)
          for (var spw in Game.spawns) {
            Game.spawns[spw].spawnCreep(standardBody, newName, {
              memory: { role: 'builder' },
            })
          }
        }

        if (
          carrys.length > 1 &&
          upgraders.length >= 1 &&
          maintenancers.length < 3
        ) {
          var newName = 'Maintenancer' + Game.time
          console.log('Spawning new maintenancer: ' + newName)
          for (var spw in Game.spawns) {
            Game.spawns[spw].spawnCreep(standardBody, newName, {
              memory: { role: 'maintenancer' },
            })
          }
        }
      }
      */
    }
  },
}

module.exports = spawnControl
