// Here the web service should be setup and routes declared
const express = require("express");
const PORT = 5000;

const app = express();

app.use(express.json());

//Routes - arts, artists, customers, auctions
const artRoutes = require("./routes/arts");
const artistRoutes = require("./routes/artists");
const auctionRoutes = require("./routes/auctions");
const customerRoutes = require("./routes/customers");

app.use("/api/arts", artRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("/api/customers", customerRoutes);

console.log(`App is running on: http://localhost:${PORT}`);
app.listen(PORT);
