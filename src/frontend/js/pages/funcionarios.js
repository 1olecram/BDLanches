// função que busca um funcionario
document.getElementById("searchFunc").addEventListener('click', async(e) =>{
    e.preventDefault();
    const cpf = document.getElementById('cpfSearch').value.trim();
    if (cpf === '') {
        alert('Por favor, preencha o CPF.');

    }else{
        try{
                
            const resposta = await fetch(`http://localhost:4000/funcionarios/${cpf}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
                            
                const resultado = await resposta.json();
                
                if(resultado.busca){
                    console.log(resultado.funcionario[0])
                    alert(`Resultado encontrado\n${resultado.funcionario[0].nome}`)

                }else alert(resultado.message)
             
    
        } catch(error){
            console.log(error)
        }
    }

    document.getElementById('cpfSearch').value = "";
})

// função que insere um funcionario

document.getElementById("create").addEventListener('click', async(e) =>{
    e.preventDefault();
    const cpf = document.getElementById('cpf').value.trim();
    const nome = document.getElementById('nome').value .trim();
    const email = document.getElementById('email').value.trim();
    const salario = document.getElementById('salario').value.trim();
    const cargo = document.getElementById('cargo').value.trim();

    if (cpf === '' || nome === '' || email === '' || salario === '' || cargo === '') {
        alert('Por favor, preencha todos os dados');
    }else{
        try{
            const funcionario = {"cpf": cpf, "nome": nome, "email": email, "salario": salario, "cargo": cargo}    
            const resposta = await fetch(`http://localhost:4000/funcionarios`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(funcionario),
                credentials: 'include'
            });
                            
                const resultado = await resposta.json();
                alert(resultado.message)
             
    
        } catch(error){
            console.log(error)
        }
    }

        document.getElementById('cpf').value = ''
        document.getElementById('nome').value = ''
        document.getElementById('email').value = ''
        document.getElementById('salario').value = ''
        document.getElementById('cargo').value = ''
})

// função que deleta um funcionário

document.getElementById("delete").addEventListener('click', async(e) =>{
    e.preventDefault();
    const cpf = document.getElementById('cpfDelete').value.trim();
    if (cpf === '') {
        alert('Por favor, preencha o CPF.');

    }else{
        try{
                
            const resposta = await fetch(`http://localhost:4000/funcionarios/${cpf}`, {
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

    document.getElementById('cpfDelete').value = "";
})

// função que atualiza um funcionario

document.getElementById("update").addEventListener('click', async(e) =>{
    e.preventDefault();
    const cpf = document.getElementById('cpfUpdate').value.trim();
    const valor = document.getElementById('valor').value .trim();
    const coluna = document.getElementById('select').value

    if (cpf === '' || valor === '' || coluna === '') {
        alert('Por favor, preencha todos os dados');
    }else{
        try{
            const atualizacao = {"coluna": coluna, "valor": valor}    
            const resposta = await fetch(`http://localhost:4000/funcionarios/${cpf}`, {
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

        document.getElementById('cpfUpdate').value = ''
        document.getElementById('valor').value = ''
        document.getElementById('select').value = ''
})

document.getElementById("listAll").addEventListener('click', async(e) =>{
    e.preventDefault();
    inner = `<thead>
        <tr>
        <th>CPF</th>
        <th>Nome</th>
        <th>Salário</th>
        <th>Cargo</th>
        <th>Email</th>
    </tr>
    </thead>

    <tbody> `;

    const resposta = await fetch(`http://localhost:4000/funcionarios`, {
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
    document.getElementById('tabelaFuncionarios').innerHTML = inner;
})