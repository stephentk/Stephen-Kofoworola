require("dotenv").config();
console.log(process.env.DB_PASS);
const app = require("./app");
const { sequelize } = require("./models");
const PORT = process.env.PORT || 3000;
async function start() {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error("Failed to start", err);
    process.exit(1);
  }
}
start();
