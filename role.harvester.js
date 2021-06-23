var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.energy == 0) { // energy is empty
            creep.memory.harvesting = true;
        } else if (creep.store.getFreeCapacity() == 0) { // capacity is full
            creep.memory.harvesting = false;
        } 
        
        if(creep.memory.harvesting == true) { // energy is empty
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#FFFF00'}});
            }
        } else { // energy should be full so they'll look for supplemental activities to work on
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                // Transfer to spawn or extensions with free energy capacity
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#0000ff'}});
                }
            } else {
                // Transfer energy to controller
                if(creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#0000ff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;