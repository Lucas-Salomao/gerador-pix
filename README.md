# Gerador de Pix API

## Descrição

Esta API Node.js, construída com NestJS e TypeORM, gera transações Pix estáticas com QR Codes. Ela permite criar, listar e recuperar transações Pix.

## Funcionalidades

- **Criar transação Pix:** Gera um código Pix estático, incluindo o BR Code e a imagem do QR Code.
- **Listar transações Pix:** Retorna uma lista de todas as transações Pix armazenadas.
- **Recuperar transação Pix por ID:** Busca uma transação Pix específica pelo seu ID.

## Tecnologias

- **NestJS:** Framework Node.js para construir aplicações escaláveis e eficientes.
- **TypeORM:**  ORM para gerenciar o banco de dados PostgreSQL.
- **pix-utils:** Biblioteca para gerar códigos Pix.
- **Swagger:**  Para documentação da API.

## Instalação

1. **Clone o repositório:**

    ```bash
    git clone <URL_DO_REPOSITORIO>
    ```
2. **Instale as Dependências:**

    ```bash
    cd gerador-pix
    npm install
    ```
3. **Configure o arquivo .env:**

    ```bash
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=seu_banco_de_dados
    PORT=3001
    ```
## Migrations
1. **Gere as migrations:**

    ```bash
    npm run typeorm migration:generate src/db/migrations/<nome_da_migration>
    ```

2. **Execute as migrations:**

    ```bash
    npm run typeorm migration:run
    ```

## Execução
```bash
npm run start:dev
```

## Documentação

Documentação da API
A documentação da API está disponível em: http://localhost:3001/api

## Chamando a API
1. **Criar uma transação Pix:**
    ```bash
      curl --location --request POST 'http://localhost:3000/pix' \
      --header 'Content-Type: application/json' \
      --data-raw '{
        "merchantName": "Thales Ogliari",
        "merchantCity": "Sao Paulo",
        "pixKey": "nubank@thalesog.com",
        "transactionAmount": 1.00,
        "infoAdicional": "Gerado por Pix-Utils"
        }'
    ```
2. **Listar todas as transações Pix:**

    ```bash
    curl --location --request GET 'http://localhost:3001/pix'
    ```

3. **Recuperar uma transação Pix por ID:**

    ```bash
    curl --location --request GET 'http://localhost:3001/pix/{id}'
    ```

## Exemplo de resposta da API
### JSON:
    {
        "id": "algum_id_uuid",
        "merchantName": "Thales Ogliari",
        "merchantCity": "Sao Paulo",
        "pixKey": "nubank@thalesog.com",
        "transactionAmount": 1,
        "infoAdicional": "Gerado por Pix-Utils",
        "brCode": "000201...",
        "qrCodeImage": "data:image/png;base64,iVBORw0KGgo..."
    }

## Suporte

Para dúvidas entre em contato com o desenvolvedor [Lucas Salomão](lucastadeusalomao@gmail.com).

## License

Nest is [MIT licensed](LICENSE).