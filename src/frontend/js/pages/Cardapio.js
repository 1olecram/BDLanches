// função que busca um item do cardápio
document.getElementById("searchFunc").addEventListener('click', async(e) =>{
    e.preventDefault();
    const codigo = document.getElementById('codigoSearch').value.trim();
    if (codigo === '') {
        alert('Por favor, preencha o código.');
    } else {
        try {
            const resposta = await fetch(`http://localhost:4000/cardapio/${codigo}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
                            
            const resultado = await resposta.json();
            
            if(resultado.busca){
                console.log(resultado.produto[0])
                alert(`Produto encontrado\nDescrição: ${resultado.produto[0].descricao}\nPreço: R$ ${resultado.produto[0].preco_unitario}`)
            } else {
                alert(resultado.message)
            }
        } catch(error){
            console.log(error)
        }
    }

    document.getElementById('codigoSearch').value = "";
})

// função que insere um item no cardápio
document.getElementById("create").addEventListener('click', async(e) =>{
    e.preventDefault();
    const codigo = document.getElementById('codigo').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const preco_unitario = document.getElementById('preco_unitario').value.trim();

    if (codigo === '' || descricao === '' || preco_unitario === '') {
        alert('Por favor, preencha todos os dados');
    } else {
        try {
            const produto = {
                "codigo": codigo, 
                "descricao": descricao, 
                "preco_unitario": preco_unitario
            }    
            const resposta = await fetch(`http://localhost:4000/cardapio`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(produto),
                credentials: 'include'
            });
                            
            const resultado = await resposta.json();
            alert(resultado.message)
        } catch(error){
            console.log(error)
        }
    }

    document.getElementById('codigo').value = ''
    document.getElementById('descricao').value = ''
    document.getElementById('preco_unitario').value = ''
})

// função que deleta um item do cardápio
document.getElementById("delete").addEventListener('click', async(e) =>{
    e.preventDefault();
    const codigo = document.getElementById('codigoDelete').value.trim();
    if (codigo === '') {
        alert('Por favor, preencha o código.');
    } else {
        try {
            const resposta = await fetch(`http://localhost:4000/cardapio/${codigo}`, {
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

    document.getElementById('codigoDelete').value = "";
})

// função que atualiza um item do cardápio
document.getElementById("update").addEventListener('click', async(e) =>{
    e.preventDefault();
    const codigo = document.getElementById('codigoUpdate').value.trim();
    const valor = document.getElementById('valor').value.trim();
    const coluna = document.getElementById('select').value

    if (codigo === '' || valor === '' || coluna === '') {
        alert('Por favor, preencha todos os dados');
    } else {
        try {
            const atualizacao = {"coluna": coluna, "valor": valor}    
            const resposta = await fetch(`http://localhost:4000/cardapio/${codigo}`, {
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

    document.getElementById('codigoUpdate').value = ''
    document.getElementById('valor').value = ''
    document.getElementById('select').value = ''
})

// função que lista todos os itens do cardápio
document.getElementById("listAll").addEventListener('click', async(e) =>{
    e.preventDefault();
    let inner = `<thead>
        <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Preço Unitário</th>
        </tr>
    </thead>
    <tbody>`;

    try {
        const resposta = await fetch(`http://localhost:4000/cardapio`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
                    
        const resultado = await resposta.json();
        
        resultado.resultado.forEach(produto => {
            inner += `<tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>R$ ${produto.preco_unitario}</td>
            </tr>`
        })
        
        inner += `</tbody>`
        document.getElementById('tabelaCardadio').innerHTML = inner;
    } catch(error) {
        console.log(error)
        alert('Erro ao carregar o cardápio')
    }
})