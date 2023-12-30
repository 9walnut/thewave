const { db } = require("../models/index");
const { decodeToken, verifyToken } = require("../middleware/jwt");
const jwt = require("jsonwebtoken");

// 특정 상품 상세 페이지
exports.productPage = async (req, res) => {
  try {
    const productDetail = await db.products.findOne({
      where: { productId: req.params.productId },
    });

    const categoryName = await db.categories.findOne({
      where: { categoryId: productDetail.categoryId },
      attributes: ["categoryName"],
    });

    res.json({ productDetail, categoryName });
    console.log(categoryName);
  } catch (error) {
    console.error(error);
    res.status(500).send("상품 상세 페이지 오류");
  }
};

// 찜하기
exports.wish = async (req, res) => {
  const accessToken = req.headers["authorization"]; // 헤더에서 access 토큰값 받아오기
  const tokenCheck = await verifyToken(accessToken);
  let decodedToken;

  if (
    tokenCheck.result !== "no token" &&
    tokenCheck.result !== "signin again"
  ) {
    decodedToken = jwt.decode(tokenCheck.accessToken);
  } else res.send({ result: false }); // 토큰이 유효하지 않음

  try {
    const wishListIn = await db.wishlist.create({
      productId: req.params.productId,
      userNumber: decodedToken.userNumber,
    });

    if (wishListIn) res.send({ result: true });
    else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("찜하기 오류");
  }
};

// '장바구니 담기' 클릭
exports.cartIn = async (req, res) => {
  const { cartQuantity } = req.body;
  const productId = req.params.productId;

  console.log("productId", productId);
  const accessToken = req.headers["authorization"];
  console.log("accessToken임", accessToken);

  try {
    if (accessToken === "Bearer null") {
      return res.send({ result: "guest" }); // 토큰값 없음(==비회원)
    } else {
      const tokenCheck = await verifyToken(accessToken);

      let decodedToken;

      if (
        tokenCheck.result !== "no token" &&
        tokenCheck.result !== "signin again"
      ) {
        decodedToken = jwt.decode(tokenCheck.accessToken);
      } else return res.send({ result: false }); // 토큰이 유효하지 않음

      const userNumber = decodedToken.userNumber;
      const sameProduct = await db.carts.findOne({
        where: { userNumber: userNumber, productId: productId },
        attributes: ["cartQuantity"],
      });
      console.log("sameProduct.cartQuantity", sameProduct.cartQuantity);

      if (sameProduct) {
        const cartIn = await db.carts.update(
          {
            cartQuantity: sameProduct.cartQuantity + cartQuantity,
          },
          {
            where: { userNumber: userNumber, productId: productId },
          }
        );
        res.json({ result: true, cart: cartIn });
        console.log("cartIn 1111111", cartIn);
      } else {
        const cartIn = await db.carts.create({
          productId: productId,
          userNumber: userNumber,
          cartQuantity: cartQuantity,
          isChecked: "0",
        });
        res.json({ result: true, cart: cartIn });
        console.log("cartIn 2222222", cartIn);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("장바구니 담기 오류");
  }
};
