import express from "express";
import AuthVerifyMiddleware from "../Middleware/AuthVerifyMiddleware.js";
import * as UserController from "../Controller/user/UserControllers.js";
import * as BrandsController from "../Controller/brands/BrandsController.js";
import * as CategoriesController from "../Controller/categories/CategoriesController.js";
import * as CustomerController from "../Controller/Customers/CustomerController.js";
import * as SupplierCotroller from "../Controller/suppliers/SupplierController.js";
import * as ExpenseTypesController from "../Controller/expenses/ExpenseTypesController.js";
import * as ExpensesController from "../Controller/expenses/ExpensesController.js";
import * as ProductsController from "../Controller/products/ProductsController.js";
import * as PurchasesController from "../Controller/purchases/PurchasesController.js";
import * as SaleController from "../Controller/sales/SalesControllers.js";
import * as ReturnController from "../Controller/returns/ReturnsController.js";

const router = express.Router();

router.post("/Registration", UserController.Registration);
router.post("/Login", UserController.Login);
router.get(
  "/ProfileDetails",
  AuthVerifyMiddleware,
  UserController.ProfileDetails
);
router.post(
  "/ProfileUpdate/:email",
  AuthVerifyMiddleware,
  UserController.ProfileUpdate
);

router.get("/RecoverVerifyEmail/:email", UserController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp", UserController.RecoverVerifyOTP);
router.get(
  "/RecoverVerifResetPssword",
  UserController.RecoverVerifResetPssword
);

//! Brands api....................
router.post("/CreateBrand", AuthVerifyMiddleware, BrandsController.CreateBrand);
router.post(
  "/UpdateBrand/:id",
  AuthVerifyMiddleware,
  BrandsController.UpdateBrand
);
router.get(
  "/BrandDropDown",
  AuthVerifyMiddleware,
  BrandsController.BrandDropDown
);
router.get(
  "/BrandList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  BrandsController.BrandList
);
router.get(
  "/DeleteBrand/:id",
  AuthVerifyMiddleware,
  BrandsController.DeleteBrand
);
//! Categories api..........
router.post(
  "/CreateCategoris",
  AuthVerifyMiddleware,
  CategoriesController.CreateCategoris
);
router.post(
  "/UpdateCategoris/:id",
  AuthVerifyMiddleware,
  CategoriesController.UpdateCategoris
);
router.get(
  "/CategorisDropDown",
  AuthVerifyMiddleware,
  CategoriesController.CategorisDropDown
);
router.get(
  "/CategorisList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  CategoriesController.CategorisList
);
router.get(
  "/DeleteCategories/:id",
  AuthVerifyMiddleware,
  CategoriesController.DeleteCategories
);
//! Customers api..........
router.post(
  "/CreateCustomers",
  AuthVerifyMiddleware,
  CustomerController.CreateCustomers
);
router.post(
  "/UpdateCustomers/:id",
  AuthVerifyMiddleware,
  CustomerController.UpdateCustomers
);
router.get(
  "/CustomersDropDown",
  AuthVerifyMiddleware,
  CustomerController.CustomersDropDown
);
router.get(
  "/CustomersList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  CustomerController.CustomersList
);
router.get(
  "/DeleteCustomer/:id",
  AuthVerifyMiddleware,
  CustomerController.DeleteCustomer
);
//! Suppliers api..........
router.post(
  "/CreateSupplier",
  AuthVerifyMiddleware,
  SupplierCotroller.CreateSupplier
);
router.post(
  "/UpdateSupplier/:id",
  AuthVerifyMiddleware,
  SupplierCotroller.UpdateSupplier
);
router.get(
  "/SupplierDropDown",
  AuthVerifyMiddleware,
  SupplierCotroller.SupplierDropDown
);
router.get(
  "/SupplierList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  SupplierCotroller.SupplierList
);
router.get(
  "/DeleteSupplier/:id",
  AuthVerifyMiddleware,
  SupplierCotroller.DeleteSupplier
);
//! Expense Types api..........
router.post(
  "/CreateExpenseTypes",
  AuthVerifyMiddleware,
  ExpenseTypesController.CreateExpenseTypes
);
router.post(
  "/UpdateExpenseTypes/:id",
  AuthVerifyMiddleware,
  ExpenseTypesController.UpdateExpenseTypes
);
router.get(
  "/ExpenseTypesDropDown",
  AuthVerifyMiddleware,
  ExpenseTypesController.ExpenseTypesDropDown
);
router.get(
  "/ExpenseTypesList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  ExpenseTypesController.ExpenseTypesList
);

//Expenses api + Expense Types (add to add )....................
router.post(
  "/CreateExpeness",
  AuthVerifyMiddleware,
  ExpensesController.CreateExpeness
);
router.post(
  "/UpdateExpenses/:id",
  AuthVerifyMiddleware,
  ExpensesController.UpdateExpenses
);
router.get(
  "/ExpensesList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  ExpensesController.ExpensesList
);
router.get(
  "/DeleteExpense/:id",
  AuthVerifyMiddleware,
  ExpensesController.DeleteExpense
);

//! Products.............................
router.post(
  "/CreateProducts",
  AuthVerifyMiddleware,
  ProductsController.CreateProducts
);
router.post(
  "/UpdateProducts/:id",
  AuthVerifyMiddleware,
  ProductsController.UpdateProducts
);
router.get(
  "/ProductList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  ProductsController.ProductList
);
router.get(
  "/DeleteProduct/:id",
  AuthVerifyMiddleware,
  ProductsController.DeleteProduct
);

//! Purchases .......................
router.post(
  "/CreatePurchases",
  AuthVerifyMiddleware,
  PurchasesController.CreatePurchases
);
router.get(
  "/PurchasesList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  PurchasesController.PurchasesList
);
router.get(
  "/PurchasesDelete/:id",
  AuthVerifyMiddleware,
  PurchasesController.PurchasesDelete
);

//! Sale api ...................................
router.post("/CreateSales", AuthVerifyMiddleware, SaleController.CreateSales);
router.get(
  "/SalesList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  SaleController.SalesList
);
router.get(
  "/SalesDelete/:id",
  AuthVerifyMiddleware,
  SaleController.SalesDelete
);
//! Returns api ...................................
router.post(
  "/CreateReturns",
  AuthVerifyMiddleware,
  ReturnController.CreateReturns
);
router.get(
  "/ReturnsList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  ReturnController.ReturnsList
);
router.get(
  "/ReturnDelete/:id",
  AuthVerifyMiddleware,
  ReturnController.ReturnDelete
);

export default router;
