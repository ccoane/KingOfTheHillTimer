var interval = null;
var teamsArray = [new timeObject('Red'), new timeObject('Blue')];

const intervalRefreshValue = 1000;

// TODO: Rename this object
// Constructor for a timeObject
function timeObject (teamName) {
    this.teamName = teamName;
    this.isActive = false;
    this.timerStartedAt = null;
    this.elapsedTimeInSeconds = 0;
}

module.exports = {
    startTimer: function (teamName) {
        init();
        return startTimerForTeam(teamName);
    },
    getTimerForTeam: function(teamName) {
        return getTimerForTeam(teamName);
    },
    resetAndStopTimers: function() {
        return resetAndStopTimers();
    }
};

var init = function () {
    teamsArray.forEach(team => {
        console.info(team.teamName);
    });
};

var getTimeInSeconds = function (time) {
    console.info(`getting time in sec for: ${time}`);
    return time / 1000;
};

var getTimeDifferenceInSeconds = function (time) {
    var diff = (Date.now() - time) / 1000;
    return diff;
};

// TO DO: Break apart this function.  It's doing too many actions.
var startTimerForTeam = function (teamName) {
    var activeTeam = null;

    teamsArray.forEach(team => {
        if (team.teamName == teamName) {
            activeTeam = team;
            team.isActive = true;
            team.timerStartedAt = Date.now();
        } else {
            deactivateTeam(team);
        }
    });

    clearInterval(interval);
    startTimerInterval(activeTeam);  
    return activeTeam;
};

// TODO: Expound on what "deactivating" a team consists of.  If it's
// just marking the team as inactive, then remove this function.
var deactivateTeam = (teamTimer) => {
    teamTimer.isActive = false;
};

var startTimerInterval = (teamTimer) => {
    interval = setInterval(() => {
        // This isn't the most accurate way of tracking elapsed time
        // but is sufficient for now. 
        teamTimer.elapsedTimeInSeconds++; 
        console.info(teamTimer);
    }, intervalRefreshValue);
};

// TODO: Rename
var resetAndStopTimers = function () {
    try {
        teamsArray.forEach(team => {
            team.elapsedTimeInSeconds = 0;
            team.isActive = false;
            team.timerStartedAt = null;
    });
        clearInterval(interval);
        return true;
    } catch (error) {
        console.log(`Error in resetAndStopTimers: ${error}`);
    }
};

var getTimerForTeam = (teamName) => {
    var teamFound = null;
    teamsArray.forEach(team => {
        if (team.teamName == teamName) {
            teamFound = team;
        }
    });
    return teamFound != null ? teamFound : `Team ${teamName} was not found.`;
};