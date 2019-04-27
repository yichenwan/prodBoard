const db = require('./database');
const faker = require('faker');
const ProductMgr = require('../models/ProductMgr');
const Product = require('../models/Product');
const Team = require('../models/Team');
const Rd = require('../models/Rd');
const Client = require('../models/Client');
const ResponsibleFor = require('../models/responsibleFor');
const SellTo = require('../models/SellTo');
const numOfProdcutMgr = 5;
const numOfTeam = 7;
const numOfRd = 40;
const numOfProdcut = 8;
const numOfClient = 10;
const numOfOrder = 10;
const companyName = 'Orange';
const moment = require('moment');

const setRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const fakeProductMgrs = async () => {
	for (let i = 0; i < numOfProdcutMgr; i++) {
		const firstName = faker.name.firstName();
		let productMgr = new ProductMgr(firstName, faker.name.lastName(), `${firstName}@${companyName}.com`);
		try {
			const [result] = await productMgr.save();	
			if (i === numOfProdcutMgr)	
				return result;
		} catch (err) {
			throw err;
		}
	}
};

const fakeProduct = async () => {
	const [productMgrs] =  await ProductMgr.fetchAll();
	for (let i = 0; i < numOfProdcut; i++) {
		let id = Math.floor(Math.random() * numOfProdcutMgr);
		let mgrId = productMgrs[id].mgrId;
		let random =  Math.floor(Math.random() * 3);
		let product;
		if (random === 0)
		   product = new Product(faker.commerce.productName(), faker.lorem.sentence(), faker.date.future(), random,  mgrId);
		else if (random === 1)
		   product = new Product(faker.commerce.productName(), faker.commerce.productAdjective(), faker.date.past(), random,  mgrId);
		else
		   product = new Product(faker.commerce.productName(), faker.commerce.productAdjective(), faker.date.past(), 0,  mgrId);
		try {
			const [result] = await product.save();	
		    if (i === numOfProdcut)	
				return result;		
		} catch (err) {
			throw err;
		}
	}
};

const fakeTeam = async () => {
	for (let i = 0; i < numOfTeam; i++) {
		let team = new Team(faker.commerce.department(), faker.lorem.sentence());
		try {
			const [result] = await team.save();	
		    if (i === numOfTeam)	
				return result;		
		} catch (err) {
			throw err;
		}
	}
};

const fakeRd = async () => {
	const [teams] =  await Team.fetchAll();	
	for (let i = 0; i < numOfRd; i++) {
		let id = Math.floor(Math.random() * numOfTeam);
		let teamId = teams[id].teamId;		
		const firstName = faker.name.firstName();
		let rd = new Rd(firstName, faker.name.lastName(), `${firstName}@${companyName}.com`,  teamId);
		try {
			const [result] = await rd.save();	
		    if (i === numOfRd)	
				return result;		
		} catch (err) {
			throw err;
		}
	}
};

const fakeClient = async () => {
	for (let i = 0; i < numOfClient; i++) {
		let random =  Math.floor(Math.random() * 2);
		let client;
		if (random === 1)
			client = new Client(faker.company.companyName(), 'company', faker.internet.email());
		else
			client = new Client(faker.address.state(), 'general market', 'NAN');
		try {
			const [result] = await client.save();	
		    if (i === numOfClient)
				return result;		
		} catch (err) {
			throw err;
		}
	}
};

const fakeresponsibleFor = async () => {
	const [products] =  await Product.fetchAll();	
	const [teams] =  await Team.fetchAll();	
	for (let i = 0; i < numOfTeam; i++) {
		const randomP =  Math.floor(Math.random() * (numOfProdcut));
		const randomT =  Math.floor(Math.random() * (numOfTeam));
		const productId = products[randomP].productId;
		const teamId = teams[randomT].teamId;
		const responsibleFor = new ResponsibleFor(productId, teamId);
		try {
			const [result] = await responsibleFor.save();	
		    if (i === numOfTeam)
				return result;		
		} catch (err) {
			throw err;
		}
	}  
}; 

const fakeSellTo = async () => {
	const [products] =  await Product.fetchAll();	
	const [clients] =  await Client.fetchAll();		
	for (let i = 0; i < numOfClient; i++) {
		const randomP =  Math.floor(Math.random() * (numOfProdcut));
		const randomC =  Math.floor(Math.random() * (numOfClient));
		const productId = products[randomP].productId;
		const clientId = clients[randomC].clientId;		
		const cur = new Date();
		const end = new Date();
		end.setFullYear(end.getFullYear() + 1);
		const randomDate = setRandomDate(cur, end);
		const startDate = moment(cur).format('YYYY-MM-DDTHH:mm:ss');
		const endDate = moment(randomDate).format('YYYY-MM-DDTHH:mm:ss')
		const sellTo = new SellTo(productId, clientId, startDate,
								  endDate);
		try {
			const [result] = await sellTo.save();	
		    if (i === numOfOrder)
				return result;		
		} catch (err) {
			console.log(err);
		}			
	}  
}; 

const seedDB = async () => {
	const resultProductMgrs = await fakeProductMgrs();
	const resultProdcut = await fakeProduct();
	const resultTeam = await fakeTeam();
	const resultRd = await fakeRd();
	const resultClient = await fakeClient();
	const resultresponsibleFor = await fakeresponsibleFor();
	const resultSellTo = await fakeSellTo();
	console.log('data populated!!');
};

module.exports = seedDB;