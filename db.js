const sqlite3 = require('sqlite3').verbose()

// cria um novo objeto para armazenamento do banco de dados
const db = new sqlite3.Database('./workshop.db')

db.serialize(function(){

  // CRIA A TABELA
  // usando template literals
  db.run(`
    CREATE TABLE IF NOT EXISTS ideas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      title TEXT,
      category TEXT,
      description TEXT,
      link TEXT
    );
  `)

  //INSERE OS DADOS NA TABELA
  /*const query = `
  INSERT INTO ideas(
    image,
    title,
    category,
    description,
    link
  ) VALUES (?,?,?,?,?);
`


  const values = [
    "https://image.flaticon.com/icons/svg/2737/2737110.svg",
    "Curso de Programação",
    "Diversão",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum amet ipsa id corrupti temporibus.",
    "https://rocketseat.com.br"
  ]

  db.run(query, values, function(err){
    if (err) return console.log(err)

    console.log(this)
  }) */
  

  //DELETAR UM DADO DA TABELA
  /*db.run(`DELETE FROM ideas WHERE id = ?`, [5], function(err){
    if (err) return console.log(err)

    console.log("DELETEI", this)
  })*/

  //CONSULTAR OS DADOS DA TABELA
 /*db.all(`SELECT * FROM ideas`, function(err, rows){
    if (err) return console.log(err)

    console.log(rows)
  })*/

})

// Conectando a base de dados com a aplicação
module.exports = db;