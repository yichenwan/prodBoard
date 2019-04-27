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
	for (let i = 0; i < numOfProdcut; i++) {
		let mgrId = Math.floor(Math.random() * numOfProdcutMgr) + 1;
		let random =  Math.floor(Math.random() * 3);
		let product;
		if (random === 0)
		   product = new Product(faker.commerce.productName(), faker.commerce.productAdjective(), faker.date.future(), random,  mgrId);
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
		let team = new Team(faker.commerce.department(), faker.name.jobArea());
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
	for (let i = 0; i < numOfRd; i++) {
		let teamId = Math.floor(Math.random() * numOfTeam) + 1;
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
	for (let i = 0; i < numOfTeam; i++) {
		const random =  Math.floor(Math.random() * (numOfProdcut)) + 1;
		const responsibleFor = new ResponsibleFor(random, i + 1);
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
	for (let i = 0; i < numOfClient; i++) {
		const randomIdx1 =  Math.floor(Math.random() * (numOfProdcut)) + 1;
		// const randomIdx2 =  Math.floor(Math.random() * (numOfClient)) + 1;
		const cur = new Date();
		const end = new Date();
		end.setFullYear(end.getFullYear() + 1);
		const randomDate = setRandomDate(cur, end);
		const startDate = moment(cur).format('YYYY-MM-DDTHH:mm:ss');
		const endDate = moment(randomDate).format('YYYY-MM-DDTHH:mm:ss')
		const sellTo = new SellTo(randomIdx1, i + 1, startDate,
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