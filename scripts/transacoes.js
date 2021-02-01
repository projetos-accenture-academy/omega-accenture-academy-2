const modalTransacoes = (`
<button class="btn btn-danger me-md-2" type="button" data-bs-toggle="modal"
data-bs-target="#modal-transacoes">
Transferir <i class="ms-3 far fa-share-square"></i>
</button>
<div class="modal fade" id="modal-transacoes" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Nova Transação

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-arrow-left-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z" />
                </svg>

            </h5>
            <button type="button" id="closeAddExpenseModal" class="btn-close" data-bs-dismiss="modal"
                aria-label="Close" (click)="closeClick()">
            </button>
        </div>
        <div class="modal-body">
            <div class="row p-2">
                <div class="col-md-4">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" id="inputConta" placeholder="Conta">
                        <label for="inputConta">Nro Conta</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" id="inputContaD" placeholder="Conta de destino">
                        <label for="inputContaD">Nro Conta de destino</label>
                    </div>
                </div>
                <div class="col-md">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" id="inputLoginD" placeholder="Login de destino">
                        <label for="inputLoginD">Login de destino</label>
                    </div>
                </div>
            </div>

            <div class="row p-2">
                <div class="col-md-4">
                    <div class="form-floating mb-2">
                        <input type="date" class="form-control" id="inputData">
                        <label for="inputData">Data</label>
                    </div>
                </div>

                <div class="col-md">
                    <div class="form-floating mb-2">
                        <select class="form-select" id="selectPlanoConta"
                            aria-label="Floating label select example">
                            <option value="R">Crédito</option>
                            <option value="D">Débito</option>
                            <option value="TU">Transf. usúarios</option>
                            <option value="TC">Transf. contas</option>
                        </select>
                        <label for="selectPlanoConta">Tipo movimento</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" id="inputValor" placeholder="Valor">
                        <label for="inputData">Valor R$</label>
                    </div>
                </div>

            </div>

            <div class="row p-2">
                <div class="col-md">
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Descrição" id="inputDesc"></textarea>
                        <label for="inputDesc">Descrição</label>
                    </div>
                </div>

            </div>
        </div>

        <div class="modal-footer">
            <button type="button" id="btn-close" class="btn btn btn-secondary" data-bs-dismiss="modal">
                Close
            </button>
            <button type="button" id="btn-save" class="btn btn btn-primary"
                data-bs-dismiss="modal">Confirmar</button>
        </div>
    </div>
</div>
</div> `);

const fazerTransferencia = async () => {
    
document.getElementById('modal-transacoes').innerHTML="";

    document.getElementById('btn-save').addEventListener('click', function () {
        let conta = document.getElementById('inputConta').value,
            contaDestino = document.getElementById('inputContaD').value,
            data = document.getElementById('inputData').value,
            descricao = document.getElementById('inputDesc').value,
            login = document.getElementById('inputLogin').value,
            planoConta = document.getElementById('selectPlanoConta').value,
            valor = document.getElementById('inputValor').value

        let postData = {
            conta,
            contaDestino,
            data,
            descricao,
            login,
            planoConta,
            valor
        }

        axios.post(baseURL + 'lancamentos', postData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }

        }).then(
            res => {
                if (res.status === 200) {
                    window.location.reload()
                }
            }
        ).catch(err => {
            console.log(err)
            alert('Oops, algo deu errado')
        })
    });
}

fazerTransferencia()

