// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxleG9rZnBmamp1bnZncW1xZ2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQxOTA2MTksImV4cCI6MTk5OTc2NjYxOX0.ut07UzBcD_-bRmysh7v37Fwa0qDHYHdzogccGYiMNuU
// https://lexokfpfjjunvgqmqghp.supabase.co

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    'https://lexokfpfjjunvgqmqghp.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxleG9rZnBmamp1bnZncW1xZ2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQxOTA2MTksImV4cCI6MTk5OTc2NjYxOX0.ut07UzBcD_-bRmysh7v37Fwa0qDHYHdzogccGYiMNuU'
  )

const express = require("express"); //importa o módulo express neste arquivo
const app = express(); //iniciando o express

app.get('/produtos', async (req, res) => {
    let { data: produtos, error } = await supabase
    .from('produtos')
    .select('*')
});
  
app.listen(process.env.PORT ?? 3000,function(erro){
    if (erro){
        console.log("Erro ao Iniciar.");
    }else{
        console.log("Servidor Iniciado.");
    }
})
