

document.getElementById("login").addEventListener('click', async(event) =>{    
    event.preventDefault();
    var adm = null;
    const cpf = document.getElementById('cpf').value.trim();
    const email = document.getElementById('email').value.trim();
    const result = ({"email" : email, "cpf": cpf})
    if(email.length == 0 || cpf.length == 0){
        alert("Preencha todos os campos!");
        
    } else {
        const resposta = await fetch(`http://localhost:4000/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result),
            credentials: 'include'
            });
            const resultado = await resposta.json();
            alert(resultado.message)
            if (resultado.logado) window.location.href = resultado.redirect;

    }

            document.getElementById("email").value = "";
            document.getElementById("senha").value = "";
            document.getElementById("tipoDeUsuario").value = ""       

})


          
            
            

   


       
    
        

