const ResponsibleBy = require('../models/responsibleBy');
const Team = require('../models/team');

exports.addResponsibleBy = async (req, res, next) => {
  if(typeof req.body.teamIds === "string") {
    const responsibleBy = new ResponsibleBy(req.body.productId, req.body.teamIds);
    const [responsibleBys] = await responsibleBy.save();
  } else {
    req.body.teamIds.forEach(async (teamId) => {
      const responsibleBy = new ResponsibleBy(req.body.productId, teamId);
      const [responsibleBys] = await responsibleBy.save();
    });     
  }
  res.redirect(`/sellTo/new?productId=${req.body.productId}`);
}

exports.newResponsibleBy = (req, res, next) => {	
  Team.fetchAll().then(([teams]) => {
    res.render('responsibleBy/new', {
      productId: req.query.productId,
      teams: teams
    });
  }).catch((err) => {
  	console.log(err);
  });
};