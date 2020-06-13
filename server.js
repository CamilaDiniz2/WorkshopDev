// criando e configurando um servidor: usando o express
const express = require("express");
const server = express();

const ideias = [
  {
    img: "https://image.flaticon.com/icons/svg/2737/2737110.svg",
    title: "Curso de Programação",
    category: "Diversão",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum amet ipsa id corrupti temporibus.",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2737/2737074.svg",
    title: "Tarde de jogos",
    category: "Diversão",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum amet ipsa id corrupti temporibus.",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2737/2737039.svg",
    title: "Aprender a tocar um novo instrumento",
    category: "Estudo",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum amet ipsa id corrupti temporibus.",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2737/2737043.svg",
    title: "Pintar um quadro",
    category: "Diversão",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum amet ipsa id corrupti temporibus.",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://www.flaticon.com/premium-icon/icons/svg/2887/2887718.svg",
    title: "Ler um livro",
    category: "Diversão",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum amet ipsa id corrupti temporibus.",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://www.flaticon.com/premium-icon/icons/svg/2887/2887775.svg",
    title: "Fazer exercício",
    category: "Saúde",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum amet ipsa id corrupti temporibus.",
    url: "https://rocketseat.com.br"
  },
]

// Configurar arquivos estaticos
server.use(express.static("public"));

// Configuracao do nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: server,
  noCache: true, 
})

// criar uma rota /
// e captura um pedido do cliente para responder
server.get("/", function(req, res){

  const reversedIdeas = [...ideias].reverse();
  let lastIdeas = []
  // escolhe apenas 2 atividades para serem exebidas na página inicial
  for (let idea of reversedIdeas){
    if(lastIdeas.length < 2){
      lastIdeas.push(idea)
    }
  }
  return res.render("index.html", { ideias: lastIdeas });
});

server.get("/ideias", function(req, res){

  return res.render("ideias.html", { ideias: [...ideias].reverse() });
});


// Liga o servidor na porta 3000
server.listen(3000);

