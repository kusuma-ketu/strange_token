const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StrangeToken", function () {
  let paymentToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // Deploy a new PaymentToken contract before each test
  beforeEach(async function () {
    // Get the signers from Hardhat
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy the PaymentToken contract
    const PaymentToken = await ethers.getContractFactory("PaymentToken");
    paymentToken = await PaymentToken.deploy("MyToken", "MTK");
  });

  // Test that the deployment was successful
  describe("Deployment", function () {
    it("Should set the name and symbol of the token", async function () {
      expect(await paymentToken.name()).to.equal("MyToken");
      expect(await paymentToken.symbol()).to.equal("MTK");
    });
  });

  // Test the basic token functionalities
  describe("Token", function () {
    // Test that the initial supply was minted to the owner
    it("Should mint the initial supply to the owner", async function () {
      expect(await paymentToken.balanceOf(owner.address)).to.equal(1000000);
    });

    // Test that a transfer of tokens was successful
    it("Should transfer tokens between accounts", async function () {
      // Transfer 100 tokens from owner to addr1
      await paymentToken.transfer(addr1.address, 100);

      // Check that the balances were updated accordingly
      expect(await paymentToken.balanceOf(owner.address)).to.equal(999900);
      expect(await paymentToken.balanceOf(addr1.address)).to.equal(100);
    });

    // Test that an approval of tokens was successful
    it("Should approve spending of tokens", async function () {
      // Approve addr1 to spend 100 tokens from owner's account
      await paymentToken.approve(addr1.address, 100);

      // Check that the allowance was set correctly
      expect(await paymentToken.allowance(owner.address, addr1.address)).to.equal(100);
    });

    // Test that a transfer from one account to another was successful
    it("Should transfer tokens from one account to another", async function () {
      // Approve addr1 to spend 100 tokens from owner's account
      await paymentToken.approve(addr1.address, 100);

      // Transfer 50 tokens from owner to addr2 using addr1's allowance
      await paymentToken.connect(addr1).transferFrom(owner.address, addr2.address, 50);

      // Check that the balances were updated accordingly
      expect(await paymentToken.balanceOf(owner.address)).to.equal(999950);
      expect(await paymentToken.balanceOf(addr2.address)).to.equal(50);
      expect(await paymentToken.allowance(owner.address, addr1.address)).to.equal(50);
    });
  });
});
