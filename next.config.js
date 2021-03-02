const path = require("path");

module.exports = {
  target: "serverless",
  exportPathMap: function () {
    return {
      '/': { page: '/'}
    }
  },
  webpack(config, options) {
    config.resolve.alias["server"] = path.join(__dirname, "server");
    return config;
  }
};
