const Client = require('../models/client');
const db = require('../util/database');

exports.getClients = (req, res, next) => {
  Client.fetchAll().then(([clients]) => {
    res.render('client/show', {
      clients: clients
    });
  }).catch((err) => {
  	console.log(err);
  });
};

exports.addClient = (req, res, next) => {
	const client = new Client(req.body.name, req.body.attribute, req.body.email);
	client.save().then(([clients]) => {
		if (req.body.productId) {
			res.redirect(`/sellTo/new?productId=${req.body.productId}`);		
		}  else {
			res.redirect(`/clients`);			
		}
	})
}

exports.newClient = (req, res, next) => {
	console.log(req.query.productId);
	res.render('client/new',{
		productId: req.query.productId
	});
};