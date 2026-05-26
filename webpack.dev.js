// Stuffs that only the dev environment need
import { merge } from "webpack-merge";
import common from "./webpack.common.js"

// later combine all config files into one final config (merge)
export default merge(common, {
  mode: "development",

  // for the webpack-dev-server
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
});
