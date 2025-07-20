const errors = {
  INVALID_REQUEST: { status: 400, message: "Solicitação inválida" },
  USER_NOT_FOUND: { status: 404, message: "Usuário não encontrado" },
  INVALID_CREDENTIALS: { status: 401, message: "Credenciais inválidas" },
  SERVER_ERROR: { status: 500, message: "Erro interno do servidor" },
};

export default errors;
