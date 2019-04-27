const Team = require('../models/team');
const Rd = require('../models/rd');
const responsibleFor = require('../models/responsibleFor');
const db = require('../util/database');

exports.getTeams = (req, res, next) => {
  Team.fetchAll().then(([teams]) => {
    res.render('team/show', {
      teams: teams
    });
  }).catch((err) => {
  	console.log(err);
  });
};

exports.getTeam = async (req, res, next) => {
  try {
	  const [team] = await Team.findById(req.params.teamId);
	  const [rds] = await Rd.findByTeamId(req.params.teamId); 
    const [products] = await responsibleFor.findByteamId(req.params.teamId);
	    res.render('team/showTeam', {
	      team: team[0],
	      rds: rds,
        prods: products
	    });  	
	}	
  catch(err) {
  	console.log(err);
  };
};