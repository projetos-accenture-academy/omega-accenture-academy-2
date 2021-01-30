const viewContas = null || document.getElementById('view-contas')

/*const usuarioDados = `{
  "usuario": {
    "id": 8,
    "nome": "Usuário teste",
    "login": "usuarioteste"
  },
  "token": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c3VhcmlvdGVzdGUiLCJpZFVzdWFyaW8iOjgsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2MTIwMTg5MjUsImV4cCI6MTYxMjAyMjUyNX0.64tdLN187ik15MKe1Q4LIoqpZr1X0M8w9kUdf5WHIgje28VmFA82JgyBS57BBjbeLekwtIk3dQ_pmjs-fZof9A"
}`

localStorage.setItem(userDataCollection, usuarioDados)*/

/**
 * Realiza a chamada da api de lanãmentos e salva no localstorage
 */
const setDashboardData = async () => {
    const userData = JSON.parse(localStorage.getItem(userDataCollection));
    const {usuario, token} = await userData;

    await axios
        .get(`${baseURL}dashboard?fim=2021-01-31&inicio=2021-01-01&login=${usuario.login}`,  {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        .then(
            res =>  {
                localStorage.setItem('@userAccountsStatements', JSON.stringify(res.data))
            })
        .catch(err => {
            document.getElementById('view-contas').innerHTML = `
                <di class="error-dash">Não foi possível obter os dados do dashboard, por favor tente novamente.</div>
            `
        })
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
                    ${conta.lancamentos.length > 0 ?
                        `<div class="container mb-2 p-2">
                            <div class="container p-0 mt-2 d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-primary btn-sm" type="button" data-bs-toggle="modal"
                                    data-bs-target="#modal-filter">
                                    Filtros <i class="fas fa-filter"></i>
                                </button>
                            </div>
                        </div>
                        <div class="container lancamentos">
                        ` 
                        +  conta.lancamentos.map(info => {
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

setDashboardData()

const accounts = JSON.parse(localStorage.getItem('@userAccountsStatements'))
const {contaBanco: contaBancoDash, contaCredito: contaCreditoDash} = accounts

viewContas.innerHTML =  viewAccountItem(contaBancoDash, 'Conta Banco') + viewAccountItem(contaCreditoDash, 'Conta Corrent')
