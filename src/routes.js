import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:id",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/myrecipes",
    name: "MyRecipes",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path: "/familyrecipes",
    name: "MyFamilyRecipes",
    component: () => import("./pages/MyFamilyRecipesPage"),
  },
  {
    path: "/favoriterecipes",
    name: "MyFavoriteRecipes",
    component: () => import("./pages/MyFavoriteRecipesPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
