# Rotas da aplicação

## POST /customers:
Recebe: name / email
Armazena no BD / retorna o cliente criado
BD: 'customers' : id, name, email, created_at, updated_at.
Dica: vericar se já existe um cliente com o mesmo e-mail. se sim retorne um erro.

## POST /products:
Recebe: name / price / quantity : nome do produto, price/valor unitário, quantity:estoque do produto.
BD: 'products' : id, name, price, quantity, created_at, updated_at.
Dica: verifique se já existe um produto com o mesmo nome. se sim, retorne um erro.
Dica: Para o campo price, você pode utilizar o type como decimal na sua migration, passando também as propriedades precision e scale.

## POST /orders/:
Recebe:
{
  "customer_id": "e26f0f2a-3ac5-4c21-bd22-671119adf4e9",
  "products": [
    {
      "id": "ce0516f3-63ae-4048-9a8a-8b6662281efe",
      "quantity": 5
    },
    {
      "id": "82612f2b-3f31-40c6-803d-c2a95ef35e7c",
      "quantity": 7
    }
  ]
}

Cadastra na tabela order um novo pedido, relacionado ao customer_id informado, created_at e updated_at .
Na tabela orders_products, você deve armazenar o product_id, order_id, price e quantity, created_at e updated_at.
BD:
'order': id, customer_id informado, created_at e updated_at
'order_products': id, product_id, order_id, price e quantity, created_at e updated_at

Retorno:
{
  "id": "5cbc4aa2-b3dc-43f9-b121-44c1e416fa92",
  "created_at": "2020-05-11T07:09:48.767Z",
  "updated_at": "2020-05-11T07:09:48.767Z",
  "customer": {
    "id": "e26f0f2a-3ac5-4c21-bd22-671119adf4e9",
    "name": "Rocketseat",
    "email": "oi@rocketseat.com.br",
    "created_at": "2020-05-11T06:20:28.729Z",
    "updated_at": "2020-05-11T06:20:28.729Z"
  },
  "order_products": [
    {
      "product_id": "ce0516f3-63ae-4048-9a8a-8b6662281efe",
      "price": "1400.00",
      "quantity": 5,
      "order_id": "5cbc4aa2-b3dc-43f9-b121-44c1e416fa92",
      "id": "265b6cbd-3ab9-421c-b358-c2e2b5b3b542",
      "created_at": "2020-05-11T07:09:48.767Z",
      "updated_at": "2020-05-11T07:09:48.767Z"
    },
    {
      "product_id": "82612f2b-3f31-40c6-803d-c2a95ef35e7c",
      "price": "500.00",
      "quantity": 7,
      "order_id": "5cbc4aa2-b3dc-43f9-b121-44c1e416fa92",
      "id": "ae37bcd6-7be7-47b9-b277-afee35aab4e4",
      "created_at": "2020-05-11T07:09:48.767Z",
      "updated_at": "2020-05-11T07:09:48.767Z"
    }
  ]
}

Dica 1: Nessa funcionalidade, você precisará fazer um relacionamento de N:N entre produtos e pedidos, onde vários produtos podem estar em vários pedidos, com isso você deve sempre armazenar o valor do produto no momento da compra e a quantidade pedida na tabela pivô com nome de orders_products, essa tabela vai ter os campos id, order_id, product_id, quantity, price, created_at e updated_at. Para esse tipo de relacionamento, você pode verificar na documentação do TypeORM sobre como fazer relacionamento muitos-para-muitos com propriedades customizadas.

Dica 2: Além disso, você pode também utilizar o método de cascade do TypeORM, que irá adicionar na sua tabela order_products os produtos que você passar por parametro para a entidade de orders automaticamente, você pode saber mais sobre isso aqui: Opção de cascade

## GET /orders/:id:

Essa rota deve retornar as informações de um pedido específico, com todas as informações que podem ser recuperadas através dos relacionamentos entre a tabela orders, customers e orders_products.
Dica: Aqui você pode utilizar a opção eager do TypeORM ou passar a opção relations para o método findOne do TypeORM, informando os nomes das tabelas que você deseja buscar o relacionamento.

# Tarefas
## Rota Post/Customer
- Criar Tabela Customers / Migration OK
- Server OK -> App Ok -> index/Routes OK -> customer/Routes -> Customer/Controller TODO
  Customer Controller OK -> CreateCustomerService TODO
CreateCustomerService OK -> ICustomersRepository OK -> CustomerRepo OK -> Customer Entity TODO
Customer Entity OK -> Container/Index(Injection)
- Server - App - index/Routes - customer/Routes - customer/Controller - CreateCustomerService - CustomerRepo - CustomerEntity - Container/Index
## Rota Post/Products
- Criar Tabela products/ Migration OK
- Server OK - App OK - index/Routes OK - /Routes OK - /Controller TODO OK - Service TODO OK - IRepo OK - Repo TODO OK - OK Entity - Container/Index
## Rota Post/Orders
- Criar Tabelas e Relações OK
- Server OK - App OK - index/Routes OK - /Routes OK - /Controller TODO OK - Service TODO OK - IRepo OK - Repo TODO OK - OK Entity - Container/Index

## Rota Get/Orders
- Server OK - App OK - index/Routes OK - /Routes OK - /Controller TODO OK - Service TODO OK - IRepo OK - Repo TODO OK - OK Entity - Container/Index


