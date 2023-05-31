// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxleG9rZnBmamp1bnZncW1xZ2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQxOTA2MTksImV4cCI6MTk5OTc2NjYxOX0.ut07UzBcD_-bRmysh7v37Fwa0qDHYHdzogccGYiMNuU
// https://lexokfpfjjunvgqmqghp.supabase.co

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = 'https://lexokfpfjjunvgqmqghp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxleG9rZnBmamp1bnZncW1xZ2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQxOTA2MTksImV4cCI6MTk5OTc2NjYxOX0.ut07UzBcD_-bRmysh7v37Fwa0qDHYHdzogccGYiMNuU';
const supabase = createClient(supabaseUrl, supabaseKey);

const express = require("express"); //importa o módulo express neste arquivo
const app = express(); //iniciando o express
app.use(express.json()); //informa ao express que será utilizado o formato json
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get("/healthcheck", async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK!",
    timestamp: Date.now(),
  };
  try {
    res.send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    res.status(503).send();
  }
});

app.get('/produtos', async (req, res) => {
  try {
    const { data: produtos, error } = await supabase
      .from('produtos')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/produtos/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const { data: produto, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/produtos", async (req, res) => {
  const { nome, preco } = req.body;

  try {
    const { data: produto, error } = await supabase
      .from("produtos")
      .insert([{ nome, preco }]);

    if (error) {
      throw new Error(error.message);
    }

    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/produtos/:id", async (req, res) => {
  const id = req.params.id;
  const { nome, preco } = req.body;

  try {
    const { data: produto, error } = await supabase
      .from("produtos")
      .update({ nome, preco })
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/produtos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const { data: produto, error } = await supabase
      .from("produtos")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT ?? 3000, function (erro) {
  if (erro) {
    console.log("Erro ao Iniciar.");
  } else {
    console.log("Servidor Iniciado.");
  }
});
