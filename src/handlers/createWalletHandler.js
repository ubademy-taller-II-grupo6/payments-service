function schema() {
  return {
    params: {
      type: "object",
      properties: {
        user_id: {
          type: "integer",
        },
      },
    },
    required: ["user_id"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const body = await walletService.createWallet(req.params.user_id);
    return reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
