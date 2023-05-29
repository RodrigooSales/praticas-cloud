// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxleG9rZnBmamp1bnZncW1xZ2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQxOTA2MTksImV4cCI6MTk5OTc2NjYxOX0.ut07UzBcD_-bRmysh7v37Fwa0qDHYHdzogccGYiMNuU
// https://lexokfpfjjunvgqmqghp.supabase.co

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://lexokfpfjjunvgqmqghp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxleG9rZnBmamp1bnZncW1xZ2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQxOTA2MTksImV4cCI6MTk5OTc2NjYxOX0.ut07UzBcD_-bRmysh7v37Fwa0qDHYHdzogccGYiMNuU"
);

const express = require("express"); //importa o módulo express neste arquivo
const app = express(); //iniciando o express

app.get("/heathcheck", async (req, res) => {
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

app.get("/produtos", async (req, res) => {
  let { data: produtos, error } = await supabase.from("produtos").select("*");
});

app.get("/produtos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const { data: produto, error } = await supabase
      .from("produtos")
      .select("*")
      .eq("id", id)
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
