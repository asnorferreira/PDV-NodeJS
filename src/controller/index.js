import { getCategories } from "./functions/categories/getCategories.js";

import { getUser } from "./functions/user/getUserOwner.js";
import { postUser } from "./functions/user/postUser.js";
import { postLogin } from "./functions/user/postLogin.js";
import { putUpdate } from "./functions/user/putUpdate.js";

import { getClient } from "./functions/client/getClient.js";
import { getClientID } from "./functions/client/getClientID.js";
import { postClient } from "./functions/client/postClient.js";
import { putClient } from "./functions/client/putClient.js";

import { getProduct } from "./functions/product/getProduct.js";
import { getProductID } from "./functions/product/getProductID.js";
import { postProduct } from "./functions/product/postProduct.js";
import { putProduct } from "./functions/product/putProduct.js";
import { deleteProductID } from "./functions/product/deleteProductID.js";

import { postOrder } from "./functions/orders/postOrder.js";
import { getOrder } from "./functions/orders/getOrder.js";

export default {
  getCategories,
  getUser,
  postUser,
  postLogin,
  putUpdate,
  getClient,
  getClientID,
  postClient,
  putClient,
  getProduct,
  getProductID,
  postProduct,
  putProduct,
  deleteProductID,
  postOrder,
  getOrder,
};
