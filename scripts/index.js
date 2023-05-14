
// A função "verify" verifica se o usuário está autenticado e se é um administrador ou não. Se o usuário estiver autenticado e for um
// administrador, ele é redirecionado para a página de administração. Caso contrário, o usuário é redirecionado para a página do usuário
// normal.
verify()
function verify(){
    const isAuth = localStorage.getItem("isAuth")
    const isAdm = localStorage.getItem("isAdm")

    if(isAuth && isAdm === 'true'){
        window.location.href = "./pages/admin.html"
    }
    if(isAuth || isAdm ==='false'){
        window.location.href = "./pages/user.html"
    }
}

// Essa função é responsável por adicionar um evento de clique ao botão de voltar para a página de login no header da aplicação. Quando
// o botão é clicado, a função previne o comportamento padrão do link, redirecionando o usuário para a página de login.
const backToLoginHeader = () => {
    const backButton = document.querySelector('.header-login')
    backButton.addEventListener("click", async (e) => {
        e.preventDefault()
        window.location.href = "./pages/login.html"
    }
    )
}
backToLoginHeader()

// A função goToRegister adiciona um evento de clique aos botões com a classe .header-cadastro, que redireciona o usuário para a página de
// cadastro (sign-up.html) quando o botão é clicado.
const goToRegister = () => {
    const registerButton = document.querySelectorAll('.header-cadastro')
    registerButton.forEach(button => {
        button.addEventListener("click", async (e) => {
            e.preventDefault()
            window.location.href = "./pages/sign-up.html"
        }
        )
    })
}
goToRegister()

