FROM node:18
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml* ./
RUN npm i -g pnpm && pnpm install --frozen-lockfile || true
COPY . .
EXPOSE 4000
CMD ["node", "src/index.js"]
