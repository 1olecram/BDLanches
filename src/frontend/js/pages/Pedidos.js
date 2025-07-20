// função que busca um pedido
document.getElementById("searchPedido").addEventListener('click', async(e) =>{
    e.preventDefault();
    const numero = document.getElementById('numeroSearch').value.trim();
    if (numero === '') {
        alert('Por favor, preencha o número do pedido.');

    }else{
        try{
                
            const resposta = await fetch(`http://localhost:4000/pedidos/${numero}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
                            
                const resultado = await resposta.json();
                
                if(resultado.busca){
                    console.log(resultado.pedido[0])
                    alert(`Resultado encontrado\nPedido: ${resultado.pedido[0].numero}\nValor: R$ ${resultado.pedido[0].valor_total}`)

                }else alert(resultado.message)
             
    
        } catch(error){
            console.log(error)
        }
    }

    document.getElementById('numeroSearch').value = "";
})

// função que insere um pedido

document.getElementById("create").addEventListener('click', async(e) =>{
    e.preventDefault();
    const cpf_func = document.getElementById('cpf_func').value.trim();
    const id_franquia = document.getElementById('id_franquia').value.trim();
    const valor_total = document.getElementById('valor_total').value.trim();

    if (cpf_func === '' || id_franquia === '' || valor_total === '') {
        alert('Por favor, preencha todos os dados');
    }else{
        try{
            const pedido = {"cpf_func": cpf_func, "id_franquia": id_franquia, "valor_total": valor_total}    
            const resposta = await fetch(`http://localhost:4000/pedidos`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(pedido),
                credentials: 'include'
            });
                            
                const resultado = await resposta.json();
                alert(resultado.message)
             
    
        } catch(error){
            console.log(error)
        }
    }

        document.getElementById('cpf_func').value = ''
        document.getElementById('id_franquia').value = ''
        document.getElementById('valor_total').value = ''
})

// função que deleta um pedido

document.getElementById("delete").addEventListener('click', async(e) =>{
    e.preventDefault();
    const numero = document.getElementById('numeroDelete').value.trim();
    if (numero === '') {
        alert('Por favor, preencha o número do pedido.');

    }else{
        try{
                
            const resposta = await fetch(`http://localhost:4000/pedidos/${numero}`, {
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

    document.getElementById('numeroDelete').value = "";
})

// função que atualiza um pedido

document.getElementById("update").addEventListener('click', async(e) =>{
    e.preventDefault();
    const numero = document.getElementById('numeroUpdate').value.trim();
    const valor = document.getElementById('valor').value.trim();
    const coluna = document.getElementById('select').value

    if (numero === '' || valor === '' || coluna === '') {
        alert('Por favor, preencha todos os dados');
    }else{
        try{
            const atualizacao = {"coluna": coluna, "valor": valor}    
            const resposta = await fetch(`http://localhost:4000/pedidos/${numero}`, {
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

        document.getElementById('numeroUpdate').value = ''
        document.getElementById('valor').value = ''
        document.getElementById('select').value = ''
})

// função que lista todos os pedidos

document.getElementById("listAll").addEventListener('click', async(e) =>{
    e.preventDefault();
    inner = `<thead>
        <tr>
        <th>Número</th>
        <th>CPF Funcionário</th>
        <th>ID Franquia</th>
        <th>Valor Total</th>
    </tr>
    </thead>

    <tbody> `;

    const resposta = await fetch(`http://localhost:4000/pedidos`, {
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
    document.getElementById('tabelaPedidos').innerHTML = inner;
})