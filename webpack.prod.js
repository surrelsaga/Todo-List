import { merge } from "webpack-merge";
import common from ".webpack.common.js";

// later combine all config files into one final config (merge)
export default merge(common, {
    mode: "production",
});
