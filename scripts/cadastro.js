const baseURL = 'https://accenture-java-desafio.herokuapp.com/';


function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}






async function cadastrar() {

document.getElementById('resultado').innerHTML="";

const dadosEnviados = {

     valUsername: document.getElementById('username').value,
     valNome: document.getElementById('nome').value,
     valCpf: document.getElementById('cpf').value.replace(/[^\d]/g, ""),
     valEmail: document.getElementById('email').value,
     valSenha: document.getElementById('senha').value,
     valSenha1: document.getElementById('senha1').value,



}
    
if(dadosEnviados.valSenha1!=dadosEnviados.valSenha){
    document.getElementById('resultado').innerHTML='<p class="lead text-center">Os dois campos de senhas <b>devem conter o mesmo conteúdo</b>.</p>'
}
else if(dadosEnviados.valNome=='' && dadosEnviados.valCpf=='' && dadosEnviados.valEmail=='' && dadosEnviados.valSenha==''){
    document.getElementById('resultado').innerHTML="<p class='lead text-center'>Todos os campos precisam estar preenchidos</p>";
}
else if(!TestaCPF(dadosEnviados.valCpf)){
    document.getElementById('resultado').innerHTML="<p class='lead text-center'>Necessário um CPF válido</p>";
}
 
else{

 try {
       
    const response = await axios.post(`${baseURL}usuarios`,{

     'nome':dadosEnviados.valNome,
     'cpf':dadosEnviados.valCpf,
     'usuario':dadosEnviados.valUsername,
     'senha':dadosEnviados.valSenha

   /* username:valUsername,
        name:valNome,
        cpf:valCpf,
        senha:valSenha,
       email:valEmail*/
    }, {
        headers: {
        'Content-Type': 'application/json'
      }
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  } finally {
   document.getElementById('cadForm').innerHTML="";
   document.getElementById('cadForm').innerHTML="<p class='lead text-center justify-content'>Cadastro realizado com sucesso. <a href='login.html'>Clique para ir para tela de login</a> </p>";

}




}
 

 
}




