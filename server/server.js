import app from "./app";
import config from "./config/index";

const { PORT } = config;

app.listen(PORT, () => {
  console.log(`Port ${PORT} server is working!!`);
});
