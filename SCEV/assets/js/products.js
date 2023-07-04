$(document).ready(function() {
    var produtos = [];

    function atualizarTabelaProdutos() {
      var tabelaCorpo = $('#tabela-corpo');
      tabelaCorpo.empty();

      for (var i = 0; i < produtos.length; i++) {
        var item = produtos[i];
        var row = $('<tr>');
        row.append($('<td>').text(item.produto));
        row.append($('<td>').text(item.fornecedor));
        row.append($('<td>').text(item.tipo));
        row.append($('<td>').text(item.quantidade));
        row.append($('<td>').html('<button class="btn btn-sm btn-primary editar-item-produto" data-id="' + i + '">Editar</button> <button class="btn btn-sm btn-danger remover-item-produto" data-id="' + i + '">Remover</button>'));
        tabelaCorpo.append(row);
      }
    }

    function adicionarItemProduto(produto, fornecedor, tipo, quantidade) {
      var itemProduto = {
        produto: produto,
        fornecedor: fornecedor,
        tipo: tipo,
        quantidade: quantidade
      };

      produtos.push(itemProduto);
      atualizarTabelaProdutos();
      salvarProdutosArmazenados();
    }

    function removerItemProduto(id) {
      produtos.splice(id, 1);
      atualizarTabelaProdutos();
      salvarProdutosArmazenados();
    }

    function editarItemProduto(id, produto, fornecedor, tipo, quantidade) {
      var itemProduto = produtos[id];
      itemProduto.produto = produto;
      itemProduto.fornecedor = fornecedor;
      itemProduto.tipo = tipo;
      itemProduto.quantidade = quantidade;

      atualizarTabelaProdutos();
      salvarProdutosArmazenados();
    }

    function restaurarFormularioProduto() {
      $('#produto').val('');
      $('#fornecedor').val('');
      $('#tipo').val('');
      $('#quantidade').val('');
      $('#form button[type="submit"]').text('Adicionar');
      $('#form input#edit-id-produto').remove();
    }

    function carregarFornecedores() {
      var fornecedores = localStorage.getItem('fornecedores');
      if (fornecedores) {
        fornecedores = JSON.parse(fornecedores);
        return fornecedores;
      }
      return [];
    }

    function carregarProdutosArmazenados() {
      var fornecedores = carregarFornecedores();
      fornecedores.forEach(fornecedor => {
        $('#fornecedor').append('<option value="'+ fornecedor.nome +'">'+ fornecedor.nome +'</option>')
      })
      var produtosArmazenados = localStorage.getItem('produtos');
      if (produtosArmazenados) {
        produtos = JSON.parse(produtosArmazenados);
        atualizarTabelaProdutos();
      }
    }

    function salvarProdutosArmazenados() {
      localStorage.setItem('produtos', JSON.stringify(produtos));
    }

    function exportarCSVProdutos() {
      var csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Produto,Fornecedor,Tipo de Produto,Quantidade em Estoque\n";
      produtos.forEach(function(item) {
        csvContent += item.produto + "," + item.fornecedor + "," + item.tipo + "," + item.quantidade + "\n";
      });

      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "tabela_produtos.csv");
      document.body.appendChild(link);
      link.click();
    }

    function exportarExcelProdutos() {
      var worksheet = XLSX.utils.json_to_sheet(produtos);
      var workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Tabela Produtos');
      var excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      var data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(data, 'tabela_produtos.xlsx');
    }

    function imprimirTabelaProdutos() {
      var printContents = document.getElementById("tabela-corpo").innerHTML;
      var originalContents = document.body.innerHTML;

      document.body.innerHTML = '<table>' + printContents + '</table>';
      window.print();

      document.body.innerHTML = originalContents;
    }

    $('#form').submit(function(event) {
      event.preventDefault();

      var produto = $('#produto').val();
      var fornecedor = $('#fornecedor').val();
      var tipo = $('#tipo').val();
      var quantidade = $('#quantidade').val();

      var editId = $('#edit-id-produto').val();

      if (editId) {
        editarItemProduto(editId, produto, fornecedor, tipo, quantidade);
      } else {
        adicionarItemProduto(produto, fornecedor, tipo, quantidade);
      }

      restaurarFormularioProduto();
    });

    $(document).on('click', '.remover-item-produto', function() {
      var id = $(this).data('id');
      removerItemProduto(id);
    });

    $(document).on('click', '.editar-item-produto', function() {
      var id = $(this).data('id');
      var itemProduto = produtos[id];

      $('#produto').val(itemProduto.produto);
      $('#fornecedor').val(itemProduto.fornecedor);
      $('#tipo').val(itemProduto.tipo);
      $('#quantidade').val(itemProduto.quantidade);

      $('#form button[type="submit"]').text('Salvar');
      $('#form').append('<input type="hidden" id="edit-id-produto" value="' + id + '">');
    });

    $('#filtro').keyup(function() {
      var filtro = $(this).val().toLowerCase();

      $('#tabela-corpo tr').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(filtro) > -1);
      });
    });

    $('#export-csv').click(function() {
      exportarCSVProdutos();
    });

    $('#export-excel').click(function() {
      exportarExcelProdutos();
    });

    $('#print-table').click(function() {
      imprimirTabelaProdutos();
    });

    carregarProdutosArmazenados();
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