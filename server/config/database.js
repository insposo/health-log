module.exports = {
	client: 'mysql',
	debug: false,
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		charset: 'utf8'
	},
	pool: { min: 1, max: 2 },
	migrations: {
		directory: 'database/migrations'
	},
	seeds: {
		directory: 'database/seeds'
	}
};