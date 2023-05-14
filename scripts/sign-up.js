import { showToast } from "./toast.js"

// A função registerUser() é responsável por fazer o cadastro de um novo usuário no sistema. Ela é acionada quando o usuário clica
// no botão "Registrar". A função pega os valores dos campos de nome, email e senha preenchidos pelo usuário e verifica se algum 
// deles está vazio. Caso esteja, exibe uma mensagem de erro. Em seguida, envia uma requisição POST para a API contendo os dados
// do novo usuário, e se a operação for bem sucedida, exibe uma mensagem de sucesso e redireciona o usuário para a página de 
// login. Caso contrário, exibe uma mensagem de erro informando que o email já está cadastrado.
const registerUser = () => {
    const registerButton = document.getElementById("login-button")
    registerButton.addEventListener("click", async (e) => {
        e.preventDefault()
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        if(name === ""||email === ""|| password === ""){
            showToast("error", "Preencha todos os campos")
            return
        }
        const body = {
            "name": name,
            "email": email,
            "password": password
        }

        const response = await fetch("http://localhost:3333/employees/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if (response.ok) {
            showToast("success", "Cadastro realizado com sucesso")
            setTimeout(()=>{
                window.location.href = "./login.html"
            },1200)
            return response.json()
        } else {
            showToast("error", "E-mail já cadastrado")
        }

    })
}
registerUser()

// Essa função adiciona um evento de clique no botão de voltar para a página de login e redireciona o usuário para a página de login.
const backToLogin = () => {
    const backButton = document.getElementById('signup-button')
    backButton.addEventListener("click", async (e) => {
        e.preventDefault()
        window.location.href = "./login.html"
    }
    )
}
backToLogin()

// Essa função adiciona um evento de clique no botão "Voltar" do cabeçalho de uma página que redireciona o usuário para a página de login
// quando clicado.
const backToLoginHeader = () => {
    const backButton = document.querySelector('.header-cadastro')
    backButton.addEventListener("click", async (e) => {
        e.preventDefault()
        window.location.href = "./login.html"
    }
    )
}
backToLoginHeader()

// Essa função adiciona um event listener no botão de voltar para a página inicial no cabeçalho da página de login. Quando o botão é clicado, 
// a função redireciona o usuário para a página inicial (home.html).
const backToHome = () => {
    const backButton = document.querySelector('.header-login')
    backButton.addEventListener("click", async (e) => {
        e.preventDefault()
        window.location.href = "../home.html"
    }
    )
}
backToHome()




