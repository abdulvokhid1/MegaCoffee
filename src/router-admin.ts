import express from "express";
const routerAdmin = express.Router();

import coffeeController from "./controllers/coffee.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";
/** Restaurant*/
routerAdmin.get("/", coffeeController.goHome);
routerAdmin
  .get("/login", coffeeController.getLogin)
  .post("/login", coffeeController.processLogin);
routerAdmin
  .get("/signup", coffeeController.getSignup)
  .post(
    "/signup",
    makeUploader("members").single("memberImage"),
    coffeeController.processSignup
  );

routerAdmin.get("/logout", coffeeController.logout);

routerAdmin.get("/check-me", coffeeController.checkAuthSession);

/** Product */
routerAdmin.get(
  "/product/all",
  coffeeController.verifyRestaurant,
  productController.getAllProducts
);

routerAdmin.post(
  "/product/create",
  coffeeController.verifyRestaurant,
  makeUploader("products").array("productImages", 5),
  productController.createNewProduct
);

routerAdmin.post(
  "/product/:id",
  coffeeController.verifyRestaurant,
  productController.updateChosenProduct
);

/** User */

routerAdmin.get(
  "/user/all",
  coffeeController.verifyRestaurant,
  coffeeController.getUsers
);
routerAdmin.post(
  "/user/edit",
  coffeeController.verifyRestaurant,
  coffeeController.updateChosenUser
);

export default routerAdmin;
