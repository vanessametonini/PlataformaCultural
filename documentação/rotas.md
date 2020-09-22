# Rotas
------------------
## Cadastro
1.1 Criar Usuário 
* Método Post
* url:
  * http://localhost:4000/signup
* body:
{
	"firstName" : "Henrique",
	"lastName" : "Leonel",
	"email": "henrique@email.com",
	"password":"ricksenha123",
	"confirmPassword": "ricksenha123",
	"isValid":true,
	"isAdmin":false,
	"categoryId": 4
}

1.2 Login
* Método Post
* url:
  * http://localhost:4000/signup
* body:
{
	"email": "lulu@ufms.br",
	"password":"admin"
}

## Diálogo
2.1 Criar tópico (Diálogo)
* Método Post
* url:
  * http://localhost:4000/createNewTopic
* body:
{
	"userId": 75,
	"title": "Dialogo Teste Postman",
	"content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
	"topicCategory": "6",
	"categoriesTagged": ["8", "5", "6"]
}

2.2 Recupera Topico
* Método Get
* url:
  * http://localhost:4000/getInitialTopics

2.3 Recupera os Tópicos mais Comentados
* Método Get
* url:
  * http://localhost:4000/getMostReplyededs/

2.4 Recupera os Tópicos mais Recentes
* Método Get
* url:
  * http://localhost:4000/topicsMostRecent/

2.5 Cria Comentário
* Método Post
* url:
  * http://localhost:4000/reply/
* Body:
{
    "content": "Aenean vel enim hendrerit, molestie orci non, ullamcorper magna. Phasellus id rhoncus metus. In ante purus, gravida non vehicula sed, vulputate in metus. Nulla tempor, metus ac dapibus imperdiet, enim nulla scelerisque justo, id condimentum odio arcu vel arcu. Nunc sodales lacus a ligula posuere, dictum posuere est rutrum. Fusce ullamcorper lacinia diam faucibus vestibulum. In vel neque iaculis, semper nulla sed, lobortis mauris. Nulla consequat rutrum ipsum ultricies sagittis. Morbi et vulputate neque. Mauris enim velit, pulvinar ac ligula eget, pretium mattis ante. Etiam id imperdiet elit, eget facilisis lacus.",
    "topicId": 90,
    "userId": 18
}

## Agenda
3.1 Criar Evento
* Método Post
* url:
  * http://localhost:4000/event/
* Body:
{
    "title":"Evento muito louco",
    "userId": 2,
    "categoryId":2,
    "date":"2020-11-11",
    "street":"Rua aquela",
    "neighborhood": "Bairro aquele",
    "city": "Campo Grande",
    "ticket": 300.00,
    "link": "www.owowowowow.com.br",
    "description": "asidhfiuas aisdhfuiashdu ushushuhs ahuuahuah  asuhushuh auhauhau sushuhsu auhauhau auhauhau hauhauhau"
}
3.2 Recupera agenda pelo Id
* Método Get
* url:
  * http://localhost:4000/event/
