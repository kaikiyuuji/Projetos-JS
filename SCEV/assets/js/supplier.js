$(document).ready(function() {
    var fornecedores = [];
  
    function atualizarTabelaFornecedores() {
      var tabelaCorpo = $('#tabela-fornecedores-corpo');
      tabelaCorpo.empty();
  
      for (var i = 0; i < fornecedores.length; i++) {
        var item = fornecedores[i];
        var row = $('<tr>');
        row.append($('<td>').text(item.nome));
        row.append($('<td>').text(item.tipo));
        row.append($('<td>').text(item.quantidadeTipos));
        row.append($('<td>').html('<button class="btn btn-primary editar-item-fornecedor" data-id="' + i + '">Editar</button> <button class="btn btn-danger remover-item-fornecedor" data-id="' + i + '">Excluir</button>'));
        tabelaCorpo.append(row);
      }
    }
  
    function adicionarItemFornecedor(nome, tipo, quantidadeTipos) {
      var itemFornecedor = {
        nome: nome,
        tipo: tipo,
        quantidadeTipos: quantidadeTipos
      };
  
      fornecedores.push(itemFornecedor);
      atualizarTabelaFornecedores();
      salvarFornecedoresArmazenados();
    }
  
    function removerItemFornecedor(id) {
      fornecedores.splice(id, 1);
      atualizarTabelaFornecedores();
      salvarFornecedoresArmazenados();
    }
  
    function editarItemFornecedor(id, nome, tipo, quantidadeTipos) {
      var itemFornecedor = fornecedores[id];
      itemFornecedor.nome = nome;
      itemFornecedor.tipo = tipo;
      itemFornecedor.quantidadeTipos = quantidadeTipos;
  
      atualizarTabelaFornecedores();
      salvarFornecedoresArmazenados();
    }
  
    function restaurarFormularioFornecedor() {
      $('#fornecedor-nome').val('');
      $('#fornecedor-tipo').val('');
      $('#fornecedor-quantidade').val('');
      $('#form-fornecedor button[type="submit"]').text('Adicionar Fornecedor');
      $('#form-fornecedor input#edit-id-fornecedor').remove();
    }
  
    function carregarFornecedoresArmazenados() {
      var fornecedoresArmazenados = localStorage.getItem('fornecedores');
      if (fornecedoresArmazenados) {
        fornecedores = JSON.parse(fornecedoresArmazenados);
        atualizarTabelaFornecedores();
      }
    }
  
    function salvarFornecedoresArmazenados() {
      localStorage.setItem('fornecedores', JSON.stringify(fornecedores));
    }
  
    $('#form-fornecedor').submit(function(event) {
      event.preventDefault();
  
      var nome = $('#fornecedor-nome').val();
      var tipo = $('#fornecedor-tipo').val();
      var quantidadeTipos = $('#fornecedor-quantidade').val();
  
      var editId = $('#edit-id-fornecedor').val();
  
      if (editId) {
        editarItemFornecedor(editId, nome, tipo, quantidadeTipos);
      } else {
        adicionarItemFornecedor(nome, tipo, quantidadeTipos);
      }
  
      restaurarFormularioFornecedor();
    });
  
    $(document).on('click', '.remover-item-fornecedor', function() {
      var id = $(this).data('id');
      removerItemFornecedor(id);
    });
  
    $(document).on('click', '.editar-item-fornecedor', function() {
      var id = $(this).data('id');
      var itemFornecedor = fornecedores[id];
  
      $('#fornecedor-nome').val(itemFornecedor.nome);
      $('#fornecedor-tipo').val(itemFornecedor.tipo);
      $('#fornecedor-quantidade').val(itemFornecedor.quantidadeTipos);
  
      $('#form-fornecedor button[type="submit"]').text('Salvar Fornecedor');
      $('#form-fornecedor').append('<input type="hidden" id="edit-id-fornecedor" value="' + id + '">');
    });
  
    carregarFornecedoresArmazenados();
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