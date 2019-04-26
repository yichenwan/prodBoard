const ResponsibleBy = require('../models/responsibleBy');
const Team = require('../models/team');

exports.addResponsibleBy = async (req, res, next) => {
  if(typeof req.body.ids === "string") {
    const responsibleBy = new ResponsibleBy(req.body.productId, req.body.teamIds);
    const [responsibleBys] = await responsibleBy.save();
  } else {
    req.body.teamIds.forEach(async (teamId) => {
      const responsibleBy = new ResponsibleBy(req.body.productId, teamId);
      const [responsibleBys] = await responsibleBy.save();
    });     
  }
  if (req.update) {
    return res.redirect('/');
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

exports.editResponsibleBy = async (req, res, next) => {  
  try {
  const [teams] = await Team.fetchAll();
  const [responsibles] = await ResponsibleBy.findByProductId(req.params.productId);
    res.render('responsibleBy/edit', {
      productId: req.params.productId,
      teams: teams,
      responsibles: responsibles
    });
  }
  catch (err) {
    console.log(err);
  };
};

exports.deleteResponsibleBy = async (req, res, next) => { 
  try {
    const [responsibles] = await ResponsibleBy.deleteByProductId(req.params.productId);
    req.update = true; 
    next();

  } catch {

  }
};  