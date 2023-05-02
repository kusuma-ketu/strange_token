const StrangeToken = artifacts.require("StrangeToken");

module.exports = function (deployer) {
  deployer.deploy(StrangeToken, "1e18"); // 1 million tokens with 18 decimal places
};
