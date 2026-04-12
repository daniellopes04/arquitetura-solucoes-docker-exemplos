# Define a imagem base do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de código-fonte para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Expõe a porta que a aplicação irá usar
EXPOSE 8000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
