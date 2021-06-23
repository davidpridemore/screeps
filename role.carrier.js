var roleWorker3 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const worker3s = _.filter(Game.creeps, (creep) => creep.memory.role == 'workerthree');
        const sources = creep.room.find(FIND_SOURCES);
        
        for(var i = 0; i < worker3s.length; i++) {
            if(creep.pull(worker3s[i]) == ERR_NOT_IN_RANGE) {
                console.log('carrier not in range of pullable creep');
                creep.moveTo(worker3s[i], {visualizePathStyle: {stroke: 'FFFFFF'}});
            } else {
                creep.memory.pulling = true;
                console.log('carrier in range of pullable creep');
                if(worker3s[i].harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    console.log('workerthree out of resource range');
                    creep.moveTo(sources[0].pos.x + 1, sources[0].pos.y + 1, {visualizePathStyle: {stroke: '#FFFF00'}});
                    creep.pull(worker3s[i]);
                    worker3s[0].move(creep);
                } else {
                    console.log(worker3s[i].name + " is in resource range");

                }
            }
        }        
        
	}
};

module.exports = roleWorker3;