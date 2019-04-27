const createTables = require('./util/createTable');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const seedDB = require('./util/seedDB');
const app = express();
const moment = require("moment");
const methodOverride  = require("method-override");

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(function(req, res, next) {
 	res.locals.prods = null;
 	res.locals.prodMgrs = null;
 	res.locals.teams = null;
 	res.locals.clients = null; 	
 	res.locals.state = null; 	
 	res.locals.moment = moment;
 	res.locals.orders = null;
 	res.locals.url = req.url;
 	next();
 });
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

createTables().then(() => {
	seedDB();
}).catch((err) => {
	throw err;
});

const productRoutes = require('./routes/products');
const productsMgrRoutes = require('./routes/productsMgrs');
const teamsRoutes = require('./routes/teams');
const clientsRoutes = require('./routes/clients');
const responsibleForRoutes = require('./routes/responsibleFor');
const sellToRoutes = require('./routes/sellTo');
const indexRoutes = require('./routes/index');

app.use('/products', productRoutes);
app.use('/', indexRoutes);
app.use('/productsMgrs', productsMgrRoutes);
app.use('/teams', teamsRoutes);
app.use('/clients', clientsRoutes);
app.use('/responsibleFor', responsibleForRoutes);
app.use('/sellTo', sellToRoutes);


app.listen(3000, () => {
	console.log('server is running');
});