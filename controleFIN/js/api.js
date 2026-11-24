
const API_URL = "http://localhost:8080/api";

async function requisicao(metodo, caminho, corpo) {
  const opcoes = {
    method: metodo,
    headers: { "Content-Type": "application/json" },
  };
  if (corpo) opcoes.body = JSON.stringify(corpo);

  let resposta;
  try {
    resposta = await fetch(API_URL + caminho, opcoes);
  } catch {
    throw new Error("Não foi possível conectar ao servidor.");
  }

  if (resposta.status === 204) return null;

  const dados = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new Error(dados.mensagem || "Erro inesperado.");
  }

  return dados;
}

const api = {
  get: (caminho) => requisicao("GET", caminho),
  post: (caminho, corpo) => requisicao("POST", caminho, corpo),
  put: (caminho, corpo) => requisicao("PUT", caminho, corpo),
  patch: (caminho, corpo) => requisicao("PATCH", caminho, corpo),
  delete: (caminho) => requisicao("DELETE", caminho),
};