$(document).ready(function() {
    // Carregar fornecedores do Local Storage
    loadFornecedores();
  
    // Carregar registros de entrada do Local Storage
    loadRegistrosEntrada();
  
    // Adicionar produto ao Local Storage
    $('#addProductForm').submit(function(e) {
      e.preventDefault();
  
      var produto = $('#produto').val();
      var fornecedor = $('#fornecedor').val();
      var tipo = $('#tipo').val();
      var quantidade = $('#quantidade').val();
  
      var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
      var registro = {
        produto: produto,
        fornecedor: fornecedor,
        tipo: tipo,
        quantidade: quantidade
      };
      produtos.push(registro);
      localStorage.setItem('produtos', JSON.stringify(produtos));
  
      var registrosEntrada = JSON.parse(localStorage.getItem('registrosEntrada')) || [];
      var entrada = {
        produto: produto,
        fornecedor: fornecedor,
        tipo: tipo,
        quantidade: quantidade,
        dataHora: new Date().toLocaleString()
      };
      registrosEntrada.push(entrada);
      localStorage.setItem('registrosEntrada', JSON.stringify(registrosEntrada));
  
      loadRegistrosEntrada();
  
      // Limpar o formulário
      $('#addProductForm')[0].reset();
    });
  
    // Editar registro de entrada
    $(document).on('click', '.edit-btn', function() {
      var index = $(this).data('index');
      var registrosEntrada = JSON.parse(localStorage.getItem('registrosEntrada')) || [];
      var registro = registrosEntrada[index];
  
      $('#produto').val(registro.produto);
      $('#fornecedor').val(registro.fornecedor);
      $('#tipo').val(registro.tipo);
      $('#quantidade').val(registro.quantidade);
  
      registrosEntrada.splice(index, 1);
      localStorage.setItem('registrosEntrada', JSON.stringify(registrosEntrada));
  
      loadRegistrosEntrada();
    });
  
    // Excluir registro de entrada
    $(document).on('click', '.delete-btn', function() {
      var index = $(this).data('index');
      var registrosEntrada = JSON.parse(localStorage.getItem('registrosEntrada')) || [];
      registrosEntrada.splice(index, 1);
      localStorage.setItem('registrosEntrada', JSON.stringify(registrosEntrada));
  
      loadRegistrosEntrada();
    });
  });
  
  function loadFornecedores() {
    var fornecedores = JSON.parse(localStorage.getItem('fornecedores')) || [];
  
    var fornecedoresSelect = $('#fornecedor');
    fornecedoresSelect.empty();
    fornecedoresSelect.append($('<option>').text('Selecione um fornecedor'));
  
    fornecedores.forEach(function(fornecedor) {
      fornecedoresSelect.append($('<option>').text(fornecedor.nome));
    });
  }
  
  function loadRegistrosEntrada() {
    var registrosEntrada = JSON.parse(localStorage.getItem('registrosEntrada')) || [];
  
    var entradaProdutos = $('#entradaProdutos');
    entradaProdutos.empty();
  
    for (var i = 0; i < registrosEntrada.length; i++) {
      var registro = registrosEntrada[i];
  
      var row = $('<tr>');
      row.append($('<td>').text(registro.produto));
      row.append($('<td>').text(registro.fornecedor));
      row.append($('<td>').text(registro.tipo));
      row.append($('<td>').text(registro.quantidade));
      row.append($('<td>').text(registro.dataHora));
      row.append($('<td>').html('<button type="button" class="btn btn-primary edit-btn" data-index="' + i + '">Editar</button> <button type="button" class="btn btn-danger delete-btn" data-index="' + i + '">Excluir</button>'));
  
      entradaProdutos.append(row);
    }
  }

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