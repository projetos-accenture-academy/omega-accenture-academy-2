/**
 * IDs a serem utilizados para obter/salvar itens no localStorage
 * Exemplo: 
 *  - Obter os dados de login salvos no browser
 *      localStorage.getItem(userDataCollection)
 */

// Dados obtidos no login
const userDataCollection   = "@userDataCollection";

// Planos de contas do usuário
const userAccountPlans     = "@userAccountPlans";

// Dados do dashboard (extrato de transações)
const userAccountStatements = "@userAccountStatements";

const baseURL = 'https://accenture-java-desafio.herokuapp.com/'