// função que busca um item do pedido
document.getElementById("searchItem").addEventListener('click', async(e) =>{
    e.preventDefault();
    const numeroPedido = document.getElementById('numeroPedidoSearch').value.trim();
    const codigo = document.getElementById('codigoSearch').value.trim();
    
    if (numeroPedido === '' || codigo === '') {
        alert('Por favor, preencha o número do pedido e o código do item.');
    }else{
        try{
                
            const resposta = await fetch(`http://localhost:4000/pedidos-cardapio/${numeroPedido}/${codigo}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
                            
                const resultado = await resposta.json();
                
                if(resultado.busca){
                    console.log(resultado.item[0])
                    alert(`Resultado encontrado\nPedido: ${resultado.item[0].numero_pedido}\nCódigo: ${resultado.item[0].codigo}\nQuantidade: ${resultado.item[0].qtd_produto}`)

                }else alert(resultado.message)
             
    
        } catch(error){
            console.log(error)
        }
    }

    document.getElementById('numeroPedidoSearch').value = "";
    document.getElementById('codigoSearch').value = "";
})

// função que insere um item do pedido

document.getElementById("create").addEventListener('click', async(e) =>{
    e.preventDefault();
    const numeroPedido = document.getElementById('numeroPedido').value.trim();
    const codigo = document.getElementById('codigo').value.trim();
    const qtdProduto = document.getElementById('qtdProduto').value.trim();

    if (numeroPedido === '' || codigo === '' || qtdProduto === '') {
        alert('Por favor, preencha todos os dados');
    }else{
        try{
            const item = {"numero_pedido": numeroPedido, "codigo": codigo, "qtd_produto": qtdProduto}    
            const resposta = await fetch(`http://localhost:4000/pedidos-cardapio`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(item),
                credentials: 'include'
            });
                            
                const resultado = await resposta.json();
                alert(resultado.message)
             
    
        } catch(error){
            console.log(error)
        }
    }

        document.getElementById('numeroPedido').value = ''
        document.getElementById('codigo').value = ''
        document.getElementById('qtdProduto').value = ''
})

// função que deleta um item do pedido

document.getElementById("delete").addEventListener('click', async(e) =>{
    e.preventDefault();
    const numeroPedido = document.getElementById('numeroPedidoDelete').value.trim();
    const codigo = document.getElementById('codigoDelete').value.trim();
    
    if (numeroPedido === '' || codigo === '') {
        alert('Por favor, preencha o número do pedido e o código do item.');

    }else{
        try{
                
            const resposta = await fetch(`http://localhost:4000/pedidos-cardapio/${numeroPedido}/${codigo}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
                            
                const resultado = await resposta.json();
                
                alert(resultado.message)
             
    
        } catch(error){
            console.log(error)
        }
    }

    document.getElementById('numeroPedidoDelete').value = "";
    document.getElementById('codigoDelete').value = "";
})

// função que atualiza um item do pedido

document.getElementById("update").addEventListener('click', async(e) =>{
    e.preventDefault();
    const numeroPedido = document.getElementById('numeroPedidoUpdate').value.trim();
    const codigo = document.getElementById('codigoUpdate').value.trim();
    const valor = document.getElementById('valor').value.trim();
    const coluna = document.getElementById('select').value

    if (numeroPedido === '' || codigo === '' || valor === '' || coluna === '') {
        alert('Por favor, preencha todos os dados');
    }else{
        try{
            const atualizacao = {"coluna": coluna, "valor": valor}    
            const resposta = await fetch(`http://localhost:4000/pedidos-cardapio/${numeroPedido}/${codigo}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(atualizacao),
                credentials: 'include'
            });
                            
                const resultado = await resposta.json();
                alert(resultado.message)
             
    
        } catch(error){
            console.log(error)
        }
    }

        document.getElementById('numeroPedidoUpdate').value = ''
        document.getElementById('codigoUpdate').value = ''
        document.getElementById('valor').value = ''
        document.getElementById('select').value = ''
})

// função que lista todos os itens dos pedidos

document.getElementById("listAll").addEventListener('click', async(e) =>{
    e.preventDefault();
    inner = `<thead>
        <tr>
        <th>Número do Pedido</th>
        <th>Código do Item</th>
        <th>Quantidade</th>
    </tr>
    </thead>

    <tbody> `;

    const resposta = await fetch(`http://localhost:4000/pedidos-cardapio`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });
                
    const resultado = await resposta.json();
    
    resultado.resultado.forEach( dado =>{
    
        inner += `<tr>`
            Object.values(dado).forEach( valor => {
                inner += `<td>${valor}</td>`
            })
        inner += `</tr>`
    })
    
    inner += `</tbody>`
    document.getElementById('tabelaItensPedido').innerHTML = inner;
})