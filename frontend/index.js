const formProduto = document.getElementById('formProduto');
const listaProdutos = document.getElementById('listaProdutos');

formProduto.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nomeInput = document.getElementById('nome');
  const precoInput = document.getElementById('preco');

  const nome = nomeInput.value;
  const preco = parseFloat(precoInput.value);

  const response = await fetch('/produtos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome, preco }),
  });

  const produto = await response.json();

  if (response.ok) {
    const listItem = document.createElement('li');
    listItem.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
    listaProdutos.appendChild(listItem);

    nomeInput.value = '';
    precoInput.value = '';
  } else {
    alert('Erro ao adicionar produto');
  }
});

async function listarProdutos() {
  const response = await fetch('/produtos');
  const produtos = await response.json();

  listaProdutos.innerHTML = '';

  produtos.forEach((produto) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
    listaProdutos.appendChild(listItem);
  });
}

listarProdutos();
