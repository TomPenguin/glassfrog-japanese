import { ConfigurationFactory } from "webpack";
import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";

const config: ConfigurationFactory = () => {
  return {
    entry: {
      sideBar: path.join(__dirname, "src", "contents", "sideBar.ts"),
      appHeader: path.join(__dirname, "src", "contents", "appHeader.ts"),
      tabNavigation: path.join(
        __dirname,
        "src",
        "contents",
        "tabNavigation.ts"
      ),
      overview: path.join(
        __dirname,
        "src",
        "contents",
        "overview.ts"
      ),
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /.ts$/,
          use: "ts-loader",
          exclude: "/node_modules/",
        },
      ],
    },
    resolve: {
      extensions: ["ts", "js"],
    },
    plugins: [new CopyWebpackPlugin([{ from: "public", to: "." }])],
  };
};

export default config;
