const MAIN_PRODUCT = document.getElementById("main");
const ALL_PRODUCTS = document.getElementById("products");
const EDIT = document.getElementById("edit-page");
const ADD = document.getElementById("add-page");
const PRODUCT = document.getElementById("product-page");

const Router = (page) => {
  MAIN_PRODUCT.className = "d-none";
  EDIT.className = "d-none";
  ADD.className = "d-none";
  PRODUCT.className = "d-none";
  if (page === "MAIN_PRODUCT") return (MAIN_PRODUCT.className = "MAIN_PRODUCT");
  if (page === "EDIT") return (EDIT.className = "EDIT");
  if (page === "ADD") return (ADD.className = "ADD");
  if (page === "PRODUCT") return (PRODUCT.className = "PRODUCT");
};
const createNewElement = (type, ancorElemet, value = "") => {
  const element = document.createElement(type);
  element.innerText = value;
  ancorElemet.appendChild(element);
  return element;
};

const createCardProduct = (product) => {
  const cardProduct = createNewElement("div", ALL_PRODUCTS);
  cardProduct.className = "product";
  const productImage = createNewElement("img", cardProduct);
  productImage.className = "images";
  productImage.src = product.image;
  const productTitle = createNewElement("h3", cardProduct, product.title);
  const underLine = createNewElement("hr", cardProduct);
  underLine.id = "underLineId";
  const boxIconsEditAndAdd = createNewElement("div", cardProduct);
  const deleteIcon = createNewElement("i", boxIconsEditAndAdd, "delete");
  deleteIcon.className = "material-icons";
  const editIcon = createNewElement("i", boxIconsEditAndAdd, "edit");
  editIcon.className = "material-icons";
  cardProduct.addEventListener("click", () => {
    productPage(product);
  });
};
const getReqAllProducts = async (url, reqType) => {
  try {
    const response = await fetch("https://meirprotject.onrender.com/api/products" + url, {
      method: reqType,
    });
    if (!response.ok) throw new Error("Error: data not loud");
    const data = await response.json();
    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

const createAllProducts = async () => {
  const productsList = await getReqAllProducts("/all", "GET");
  for (let i = 0; i < productsList.length; i++) {
    createCardProduct(productsList[i]);
  }
};

const productPage = (product) => {
  Router("PRODUCT");

  const headerProduct = createNewElement("div", PRODUCT);
  const headerProducTitle = createNewElement(
    "div",
    headerProduct,
    product.title
  );
  headerProducTitle.id = "header-Produc-Title";
  const mainInfo = createNewElement("div", PRODUCT);
  mainInfo.className = "mian-info";
  const productDetails = createNewElement("div", mainInfo);
  productDetails.className = "product-Details";
  const productImage = createNewElement("img", productDetails);
  productImage.src = product.image;
  productImage.alt = product.title + " image";
  productImage.className = "product-Image-Details-Page";
  const productInfo = createNewElement("div", productDetails);
  const h2Title = createNewElement("h2", productInfo, "Title");
  const pTitle = createNewElement("p", productInfo, product.title);
  const h2Description = createNewElement("h2", productInfo, "Description");
  const pDescription = createNewElement("p", productInfo, product.description);
  const h2Category = createNewElement("h2", productInfo, "Category");
  const pCategory = createNewElement("p", productInfo, product.category);
  const h2Price = createNewElement("h2", productInfo, "Price");
  const pPrice = createNewElement("p", productInfo, product.price);
};

createAllProducts();
