// função que busca um item de estoque
document.getElementById("searchItem").addEventListener('click', async(e) =>{
    e.preventDefault();
    const idDespesa = document.getElementById('idDespesaSearch').value.trim();
    if (idDespesa === '') {
        alert('Por favor, preencha o ID da Despesa.');

    }else{
        try{
                
            const resposta = await fetch(`http://localhost:4000/estoque/${idDespesa}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
                            
                const resultado = await resposta.json();
                
                if(resultado.busca){
                    console.log(resultado.estoque[0])
                    alert(`Resultado encontrado\nCódigo: ${resultado.estoque[0].codigo}\nQuantidade: ${resultado.estoque[0].qtd_estoque}`)

                }else alert(resultado.message)
             
    
        } catch(error){
            console.log(error)
        }
    }

    document.getElementById('idDespesaSearch').value = "";
})

// função que insere um item de estoque

document.getElementById("create").addEventListener('click', async(e) =>{
    e.preventDefault();
    const idDespesa = document.getElementById('idDespesa').value.trim();
    const codigo = document.getElementById('codigo').value .trim();
    const qtdEstoque = document.getElementById('qtdEstoque').value.trim();

    if (idDespesa === '' || codigo === '' || qtdEstoque === '') {
        alert('Por favor, preencha todos os dados');
    }else{
        try{
            const estoque = {"id_despesa": idDespesa, "codigo": codigo, "qtd_estoque": qtdEstoque}    
            const resposta = await fetch(`http://localhost:4000/estoque`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(estoque),
                credentials: 'include'
            });
                            
                const resultado = await resposta.json();
                alert(resultado.message)
             
    
        } catch(error){
            console.log(error)
        }
    }

        document.getElementById('idDespesa').value = ''
        document.getElementById('codigo').value = ''
        document.getElementById('qtdEstoque').value = ''
})

// função que deleta um item de estoque

document.getElementById("delete").addEventListener('click', async(e) =>{
    e.preventDefault();
    const idDespesa = document.getElementById('idDespesaDelete').value.trim();
    if (idDespesa === '') {
        alert('Por favor, preencha o ID da Despesa.');

    }else{
        try{
                
            const resposta = await fetch(`http://localhost:4000/estoque/${idDespesa}`, {
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

    document.getElementById('idDespesaDelete').value = "";
})

// função que atualiza um item de estoque

document.getElementById("update").addEventListener('click', async(e) =>{
    e.preventDefault();
    const idDespesa = document.getElementById('idDespesaUpdate').value.trim();
    const valor = document.getElementById('valor').value .trim();
    const coluna = document.getElementById('select').value

    if (idDespesa === '' || valor === '' || coluna === '') {
        alert('Por favor, preencha todos os dados');
    }else{
        try{
            const atualizacao = {"coluna": coluna, "valor": valor}    
            const resposta = await fetch(`http://localhost:4000/estoque/${idDespesa}`, {
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

        document.getElementById('idDespesaUpdate').value = ''
        document.getElementById('valor').value = ''
        document.getElementById('select').value = ''
})

// função que lista todos os itens de estoque

document.getElementById("listAll").addEventListener('click', async(e) =>{
    e.preventDefault();
    inner = `<thead>
        <tr>
        <th>ID Despesa</th>
        <th>Código</th>
        <th>Quantidade em Estoque</th>
    </tr>
    </thead>

    <tbody> `;

    const resposta = await fetch(`http://localhost:4000/estoque`, {
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
    document.getElementById('tabelaEstoque').innerHTML = inner;
})