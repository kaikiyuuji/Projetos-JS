$(document).ready(function() {
    var clientes = [];
  
    function atualizarTabelaClientes() {
      var tabelaCorpo = $('#tabela-clientes-corpo');
      tabelaCorpo.empty();
  
      for (var i = 0; i < clientes.length; i++) {
        var item = clientes[i];
        var row = $('<tr>');
        row.append($('<td>').text(item.nome));
        row.append($('<td>').text(item.email));
        row.append($('<td>').text(item.telefone));
        row.append($('<td>').html('<button class="btn btn-primary editar-item-cliente" data-id="' + i + '">Editar</button> <button class="btn btn-danger remover-item-cliente" data-id="' + i + '">Excluir</button>'));
        tabelaCorpo.append(row);
      }
    }
  
    function adicionarItemCliente(nome, email, telefone) {
      var itemCliente = {
        nome: nome,
        email: email,
        telefone: telefone
      };
  
      clientes.push(itemCliente);
      atualizarTabelaClientes();
      salvarClientesArmazenados();
    }
  
    function removerItemCliente(id) {
      clientes.splice(id, 1);
      atualizarTabelaClientes();
      salvarClientesArmazenados();
    }
  
    function editarItemCliente(id, nome, email, telefone) {
      var itemCliente = clientes[id];
      itemCliente.nome = nome;
      itemCliente.email = email;
      itemCliente.telefone = telefone;
  
      atualizarTabelaClientes();
      salvarClientesArmazenados();
    }
  
    function restaurarFormularioCliente() {
      $('#cliente-nome').val('');
      $('#cliente-email').val('');
      $('#cliente-telefone').val('');
      $('#form-cliente button[type="submit"]').text('Adicionar Cliente');
      $('#form-cliente input#edit-id-cliente').remove();
    }
  
    function carregarClientesArmazenados() {
      var clientesArmazenados = localStorage.getItem('clientes');
      if (clientesArmazenados) {
        clientes = JSON.parse(clientesArmazenados);
        atualizarTabelaClientes();
      }
    }
  
    function salvarClientesArmazenados() {
      localStorage.setItem('clientes', JSON.stringify(clientes));
    }
  
    $('#form-cliente').submit(function(event) {
      event.preventDefault();
  
      var nome = $('#cliente-nome').val();
      var email = $('#cliente-email').val();
      var telefone = $('#cliente-telefone').val();
  
      var editId = $('#edit-id-cliente').val();
  
      if (editId) {
        editarItemCliente(editId, nome, email, telefone);
      } else {
        adicionarItemCliente(nome, email, telefone);
      }
  
      restaurarFormularioCliente();
    });
  
    $(document).on('click', '.remover-item-cliente', function() {
      var id = $(this).data('id');
      removerItemCliente(id);
    });
  
    $(document).on('click', '.editar-item-cliente', function() {
      var id = $(this).data('id');
      var itemCliente = clientes[id];
  
      $('#cliente-nome').val(itemCliente.nome);
      $('#cliente-email').val(itemCliente.email);
      $('#cliente-telefone').val(itemCliente.telefone);
  
      $('#form-cliente button[type="submit"]').text('Salvar Cliente');
      $('#form-cliente').append('<input type="hidden" id="edit-id-cliente" value="' + id + '">');
    });
  
    carregarClientesArmazenados();
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