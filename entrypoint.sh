until nc -z db 5432; do
  echo "Aguardando o banco de dados..."
  sleep 2
done

echo "Rodando migrações..."
npx prisma migrate deploy

echo "Iniciando servidor..."
node server.js
