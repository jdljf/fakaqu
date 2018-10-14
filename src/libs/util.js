import config from "../config/config";
const util = {};
util.ajaxUrl =
  process.env.VUE_APP_MODE === "development"
    ? config.localHost
    : config.prodHost;

export default util;
