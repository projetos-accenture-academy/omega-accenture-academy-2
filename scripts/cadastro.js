





function cadastrar() {

document.getElementById('resultado').innerHTML="";

const dadosEnviados = {

     valUsername: document.getElementById('username').value,
     valNome: document.getElementById('nome').value,
     valCpf: document.getElementById('cpf').value,
     valEmail: document.getElementById('email').value,
     valSenha: document.getElementById('senha').value,
     valSenha1: document.getElementById('senha1').value,



}
    
if(dadosEnviados.valSenha1!=dadosEnviados.valSenha){
    document.getElementById('resultado').innerHTML='<p class="lead text-center">Os dois campos de senhas <b>devem conter o mesmo conteúdo</b>.</p>'
}
if(dadosEnviados.valNome=='' && dadosEnviados.valCpf=='' && dadosEnviados.valEmail=='' && dadosEnviados.valSenha==''){
    document.getElementById('resultado').innerHTML="<p class='lead text-center'>Todos os campos precisam estar preenchidos</p>";
}
 
 /*
 
 try {
        console.log("passei por aqui");
        const response = await axios.post(`${baseURL}usuarios`,{
            username:valUsername,
            name:valNome,
            cpf:valCpf,
            senha:valSenha,
            email:valEmail
        }, {
            headers: {
            'Content-Type': application/json
          }
        });
    
        return await response.json();
      } catch (error) {
        console.error(error);
      } finally {
       console.log(nome)

    }

   */ 



 
}




