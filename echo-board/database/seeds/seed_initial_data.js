exports.seed = async function(knex) {
  // Truncate all tables to reset auto-increment and clean data
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0'); // disable FK temporarily

  await knex.raw('TRUNCATE TABLE feedback_comments');
  await knex.raw('TRUNCATE TABLE feedback_ratings');
  await knex.raw('TRUNCATE TABLE feedback');
  await knex.raw('TRUNCATE TABLE users');
  await knex.raw('TRUNCATE TABLE products');
  await knex.raw('TRUNCATE TABLE roles');

  await knex.raw('SET FOREIGN_KEY_CHECKS = 1'); // re-enable FK

  // Insert roles with explicit IDs
  await knex('roles').insert([
    { id: 1, role_name: 'Admin' },
    { id: 2, role_name: 'User' },
    { id: 3, role_name: 'Moderator' },
  ]);

  // Insert products
  await knex('products').insert([
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' },
  ]);

  // Insert users
  await knex('users').insert([
    { id: 1, name: 'Alice', email: 'alice@example.com', role_id: 1 },
    { id: 2, name: 'Bob', email: 'bob@example.com', role_id: 2 },
  ]);

  // Insert feedback and related data
  const feedbackEntries = [
    { user_id: 1, product_id: 1, rating: 5, comment: 'Great product!' },
    { user_id: 2, product_id: 2, rating: 3, comment: 'Needs improvement.' },
  ];

  for (const entry of feedbackEntries) {
    const [feedbackId] = await knex('feedback').insert({
      user_id: entry.user_id,
      product_id: entry.product_id,
    });

    const insertedFeedbackId = typeof feedbackId === 'object' ? feedbackId.insertId : feedbackId;

    await knex('feedback_ratings').insert({
      feedback_id: insertedFeedbackId,
      rating: entry.rating,
    });

    await knex('feedback_comments').insert({
      feedback_id: insertedFeedbackId,
      comment: entry.comment,
    });
  }
};
