module.exports = (app) => {
  app.post("/signup", (req, res) => {
    console.log("signup api");
    res.send("signup api");
  });
};
