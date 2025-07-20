// Função que busca histórico de trabalho por CPF
document.getElementById("searchHistorico").addEventListener('click', async(e) => {
    e.preventDefault();
    const cpf = document.getElementById('cpfSearch').value.trim();
    if (cpf === '') {
        alert('Por favor, preencha o CPF.');
    } else {
        try {
            const resposta = await fetch(`http://localhost:4000/trabalhos/${cpf}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
                            
            const resultado = await resposta.json();
            
            if(resultado.busca && resultado.historico.length > 0) {
                let mensagem = `Histórico encontrado para CPF ${cpf}:\n\n`;
                resultado.historico.forEach((hist, index) => {
                    mensagem += `${index + 1}. Franquia: ${hist.id_franquia}, `;
                    mensagem += `Início: ${new Date(hist.data_inicio).toLocaleDateString('pt-BR')}, `;
                    mensagem += `Saída: ${hist.data_saida ? new Date(hist.data_saida).toLocaleDateString('pt-BR') : 'Ainda trabalhando'}\n`;
                });
                alert(mensagem);
            } else {
                alert(resultado.message || 'Nenhum histórico encontrado para este CPF.');
            }
        } catch(error) {
            console.log(error);
            alert('Erro ao buscar histórico.');
        }
    }

    document.getElementById('cpfSearch').value = "";
});

// Função que insere um novo histórico de trabalho
document.getElementById("create").addEventListener('click', async(e) => {
    e.preventDefault();
    const cpf = document.getElementById('cpf').value.trim();
    const id_franquia = document.getElementById('id_franquia').value.trim();
    const data_inicio = document.getElementById('data_inicio').value.trim();
    const data_saida = document.getElementById('data_saida').value.trim();

    if (cpf === '' || id_franquia === '' || data_inicio === '') {
        alert('Por favor, preencha pelo menos CPF, ID da Franquia e Data de Início.');
    } else {
        try {
            const historico = {
                "cpf": cpf, 
                "id_franquia": parseInt(id_franquia), 
                "data_inicio": data_inicio, 
                "data_saida": data_saida || null
            };
            
            const resposta = await fetch(`http://localhost:4000/trabalhos`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(historico),
                credentials: 'include'
            });
                            
            const resultado = await resposta.json();
            alert(resultado.message);
        } catch(error) {
            console.log(error);
            alert('Erro ao criar histórico.');
        }
    }

    // Limpar campos
    document.getElementById('cpf').value = '';
    document.getElementById('id_franquia').value = '';
    document.getElementById('data_inicio').value = '';
    document.getElementById('data_saida').value = '';
});

// Função que deleta um histórico de trabalho
document.getElementById("delete").addEventListener('click', async(e) => {
    e.preventDefault();
    const cpf = document.getElementById('cpfDelete').value.trim();
    const id_franquia = document.getElementById('id_franquiaDelete').value.trim();
    
    if (cpf === '' || id_franquia === '') {
        alert('Por favor, preencha o CPF e o ID da Franquia.');
    } else {
        try {
            const resposta = await fetch(`http://localhost:4000/trabalhos/${cpf}/${id_franquia}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
                            
            const resultado = await resposta.json();
            alert(resultado.message);
        } catch(error) {
            console.log(error);
            alert('Erro ao deletar histórico.');
        }
    }

    document.getElementById('cpfDelete').value = "";
    document.getElementById('id_franquiaDelete').value = "";
});

// Função que atualiza um histórico de trabalho
document.getElementById("update").addEventListener('click', async(e) => {
    e.preventDefault();
    const cpf = document.getElementById('cpfUpdate').value.trim();
    const id_franquia = document.getElementById('id_franquiaUpdate').value.trim();
    const valor = document.getElementById('valor').value.trim();
    const coluna = document.getElementById('select').value;

    if (cpf === '' || id_franquia === '' || valor === '' || coluna === '') {
        alert('Por favor, preencha todos os dados.');
    } else {
        try {
            let valorFormatado = valor;
            
            // Se estiver atualizando id_franquia, converter para número
            if (coluna === 'id_franquia') {
                valorFormatado = parseInt(valor);
            }
            
            const atualizacao = {"coluna": coluna, "valor": valorFormatado};
            
            const resposta = await fetch(`http://localhost:4000/trabalhos/${cpf}/${id_franquia}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(atualizacao),
                credentials: 'include'
            });
                            
            const resultado = await resposta.json();
            alert(resultado.message);
        } catch(error) {
            console.log(error);
            alert('Erro ao atualizar histórico.');
        }
    }

    // Limpar campos
    document.getElementById('cpfUpdate').value = '';
    document.getElementById('id_franquiaUpdate').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('select').value = '';
});

// Função que lista todos os históricos de trabalho
document.getElementById("listAll").addEventListener('click', async(e) => {
    e.preventDefault();
    let inner = `<thead>
        <tr>
            <th>CPF</th>
            <th>ID Franquia</th>
            <th>Data Início</th>
            <th>Data Saída</th>
        </tr>
    </thead>
    <tbody>`;

    try {
        const resposta = await fetch(`http://localhost:4000/trabalhos/`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
                    
        const resultado = await resposta.json();
        
        if (resultado.resultado && resultado.resultado.length > 0) {
            resultado.resultado.forEach(dado => {
                inner += `<tr>`;
                inner += `<td>${dado.cpf}</td>`;
                inner += `<td>${dado.id_franquia}</td>`;
                inner += `<td>${dado.data_inicio ? new Date(dado.data_inicio).toLocaleDateString('pt-BR') : ''}</td>`;
                inner += `<td>${dado.data_saida ? new Date(dado.data_saida).toLocaleDateString('pt-BR') : 'Ainda trabalhando'}</td>`;
                inner += `</tr>`;
            });
        } else {
            inner += `<tr><td colspan="4" class="text-center">Nenhum histórico encontrado</td></tr>`;
        }
    } catch(error) {
        console.log(error);
        inner += `<tr><td colspan="4" class="text-center">Erro ao carregar históricos</td></tr>`;
    }
    
    inner += `</tbody>`;
    document.getElementById('tabelaHistoricos').innerHTML = inner;
});