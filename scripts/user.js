const baseUrl = "http://localhost:3333"

// A função "verify" verifica se o usuário está autenticado e se é um administrador. Se o usuário for um administrador, ele é redirecionado
// para a página do administrador. Se o usuário não estiver autenticado, ele é redirecionado para a página de login.
function verify(){
    const isAuth = localStorage.getItem("isAuth")
    const isAdm = localStorage.getItem("isAdm")

    if(isAdm ==='true'){
        window.location.href = "./admin.html"
    }

    if(!isAuth){
        window.location.href = "./login.html"
    }
}
verify()


// Função que adiciona um listener de evento em um botão "logout" no cabeçalho da página. Quando clicado, ele limpa o armazenamento
// local do navegador e redireciona o usuário para a página de login.
const backToLogin = () => {
    const backButton = document.querySelector('.header-logout')
    backButton.addEventListener("click", async (e) => {
        e.preventDefault()
        window.location.href = "../pages/login.html"
        localStorage.clear()
    }
    )
}
backToLogin()

// A função getToken() verifica se o usuário está autenticado ao procurar um token no armazenamento local do navegador. Se estiver
// autenticado, a função retorna o token com o prefixo "Bearer". Caso contrário, retorna uma mensagem indicando que o usuário não
// está autenticado.
export function getToken() {
    const getter = localStorage.getItem("isAuth")
    if (getter) {
        return `Bearer ${getter}`
    } else {
        return `Não autenticado.`
    }
}

// A função renderDepartment faz uma solicitação HTTP GET a uma API com um ID de departamento fornecido como parâmetro. Em seguida,
// ela extrai os dados do JSON de resposta e atualiza o conteúdo da página com esses dados. O nome da empresa e do departamento
// são exibidos no topo da página e a lista de funcionários do departamento é exibida abaixo.
const renderDepartment = async (departmentId) => {
     fetch(`${baseUrl}/departments/readById/${departmentId}`, {
        method: "GET",
        headers:{
            Authorization: getToken()
        }
     })
     .then(response => response.json())
     .then(data => {
        const companyName = document.querySelector(".company__name-h2")
        const company = data.company.name
        const department = data.name

        companyName.textContent = `${company} - ${department}`

        const ul = document.querySelector(".users__list")

        data.employees.forEach(employee => {
            console.log(employee)
            const li = document.createElement("li")
            li.classList.add("user__item")
            const h3 = document.createElement("h3")
            h3.textContent = employee.name
            li.appendChild(h3)
            ul.appendChild(li)
        });
        console.log(data)

     })
}

// Esta função busca o perfil do usuário autenticado e renderiza seu nome e e-mail em um elemento de página HTML. Se o usuário estiver
// associado a um departamento, o departamento será renderizado abaixo das informações do usuário. A função faz uma solicitação GET 
// para a API fornecida no URL da variável 'baseUrl', passando o token de autorização no cabeçalho da solicitação. Em caso de sucesso,
// o resultado é transformado em JSON e o nome e e-mail do usuário são adicionados aos elementos HTML correspondentes. Se o usuário
// estiver associado a um departamento, a função 'renderDepartment' é chamada para buscar e renderizar as informações do 
// departamento do usuário. Se ocorrer um erro, o erro é impresso no console.
const renderUser = async () => {
    const div = document.querySelector('.div__username')
    fetch(`${baseUrl}/employees/profile`, {
        method: "GET",
        headers: {
            Authorization: getToken()
         }
    })
        .then(response => response.json())
        .then(data => {
            const h2 = document.querySelector('.h2__username')
            h2.textContent = data.name
            const h3 = document.querySelector('.h3__username')
            h3.textContent = data.email
            if(data.department_id) {
                const result = document.querySelector(".div__result")
                const empty = document.querySelector(".div__empty")
                result.classList.remove('hide')
                empty.classList.add("hide")
                renderDepartment(data.department_id)
            }
            
        })
        .catch(erro => console.log(erro));
}
renderUser()

