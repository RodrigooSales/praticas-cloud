// Função para listar todos os produtos
async function listarTodosProdutos() {
  const listaProdutos = document.getElementById("listaProdutos");

  try {
    const response = await fetch("http://localhost:3000/produtos");
    const produtos = await response.json();

    listaProdutos.innerHTML = "";

    produtos.forEach((produto) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;

      listaProdutos.appendChild(listItem);
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
}

// Função para listar um produto por ID
async function listarProdutoPorId() {
  const listaProdutos = document.getElementById("listaProduto");
  const produtoId = document.getElementById("produtoId").value;

  try {
    const response = await fetch(`http://localhost:3000/produtos/${produtoId}`);
    const produto = await response.json();

    listaProdutos.innerHTML = "";

    const listItem = document.createElement("li");
    listItem.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;

    listaProdutos.appendChild(listItem);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
  }
}

// Função para criar um produto
async function criarProduto() {
  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;

  try {
    const response = await fetch("http://localhost:3000/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, preco }),
    });
    const produto = await response.json();

    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = "Produto criado com sucesso!";
  } catch (error) {
    console.error("Erro ao criar produto:", error);
  }
}

// Função para atualizar um produto
async function atualizarProduto() {
  const produtoId = document.getElementById("produtoIdUpdate").value;
  const nome = document.getElementById("nomeUpdate").value;
  const preco = document.getElementById("precoUpdate").value;

  const atualizacao = {};

  if (nome) {
    atualizacao.nome = nome;
  }

  if (preco) {
    atualizacao.preco = parseFloat(preco);
  }

  try {
    const response = await fetch(
      `http://localhost:3000/produtos/${produtoId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(atualizacao),
      }
    );

    if (response.ok) {
      const mensagem = document.getElementById("mensagemUpdate");
      mensagem.textContent = "Produto atualizado com sucesso!";
    } else {
      const errorMessage = await response.text();
      const mensagem = document.getElementById("mensagemUpdate");
      mensagem.textContent = `Erro ao atualizar produto: ${errorMessage}`;
    }
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
  }
}

// Função para excluir um produto
async function excluirProduto() {
  const produtoId = document.getElementById("produtoIdDelete").value;

  try {
    const response = await fetch(
      `http://localhost:3000/produtos/${produtoId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const mensagem = document.getElementById("mensagemDelete");
      mensagem.textContent = "Produto excluído com sucesso!";
    } else {
      const errorMessage = await response.text();
      const mensagem = document.getElementById("mensagemDelete");
      mensagem.textContent = `Erro ao excluir produto: ${errorMessage}`;
    }
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
  }
}
