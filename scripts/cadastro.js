const valUsername = document.getElementById('username').value;
const valNome = document.getElementById('nome').value;
const valCpf = document.getElementById('cpf').value;
const valEmail = document.getElementById('email').value;
const valSenha = document.getElementById('senha').value;
const valSenha1 = document.getElementById('senha1').value;





async function cadastrar() {


document.getElementById('cadastrar').addEventListener('click',()=>{
 console.log("oi, eu sou a funcao cadastrar")
 
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
})



 
}


