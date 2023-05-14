// Modal do departamento
export function closeModal() {
    const dialog = document.querySelector(".modal__principal")
    const closeButton = document.querySelector("#close")
    closeButton.addEventListener("click", () => {
        dialog.close()
    })
}

// Modal que cria departamento
export function openModalDepartment() {
    const dialog = document.querySelector(".create__department")
    const openModalButton = document.querySelector(".button__create")

    openModalButton.addEventListener("click", () => {
        dialog.showModal()
    })
}

export function closeModalDepartment() {
    const dialog = document.querySelector(".create__department")
    const closeButton = document.getElementById("close__department")
    closeButton.addEventListener("click", () => {
        dialog.close()
    })
}

// Editar departamento
export function openModalEditDepartment() {
    const dialog = document.querySelector(".edit__department")
    const openModalButton = document.querySelector("#pencil")

    openModalButton.addEventListener("click", () => {
        dialog.showModal()
    })
}

export function closeModalEditDepartment() {
    const dialog = document.querySelector(".edit__department")
    const closeButton = document.querySelector(".close__edit-department")
    closeButton.addEventListener("click", () => {
        dialog.close()
    })
}

//Remover departamento 

export function openModalDeleteDepartment() {
    const dialog = document.querySelector(".delete__department")
    const openModalButton = document.querySelector("#trash")

    openModalButton.addEventListener("click", (e) => {
        e.preventDefault()
        dialog.showModal()
    })
}

export function closeModalDeleteDepartment() {
    const dialog = document.querySelector(".delete__department")
    const closeButton = document.querySelector(".button__delete-close")
    closeButton.addEventListener("click", (e) => {
        e.preventDefault()
        dialog.close()
    })
}


// Editar usuário

export function openModalEditUser() {
    const dialog = document.querySelector(".edit__user")
    const openModalButton = document.querySelector("#pencil-second")

    openModalButton.addEventListener("click", () => {
        dialog.showModal()
    })
}

export function closeModalEditUser() {
    const dialog = document.querySelector(".edit__user")
    const closeButton = document.querySelector("#close__edit-user")
    closeButton.addEventListener("click", () => {
        dialog.close()
    })
}


//Remover usuário

export function openModalDeleteUser() {
    const dialog = document.querySelector(".delete__user")
    const openModalButton = document.querySelector("#trash-second")

    openModalButton.addEventListener("click", () => {
        dialog.showModal()
    })
}

export function closeModalDeleteUser() {
    const dialog = document.querySelector(".delete__user")
    const closeButton = document.querySelector(".button__delete-user-close")
    closeButton.addEventListener("click", () => {
        dialog.close()
    })
}