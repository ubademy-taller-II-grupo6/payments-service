function schema() {
  return {
    params: {
      type: "object",
      properties: {
        senderId: {
          type: "integer",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["senderId", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    const senderWallet = await walletService.getWallet(req.body.senderId)
    return contractInteraction.deposit(senderWallet, req.body.amountInEthers);
  };
}

module.exports = { schema, handler };
