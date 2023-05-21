# MapMyJourney - O diário de viagem virtual
Projeto da disciplina "Prática em desenvolvimento de Software"

## Equipe
- Daniel Ferreira Abadi - Desenvolvedor fullstack
- Igor Castejon Fonseca e Castro - Desenvolvedor back-end
- Pedro Geovanni Barbosa Ribeiro - Desenvolvedor front-end

<details>
  <summary>
    <h1>Escopo</h1>
  </summary>

O MapMyJourney será um sistema de mapeamento que tem como objetivo ajudar os usuários a registrar suas jornadas de viagem pelo mundo, criando um diário de viagem virtual. Ele será uma ótima opção para aqueles que gostam de viajar e querem manter um registro de seus lugares favoritos de uma forma não convencional. Com o sistema, os usuários poderão adicionar marcadores em um mapa-múndi para indicar os lugares que já visitaram ou desejam visitar. Cada marcador poderá ser personalizado com um título, descrição, fotos e datas, permitindo que os usuários compartilhem suas experiências de viagem com amigos e familiares.

</details>

<details>
  <summary>
    <h1>Tecnologias</h1>
  </summary>
Para o desenvolvimento do front-end serão utilizadas as tecnologias HTML, CSS e Javascript com as bibliotecas React e Leaflet.js. Para o desenvolvimento do back-end será utilizado Node.js com Typescript. Como banco de dados, no desenvolvimento será utilizado um banco de dados relacional SQL (a princípio SQLite).
</details>

<details>
  <summary>
    <h1>Backlog</h1>
  </summary>
 <h2>Do produto</h2>
 
1. Como usuário do sistema MapMyJourney, gostaria de ter a capacidade de adicionar marcadores em qualquer lugar do mapa-múndi para marcar meus lugares visitados ou que pretendo visitar, de modo que eu possa acessá-los facilmente e lembrar minhas experiências ou me planejar.
2. Como usuário do sistema MapMyJourney, gostaria de salvar e armazenar meus marcadores em uma conta pessoal, de modo que eu possa acessá-los de qualquer dispositivo e não perca minhas informações caso eu troque de dispositivo.
3. Como usuário do sistema MapMyJourney, gostaria de ter a capacidade de personalizar cada marcador com informações detalhadas, incluindo título, descrição, fotos e datas, para que eu possa visualizar e lembrar dos detalhes e contexto de cada marcador no mapa.
4. Como usuário do sistema MapMyJourney, gostaria de ter a capacidade de visualizar todos os meus marcadores em uma única lista, ordenados por data e podendo localizá-los no mapa, para que eu possa ter uma visão geral de todos os marcadores e gerenciá-los de uma forma centralizada.
5. Como usuário do sistema MapMyJourney, gostaria de poder editar meu perfil, conseguindo modificar meus dados cadastrais, além de poder adicionar uma biografia ao meu perfil para que outras pessoas possam me conhecer melhor.
6. Como usuário do sistema MapMyJourney, gostaria de poder adicionar outros perfis como amigos, para que possa ver seus marcadores e compartilhar experiências de viagem, por meio de um sistema de conversa.
7. Como usuário do sistema MapMyJourney, gostaria de poder criar grupos ou comunidades dentro do sistema, para que possa compartilhar informações e dicas de viagem com pessoas que tenham interesses em comum.
8. Como usuário do sistema MapMyJourney, gostaria de ter acesso a conteúdos relacionados a viagens, como blogs, guias de viagem, vídeos e fotos, para que possa me inspirar e planejar melhor minhas viagens.

9. Como usuário do sistema MapMyJourney, gostaria de poder compartilhar meus marcadores em outras plataformas de mídia social, como Instagram ou Facebook, para que possa compartilhar minhas experiências com meus amigos e seguidores.
10. Como usuário do sistema MapMyJourney, gostaria de receber recomendações sobre locais próximos que planejo visitar.
11. Como usuário do sistema MapMyJourney, gostaria de receber sugestões de possíveis lugares a se visitar com base no meu perfil.
12. Como usuário do sistema MapMyJourney, gostaria de salvar o estado do meu mapa em um PDF, podendo escolher a escala para que possa imprimir ou compartilhar em outros canais.
13. Como usuário do sistema MapMyJourney, gostaria de poder pesquisar por locais no mapa, para que possa encontrar rapidamente lugares de interesse ou descobrir novos destinos.
14. Como usuário do sistema MapMyJourney, gostaria de ter a opção de ocultar alguns dos meus marcadores ou torná-los privados, para que possa controlar quais informações compartilho com outras pessoas.
15. Como usuário do sistema MapMyJourney, gostaria de poder configurar a densidade dos marcadores no mapa, para que possa ajustar a quantidade de informações exibidas de acordo com minhas preferências.
16. Como usuário do sistema MapMyJourney, gostaria de poder escolher diferentes estilos de mapa, como mapa de estradas, mapa de satélite ou mapa de terreno, para que possa ver o mapa de diferentes perspectivas.
17. Como usuário do sistema MapMyJourney, gostaria de poder adicionar vídeos em um marcador, para que possa registrar minha experiência de maneira mais abrangente.

<h2>Da sprint 2</h2>

Tarefas técnicas:

- Configurar o banco de dados para o sistema [Igor]
- Configurar o projeto back-end com Typescript, configurando o ambiente de desenvolvimento, instalando dependências, configurando um linter para garantir a consistência do código, configurando um formatador para manter um estilo consistente no código e configurando o framework de testes [Igor]
- Configurar o projeto front-end com React, configurando o ambiente de desenvolvimento e instalando as dependências necessárias [Daniel e Pedro]
- Definir as entidades do sistema, identificando as principais entidades e seus atributos, e como elas se relacionam entre si [Daniel, Igor e Pedro]
- Definir o esquema do banco de dados do sistema, mapeando as entidades definidas anteriormente em tabelas quando apropriado [Daniel, Igor e Pedro]
- Configurar o pipeline de CI/CD com Github Actions [Igor]

História 1: Como usuário do sistema MapMyJourney, gostaria de ter a capacidade de adicionar marcadores em qualquer lugar do mapa-múndi para marcar meus lugares visitados ou que pretendo visitar, de modo que eu possa acessá-los facilmente e lembrar minhas experiências ou me planejar.
	
  -	Criar a lógica de adição de marcador para usuário específico no back-end, armazenando informações do marcador no banco de dados associado ao usuário [Daniel]
  -	Implementar a funcionalidade de "colocar marcador" na interface do usuário, permitindo que os usuários coloquem um marcador em uma nova localização no mapa [Daniel]
  -	Implementar a lógica de obtenção dos marcadores do usuário no back-end [Daniel]
  -	Criar interface de adição de marcador no mapa [Daniel]
  -	Criar interface de visualização do mapa-múndi com os marcadores do usuário [Daniel]
  
 História 2: Como usuário do sistema MapMyJourney, gostaria de salvar e armazenar meus marcadores em uma conta pessoal, de modo que eu possa acessá-los de qualquer dispositivo e não perca minhas informações caso eu troque de dispositivo.
 
 -	Implementar a lógica de cadastro do usuário no back-end e armazenamento do usuário no banco de dados [Igor]
 -	Criar lógica de validação do login do usuário e criação de sessão do usuário no back-end [Igor]
 -	Criar lógica de logout e encerramento de sessão do usuário no back-end [Igor]
 -	Criar lógica de autorização por sessão de usuário no back-end [Igor]
 -	Criar interface do usuário para a tela de login com e-mail e senha [Pedro]
 -	Criar interface do usuário para a tela de cadastro, incluindo campos para nome, endereço de e-mail e senha [Pedro]
 -	Implementar lógica de login e logout no front-end [Daniel e Pedro]

História 3: Como usuário do sistema MapMyJourney, gostaria de ter a capacidade de personalizar cada marcador com informações detalhadas, incluindo título, descrição, fotos e datas, para que eu possa visualizar e lembrar dos detalhes e contexto de cada marcador no mapa.

 -	Criar lógica da edição de um marcador de um usuário específico no back-end [Daniel]
 -	Criar lógica de upload de fotos no back-end [Igor]
 -	Criar lógica de upload de fotos no front-end [Daniel e Pedro]
 -	Criar interface para a visualização dos detalhes de um determinado marcador [Daniel]
 
 História 4: Como usuário do sistema MapMyJourney, gostaria de ter a capacidade de visualizar todos os meus marcadores em uma única lista, ordenados por data e podendo localizá-los no mapa, para que eu possa ter uma visão geral de todos os marcadores e gerenciá-los de uma forma centralizada.
 
 -	Criar a opção de lista de marcadores que possa ser acessada através da interface do usuário [Pedro]
 -	Criar a interface de usuário da lista de marcadores [Pedro]
 -	Implementar a capacidade de filtrar marcadores por diferentes critérios, como data ou tipo, para ajudar o usuário a encontrar facilmente um marcador específico [Pedro]
 -	Criar a lógica de obtenção dos marcadores do usuário, de forma adequada à listagem, no back-end [Daniel]
 -	Integrar a lista de marcadores com o mapa-múndi, permitindo que o usuário visualize cada marcador no mapa [Daniel]
 
 História 5: Como usuário do sistema MapMyJourney, eu gostaria de poder editar meu perfil, conseguindo modificar meus dados cadastrais, além de poder adicionar uma biografia ao meu perfil para que outras pessoas possam me conhecer melhor.
 
 -	Criar a lógica de atualização de dados do usuário no back-end, permitindo que o usuário modifique suas informações pessoais [Igor]
 -	Implementar a lógica de validação dos dados atualizados no back-end e front-end [Pedro e Igor]
 -	Criar a interface de visualização de perfil do usuário [Pedro]
 -	Criar a interface de edição de perfil, permitindo que o usuário atualize suas informações pessoais e adicione uma biografia ao seu perfil [Pedro]

</details>

<details>
  <summary>
    <h1>Arquitetura hexagonal</h1>
  </summary>

A arquitetura hexagonal tem como objetivo principal isolar a lógica de negócio do sistema das tecnologias e frameworks utilizados, tornando o código mais flexível e fácil de manter. O backend do sistema MapMyJourney utiliza a arquitetura hexagonal para garantir uma separação clara e coerente entre o domínio e o resto do sistema - interface com o usuário, persistência de dados, entre outros. 

A implementação dessa arquitetura permitiu:
* que os desenvolvedores se concentrassem no domínio de diário de viagens interativo, que é a parte responsável por gerar valor do sistema e representa o propósito do sistema;
* maior testabilidade; 
* uma troca mais fácil de bibliotecas, frameworks, banco de dados, entre outros.

A interface com o backend do sistema se dá especificamente a partir de requisições HTTP. As rotas do sistema são implementadas pela classe “AppRouter”, que é responsável por delegar as requisições para as respectivas rotas. Para melhor separação, “UsersRouter” e “MarkersRouter” implementam as rotas disponíveis para as responsabilidades relacionadas a usuários e marcadores. Essas são classes de infraestrutura que utilizam do framework Express, não fazendo parte do domínio.

A partir das rotas, são definidos os adaptadores que são responsáveis por interagir com as portas de entrada definidas pela arquitetura hexagonal. “UsersRouter” agrega os adaptadores para lidar com usuários: “RegisterUserController”, “EditUserController”, “GetUserController”, “LoginController” e “LogoutController”. Já “MarkersRouters” agrega os adaptadores para lidar com marcadores: “RegisterMarkerController”, “EditMarkerController” e “GetMarkerController”. Esses adaptadores lidam com as requisições recebidas pelas rotas, invocam as portas de entrada do domínio necessárias e lidam com a resposta da requisição.


Entre as portas de entrada do sistema estão:
* IRegisterUserCommandHandler - responsável por definir como os adaptadores devem se comunicar com o domínio para o registro de usuários no sistema.
* IEditUserCommandHandler - responsável por definir como os adaptadores devem se comunicar com o domínio para a edição de usuários no sistema.
* IGetUserCommandHandler - responsável por definir como os adaptadores devem se comunicar com o domínio para a obtenção de usuários no sistema.
* IUserSessionService - responsável por definir como os adaptadores devem se comunicar com o domínio para lidar com sessões de usuários (funcionalidades de login, logout) no sistema.
* IRegisterMarkerCommandHandler - responsável por definir como os adaptadores devem se comunicar com o domínio para o registro de marcadores no sistema.
* IEditMarkerCommandHandler - responsável por definir como os adaptadores devem se comunicar com o domínio para a edição de marcadores no sistema.
* IGetMarkerCommandHandler - responsável por definir como os adaptadores devem se comunicar com o domínio para a obtenção de marcadores no sistema.

No domínio podemos encontrar:
* RegisterUserCommandHandler - responsável por lidar com o serviço de registro de usuários no sistema.
* EditUserCommandHandler - responsável por lidar com o serviço de edição de usuários no sistema.
* GetUserCommandHandler - responsável por lidar com o serviço de obtenção de usuários no sistema.
* UserSessionAuthenticationService - responsável por lidar com sessões de usuários (funcionalidades de login, logout) no sistema.
* RegisterMarkerCommandHandler - responsável por lidar com o serviço de registro de marcadores no sistema.
* EditMarkerCommandHandler - responsável por lidar com o serviço de edição de marcadores no sistema.
* GetMarkerCommandHandler - responsável por lidar com o serviço de obtenção de marcadores no sistema.
* UserProfile - entidade que representa um perfil de usuário.
* Marker - entidade que representa um marcador.

Entre as portas de saída estão:
* HashService - responsável por lidar com o serviço de realização de hash, a fim de manter o domínio independente dos algoritmos de hash utilizados. 
* IEmailUniquenessChecker - responsável por lidar com o serviço de verificação de unicidade de e-mails, a fim de manter o domínio independente de conhecimento sobre banco de dados. 
* UserProfileRepository - responsável por abstrair a lógica de persistência de perfis de usuários, a fim de manter o domínio independente de conhecimento sobre banco de dados. 
* UserSessionRepository - responsável por abstrair a lógica de persistência de sessões de usuários, a fim de manter o domínio independente de conhecimento sobre banco de dados. 
* MarkerRepository - responsável por abstrair a lógica de persistência de marcadores, a fim de manter o domínio independente de conhecimento sobre banco de dados. 


Os outros adaptadores presentes no sistema são os que implementam as portas de saída:
* “BcryptHashService” - implementa a porta de saída “HashService” para utilizar a biblioteca Bcrypt para realizar a criação e verificação de hashes existentes.
* EmailUniquenessChecker - implementa a porta de saída “IEmailUniquenessChecker” para verificar se um e-mail já foi cadastrado no banco de dados SQLite.
* SQLUserProfileRepository - implementa a porta de saída “UserProfileRepository” para realizar a lógica de persistência de perfis de usuários com base no banco de dados SQLite.
* InMemoryUserSessionRepository - implementa a porta de saída “UserSessionRepository” para realizar a lógica de persistência de sessões de usuários com base em memória primária.
* SQLMarkerRepository - implementa a porta de saída “MarkerRepository” para realizar a lógica de persistência de marcadores com base no banco de dados SQLite.


Um diagrama mais completo do sistema pode ser visualizado abaixo:
![MapMyJourney-Page-1 drawio](https://github.com/danielabadi/MapMyJourney/assets/41207094/4583e179-6d7f-426a-a372-0d06b4545ee3)


Assim, o backend do sistema MapMyJourney é composto por uma série de adaptadores e portas, ajudando a garantir que a lógica de negócio permaneça isolada das tecnologias e frameworks utilizados, facilitando a manutenção e evolução do sistema ao longo do tempo.
	
## Exemplo de fluxo no sistema
Como um exemplo mais detalhado de um fluxo no sistema que explicita o uso da arquitetura hexagonal, apresentamos o fluxo de registro de um novo usuário no sistema.

O adaptador “RegisterUserController”, que lida com a requisição de registro de um novo usuário no sistema, invoca a porta de entrada “IRegisterUserCommandHandler” para interagir com o domínio do sistema:

```typescript
export class RegisterUserController implements IRegisterUserController {
    private readonly commandHandler: IRegisterUserCommandHandler;

    …

    public async registerUser(req: Request, res: Response): Promise<Response> {
       …

        try {
            const registerUserRequest: RegisterUserRequest = req.body;
            const command: RegisterUserCommand = new RegisterUserCommand(
                Email.create(registerUserRequest.email),
                UserName.create(registerUserRequest.name),
                new Date(registerUserRequest.birthdate),
                registerUserRequest.password,
            );
            const createdUserId: UserId = await this.commandHandler.handle(command);
            const registerUserResponse: RegisterUserResponse = { id: createdUserId.id };
            return res.status(200).json({ success: true, data: registerUserResponse });
        } catch (err) {
            return ErrorHandler.handleStandardFailure(err, res);
        }
    }
}
```

A porta de entrada “IRegisterUserCommandHandler” é implementada no domínio por “RegisterUserCommandHandler”, que é responsável por orquestrar a lógica de registro de usuários, verificando se o e-mail da requisição já não foi cadastrado por outro usuário, realizando o hash da senha do usuário e delegando a lógica de persistência do usuário. Para tal, utiliza as portas de saída “HashService”, “UserProfileRepository” e “IEmailUniquenessChecker”, mantendo o domínio limpo de tecnologia.

```typescript
export class RegisterUserCommandHandler implements IRegisterUserCommandHandler {
    private readonly userProfileRepository: UserProfileRepository;
    private readonly hashService: HashService;
    private readonly emailUniquenessChecker: IEmailUniquenessChecker;

    …

    public async handle(command: RegisterUserCommand): Promise<UserId> {
        const email = command.email;
        if (await this.emailUniquenessChecker.emailExists(email)) {
            throw new Error('Já existe um usuário cadastrado com esse email');
        }

        const name = command.name;
        const birthdate = command.birthdate;
        const hashedPassword: string = await this.hashService.hashPassword(command.password);

        const userToBeRegistered = UserProfile.create(
            UserId.create(uuidv4()),
            email,
            name,
            birthdate,
            UserDescription.create(''),
            hashedPassword,
        );

        const registeredUser: UserId = await this.userProfileRepository.insert(userToBeRegistered);
        return registeredUser;
    }
}
```


A porta de saída “UserProfileRepository”, responsável por prover uma abstração para a recuperação do perfil do usuário no banco de dados, é implementada pelo adaptador “SQLUserProfileRepository”, que interage com o banco de dados SQLite a partir da biblioteca Knex.js para recuperar o perfil de um usuário.

```typescript
export interface UserProfileRepository {
    insert(userProfile: UserProfile): Promise<UserId>;
    update(userProfile: UserProfile): Promise<UserId>;
    getById(userId: UserId): Promise<UserProfile | null>;
    getByEmail(email: Email): Promise<UserProfile | null>;
}

export class SQLUserProfileRepository implements UserProfileRepository {
    private readonly knex: Knex;
    private readonly tableName: string;

    …

    UserProfilePersistence = () => {
        return this.knex<UserProfilePersistence>(this.tableName);
    };

    public async insert(userProfile: UserProfile): Promise<UserId> {
        const persistenceModel: UserProfilePersistence = this.toPersistence(userProfile);

        const createdUser: any[] = await this.knex.transaction(async (trx) => {
            const createdUser = await trx<UserProfilePersistence>(this.tableName).insert(persistenceModel, 'id');
            return createdUser;
        });
        const createdUserId = createdUser[0];

        return UserId.create(createdUserId.id);
    }

…
	
}
```

Abaixo, pode ser visualizado um diagrama específico para esse fluxo:
![MapMyJourney-Page-2](https://github.com/danielabadi/MapMyJourney/assets/41207094/a3aafb8d-d759-4e9f-a434-86d17dd8c484)


</details>
	
## Modelo das principais telas

Disponível no [Figma](https://www.figma.com/proto/bbIqawSkLUC54X5gcEUYGv/MapMyJourney).
