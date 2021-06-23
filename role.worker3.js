var roleWorker3 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carriers');
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            for(var i = 0; i < carriers.length; i++) {

            }
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#FFFF00'}});
        }
	}
};

module.exports = roleWorker3;