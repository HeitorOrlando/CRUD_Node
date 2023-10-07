const { conexao } = require("./conexao");

async function connect() {
  if (global.connection && global.connection.state != "disconnected")
    return global.connection;

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection(conexao);
  console.log("Conectado ao Data Base");
  global.connection = connection;
  return connection;
}

async function selectCustomer() {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM clientes;");
  return rows;
}

async function insertCustomer(customer) {
  const conn = await connect();
  const sql = "INSERT INTO clientes(nome,idade,uf) VALUES (?,?,?);";
  const values = [customer.nome, customer.idade, customer.uf];
  const [rows] = await conn.query(sql, values);
  console.log("A pessoa >>>" + customer.nome + "<<< foi inserida ao banco de dados!")
  return rows;
}

async function updateCustomer(id, customer) {
  const conn = await connect();
  const sql = "UPDATE clientes SET nome=?, idade=?, uf=? WHERE id=?";
  const values = [customer.nome, customer.idade, customer.uf, id];
  const [rows] = await conn.query(sql, values);
  return rows;
}

async function deleteCustomer(id) {
  const conn = await connect();
  const sql = "DELETE FROM clientes WHERE id=?";
  const values = [id];
  const [rows] = await conn.query(sql, values);
  return rows;
}

module.exports = {
  connect,
  selectCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
};
