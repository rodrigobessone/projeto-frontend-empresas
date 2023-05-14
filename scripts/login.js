import { showToast } from "./toast.js"

const baseUrl = "http://localhost:3333"

// A função "goToRegister" adiciona um evento de clique a todos os botões com a classe "sign-up-btn" em uma página, e quando o botão
// é clicado, ele impede o comportamento padrão do clique e redireciona o usuário para a página de registro "sign-up.html".
const goToRegister = () => {
    const registerButton = document.querySelectorAll('.sign-up-btn')
    registerButton.forEach(button => {
        button.addEventListener("click", async (e) => {
            e.preventDefault()
            window.location.href = "./sign-up.html"
        }
        )
    })
}
goToRegister()

// Essa função adiciona um evento de clique ao botão "Voltar" no cabeçalho da página. Quando o botão é clicado, ele redireciona o usuário
// para a página inicial ("home.html").
const backToHome = () => {
    const backButton = document.querySelector('.header-login')
    backButton.addEventListener("click", async (e) => {
        e.preventDefault()
        window.location.href = "../home.html"
    }
    )
}
backToHome()

// A função "userLocation" recebe um token de login e armazena as informações de autenticação e permissão em localStorage. Em seguida,
// verifica se o usuário é um administrador e redireciona para a página de administração ou para a página de usuário comum, dependendo
// do resultado.
const userLocation = (tokenLogin) => {
    const isAuth = tokenLogin.authToken
    const isAdm = tokenLogin.isAdm
    console.log(isAuth, isAdm)
    localStorage.setItem("isAuth", isAuth)
    localStorage.setItem("isAdm", isAdm)
    if (isAdm) {
        window.location.href = "./admin.html"
    } else {
        window.location.href = "./user.html"
    }
}

// Essa função é responsável por realizar o login do usuário. Ela é acionada quando o botão de login é clicado na tela de login.
// A função pega o e-mail e senha digitados pelo usuário, cria um objeto com esses valores e faz uma requisição para o servidor para
// autenticação. Se o login for realizado com sucesso, a função mostra uma mensagem de sucesso e redireciona o usuário para a tela 
// de administração ou usuário com base no tipo de usuário que ele é. Se o login não for bem sucedido, a função mostra uma mensagem
// de erro e retorna os dados de erro. A mensagem de erro pode ser, por exemplo, "E-mail ou senha incorretos".
const loginFuntion = () => {
    const button = document.getElementById("login-button")
    button.addEventListener("click", async (e) => {
        e.preventDefault()
        const inputMail = document.getElementById("email").value
        const inputPassword = document.getElementById("password").value
        const requestBody = {
            "email": inputMail,
            "password": inputPassword
        }
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(requestBody)
        })
        if (response.ok) {
            showToast("success", "Login realizado com sucesso")
            setTimeout(async () => {
                const tokenLogin = await response.json()
                userLocation(tokenLogin)
            }, 1100)


            return tokenLogin
        } else {
            const data = await response.json()
            showToast("error", data.message)
            return data
        }

    })
}
loginFuntion()


