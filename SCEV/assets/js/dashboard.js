var produtosData = JSON.parse(localStorage.getItem('produtos'));
    var fornecedoresData = JSON.parse(localStorage.getItem('fornecedores'));
    var clientesData = JSON.parse(localStorage.getItem('clientes'));
    var registrosEntradaData = JSON.parse(localStorage.getItem('registrosEntrada'));
    var registrosData = JSON.parse(localStorage.getItem('registros'));

    
    var produtosTableBody = document.getElementById('produtosTableBody');
    produtosData.forEach(function(produto) {
      var row = document.createElement('tr');
      row.innerHTML = '<td>' + produto.produto + '</td>' +
                      '<td>' + produto.fornecedor + '</td>' +
                      '<td>' + produto.tipo + '</td>';
      produtosTableBody.appendChild(row);
    });

    
    var fornecedoresTableBody = document.getElementById('fornecedoresTableBody');
    fornecedoresData.forEach(function(fornecedor) {
      var row = document.createElement('tr');
      row.innerHTML = '<td>' + fornecedor.nome + '</td>' +
                      '<td>' + fornecedor.tipo + '</td>';
      fornecedoresTableBody.appendChild(row);
    });

   
    var clientesTableBody = document.getElementById('clientesTableBody');
    clientesData.forEach(function(cliente) {
      var row = document.createElement('tr');
      row.innerHTML = '<td>' + cliente.nome + '</td>' +
                      '<td>' + cliente.email + '</td>' +
                      '<td>' + cliente.telefone + '</td>';
      clientesTableBody.appendChild(row);
    });

    
    var registrosEntradaTableBody = document.getElementById('registrosEntradaTableBody');
    registrosEntradaData.forEach(function(registro) {
      var row = document.createElement('tr');
      row.innerHTML = '<td>' + registro.dataHora + '</td>' +
                      '<td>' + registro.produto + '</td>' +
                      '<td>' + registro.fornecedor + '</td>' +
                      '<td>' + registro.tipo + '</td>';
      registrosEntradaTableBody.appendChild(row);
    });

    
    var registrosSaidaTableBody = document.getElementById('registrosSaidaTableBody');
    registrosData.forEach(function(registro) {
      var row = document.createElement('tr');
      row.innerHTML = '<td>' + registro.dataHora + '</td>' +
                      '<td>' + registro.produto + '</td>' +
                      '<td>' + registro.fornecedor + '</td>' +
                      '<td>' + registro.cliente + '</td>';
      registrosSaidaTableBody.appendChild(row);
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