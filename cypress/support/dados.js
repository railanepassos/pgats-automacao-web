// Gera dados de teste únicos para que cada teste crie o próprio usuário
// e nunca dependa de outro teste.
export function gerarUsuario(base) {
  const sufixo = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    ...base,
    name: `qa${sufixo}`,
    email: `qa.${sufixo}@teste.pgats.com`,
  };
}
