

//Gets user's info and tries to log them in
const UserLogin = async () => 
{
    //erase possible existing error message
    document.getElementById('login-error-warning').innerHTML = ""

    let username = document.getElementById('username-input').value;
    let password = document.getElementById('password-input').value;

    //makes axios POST request and awaits a response
    axios.post(`${baseURL}login`,
        {
            senha: password,
            usuario: username
        }
        )
        .then
        (
            res=> 
            {
                if(res.status == 200)
                {
                    //Save user data in local browser variable for further use
                    localStorage.setItem(userDataCollection, JSON.stringify(res.data)); 
                    //Redirects user to dashboard
                    window.location='/dashboard.html';
                }
            }
        ).catch(err =>
            {
                //console.log("Erro ao realizar o login:", err);
                localStorage.removeItem(userDataCollection)

                //Show error message for user
                document.getElementById('login-error-warning').innerHTML = "Erro: Login e/ou senha incorretos."
                //clean up password input
                document.getElementById('password-input').value='';
            })



}

