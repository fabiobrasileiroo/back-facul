FROM node:22

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta que a API utiliza
EXPOSE 3000

# Comando para iniciar a API
CMD ["npm", "run", "dev"]

