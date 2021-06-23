var roleHarvester = require('role.harvester');
var roleWorker3 = require('role.worker3');
var roleCarrier = require('role.carrier');
var roleUpgrader = require('role.upgrader');


var maxHarvesters = 2;
var maxWorker3s = 3;
var maxCarriers = 1;
var maxUpgraders = 2;

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var worker3s = _.filter(Game.creeps, (creep) => creep.memory.role == 'workerthree');
    var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    // console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < maxHarvesters) {
        spawnCreepWithType('harvester');
    } else if(harvesters.length >= maxHarvesters && worker3s.length < maxWorker3s) {
        spawnCreepWithType('workerthree');
    } else if(worker3s.length >= maxWorker3s && carriers.length < maxCarriers) {
        spawnCreepWithType('carrier');
    } else if (carriers.length >= maxCarriers && upgraders.length < maxUpgraders) {
        spawnCreepWithType('upgrader');
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'workerthree') {
            roleWorker3.run(creep);
        }
        if(creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
    }
}

function spawnCreepWithType(type) {
    var body =[];
    switch(type) {
        case 'harvester':
        case 'builder':
        case 'carrier': body = [WORK, CARRY, MOVE];
            break;
        case 'workerthree': body = [WORK, WORK, WORK];
            break;
    }
    var newName = type[0].toUpperCase() + type.substring(1) + Game.time;
    Game.spawns['Spawn1'].spawnCreep(body, newName, 
        {memory: {role: type}});
    if(Game.spawns['Spawn1'].spawning) {
        console.log('Spawning new ' + type + ': ' + newName);
    }
        
        
}