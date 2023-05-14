const baseUrl = "http://localhost:3333"

// Essa função faz uma requisição para o servidor e busca uma lista de categorias, que são adicionadas a um elemento de seleção (dropdown)
// no HTML. Para cada categoria, é criado um novo elemento de opção e adicionado ao dropdown.
renderSelect()
async function renderSelect() {
    const select = document.getElementById('select')

    const response = await fetch(`${baseUrl}/categories/readAll`, {
        method: "GET"
    })
    const objJs = await response.json()
    objJs.forEach(element => {
        const option = document.createElement('option')
        option.textContent = element.name
        option.value = element.name
        select.append(option)
    });
}

// Essa função faz uma requisição para a API para obter todas as categorias disponíveis. Ela aguarda a resposta da requisição e depois
// retorna os dados em formato JSON.
const getCategoriesAll = async () => {
    const response = await fetch(`${baseUrl}/categories/readAll`)
    const data = await response.json()
    return await data
}

// A função renderAllCompanies é assíncrona e responsável por buscar todas as empresas cadastradas no banco de dados e renderizá-las na 
// página inicial. Primeiro, ela seleciona a lista não ordenada (ul) onde as empresas serão renderizadas e limpa seu conteúdo existente.
// Em seguida, ela faz uma requisição assíncrona para buscar todas as empresas cadastradas no banco de dados e armazena o resultado em 
// uma variável. Depois, ela percorre cada elemento do array resultante, buscando a categoria correspondente para cada empresa 
// utilizando a função getCategoriesAll(). Em seguida, cria um elemento li para cada empresa, com um título h3 contendo o nome
// da empresa e um span com o nome da categoria. Por fim, adiciona esses elementos li na lista ul.
const renderAllCompanies = async () => {
    const ul = document.querySelector(".section-home-list")
    ul.innerHTML = ""
    const response = await fetch(`${baseUrl}/companies/readAll`)
    const objJs = await response.json()

    objJs.forEach(async element => {
        const getCategories = await getCategoriesAll()
        const find = getCategories.find(category => category.id == element.category_id)
        const li = document.createElement("li")
        li.classList.add("section-home-item")
        const h3 = document.createElement("h3")
        h3.classList.add("name-empresas")
        h3.textContent = element.name
        const span = document.createElement("span")
        span.classList.add("name-sector-span")
        span.textContent = find.name

        li.append(h3, span)
        ul.append(li)

    });
}
renderAllCompanies()


// A função "filterCategories" é responsável por filtrar as empresas por categorias a partir do valor selecionado em um dropdown.
// Ao selecionar uma categoria, é feita uma requisição à API que retorna as empresas pertencentes à categoria selecionada. Caso
// a opção "first" seja selecionada, todas as empresas são renderizadas na tela. A função "renderByCategories" é chamada para
// renderizar as empresas da categoria selecionada. A função é executada quando ocorre uma mudança na opção selecionada no
// dropdown.
const filterCategories = async () => {
    const select = document.getElementById('select')
    select.addEventListener("change", async (e) => {
        if (select.value === "first") {
            renderAllCompanies()
            return 
        }
        const response = await fetch(`${baseUrl}/companies/readByCategory/${select.value}`)
        const data = await response.json()
        renderByCategories(data, select.value)
    })
}
filterCategories()

// Essa função recebe dois parâmetros: "data" e "category". Ela cria uma lista não ordenada (<ul>) vazia e, em seguida, itera por cada
// elemento em "data", criando um novo elemento de lista (<li>) para cada um. Para cada elemento, ela também cria um cabeçalho <h3>) com
// a classe "name-empresas" e o nome do elemento, e um <span> com a classe "name-sector-span" e a categoria fornecida como parâmetro.
// Por fim, ela adiciona esses elementos à lista não ordenada criada e a exibe na página. Essa função é usada para renderizar uma
// lista de empresas filtrada por categoria na página inicial do site. 
const renderByCategories = async (data, category) => {
    const ul = document.querySelector(".section-home-list")
    ul.innerHTML = ""
    
    data.forEach(async element => {
        const li = document.createElement("li")
        li.classList.add("section-home-item")
        const h3 = document.createElement("h3")
        h3.classList.add("name-empresas")
        h3.textContent = element.name
        const span = document.createElement("span")
        span.classList.add("name-sector-span")
        span.textContent = category
        
        li.append(h3, span)
        ul.append(li)
        
    });
}

