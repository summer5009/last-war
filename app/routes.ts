import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("test", "test/index.tsx"),
  ...prefix("user", [index("user/index.tsx"), route("reg", "./user/reg.tsx")]),
  ...prefix("dessert", [
    index("dessert/index.tsx"),
    route("reg", "./dessert/reg.tsx"),
  ]),
] satisfies RouteConfig;
