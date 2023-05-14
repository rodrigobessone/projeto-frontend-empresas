// Essa função é responsável por exibir um "toast" (uma pequena caixa de mensagem) na tela com um determinado status (sucesso, erro, etc.)
// e uma mensagem específica. Ele procura na página por um elemento com o ID correspondente ao status e define o texto da mensagem nesse
// elemento. Em seguida, ele remove a classe "hide" do elemento para exibi-lo na tela por dois segundos antes de adicioná-lo novamente
// para escondê-lo.
export function showToast(status, message) {
  const toast = document.getElementById(status + "-feedback");
  const span = document.getElementById(status + "-span")
  span.textContent = message
  toast.classList.remove("hide");
  setTimeout(function () {
    toast.classList.add("hide");
  }, 2000);
}