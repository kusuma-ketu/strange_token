const StrangeToken = artifacts.require("StrangeToken");

module.exports = function (deployer) {
  deployer.deploy(StrangeToken, "1000000000000000000000000"); // 1 million tokens with 18 decimal places
};
