# Usa una imagen de Node.js como base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos al contenedor
COPY . .

# Compila el código TypeScript
RUN npm run build

# Expone el puerto que tu aplicación escucha
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "./dist/index.js"]
