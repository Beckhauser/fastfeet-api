module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'recipient',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
