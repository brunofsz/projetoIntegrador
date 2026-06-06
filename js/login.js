const cpfInput = document.getElementById("cpf");
const senhaInput = document.getElementById("senha");
const mensagem = document.getElementById("mensagem");
const form = document.getElementById("form");

const verifica = (e) => {
  e.preventDefault();

  const cpf = cpfInput.value.trim();
  const senha = senhaInput.value.trim();

  if (cpf === "123123" && senha === "123") {
    window.location.href = "html/home.html";
    return;
  }

  mensagem.textContent =
    "Credenciais inv\u00e1lidas. Verifique o CPF e a senha.";
};

form.addEventListener("submit", verifica);
