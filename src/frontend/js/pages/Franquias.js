// função que busca uma franquia
document.getElementById("searchFunc").addEventListener('click', async(e) =>{
    e.preventDefault();
    const id = document.getElementById('idSearch').value.trim();
    if (id === '') {
        alert('Por favor, preencha o ID.');
    }else{
        try{
            const resposta = await fetch(`http://localhost:4000/franquias/${id}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
                            
            const resultado = await resposta.json();
                
            if(resultado.busca){
                console.log(resultado.franquia[0])
                alert(`Resultado encontrado\nLogradouro: ${resultado.franquia[0].logradouro}`)
            }else alert(resultado.message)
             
        } catch(error){
            console.log(error)
        }
    }

    document.getElementById('idSearch').value = "";
})

// função que insere uma franquia
document.getElementById("create").addEventListener('click', async(e) =>{
    e.preventDefault();
    const logradouro = document.getElementById('id').value.trim(); // usando o id input para logradouro
    const cpfGerente = document.getElementById('nome').value.trim(); // usando o nome input para cpf gerente
    const numVendas = 0; // inicializa com 0
    const receitaTotal = 0; // inicializa com 0

    if (logradouro === '' || cpfGerente === '') {
        alert('Por favor, preencha todos os dados');
    }else{
        try{
            const franquia = {
                "logradouro": logradouro, 
                "cpf_gerente": cpfGerente,
                "num_vendas": numVendas,
                "receita_total": receitaTotal
            }    
            const resposta = await fetch(`http://localhost:4000/franquias`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(franquia),
                credentials: 'include'
            });
                            
            const resultado = await resposta.json();
            alert(resultado.message)
             
        } catch(error){
            console.log(error)
        }
    }

    document.getElementById('id').value = '';
    document.getElementById('nome').value = '';
})

// função que deleta uma franquia
document.getElementById("delete").addEventListener('click', async(e) =>{
    e.preventDefault();
    const id = document.getElementById('idDelete').value.trim();
    if (id === '') {
        alert('Por favor, preencha o ID.');
    }else{
        try{
            const resposta = await fetch(`http://localhost:4000/franquias/${id}`, {
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

    document.getElementById('idDelete').value = "";
})

// função que atualiza uma franquia
document.getElementById("update").addEventListener('click', async(e) =>{
    e.preventDefault();
    const id = document.getElementById('idUpdate').value.trim();
    const valor = document.getElementById('valor').value.trim();
    const coluna = document.getElementById('select').value;

    if (id === '' || valor === '' || coluna === '') {
        alert('Por favor, preencha todos os dados');
    }else{
        try{
            const atualizacao = {"coluna": coluna, "valor": valor}    
            const resposta = await fetch(`http://localhost:4000/franquias/${id}`, {
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

    document.getElementById('idUpdate').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('select').value = '';
})

// função que lista todas as franquias
document.getElementById("listAll").addEventListener('click', async(e) =>{
    e.preventDefault();
    inner = `<thead>
        <tr>
            <th>ID</th>
            <th>Logradouro</th>
            <th>CPF Gerente</th>
            <th>Número de Vendas</th>
            <th>Receita Total</th>
        </tr>
    </thead>
    <tbody>`;

    const resposta = await fetch(`http://localhost:4000/franquias`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });
                
    const resultado = await resposta.json();
    
    resultado.resultado.forEach(dado => {
        inner += `<tr>`;
        Object.values(dado).forEach(valor => {
            inner += `<td>${valor}</td>`;
        });
        inner += `</tr>`;
    });
    
    inner += `</tbody>`;
    document.getElementById('tabelaFranquias').innerHTML = inner;
})
