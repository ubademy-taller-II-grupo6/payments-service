const { Pool } = require("pg")

const config = {
  user: "postgres",
  host: "localhost",
  database: "backend-taller2",
  password: "98684",
  port: 5432
};

const pool = new Pool(config)

const insertWallet = async (user_id, address, privateKey) => {
  try {
    await pool.query(`insert into wallets (user_id, address, private_key) values ($1, $2, $3)`, [user_id, address, privateKey])
  }catch(error){
    console.log(error)
  }
}


const getWallet = async (user_id) => {
  try {
    const res = await pool.query('select * from wallets where user_id = $1', [user_id]);
    return res.rows[0]
  } catch(error) {
    console.log(error)
  }
};



const getWallets = async () => {
  try {
    const res = await pool.query('select * from wallets');
    return res.rows
  } catch(error) {
    console.log(error)
  }
};

module.exports = {
  insertWallet,
  getWallet,
  getWallets
};


