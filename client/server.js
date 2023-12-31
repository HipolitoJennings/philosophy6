require("core-js/fn/object/assign");

const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../webpack.config");

let isInitialCompilation = true;

const compiler = webpack(config);

new WebpackDevServer(compiler, config.devServer).listen(
  config.devServer.port,
  "localhost",
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Listening at localhost:" + config.devServer.port);
  }
);

compiler.plugin("done", () => {
  if (isInitialCompilation) {
    console.log("\n✓ The bundle is now ready for serving!\n");
    console.log(
      "  Open in iframe mode:\t\x1b[33m%s\x1b[0m",
      "http://localhost:" + config.devServer.port + "/webpack-dev-server/"
    );
    console.log(
      "  Open in inline mode:\t\x1b[33m%s\x1b[0m",
      "http://localhost:" + config.devServer.port + "/\n"
    );
    console.log(
      "  \x1b[33mHMR is active\x1b[0m. The bundle will automatically rebuild and live-update on changes."
    );
  }
  isInitialCompilation = false;
});
