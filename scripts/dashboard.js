const viewContas = null || document.getElementById('view-contas')

/**
 * Para testar sem o login, descomentar o bloco abaixo
 * Talvez seja necessário trocar o token por um atualizado
 */
/*const usuarioDados = `{
  "usuario": {
    "id": 8,
    "nome": "Usuário teste",
    "login": "usuarioteste"
  },
  "token": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c3VhcmlvdGVzdGUiLCJpZFVzdWFyaW8iOjgsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2MTIxNDM1NzgsImV4cCI6MTYxMjE0NzE3OH0.nY7hz8ivJVP7wHwv0BPUDTzdD8tAulgHuTdyaqcvDLqbESUrH56RjdfXvxMB_lyt9kDry-I2K54VYS5EQHF0-w"
}`

localStorage.setItem(userDataCollection, usuarioDados)*/


/**
 * Realiza a chamada da api de lanãmentos e salva no localstorage
 * Exibe um erro se não conseguir acessar a API 
 */
const setDashboardData = async (initialDate = '', finalDate = '') => {
    
    const userData = JSON.parse(localStorage.getItem(userDataCollection));
    const {usuario, token} = await userData;
    let error = false;
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${(now.getMonth() <= 9 ? '0' + (now.getMonth()+1) : now.getMonth()+1)}`;
    const lastDay = new Date(now.getFullYear(), thisMonth.substr(5,7), 0).getDate()
    
    const ini = initialDate ? initialDate : `${thisMonth}-01`;
    const final = finalDate ? finalDate : `${thisMonth}-${lastDay}`;
    
    await axios
        .get(`${baseURL}dashboard?fim=${final}&inicio=${ini}&login=${usuario.login}`,  {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        .then(
            res =>  {
                localStorage.setItem(userAccountStatements, JSON.stringify(res.data))
            })
        .catch(err => {
            console.log('Erro ao atualizar os dados locais vindos do servidor')
            error = true;
            localStorage.removeItem(userAccountStatements)
        })

    return error;
}


const viewAccountItem = (conta, label) => {
    return `
    <div class="accordion col-md-6 mt-2" id="accordion">
        <div class="accordion-item shadow">
            <h2 class="accordion-header" id="heading151">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse151" aria-expanded="true" aria-controls="collapse151">
                    <div class="col-6 justify-content-start d-flex">
                        <div>
                            ${label}
                        </div>
                    </div>
                    <div class="col-5 justify-content-end d-flex">
                        <div class="text-right p-2 w-75 bg-primary rounded-3 text-white">
                            Saldo: ${conta.saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </div>
                    </div>
                </button>
            </h2>
            <div id="collapse151" class="accordion-collapse collapse show" aria-labelledby="heading151"
                data-bs-parent="#accordion">
                <div class="accordion-body accordion-conta">
                    
                        <div class="container mb-2 p-2">
                            <div class="container p-0 mt-2 d-grid gap-2 d-md-flex justify-content-md-between">
                                <div class="d-flex align-items-center">
                                    <h6 id="filter-label">Extrato do mês atual</h6>
                                </div>
                                <button class="btn btn-primary btn-sm" type="button" data-bs-toggle="modal"
                                    data-bs-target="#modal-filter">
                                    Filtros <i class="fas fa-filter"></i>
                                </button>
                            </div>
                        </div>
                        <div class="container lancamentos">
                        ${conta.lancamentos.length > 0 ? conta.lancamentos.map(info => {
                                return `
                                    <div class="row justify-content-between">
                                        <div class="col-3">${info.data}</div>
                                        <div class="col-5">${info.descricao}</div>
                                        <div class="col-1 justify-content-center d-flex d-none d-md-block">
                                            <div><span class="badge bg-${info.tipo == 'R' ? 'success' : 'danger'}">${info.tipo}</span></div>
                                        </div>
                                        <div class="col-3 text-end valor-tipo-${info.valor}">${info.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</div>
                                    </div>
                                `
                            }).join('') 
                            : `<div class="h-100 text-center">Nenhum lançamento para esta conta</div>`}

                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

const init = async () => {
    viewContas.innerHTML = loadingElement;
    
    const error = await setDashboardData()

    if(!error){
        const accounts = JSON.parse(localStorage.getItem(userAccountStatements))
        const {contaBanco: contaBancoDash, contaCredito: contaCreditoDash} = accounts

        if(document.getElementById('apply-filter')){
            document.getElementById('apply-filter').addEventListener('click', async function(e){
                let iniDate = document.getElementById('initialDate').value
                let finDate = document.getElementById('finalDate').value
                if(iniDate != '' && finDate != ''){
                    await setDashboardData(iniDate, finDate)
                    const accountsRefreshed = JSON.parse(localStorage.getItem(userAccountStatements))
                    const {contaBanco: contaBancoDash, contaCredito: contaCreditoDash} = accountsRefreshed
                   
                    viewContas.innerHTML =  viewAccountItem(contaBancoDash, 'Conta Banco') + viewAccountItem(contaCreditoDash, 'Conta Corrent')
                    
                    if(document.getElementById('filter-label')){
                        const filterLabel = document.getElementById('filter-label')
                        
                        filterLabel.innerHTML = `${iniDate} à ${finDate}`
                    }
                   
                } else {
                    alert("Preencha os campos de datas (inicial e final)");
                }
            })
        }

        viewContas.innerHTML =  viewAccountItem(contaBancoDash, 'Conta Banco') + viewAccountItem(contaCreditoDash, 'Conta Corrent')


        const userData = JSON.parse(localStorage.getItem(userDataCollection));
        const {usuario} =  userData;
        
        document.getElementById('user-logged').innerHTML = usuario.nome.split(" ")[0]
    } else {
        viewContas.innerHTML =  `<di class="error-dash">Não foi possível obter os dados do dashboard, por favor tente novamente.</div>`;
    }
}

init()