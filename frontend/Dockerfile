# Używamy standardowego, bardziej kompatybilnego obrazu Node.js opartego na Debianie
FROM node:20-slim

# Ustawiamy katalog roboczy w kontenerze
WORKDIR /app

# Kopiujemy pliki package.json i package-lock.json (jeśli istnieje)
COPY package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy resztę plików aplikacji
COPY . .

# Komenda, która zostanie uruchomiona po starcie kontenera
# Używamy --host, aby aplikacja była dostępna z zewnątrz kontenera
CMD ["npm", "run", "dev", "--", "--host"]
