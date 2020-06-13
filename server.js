// criando e configurando um servidor: usando o express
const express = require("express");
const server = express();

const db = require("./db")

// Configurar arquivos estaticos (css, scripts, imagens)
server.use(express.static("public"));

// Habilita o uso do req.body
server.use(express.urlencoded({ extended: true }))

// Configuracao do nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: server,
  noCache: true, 
})

// criar uma rota /
// e captura um pedido do cliente para responder
server.get("/", function(req, res){


  db.all(`SELECT * FROM ideas`, function(err, rows){

     // Tratando os erros
     if (err){
      console.log(err)
      return res.send("Erro no Banco de Dados")
    }

    const reversedIdeas = [...rows].reverse();
    let lastIdeas = []

    // escolhe apenas 2 atividades para serem exebidas na página inicial
    for (let idea of reversedIdeas){
      if(lastIdeas.length < 2){
        lastIdeas.push(idea)
      }
    }
    return res.render("index.html", { ideias: lastIdeas });
  })
});



server.get("/ideias", function(req, res){

  db.all(`SELECT * FROM ideas`, function(err, rows){

    // Tratando os erros
    if (err){
      console.log(err)
      return res.send("Erro no Banco de Dados")
    }

    const reversedIdeas = [...rows].reverse();

    return res.render("ideias.html", { ideias: reversedIdeas });
  });
});

// cria uma rota para receber os dados digitados no formulario
server.post("/", function(req, res){
  //INSERE OS DADOS NA TABELA
  const query = `
  INSERT INTO ideas(
    image,
    title,
    category,
    description,
    link
  ) VALUES (?,?,?,?,?);
`

  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link,
  ]

  db.run(query, values, function(err){
    // Tratando os erros
    if (err){
      console.log(err)
      return res.send("Erro no Banco de Dados")
    }

    return res.redirect("/ideias")
  })
})


// Liga o servidor na porta 3000
server.listen(3000);

