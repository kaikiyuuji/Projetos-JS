document.addEventListener('DOMContentLoaded', function() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const registros = JSON.parse(localStorage.getItem('registros')) || [];

    const produtoSelect = document.getElementById('produtoSelect');
    const fornecedorProduto = document.getElementById('fornecedorProduto');
    const quantidadeProduto = document.getElementById('quantidadeProduto');
    const quantidadeSaida = document.getElementById('quantidadeSaida');
    const clienteSelect = document.getElementById('clienteSelect');
    const historicoBody = document.getElementById('historicoBody');
    const registroForm = document.getElementById('registroForm');

    // Preenche a lista de produtos
    function preencherListaProdutos() {
      produtos.forEach(function(produto, index) {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = produto.produto;
        produtoSelect.appendChild(option);
      });
    }

    // Preenche a lista de clientes
    function preencherListaClientes() {
      clientes.forEach(function(cliente, index) {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = cliente.nome;
        clienteSelect.appendChild(option);
      });
    }

    // Preenche as informações do produto selecionado
    function preencherInfoProduto() {
      const produtoIndex = produtoSelect.value;
      const produto = produtos[produtoIndex];

      fornecedorProduto.textContent = ' ' + produto.fornecedor;
      quantidadeProduto.textContent = ' ' + produto.quantidade;
    }

    // Preenche a tabela de registros
    function preencherTabelaRegistros() {
      historicoBody.innerHTML = '';

      registros.forEach(function(registro, index) {
        const row = document.createElement('tr');

        const produtoCell = document.createElement('td');
        produtoCell.textContent = registro.produto;
        row.appendChild(produtoCell);

        const fornecedorCell = document.createElement('td');
        fornecedorCell.textContent = registro.fornecedor;
        row.appendChild(fornecedorCell);

        const quantidadeCell = document.createElement('td');
        quantidadeCell.textContent = registro.quantidade;
        row.appendChild(quantidadeCell);

        const clienteCell = document.createElement('td');
        clienteCell.textContent = registro.cliente;
        row.appendChild(clienteCell);

        const dataHoraCell = document.createElement('td');
        dataHoraCell.textContent = registro.dataHora;
        row.appendChild(dataHoraCell);

        const acoesCell = document.createElement('td');
        const editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar';
        editarBtn.className = 'btn btn-sm btn-primary me-2';
        editarBtn.addEventListener('click', function() {
          editarRegistroSaida(index);
        });
        acoesCell.appendChild(editarBtn);

        const excluirBtn = document.createElement('button');
        excluirBtn.textContent = 'Excluir';
        excluirBtn.className = 'btn btn-sm btn-danger';
        excluirBtn.addEventListener('click', function() {
          excluirRegistroSaida(index);
        });
        acoesCell.appendChild(excluirBtn);

        row.appendChild(acoesCell);

        historicoBody.appendChild(row);
      });
    }

    // Função para adicionar um registro de saída
    function adicionarRegistroSaida(produto, quantidade, clienteIndex) {
      const cliente = clientes[clienteIndex];

      const registro = {
        produto: produto.produto,
        fornecedor: produto.fornecedor,
        quantidade: quantidade,
        cliente: cliente.nome,
        dataHora: new Date().toLocaleString()
      };

      registros.push(registro);
      localStorage.setItem('registros', JSON.stringify(registros));

      // Atualiza a quantidade do produto
      produto.quantidade -= quantidade;
      localStorage.setItem('produtos', JSON.stringify(produtos));

      preencherInfoProduto();
      preencherTabelaRegistros();
    }

    // Função para editar um registro de saída
    function editarRegistroSaida(index) {
      const registro = registros[index];

      const quantidade = prompt('Informe a nova quantidade de saída:', registro.quantidade);
      if (quantidade === null || quantidade === '') {
        return;
      }

      // Atualiza a quantidade do produto
      const produto = produtos.find(function(item) {
        return item.produto === registro.produto && item.fornecedor === registro.fornecedor;
      });

      produto.quantidade += registro.quantidade; // Adiciona a quantidade anterior de volta
      produto.quantidade -= parseInt(quantidade, 10); // Subtrai a nova quantidade

      // Atualiza o registro de saída
      registro.quantidade = parseInt(quantidade, 10);
      registro.dataHora = new Date().toLocaleString();

      localStorage.setItem('produtos', JSON.stringify(produtos));
      localStorage.setItem('registros', JSON.stringify(registros));

      preencherInfoProduto();
      preencherTabelaRegistros();
    }

    // Função para excluir um registro de saída
    function excluirRegistroSaida(index) {
      const registro = registros[index];

      // Atualiza a quantidade do produto
      const produto = produtos.find(function(item) {
        return item.produto === registro.produto && item.fornecedor === registro.fornecedor;
      });

      produto.quantidade += registro.quantidade;

      // Remove o registro de saída
      registros.splice(index, 1);

      localStorage.setItem('produtos', JSON.stringify(produtos));
      localStorage.setItem('registros', JSON.stringify(registros));

      preencherInfoProduto();
      preencherTabelaRegistros();
    }

    // Evento para preencher as informações do produto selecionado
    produtoSelect.addEventListener('change', function() {
      preencherInfoProduto();
    });

    // Evento para adicionar um registro de saída
    registroForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const produtoIndex = produtoSelect.value;
      const produto = produtos[produtoIndex];
      const quantidade = parseInt(quantidadeSaida.value, 10);
      const clienteIndex = clienteSelect.value;

      adicionarRegistroSaida(produto, quantidade, clienteIndex);

      quantidadeSaida.value = '';
      clienteSelect.value = '';
    });

    preencherListaProdutos();
    preencherListaClientes();
    preencherTabelaRegistros();
  });

// NAVBAR

function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "assets/img/menu_white_36dp.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "assets/img/close_white_36dp.svg";
    }
}