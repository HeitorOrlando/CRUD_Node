(async () => {
  const db = require("./db");

  console.log("INSERT CLIENTES");
  await db.insertCustomer({ nome: "Pessoa y", idade: 22, uf: "ES" });

  console.log("");

  console.log("UPDATE CLIENTES");
  result = await db.updateCustomer(1, {
    nome: "Pessoa x",
    idade: 30,
    uf: "SP",
  });
  console.log(result);

  console.log("");

  console.log("DELETE CLIENTES");
  result = await db.deleteCustomer(8);
  console.log(result);

  console.log("");

  console.log("SELECT CLIENTES");
  const clientes = await db.selectCustomer();
  console.log(clientes);
})();
