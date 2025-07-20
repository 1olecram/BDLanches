// Função que busca uma despesa
document.getElementById("searchDespesa").addEventListener('click', async(e) => {
    e.preventDefault();
    const idDespesa = document.getElementById('idDespesaSearch').value.trim();
    
    if (idDespesa === '') {
        alert('Por favor, preencha o ID da despesa.');
    } else {
        try {
            const resposta = await fetch(`http://localhost:4000/despesas/${idDespesa}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
                            
            const resultado = await resposta.json();
            
            if(resultado.busca) {
                console.log(resultado.despesa[0]);
                const despesa = resultado.despesa[0];
                alert(`Resultado encontrado:\nID: ${despesa.id_despesa}\nFranquia: ${despesa.id_franquia}\nValor: R$ ${despesa.valor}\nTipo: ${despesa.tipo}`);
            } else {
                alert(resultado.message);
            }
        } catch(error) {
            console.log(error);
            alert('Erro ao buscar despesa. Verifique a conexão.');
        }
    }

    document.getElementById('idDespesaSearch').value = "";
});

// Função que insere uma despesa
document.getElementById("create").addEventListener('click', async(e) => {
    e.preventDefault();
    const idDespesa = document.getElementById('idDespesa').value.trim();
    const idFranquia = document.getElementById('idFranquia').value.trim();
    const valor = document.getElementById('valor').value.trim();
    const tipo = document.getElementById('tipo').value.trim();

    if (idDespesa === '' || idFranquia === '' || valor === '' || tipo === '') {
        alert('Por favor, preencha todos os dados');
    } else {
        // Validar se os valores são números válidos
        if (isNaN(idDespesa) || isNaN(idFranquia) || isNaN(valor)) {
            alert('ID da despesa, ID da franquia e valor devem ser números válidos');
            return;
        }

        if (parseFloat(valor) < 0) {
            alert('O valor da despesa deve ser positivo');
            return;
        }

        try {
            const despesa = {
                "id_despesa": parseInt(idDespesa),
                "id_franquia": parseInt(idFranquia),
                "valor": parseFloat(valor),
                "tipo": tipo
            };
            
            const resposta = await fetch(`http://localhost:4000/despesas`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(despesa),
                credentials: 'include'
            });
                            
            const resultado = await resposta.json();
            alert(resultado.message);
        } catch(error) {
            console.log(error);
            alert('Erro ao criar despesa. Verifique a conexão.');
        }
    }

    // Limpar formulário
    document.getElementById('idDespesa').value = '';
    document.getElementById('idFranquia').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('tipo').value = '';
});

// Função que deleta uma despesa
document.getElementById("delete").addEventListener('click', async(e) => {
    e.preventDefault();
    const idDespesa = document.getElementById('idDespesaDelete').value.trim();
    
    if (idDespesa === '') {
        alert('Por favor, preencha o ID da despesa.');
    } else {
        // Confirmar exclusão
        const confirmar = confirm(`Tem certeza que deseja deletar a despesa com ID ${idDespesa}?`);
        
        if (confirmar) {
            try {
                const resposta = await fetch(`http://localhost:4000/despesas/${idDespesa}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                                
                const resultado = await resposta.json();
                alert(resultado.message);
            } catch(error) {
                console.log(error);
                alert('Erro ao deletar despesa. Verifique a conexão.');
            }
        }
    }

    document.getElementById('idDespesaDelete').value = "";
});

// Função que atualiza uma despesa
document.getElementById("update").addEventListener('click', async(e) => {
    e.preventDefault();
    const idDespesa = document.getElementById('idDespesaUpdate').value.trim();
    const valorUpdate = document.getElementById('valorUpdate').value.trim();
    const coluna = document.getElementById('selectUpdate').value;

    if (idDespesa === '' || valorUpdate === '' || coluna === '') {
        alert('Por favor, preencha todos os dados');
    } else {
        // Validações específicas por tipo de campo
        if (coluna === 'id_despesa' || coluna === 'id_franquia') {
            if (isNaN(valorUpdate) || parseInt(valorUpdate) <= 0) {
                alert('IDs devem ser números inteiros positivos');
                return;
            }
        }

        if (coluna === 'valor') {
            if (isNaN(valorUpdate) || parseFloat(valorUpdate) < 0) {
                alert('Valor deve ser um número positivo');
                return;
            }
        }

        if (coluna === 'tipo' && valorUpdate.length < 2) {
            alert('Tipo deve ter pelo menos 2 caracteres');
            return;
        }

        try {
            const atualizacao = {"coluna": coluna, "valor": valorUpdate};
            
            const resposta = await fetch(`http://localhost:4000/despesas/${idDespesa}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(atualizacao),
                credentials: 'include'
            });
                            
            const resultado = await resposta.json();
            alert(resultado.message);
        } catch(error) {
            console.log(error);
            alert('Erro ao atualizar despesa. Verifique a conexão.');
        }
    }

    // Limpar formulário
    document.getElementById('idDespesaUpdate').value = '';
    document.getElementById('valorUpdate').value = '';
    document.getElementById('selectUpdate').value = '';
});

// Função que lista todas as despesas
document.getElementById("listAll").addEventListener('click', async(e) => {
    e.preventDefault();
    
    try {
        const resposta = await fetch(`http://localhost:4000/despesas`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
                    
        const resultado = await resposta.json();
        
        if (resultado.resultado && resultado.resultado.length > 0) {
            let inner = `<thead>
                <tr>
                    <th>ID Despesa</th>
                    <th>ID Franquia</th>
                    <th>Valor (R$)</th>
                    <th>Tipo</th>
                </tr>
            </thead>
            <tbody>`;

            resultado.resultado.forEach(despesa => {
                inner += `<tr>
                    <td>${despesa.id_despesa}</td>
                    <td>${despesa.id_franquia}</td>
                    <td>R$ ${parseFloat(despesa.valor).toFixed(2)}</td>
                    <td>${despesa.tipo}</td>
                </tr>`;
            });
            
            inner += `</tbody>`;
            document.getElementById('tabelaDespesas').innerHTML = inner;
        } else {
            document.getElementById('tabelaDespesas').innerHTML = `
                <thead>
                    <tr>
                        <th>ID Despesa</th>
                        <th>ID Franquia</th>
                        <th>Valor (R$)</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="4" class="text-center">Nenhuma despesa encontrada</td>
                    </tr>
                </tbody>`;
        }
    } catch(error) {
        console.log(error);
        alert('Erro ao carregar lista de despesas. Verifique a conexão.');
        document.getElementById('tabelaDespesas').innerHTML = `
            <thead>
                <tr>
                    <th>ID Despesa</th>
                    <th>ID Franquia</th>
                    <th>Valor (R$)</th>
                    <th>Tipo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="4" class="text-center">Erro ao carregar dados</td>
                </tr>
            </tbody>`;
    }
});

// Função para formatar entrada de valor monetário
document.getElementById('valor').addEventListener('input', function(e) {
    let value = e.target.value;
    // Remove caracteres não numéricos exceto ponto e vírgula
    value = value.replace(/[^0-9.,]/g, '');
    // Substitui vírgula por ponto para padronização
    value = value.replace(',', '.');
    e.target.value = value;
});

// Função para formatar entrada de valor no campo de atualização
document.getElementById('valorUpdate').addEventListener('input', function(e) {
    const coluna = document.getElementById('selectUpdate').value;
    if (coluna === 'valor') {
        let value = e.target.value;
        value = value.replace(/[^0-9.,]/g, '');
        value = value.replace(',', '.');
        e.target.value = value;
    }
});

// Função para limitar caracteres em campos de ID
function limitarNumeros(elemento) {
    elemento.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
}

// Aplicar limitação nos campos de ID
limitarNumeros(document.getElementById('idDespesa'));
limitarNumeros(document.getElementById('idFranquia'));
limitarNumeros(document.getElementById('idDespesaSearch'));
limitarNumeros(document.getElementById('idDespesaUpdate'));
limitarNumeros(document.getElementById('idDespesaDelete'));

// Função para aplicar validação dinâmica no campo de atualização
document.getElementById('selectUpdate').addEventListener('change', function(e) {
    const campo = document.getElementById('valorUpdate');
    const coluna = e.target.value;
    
    // Limpar valor anterior
    campo.value = '';
    
    // Definir placeholder e tipo baseado na coluna selecionada
    switch(coluna) {
        case 'id_despesa':
            campo.placeholder = 'Digite o novo ID da despesa';
            campo.type = 'number';
            break;
        case 'id_franquia':
            campo.placeholder = 'Digite o novo ID da franquia';
            campo.type = 'number';
            break;
        case 'valor':
            campo.placeholder = 'Digite o novo valor (ex: 150.50)';
            campo.type = 'number';
            campo.step = '0.01';
            break;
        case 'tipo':
            campo.placeholder = 'Digite o novo tipo da despesa';
            campo.type = 'text';
            break;
        default:
            campo.placeholder = 'Digite o novo valor';
            campo.type = 'text';
    }
});