const ResponsibleFor = require('../models/responsibleFor');
const Team = require('../models/team');

exports.addresponsibleFor = async (req, res, next) => {
  if(typeof req.body.ids === "string") {
    const responsibleFor = new ResponsibleFor(req.body.productId, req.body.teamIds);
    const [responsibleFors] = await responsibleFor.save();
  } else {
    req.body.teamIds.forEach(async (teamId) => {
      const responsibleFor = new ResponsibleFor(req.body.productId, teamId);
      const [responsibleFors] = await responsibleFor.save();
    });     
  }
  if (req.update) {
    return res.redirect('/');
  }
  res.redirect(`/sellTo/new?productId=${req.body.productId}`);
}

exports.newresponsibleFor = (req, res, next) => {	
  Team.fetchAll().then(([teams]) => {
    res.render('responsibleFor/new', {
      productId: req.query.productId,
      teams: teams
    });
  }).catch((err) => {
  	console.log(err);
  });
};

exports.editresponsibleFor = async (req, res, next) => {  
  try {
  const [teams] = await Team.fetchAll();
  const [responsibles] = await ResponsibleFor.findByProductId(req.params.productId);
    res.render('responsibleFor/edit', {
      productId: req.params.productId,
      teams: teams,
      responsibles: responsibles
    });
  }
  catch (err) {
    console.log(err);
  };
};

exports.deleteresponsibleFor = async (req, res, next) => { 
  try {
    const [responsibles] = await ResponsibleFor.deleteByProductId(req.params.productId);
    req.update = true; 
    next();

  } catch {

  }
};  