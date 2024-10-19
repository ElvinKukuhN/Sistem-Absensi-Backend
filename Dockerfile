# Gunakan Node.js versi 20 sebagai base image
FROM node:20

# Set working directory di dalam container
WORKDIR /usr/src/app

# Copy file package.json dan package-lock.json ke working directory
COPY package*.json ./

# Install dependencies aplikasi (npm install)
RUN npm install

# Copy seluruh source code aplikasi ke working directory di container
COPY . .

# Expose port 3000, aplikasi ini berjalan di port 3000
EXPOSE 3000

# Jalankan aplikasi (npm start)
CMD ["npm","run", "prod"]
