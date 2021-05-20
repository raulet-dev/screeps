var roleHarvester = require('./roles/role.harvester')
var roleUpgrader = require('./roles/role.upgrader')
var roleBuilder = require('./roles/role.builder')
var roleMaintenancer = require('./roles/role.maintenancer')
var spawnControl = require('spawn.control')
var generalOverview = require('./general.overview')
var rolePickV1 = require('./roles/role.pick-v1')
var roleCarryV1 = require('./roles/role.carry-v1')

module.exports.loop = function () {
  spawnControl.run()
  generalOverview.run()

  for (var name in Game.creeps) {
    /*
        if(EVENT_ATTACK == true){
            console.log('Attacked');
        }*/

    var creep = Game.creeps[name]
    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep)
    }
    if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep)
    }
    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep)
    }
    if (creep.memory.role == 'maintenancer') {
      roleMaintenancer.run(creep)
    }
    if (creep.memory.role == 'pickS1' || creep.memory.role == 'pickS2') {
      rolePickV1.run(creep)
    }
    if (creep.memory.role == 'carry') {
      roleCarryV1.run(creep)
    }
  }
}
