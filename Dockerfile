# Gunakan Node.js sebagai base image
FROM node:16 AS build

# Set work directory
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package.json package-lock.json ./

# Perbarui npm ke versi terbaru
RUN npm install -g npm@latest

# Install dependencies
RUN npm install

# Salin semua file proyek
COPY . .

# Perbarui caniuse-lite
RUN npx update-browserslist-db@latest --force

# Build aplikasi React
RUN npm run build

# Tahap Akhir: Gunakan Apache untuk Serve Aplikasi
FROM httpd:2.4 AS serve

# Salin hasil build React ke Apache
COPY --from=build /app/build/ /usr/local/apache2/htdocs/

# Salin hasil build langsung ke direktori lokal
COPY --from=build /app/build/ /rski/storage/www_html/rski-karyawan-github/

# Expose port 80
EXPOSE 80

# Jalankan Apache
CMD ["httpd-foreground"]
