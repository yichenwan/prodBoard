const db = require('./database');

const sqlsForEntity = {
	productMgrs: `CREATE TABLE productMgrs (
		    mgrId INT PRIMARY KEY AUTO_INCREMENT,
		    firstName VARCHAR(40),
		    lastName VARCHAR(40),
		    email VARCHAR(50)
		)`,
	products:`CREATE TABLE products (
		    productId INT PRIMARY KEY AUTO_INCREMENT,
		    name VARCHAR(40),
		    description VARCHAR(500),
		    deadline DATE,
		    complete Boolean,
		    mgrId INT,
		    createDate DATETIME,	
		    FOREIGN KEY(mgrId) REFERENCES productMgrs(mgrId) ON DELETE SET NULL
		)`,
	clients:`CREATE TABLE clients (
		    clientId INT PRIMARY KEY AUTO_INCREMENT,
		    name VARCHAR(40),
		    attribute VARCHAR(20),
		    email VARCHAR(50)
		)`,
	teams:`CREATE TABLE teams (
		    teamId INT PRIMARY KEY AUTO_INCREMENT,
		    name VARCHAR(40),
		    description VARCHAR(500)
		)`,		
	rds:`CREATE TABLE rds (
		    rdId INT PRIMARY KEY AUTO_INCREMENT,
		    firstName VARCHAR(40),
		    lastName VARCHAR(40),
		    email VARCHAR(50),
		    teamId INT,
		    FOREIGN KEY(teamId) REFERENCES teams(teamId) ON DELETE SET NULL
		)`
};

const sqlsForMToN = {
	sellTo: `CREATE TABLE sellTo (
	  productId INT,
	  clientId INT,
	  startDate DATE,
	  endDate DATE,
	  createDate DATETIME,	  
	  PRIMARY KEY(productId, clientId),
	  FOREIGN KEY(productId) REFERENCES products(productId) ON DELETE CASCADE,
	  FOREIGN KEY(clientId) REFERENCES clients(clientId) ON DELETE CASCADE
	)`,
	responsibleBy: `CREATE TABLE responsibleBy (
	  productId INT,
	  teamId INT,
	  PRIMARY KEY(productId, teamId),
	  FOREIGN KEY(productId) REFERENCES products(productId) ON DELETE CASCADE,
	  FOREIGN KEY(teamId) REFERENCES teams(teamId) ON DELETE CASCADE
	)`
};

const createTable = async (tableName, sql) => {
	const [existResults] = await db.execute(`show tables like '${tableName}'`);
	if (existResults.length === 0) {
	  const [createResults] = await db.execute(sql);	
      console.log(`new ${tableName} table is created!`);	
      return createResults;						    	
	}
	return existResults;	
}

const createTables = async () => {
	try {
      const createProductMgrs = await createTable('productMgrs', sqlsForEntity.productMgrs);		
	  const createProdcuts = await createTable('products', sqlsForEntity.products);
	  const createClients = await createTable('clients', sqlsForEntity.clients);			
	  const createteams = await createTable('teams', sqlsForEntity.teams);
	  const createRds = await createTable('rds', sqlsForEntity.rds);
	  const createSellTo = await createTable('sellTo', sqlsForMToN.sellTo);
	  const createResponsibleBy = await createTable('responsibleBy', sqlsForMToN.responsibleBy);
	  return createResponsibleBy;
	} catch (err) {
		throw err;
	}
};

module.exports = createTables;