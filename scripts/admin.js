import { closeModal, closeModalDeleteDepartment, closeModalDeleteUser, closeModalDepartment, closeModalEditDepartment, closeModalEditUser, openModalDeleteUser, openModalDepartment, openModalEditUser } from "./modal.js"
import { showToast } from "./toast.js"

// Essa função verifica se há um valor "isAuth" no armazenamento local do navegador. Se existir, retorna um token de 
// autorização formatado como "Bearer" + o valor. Caso contrário, retorna a string "Não autenticado."
function getToken() {
    const getter = localStorage.getItem("isAuth")
    if (getter) {
        return `Bearer ${getter}`
    } else {
        return `Não autenticado.`
    }
}


// Essa função verifica se um usuário está autenticado e se ele é um administrador. Para isso, ela verifica se há valores 
// para as chaves "isAuth" e "isAdm" no armazenamento local do navegador. Se o usuário não estiver autenticado, ele é 
// redirecionado para a página de login. Se o usuário estiver autenticado, mas não for um administrador, ele é redirecionado
//  para a página do usuário.
verify()
function verify() {
    const isAuth = localStorage.getItem("isAuth")
    const isAdm = localStorage.getItem("isAdm")

    if (!isAuth) {
        window.location.href = "./login.html"
    }
    if (!isAdm || isAdm === 'false') {
        window.location.href = "./user.html"
    }
}

const baseUrl = "http://localhost:3333"

renderInitialDepartments()

// Esse código define uma função chamada "modalEventListener" que é responsável por adicionar vários eventos para fechar e abrir 
// diferentes modais em uma interface. Esses eventos incluem fechar e abrir o modal de edição, exclusão e criação de departamentos
//  e usuários. A função é chamada sempre que ocorre um evento que exige a manipulação desses modais.
const modalEventListener = () => {
    closeModal()
    closeModalDeleteDepartment()
    closeModalDeleteUser()
    closeModalEditDepartment()
    closeModalEditUser()
    closeModalDepartment()
    openModalDepartment()
}

modalEventListener()

// Esse código define uma função chamada "backToLogin" que é responsável por adicionar um evento de clique ao botão de logout. Quando
//  o botão é clicado, a função previne o comportamento padrão (redirecionamento para uma página vazia) e redireciona o usuário para 
//  a página de login. Além disso, ela também limpa o armazenamento local do navegador, removendo quaisquer informações armazenadas 
//  para o usuário autenticado.
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

// Essa função é responsável por renderizar todos os departamentos de uma empresa selecionada em uma página da web. Primeiro, a função 
// cria um menu suspenso de seleção de departamento com base nas empresas obtidas de uma solicitação GET para a API do servidor. Em 
// seguida, um evento de mudança é adicionado ao menu suspenso que faz uma solicitação GET para obter todos os departamentos associados
// à empresa selecionada. Os departamentos são renderizados na página usando outra função de renderização. Se nenhum departamento for 
// selecionado, a função renderiza novamente todos os departamentos iniciais.
renderAllDepartments()
async function renderAllDepartments() {
    const select = document.getElementById("select_department")
    const response = await fetch(`${baseUrl}/companies/readAll`, {
        method: "GET"
    })
    const objJs = await response.json()
    objJs.forEach(element => {
        const option = document.createElement('option')
        option.textContent = element.name
        option.value = element.name
        option.id = element.id
        select.append(option)
    })
    select.addEventListener("change", async (e) => {
        e.preventDefault()
        if (select.value == "initial-value") {
            renderInitialDepartments()

        } else {
            const selected = select.options[select.selectedIndex]
            const resp = await fetch(`http://localhost:3333/departments/readByCompany/${selected.id}`, {
                method: "GET",
                headers: {
                    Authorization: getToken()
                }
            })
            const companyDepartments = await resp.json()


            renderElementsByCompany(companyDepartments, selected.textContent)
        }
    })

}

// Essa função tem como objetivo renderizar uma lista de departamentos e seus detalhes na tela. Primeiro, ela seleciona o elemento da 
// lista onde a informação será renderizada, em seguida, cria os elementos HTML (h3, span, img) e os adiciona à lista de departamentos 
// com suas informações (nome, descrição, nome da empresa). Por fim, adiciona os botões de ação para cada departamento, como "editar",
// "excluir" e "visualizar funcionários". Ao clicar em cada botão de ação, uma nova janela modal será aberta para executar a ação
// correspondente.
function renderElementsByCompany(departments, companyName) {

    const ul = document.querySelector(".departments__list")
    ul.innerHTML = ""
    departments.forEach(department => {
        const li = document.createElement("li");
        li.classList.add("departments__item");

        const divInfo = document.createElement("div");
        divInfo.classList.add("div__info");

        const h3 = document.createElement("h3");
        h3.classList.add("h3__info");
        h3.textContent = department.name;

        const span1 = document.createElement("span");
        span1.classList.add("span__info");
        span1.textContent = department.description;

        const span2 = document.createElement("span");
        span2.classList.add("span__info");
        span2.textContent = companyName;

        divInfo.appendChild(h3);
        divInfo.appendChild(span1);
        divInfo.appendChild(span2);

        const divIcons = document.createElement("div");
        divIcons.classList.add("div__icons");

        const img1 = document.createElement("img");
        img1.setAttribute("id", "eye");
        img1.setAttribute("src", "../img/eye.png");
        img1.setAttribute("alt", "");
        img1.addEventListener("click", async () => {
            const modalPrincipal = document.getElementById("modal-principal")
            modalPrincipal.showModal()
            employeesOutOfWork()
            await renderEmployeesHired(department.id, companyName)
            await hireSelectedEmployee(department.id, companyName)
        })

        const img2 = document.createElement("img");
        img2.setAttribute("id", "pencil");
        img2.setAttribute("src", "../img/pencil.png");
        img2.setAttribute("alt", "");
        img2.addEventListener("click", async () => {
            const modalEditDepartment = document.getElementById("edit-department")
            modalEditDepartment.showModal()
            await departamentUpdate(department.id)
        })


        const img3 = document.createElement("img");
        img3.setAttribute("id", "trash");
        img3.setAttribute("src", "../img/trash.png");
        img3.setAttribute("alt", "");
        img3.addEventListener("click", async () => {
            const ModalDeleteDepartment = document.getElementById("delete-department")
            await departmentsDelete(department.id)
            ModalDeleteDepartment.showModal()
        })

        divIcons.appendChild(img1);
        divIcons.appendChild(img2);
        divIcons.appendChild(img3);

        li.appendChild(divInfo);
        li.appendChild(divIcons);

        ul.appendChild(li)
    })
}

// Essa função tem como objetivo renderizar os departamentos iniciais da empresa na página web.Para isso, ela realiza uma requisição
// assíncrona para obter os dados de todos os departamentos através de uma API RESTful.Em seguida, ela percorre o array de 
// departamentos e para cada departamento ela faz outra requisição assíncrona para obter os dados da empresa correspondente. 
// Com esses dados, ela cria dinamicamente uma lista de departamentos na página HTML, adicionando informações como o nome do
// departamento, a descrição e o nome da empresa correspondente.Além disso, para cada departamento, são adicionados ícones 
// que permitem editar, excluir e visualizar mais informações sobre os funcionários contratados nesse departamento.
async function renderInitialDepartments() {
    const ul = document.querySelector(".departments__list")
    ul.innerHTML = ""
    const response = await fetch(`http://localhost:3333/departments/readAll`, {
        method: "GET",
        headers: {
            Authorization: getToken()
        }
    })
    const allDepartmentsData = await response.json()
    allDepartmentsData.forEach(async department => {
        const companyID = department.company_id
        const response = await fetch(`http://localhost:3333/companies/readById/${companyID}`, {
            method: "GET",
            headers: {
                Authorization: getToken()
            }
        })
        const company = await response.json()
        const companyName = company.name
        const li = document.createElement("li");
        li.classList.add("departments__item");

        const divInfo = document.createElement("div");
        divInfo.classList.add("div__info");

        const h3 = document.createElement("h3");
        h3.classList.add("h3__info");
        h3.textContent = department.name;

        const span1 = document.createElement("span");
        span1.classList.add("span__info");
        span1.textContent = department.description;

        const span2 = document.createElement("span");
        span2.classList.add("span__info");
        span2.textContent = companyName;

        divInfo.appendChild(h3);
        divInfo.appendChild(span1);
        divInfo.appendChild(span2);

        const divIcons = document.createElement("div");
        divIcons.classList.add("div__icons");

        const img1 = document.createElement("img");
        img1.setAttribute("id", "eye");
        img1.setAttribute("src", "../img/eye.png");
        img1.setAttribute("alt", "");
        img1.addEventListener("click", async () => {
            const modalPrincipal = document.getElementById("modal-principal")
            modalPrincipal.showModal()
            employeesOutOfWork()
            await renderEmployeesHired(department.id, companyName)
            await hireSelectedEmployee(department.id, companyName)

        })


        const img2 = document.createElement("img");
        img2.setAttribute("id", "pencil");
        img2.setAttribute("src", "../img/pencil.png");
        img2.setAttribute("alt", "");
        img2.addEventListener("click", async () => {
            const modalEditDepartment = document.getElementById("edit-department")
            modalEditDepartment.showModal()
            await departamentUpdate(department.id, department.description)
        })


        const img3 = document.createElement("img");
        img3.setAttribute("id", "trash");
        img3.setAttribute("src", "../img/trash.png");
        img3.setAttribute("alt", "");
        img3.addEventListener("click", async () => {
            const ModalDeleteDepartment = document.getElementById("delete-department")
            ModalDeleteDepartment.showModal()
            await departmentsDelete(department.id)
        })

        divIcons.appendChild(img1);
        divIcons.appendChild(img2);
        divIcons.appendChild(img3);

        li.appendChild(divInfo);
        li.appendChild(divIcons);

        ul.appendChild(li)
    })

}

// Essa função é responsável por preencher um elemento select com opções de empresas obtidas de uma API. Quando o usuário seleciona
// uma opção, a função createDepartment é chamada passando o valor do elemento selecionado como parâmetro. Essa função serve como
// um evento que será disparado toda vez que o usuário selecionar uma empresa, permitindo assim que um novo departamento seja
// criado e associado a essa empresa.
modalCreateDepartment()
async function modalCreateDepartment() {
    const select = document.getElementById("department_select")
    const response = await fetch(`${baseUrl}/companies/readAll`, {
        method: "GET"
    })
    const objJs = await response.json()
    objJs.forEach(async element => {
        const option = document.createElement('option')
        option.textContent = element.name
        option.value = element.id
        select.append(option)
    })
    select.addEventListener("change", () => {
        createDepartment(select.value)
    })
}

// Esta função recebe como parâmetro o ID de um departamento e cria um evento de clique no botão de remoção de departamento. Quando o
// botão é clicado, é feita uma requisição DELETE para o servidor com o ID do departamento a ser removido e a autorização do usuário
// por meio do token. Em seguida, uma mensagem de sucesso é exibida ao usuário por meio de um Toast, o diálogo de confirmação de
// exclusão é fechado e a página é atualizada após um segundo. Basicamente, esta função é responsável por remover um departamento
// do sistema.
async function departmentsDelete(departmentId) {
    const deleteButton = document.querySelector(".button__remove-department")
    deleteButton.addEventListener("click", async (e) => {
        e.preventDefault()
        const deleteDepartment = await fetch(`${baseUrl}/departments/delete/${departmentId}`, {
            method: "DELETE",
            headers: { Authorization: getToken() }
        })

        showToast("success", "Departamento removido com sucesso")
        setTimeout(() => {
            const dialog = document.querySelector(".delete__department")
            dialog.close()
            window.location.reload()
        }, 1100)

    })

}

// Essa função é responsável por criar um departamento e adicioná-lo a uma empresa já existente. Ela recebe um parâmetro chamado companyId
// que é o ID da empresa na qual o novo departamento será criado. O código cria um event listener para o botão de criação do departamento,
// e quando esse botão é clicado, os valores dos campos de input de nome e descrição do departamento são obtidos. Em seguida, um objeto
// chamado body é criado com esses valores e o ID da empresa. O objeto body é então enviado como um corpo da requisição HTTP POST para a
// API, juntamente com um token de autorização. Se a resposta da API for bem sucedida, um toast de sucesso é exibido e a página é 
// recarregada após um curto intervalo.
async function createDepartment(companyId) {

    const buttonCreates = document.getElementById("creates")
    console.log(buttonCreates)
    buttonCreates.addEventListener("click", async (e) => {
        e.preventDefault()
        const inputName = document.getElementById("name__department").value
        console.log(inputName)
        const inputDescription = document.getElementById("description__department").value
        console.log(inputDescription)
        const body = {
            name: inputName,
            description: inputDescription,
            company_id: companyId
        }

        const response = await fetch(`${baseUrl}/departments/create`, {
            method: "POST",
            headers: {
                Authorization: getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if (response.ok) {
            showToast("success", "Departamento criado com sucesso")
            setTimeout(async () => {
                const dataDepartment = await response.json()
                console.log(dataDepartment)
                const dialog = document.querySelector(".create__department")
                dialog.close()
                window.location.reload()
            }, 1100)
        }
    })
}

// Essa função é responsável por atualizar a descrição de um departamento. Ela seleciona os elementos HTML necessários para a atualização, 
// preenche o campo de descrição com a descrição atual do departamento e adiciona um listener de evento ao botão de atualização. Quando o
// botão é clicado, a função verifica se a nova descrição é diferente da atual. Se for igual, uma mensagem de erro é exibida. Caso 
// contrário, a função faz uma requisição PATCH para a API, enviando a nova descrição no corpo da requisição. Depois de receber uma
// resposta da API, uma mensagem de sucesso é exibida e a página é recarregada após 1,1 segundos. A função retorna a resposta da API.
async function departamentUpdate(departmentId, description) {
    const dialog = document.getElementById("edit-department")
    const buttonUpdate = document.querySelector(".edit__department-button")
    const departmentDescription = document.querySelector('.edit__department-input')
    departmentDescription.value = description
    buttonUpdate.addEventListener('click', async () => {
        if (description == departmentDescription) {
            dialog.close()
            showToast("error", "Nenhuma alteração para salvar")
        }

        const body = {
            description: departmentDescription.value
        }
        console.log(body)
        const response = await fetch(`http://localhost:3333/departments/update/${departmentId}`, {
            method: 'PATCH',
            headers: {
                Authorization: getToken(),
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const dataUpdate = await response.json()
        showToast("success", dataUpdate.message)
        setTimeout(() => {
            dialog.close()
            location.reload()
        }, 1100)
        return await dataUpdate
    })

}

// Essa função é responsável por buscar todos os usuários cadastrados no sistema e renderizá-los na página. Primeiramente, a função obtém
// a referência da lista onde os usuários serão exibidos e limpa seu conteúdo anterior. Em seguida, faz uma requisição GET para a API,
// informando o token de autorização para buscar todos os funcionários cadastrados no sistema. Para cada funcionário encontrado,
// é criado um elemento li contendo um h3 com o nome do funcionário e um span com o nome da empresa a qual ele pertence, que é 
// obtido através de uma função auxiliar chamada getCompanyById. Também são criados dois ícones, um de lápis e outro de lixeira,
// para edição e exclusão do usuário. Esses ícones são adicionados a um div com a classe div__icons-second, que é filha do elemento li.
// Por fim, o li é adicionado à lista de usuários renderizada na página.
renderUsers()
async function renderUsers() {
    const userList = document.querySelector('.users__list');
    userList.innerHTML = ""

    const response = await fetch(`${baseUrl}/employees/readAll`, {
        method: "GET",
        headers: {
            Authorization: getToken(),
        }
    })

    const employees = await response.json()
    employees.forEach(async employee => {

        const li = document.createElement('li');
        li.classList.add('user__item');
        const divInfoSecond = document.createElement('div');
        divInfoSecond.classList.add('div__info-second');
        const h3Info = document.createElement('h3');
        h3Info.classList.add('h3__info');
        h3Info.textContent = employee.name
        const spanInfo = document.createElement('span');
        spanInfo.classList.add('span__info');
        const companyEmployee = await getCompanyById(employee.company_id)
        spanInfo.textContent = companyEmployee.name
        const divIconsSecond = document.createElement('div');
        divIconsSecond.classList.add('div__icons-second');
        const imgPencilSecond = document.createElement('img');
        imgPencilSecond.classList.add('pencil-second');
        imgPencilSecond.src = "../img/pencil.png"
        imgPencilSecond.addEventListener("click", async () => {
            const dialog = document.querySelector(".edit__user")
            dialog.showModal()
            console.log(employee)
            editUser(employee.id, employee.name, employee.email)
        })
        const imgTrashSecond = document.createElement('img');
        imgTrashSecond.classList.add('trash-second');
        imgTrashSecond.src = "../img/trash.png"
        imgTrashSecond.addEventListener("click", async () => {
            const dialog = document.querySelector(".delete__user")
            dialog.showModal()
            deleteUser(employee.id)
        })



        divInfoSecond.appendChild(h3Info);
        divInfoSecond.appendChild(spanInfo);
        divIconsSecond.appendChild(imgPencilSecond);
        divIconsSecond.appendChild(imgTrashSecond);
        li.appendChild(divInfoSecond);
        li.appendChild(divIconsSecond);

        userList.appendChild(li);

    })


}

// A função editUser é uma função assíncrona que recebe como parâmetros o id do usuário a ser editado, seu nome e email. Ela captura os
// elementos de input de nome e email, preenche-os com os dados do usuário e espera por um clique no botão de salvar. Quando clicado,
// ela envia uma requisição PATCH para atualizar as informações do usuário no servidor, exibe uma mensagem de sucesso, atualiza a 
// página e fecha o modal de edição.
async function editUser(userId, username, email) {
    const buttonSave = document.querySelector(".button__save-user")
    const inputName = document.querySelector(".name__user-edit-input")
    inputName.value = username
    const inputEmail = document.querySelector(".email__user-edit-input")
    inputEmail.value = email
    console.log(userId)
    buttonSave.addEventListener("click", async () => {
        const body = {
            name: inputName.value,
            email: inputEmail.value
        }
        const response = await fetch(`http://localhost:3333/employees/updateEmployee/${userId}`, {
            method: "PATCH",
            headers: {
                Authorization: getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await response.json()
        showToast("success", "Usuário atualizado com sucesso")
        setTimeout(() => {
            window.location.reload()
            const modal = document.querySelector(".edit__user")
            modal.close()
        }, 1100)

    })
}

// Essa função é responsável por deletar um usuário quando o botão de remover é clicado. Ela faz uma requisição para o servidor para 
// excluir o usuário com o ID informado. Se a requisição for bem-sucedida, um toast de sucesso é mostrado na tela e a página é 
// recarregada.
async function deleteUser(userId) {
    const buttonRemove = document.querySelector(".button__remove-user")
    buttonRemove.addEventListener("click", async () => {
        const response = await fetch(`${baseUrl}/employees/deleteEmployee/${userId}`, {
            method: "DELETE",
            headers: {
                Authorization: getToken()
            }
        })
        const data = await response.json()
        if (response.ok) {
            showToast("success", "Usuário deletado com sucesso")
            setTimeout(() => {
                window.location.reload()
            }, 1100)
        }
    })
}


// A função "employeesOutOfWork" é assíncrona e busca os funcionários que estão fora do trabalho. Ela seleciona um elemento "select" do
// documento HTML, limpa seu conteúdo e preenche com as opções dos funcionários que estão fora do trabalho, obtidos através da
// requisição "fetch" com a rota "outOfWork". Para cada funcionário, é criada uma opção no "select" com seu ID e nome.
async function employeesOutOfWork() {
    const select = document.querySelector(".modal__select")
    select.innerHTML = ""
    const response = await fetch(`${baseUrl}/employees/outOfWork`, {
        method: "GET",
        headers: {
            Authorization: getToken()
        }
    })
    const toWorkEmployees = await response.json()

    toWorkEmployees.forEach(employee => {
        const option = document.createElement("option")
        option.value = employee.id
        option.textContent = employee.name

        select.appendChild(option)
    })
}

// A função "hireSelectedEmployee" é responsável por contratar um funcionário selecionado em um modal. Primeiro, a função obtém o elemento
// "select" do modal e o corpo da solicitação PATCH. Em seguida, adiciona um ouvinte de eventos ao botão de contratação para que, quando
// clicado, envie uma solicitação PATCH para o servidor com o ID do funcionário selecionado e o ID do departamento como parâmetros. 
// Quando a resposta é recebida, a função "employeesOutOfWork" é chamada para atualizar a lista de funcionários disponíveis e a função
// "renderEmployeesHired" é chamada para atualizar a lista de funcionários contratados.
async function hireSelectedEmployee(departmentId, companyName) {
    const select = document.querySelector(".modal__select")
    const body = {
        department_id: departmentId
    }

    const hireButton = document.querySelector(".hire__button")
    hireButton.addEventListener("click", async () => {
        console.log(select.value)
        fetch(`${baseUrl}/employees/hireEmployee/${select.value}`, {
            method: "PATCH",
            headers: {
                Authorization: getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                return response.json()
            })
            .then(async data => {
                await employeesOutOfWork()
                await renderEmployeesHired(departmentId, companyName)
            })

    })
}

// Essa função renderiza na tela os funcionários contratados de um departamento específico, recebendo como parâmetros o ID do departamento
// e o nome da empresa. Primeiro, a função seleciona um elemento HTML com ID "modal-list" e o limpa. Em seguida, faz uma requisição
// assíncrona ao servidor para buscar o departamento pelo ID. Depois, itera sobre a lista de funcionários do departamento e para cada
// um cria um elemento de lista (li) com um título (h3) contendo o nome do funcionário e um span com o nome da empresa. Por fim, cria
// um botão "Desligar" que chama a função dismissEmployee() quando clicado e adiciona o botão ao elemento li, que é adicionado à
// lista (ul).
async function renderEmployeesHired(departmentId, companyName) {

    const ul = document.getElementById("modal-list")

    ul.innerHTML = ""

    const response = await fetch(`${baseUrl}/departments/readById/${departmentId}`, {
        headers: {
            Authorization: getToken()
        }
    })
    const departments = await response.json()
    const departmentEmployees = departments.employees
    departmentEmployees.forEach(employee => {

        const li = document.createElement("li");
        li.classList.add("modal__item");

        // criar o elemento h3 e adicionar o texto "Username"
        const h3 = document.createElement("h3");
        h3.classList.add("modal__h3-sec");
        h3.textContent = employee.name;

        // criar o elemento span e adicionar o texto "Company Name"
        const span = document.createElement("span");
        span.classList.add("modal__span");
        span.textContent = companyName;

        // criar o botão e adicionar o texto "Desligar"
        const button = document.createElement("button");
        button.classList.add("modal__turnoff");
        button.textContent = "Desligar";
        button.addEventListener("click", async () => {
            await dismissEmployee(employee.id, departmentId, companyName)
        })

        // adicionar o h3 e o span ao elemento li
        li.appendChild(h3);
        li.appendChild(span);

        // adicionar o botão ao elemento li
        li.appendChild(button);


        ul.appendChild(li)
    })

}

// Essa função demite um funcionário usando o método PATCH de uma API e, se a resposta for positiva, chama duas outras funções assíncronas
// para atualizar a lista de funcionários contratados e os que estão fora do trabalho.
async function dismissEmployee(idEmployee, idDepartment, companyName) {

    const response = await fetch(`${baseUrl}/employees/dismissEmployee/${idEmployee}`, {
        method: "PATCH",
        headers: {
            Authorization: getToken()
        }
    })
    if (response.ok) {
        await renderEmployeesHired(idDepartment, companyName)
        await employeesOutOfWork()
    }

}

// Essa função recebe um ID de uma empresa, faz uma requisição para a API e retorna um objeto com as informações da empresa.
async function getCompanyById(id) {
    const response = await fetch(`${baseUrl}/companies/readById/${id}`, {
        method: "GET",
        headers: {
            Authorization: getToken()
        }
    })
    const data = await response.json()
    return await data
}