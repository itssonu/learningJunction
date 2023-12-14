module.exports = {
  port: process.env.PORT,
  db: {
    url: process.env.DB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || "development_secret",
    expiry: "7d",
  },
  auth: {
    saltRound: Number(process.env.SALT_ROUND),
  },
};
