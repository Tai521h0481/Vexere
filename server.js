const express = require("express");
const app = express();
const {rootRouter} = require("./routers/root.router");
const PORT = 3000;
const {sequelize} = require("./models");
const path = require("path");
app.use(express.json());
app.use("/api/vexere", rootRouter);

const staticPath = path.join(__dirname, "public");
app.use("/public" , express.static(staticPath));

// when access to localhost:3000 => show index.html in public/client/index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "client", "index.html"));
});

app.listen(PORT, async () =>{
    console.log(`running in ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});