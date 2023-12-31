const http = require("http");
// const https = require("https");
// const fs = require("fs");
const express = require("express");
const app = express();
const redis = require("redis");
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const PORT = 8001;
const https_port = 8000;

// const options = {
//   key: fs.readFileSync("./rootca.key"),
//   cert: fs.readFileSync("./rootca.crt"),
// };

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/thewavemarket.co.kr/privkey.pem"),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/thewavemarket.co.kr/fullchain.pem"
  ),
};
const server = http.createServer(app);
const https_server = https.createServer(options, app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 60 * 1000,
    },
  })
);

// app.use((req, res, next) => {
//   if (!req.secure) {
//     // HTTP 요청을 HTTPS로 리디렉션
//     const redirectUrl = `https://${req.headers.host.replace(":8000", ":8001")}${
//       req.url
//     }`;
//     return res.redirect(redirectUrl);
//   }
//   next();
// });

const authRouter = require("./routes/auth");
// app.use("/", authRouter);
app.use("/api", authRouter);

const mypageRouter = require("./routes/mypage");
// app.use("/mypage", mypageRouter);
app.use("/api/mypage", mypageRouter);

const categoryRouter = require("./routes/category");
// app.use("/category", categoryRouter);
app.use("/api/category", categoryRouter);

const productRouter = require("./routes/product");
// app.use("/product", productRouter);
app.use("/api/product", productRouter);

const paymentRouter = require("./routes/payment");
// app.use("/payment", paymentRouter);
app.use("/api/payment", paymentRouter);

const adminRouter = require("./routes/admin");
// app.use("/admin", adminRouter);
app.use("/api/admin", adminRouter);

const cartRouter = require("./routes/cart");
// app.use("/cart", cartRouter);
app.use("/api/cart", cartRouter);

server.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});

https_server.listen(https_port, function () {
  console.log(`HTTPS Server Open: ${https_port}`);
});
