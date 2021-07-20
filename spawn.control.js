var spawnCreep = require('./spawn.spawnCreep');
var utils = require('./utils');

var spawnControl = {
  run: function () {
    for (const c in Game.rooms) {
      var room = Game.rooms[c];
      if (room.memory.queue == undefined) {
        room.memory.queue = { pick: 0, carry: 0, upgrade: 0, build: 0 };
      }
      var roomQueue = room.memory.queue;

      var enerA = Game.rooms[c].energyAvailable;
      var sources = Game.rooms[c].find(FIND_SOURCES);
      var myCreeps = Game.rooms[c].find(FIND_MY_CREEPS);

      for (var spw in Game.spawns) {
        var thisSpawn = Game.spawns[spw];
        if (thisSpawn.spawning === null) {
          thisSpawn.memory.spawnType = 'none';
        }
        if (enerA > 100) {
          var picks = _.filter(
            myCreeps,
            (creep) => creep.memory.role == 'pick'
          );
          var carrys = _.filter(
            myCreeps,
            (creep) => creep.memory.role == 'carry'
          );
          var upgraders = _.filter(
            myCreeps,
            (creep) => creep.memory.role == 'upgrade'
          );
          var builders = _.filter(
            myCreeps,
            (creep) => creep.memory.role == 'build'
          );

          // if pick > carry ?carry:pick
          if (picks.length < sources.length * 2) {
            var name = 'pick';
            if (roomQueue[name] == 1 && thisSpawn.memory.spawnType == 'none') {
              if (enerA > 150) {
                var body = [MOVE, WORK];

                thisSpawn.memory.spawnType = name;
                spawnCreep.run(spw, body, name, utils.bodyCost(body));
                roomQueue[name] = 0;
              }
            } else {
              if (roomQueue[name] != 1 && thisSpawn.memory.spawnType != name) {
                roomQueue[name] = 1;
                console.log(`add ${name} to queue`);
              }
            }
          } else if (carrys.length < sources.length) {
            var name = 'carry';
            if (roomQueue[name] == 1 && thisSpawn.memory.spawnType == 'none') {
              if (enerA > 100) {
                var body = [MOVE, CARRY];

                thisSpawn.memory.spawnType = name;
                spawnCreep.run(spw, body, name, utils.bodyCost(body));
                roomQueue[name] = 0;
              }
            } else {
              if (roomQueue[name] != 1 && thisSpawn.memory.spawnType != name) {
                roomQueue[name] = 1;
                console.log(`add ${name} to queue`);
              }
            }
          } else if (upgraders.length < 1) {
            var name = 'upgrade';
            if (roomQueue[name] == 1 && thisSpawn.memory.spawnType == 'none') {
              if (enerA > 200) {
                var body = [MOVE, CARRY, WORK];

                thisSpawn.memory.spawnType = name;
                spawnCreep.run(spw, body, name, utils.bodyCost(body));
                roomQueue[name] = 0;
              }
            } else {
              if (roomQueue[name] != 1 && thisSpawn.memory.spawnType != name) {
                roomQueue[name] = 1;
                console.log(`add ${name} to queue`);
              }
            }
          } else if (builders.length < 1) {
            var name = 'build';
            if (roomQueue[name] == 1 && thisSpawn.memory.spawnType == 'none') {
              if (enerA > 200) {
                var body = [MOVE, CARRY, WORK];

                thisSpawn.memory.spawnType = name;
                spawnCreep.run(spw, body, name, utils.bodyCost(body));
                roomQueue[name] = 0;
              }
            } else {
              if (roomQueue[name] != 1 && thisSpawn.memory.spawnType != name) {
                roomQueue[name] = 1;
                console.log(`add ${name} to queue`);
              }
            }
          }
        }
      }
    }
  },
};

// nuevo sistema.

function checkPriorities(enerA, room, thisSpawn, picks, carrys) {
  if (thisSpawn.memory.spawnType == 'none') {
    if (room.memory.queue[pick] == 1) {
      if (picks > carrys) {
        carryCase(enerA);
      } else {
        pickCase(enerA);
      }
    } else if (room.memory.queue[upgrade] == 1) {
      return 2;
    } else if (room.memory.queue[build] == 1) {
      return 3;
    }
  }
}

function pickTier(enerA) {
  var name = 'pick';
  var tier = 0;
  if (enerA > 150) {
    tier = 1;
  }

  switch (tier) {
    case 1:
      var body = [MOVE, WORK];
      break;
  }
}
module.exports = spawnControl;
