/*import BDLanchesRepository from "../app/repository/BDLanchesRepository.js";

class authenticate{
        async autenticarRotaFront(req, res, next){
        
        try {
            
            const id = req.cookies.id_sessao;
            if(id){
                const resultado = await BDLanchesRepository.confereLogin(id)
                if(resultado.correto && resultado.resultado.length != 0) return next()
            }    

            return res.redirect('/login.html')
   
        } catch (error) {
            console.log(error)
        }    

    } 
}

export default new authenticate()*/