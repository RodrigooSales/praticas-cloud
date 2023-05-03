const express = require("express"); //importa o módulo express neste arquivo
const app = express(); //iniciando o express

app.get('/', (req, res) => {
    res.send('<h1>Bem-vindo à minha página inicial!</h1>');
});
  
app.get('/sobre', (req, res) => {
    res.send('<h1>Sobre mim</h1><p>Eu sou um estudante de analise e desenvolvimento de sistemas.</p>');
});
  
app.get('/contato', (req, res) => {
    res.send('<h1>Entre em contato comigo</h1><p>Email: teixeirarodrigo2311@gmail.com<br>Github: <a href="https://github.com/RodrigooSales/">https://github.com/RodrigooSales</a></p>');
});

app.get("/contato/email", function(req,res){
    res.send("<h1>Meu Email para contato</h1> <p>Email: teixeirarodrigo2311@gmail.com</p>");
})

app.get("/contato/github", function(req,res){
    res.send('<h1>Meu portifolio no Github</h1> <p>Github: <a href="https://github.com/RodrigooSales/">https://github.com/RodrigooSales</a></p>');
})
  
app.listen(process.env.PORT ?? 3000,function(erro){  // cria a aplicação na porta 4000
    if (erro){
        console.log("Erro ao Iniciar.");
    }else{
        console.log("Servidor Iniciado.");
    }
})