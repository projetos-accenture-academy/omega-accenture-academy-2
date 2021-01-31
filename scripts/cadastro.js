import baseURL from './constantes';

const valUsername = document.getElementById('username').value;
const valNome = document.getElementById('nome').value;
const valCpf = document.getElementById('cpf').value;
const valEmail = document.getElementById('email').value;
const valSenha = document.getElementById('senha').value;
const valSenha1 = document.getElementById('senha1').value;





async function cadastrar() {


document.getElementById('cadastrar').addEventListener('click',()=>{
 
    try {
        console.log("passei por aqui");
        const response = await axios.post(`${baseURL}usuarios`,{
            username:valUsername,
            name:valNome,
            cpf:valCpf,
            senha:valSenha,
            email:valEmail
        }, {
          method: POST,
          mode: cors,
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
})

 
}


