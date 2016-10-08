
exports.up = function(knex, Promise) {
	return knex.schema.createTable('entries', function (table) {
		table.increments().primary();
		table.datetime('date').notNull();
		table.string('author').notNull();
		table.string('image_url');
		table.string('text');
		table.string('status').notNull();
		table.text('data');
		table.timestamps();
	})
};

exports.down = function(knex, Promise) {
	return knex.dropTable('entries');
};

