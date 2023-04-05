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

## Modelo das principais telas

Disponível no [Figma](https://www.figma.com/proto/bbIqawSkLUC54X5gcEUYGv/MapMyJourney).

