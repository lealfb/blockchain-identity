<img src="http://ap.imagensbrasil.org/images/identidade_blockchain.png" align="center" width="400" />
<br/>
Utilizou-se o framework Ethereum, disponível em https://www.ethereum.org, em conjunto com o framework Truffle, disponível em https://www.npmjs.com/package/truffle, um pipeline de ambiente de desenvolvimento e estrutura de testes para quem quer utilizar o Ethereum para suas transações em Blockchain.

Com a ferramenta de desenvolvimento para o Ethereum, a **Truffle** criamos nosso SERVIDOR DE BLOCKCHAIN.

O tutorial é específico para Linux/Ubuntu, mas você poderá fazer isto utilizando uma máquina virtual em seu Windows. Se esse for o seu caso, baixe o VM-WARE (www.vmware.com) e crie uma VM novinha em folha do último ubuntu em seu sistema operacional Windows. Com esse ubuntu zero-bala é só seguir o passo-a-passo.

## Passo-a-Passo
##### Passo 1) INSTALAR O SERVIDOR LOCAL DE BLOCKCHAIN
Com a VM do Ubuntu rodando, abra o terminal e  digite com cuidado cada linha de comando a seguir...

```
sudo apt-get install nodejs
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo add-apt-repository -y ppa:ethereum/ethereum-dev
sudo apt-get update
sudo apt-get install npm
sudo apt-get install nodejs-legacy
```
Até este ponto, você já tem instalado um servidor de blockchain na sua máquina e alguns frameworks de apoio. <br/>
Vamos testar o node.js, que é fundamental para o funcionamento do framework...
```
node –v 
```
Após esse comando, o terminal vai mostrar a versão do node.js instalado.<br/>
Dê uma limpeza no cache, só pra controle...
```
npm cache clean
```
<br/>
##### Passo 2) INSTALAR O GIT
Se não instalar o git não será possível baixar o código inicial que a fundação Ethereum disponibiliza para nós. No terminal, dê o seguinte comando:
```
sudo apt-get install git
```
<br/>
##### Passo 3) INSTALAR O TRUFFLE
O Truffle é o framework que iremos utilizar para testar o Ethereum.
```
sudo npm install -g truffle
sudo npm install -g ethereumjs-testrpc
```
<br/>
##### Passo 4) TESTAR O SERVIDOR
Tudo pronto? Então vamos lá, primeiro tem de colocar o servidor para rodar. Digite no terminal o seguinte comando...
```
testrpc 
```
Verifique que o servidor está rodando na porta 8545.<br/>
<img src="http://ap.imagensbrasil.org/images/blockchain-fig1.png" width="500" /><br/>
Figura 1 - O servidor de blockchain em funcionamento.
<br/><br/>
##### Passo 5) CRIAR A APP DE TESTE
Já temos um servidor funcionando? Então vamos realizar nossas primeiras transações. Para isto, utilizando os comandos a seguir, vamos criar duas ferramentas de teste, uma para o **terminal** e outra para a **web**. Para tanto abra um novo terminal no ubuntu e digite os seguintes comandos...
```java
mkdir myApp //isto cria uma pasta com o nome da sua app dentro da pasta home.
cd myApp  //entra dentro da pasta home/myApp.
truflle init  //cria a app a partir de um modelo disponibilizado no git pela Ethereum.
```
Após a criação com sucesso, abra o explorador de arquivos e confirme que o projeto foi criado.<br/>
<img src="http://ap.imagensbrasil.org/images/blockchain-identity_pasta_home.png" width="500" /><br/>
Figura 2 - A App foi criada na pasta home/identityApp/blockchain-identity.
<br/><br/>
##### Passo 6) TESTAR A APP NO TERMINAL
Em seguida, no terminal, faça... (não se esqueça de verificar se o servidor blockchain está rodando em outro terminal, conforme a figura 1)
```java
truffle compile //isto compila os contratos
truffle deploy //roda a app no servidor (rodando e já salvando uma transação)
```
Pronto, verifique que uma transação foi gravada na blockchain da sua máquina. Verifique o hash , o mesmo hash pode ser visto também no terminal que está executando o servidor. Figuras 3 e 4.
<img src="http://ap.imagensbrasil.org/images/blockchain-truffle-deploy.png" width="400"/><br/>
Figura 3 - Testando com a app-terminal. Observe a transação gravada.
<br/><br/>
<img src="http://ap.imagensbrasil.org/images/blockchain_test_transacao.png" width="400"/><br/>
Figura 4 - O servidor responde ao teste com uma gravação da transação.
<br/>
<br/>
##### Passo 7) CONFIGURAR A APP WEB
<img src="http://ap.imagensbrasil.org/images/bem_vindo_a_blockchain.png" width="400" /><br/>
Figura 5.0 - Identidade Blockchain - Boas Vindas

<img src="http://ap.imagensbrasil.org/images/crie_seu_perfil.png"        width="400" /><br/>
Figura 5.1 - Identidade Blockchain - Crie seu Perfil

<img src="http://ap.imagensbrasil.org/images/identidade_blockchain.png"  width="400" /><br/>
Figura 5.2 - Identidade Blockchain - Envio da Transação
<br/>

A finalidade da Aplicação é criar uma Identidade e um Perfil na Blockchain.
<br/><br/>
Navegar no projeto até o arquivo **app.js**, que está dentro da pasta app/javascripts, 
veja a figura 2. Abra este arquivo com o Gedit. Apague tudo o que tem dentro dele e escreva o código abaixo. Você pode fazer as adaptações necessárias ao seu projeto

Abra o arquivo **index.html** (dentro da pasta app) e apague também tudo que tem dentro dele.<br/>
...e  faça as adaptações para o seu projeto)...

Está finalizado a configuração da Aplicação. Hora de testar...
<br/><br/>
##### Passo 8) TESTAR A APP WEB
Feche quaisquer terminais abertos. <br/>
Abra novo terminal de comandol e navegue até o seu aplicativo. <br/>
Dentro da raiz do aplicativo, dê o comando: 
```
testrpc
```
Nesse momento o servidor de blockchain será iniciado. Aguarde até que todos os contratos sejam inscritos, como na Figura 1.<br/>
Não feche esse terminal, permaneça com o servidor ligado e ABRA NOVO TERMINAL.<br/>
Com o novo terminal aberto, navegue até sua app e dê o comando: 
```
truffle serve.
```
Isto irá fazer funcionar o servidor web da App, na porta 8080. Não fechar também esse terminal. É hora de gravar algumas transações na blockchain. Abra o mozila Firefox e mantenha o seu console de log aberto. Para abrir o console do Firefox, utilize o menu Developer/Web Console.<br/>
Digite o endreço abaixo na barra de endereços do Firefox e tecle enter: 
```
localhost:8080
```
Você vai ver uma tela como a figura 5.<br/>

Cada vez que clicar no botão "Send", perceba que o log vai sendo gerado no console - printando os logs, é a finalidade da app).
Perceba também, que a cada clique é gravada uma nova transação no servidor de blockchain. Para o aplicativo, cada gravação com sucesso serve para autenticar a veracidade do log. Para o exemplo, foi usada apenas um contrato (é um dos contratos que a API disponibiliza para testes).

O Bitcoin (ou ether - ou a moeda, como queira)  vai sendo incrementada de 100, para cada clique, mas está em um campo oculto, isto é uma das características da app, que não importa a moeda, mas sim, utilizar as ferramentas do blockchain para o proveito da aplicação.

Abaixo, podemos ver as transações que ocorrem no servidor a cada clique:<br/>

<img src="http://ap.imagensbrasil.org/images/gravacao_blockchain.png" width="400" /><br/>
Figura 6 - A app web: A cada clique no botão "Send" grava uma transação na blockchain e envia o log para ser autenticado.

<img src="http://ap.imagensbrasil.org/images/gravando_blockchain_2.png" width="400" /><br/>
Figura 7 - A app web: Após o clique no botão "Send", podemos visualizar a transação sendo gravada no servidor da blockchain.

 
## Finalizando 
Este passos possibilitaram a escrita da transação na Blockchain. Simples adaptação para o propósito de autenticar logs produzidos por uma aplicação, mas que pode ser adaptado para diversas outras finalidades, dependendo da necessidade do desenvolvedor.<br />
<br/>
Disciplina: Construção de Software <br />
Professor: Alexandre Gomes <br />
Aluno: Fábio Leal 
