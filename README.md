# Identidade Blockchain

<img src="http://www.infoescola.com/wp-content/uploads/2014/04/unb.jpg" width="100"/>

## Passo 1 - Gravando uma transação na Blockchain com Javascript.
<br/>
Utilizou-se o framework Ethereum, disponível em https://www.ethereum.org, em conjunto com o framework Truffle, disponível em https://www.npmjs.com/package/truffle, um pipeline de ambiente de desenvolvimento e estrutura de testes para quem quer utilizar o Ethereum para suas transações em Blockchain.

Estávamos desde o início trabalhando com o Ethereum, mas não tínhamos moeda para realizar uma transação. E foi assim que decidimos utilizar uma ferramenta de desenvolvimento para o Ethereum, a **Truffle**. Então, se não podemos gravar na Blockchain sem moeda, CRIAMOS NOSSO PRÓPRIO SERVIDOR DE BLOCKCHAIN.

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
<img src="http://ap.imagensbrasil.org/images/servidor-blockchain.jpg" width="500"/><br/>
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
<img src="http://ap.imagensbrasil.org/images/blockchain-fig2.jpg" width="500"/><br/>
Figura 2 - A App foi criada na pasta home/minhaApp.
<br/><br/>
##### Passo 6) TESTAR A APP NO TERMINAL
Em seguida, no terminal, faça... (não se esqueça de verificar se o servidor blockchain está rodando em outro terminal, conforme a figura 1)
```java
truffle compile //isto compila os contratos
truffle deploy //roda a app no servidor (rodando e já salvando uma transação)
```
Pronto, verifique que uma transação foi gravada na blockchain da sua máquina. Verifique o hash , o mesmo hash pode ser visto também no terminal que está executando o servidor. Figuras 3 e 4.
<img src="http://ap.imagensbrasil.org/images/blockchain-fig3.jpg" width="400"/><br/>
Figura 3 - Testando com a app-terminal. Observe a transação gravada.
<br/><br/>
<img src="http://ap.imagensbrasil.org/images/blockchain-fig4.jpg" width="400"/><br/>
Figura 4 - O servidor responde ao teste com uma gravação da transação.
<br/>

Até este ponto, exceto a configuração do servidor, você pode acompanhar pelo video-tutorial do Carlos Magno, também aluno do Mestrado em Computação Aplicada da UNB, <a href="https://drive.google.com/file/d/0B67MpBEz0bVlVFJuZGJGMlRIUXM/view?usp=sharing">
aqui
</a>.
<br/><br/>
##### Passo 7) CONFIGURAR A APP WEB
<img src="http://ap.imagensbrasil.org/images/blockchain-fig-5.md.jpg" width="400"/><br/>
Figura 5 - A app web: autenticação de log por meio da Blockchain.
<br/>

A finalidade da app web (Dapp) é aproveitar os recursos da Blockchain para atestar a veracidade das informações geradas. Assim, por meio dela, pode-se, por exemplo, autenticar os logs de uma aplicação. Esta, por sinal, é a finalidade deste aplicativo.<br/>
Depois de ter executado os passos 1 a 6, foi criado um servidor de blockchain na sua máquina. Vamos aproveitar esse servidor. Siga as etapas a seguir...
<br/><br/>
Navegar no projeto até o arquivo **app.js**, que está dentro da pasta app/javascripts, 
veja a figura 2. Abra este arquivo com o Gedit. Apague tudo o que tem dentro dele e escreva o código abaixo. Você pode fazer as adaptações necessárias ao seu projeto


```javascript
/* UNB
   Mestrado em Computacao Aplicada - Engenharia de Software
   Disciplina: Construcao de software
   Prof.: Alexandre Gomes
   Aluno: Alan S. C. Mazuco 
   11/Jun/2016 
*/
​
var accounts;
var account;
var balance;
var logFront;
​
​
function setStatus(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
};
​
//Esta funcao realiza um refresh na pagina
function refreshBalance() {
    logFront = document.getElementById("log").value;
    setStatus("" + logFront);
    writeLog();
};
​
function sendCoin() {
​
    /* capturando os valores da tela e envaindo ao blockchain para gravacao.
       ...o " pulo do gato", que realmente interessa para o sucesso da App.*/
    var meta = MetaCoin.deployed();
    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;
​
    //Atualizacao momentanea via Ajax...
    setStatus("Inicializando a transacao... (espere)");
​
    meta.sendCoin(receiver, amount, {from: account}).then(function() {
        
        setStatus("Transacao completada!");
    
        /*
           Ateh aqui, o codigo cumpre com a solicitacao do professor:
           - O que interessa eh abrir um espaco na blochchain e gravar
             uma transacao;
           - A partir daih, dispara-se um log, proveniente da APP, que
             pode ser acompanhado no console do browser.
        */
​
        //Atualiza a tela
        refreshBalance();
	
​
        }).catch(function(e) {
            console.log(e);    
        });
     };
​
    window.onload = function() {
        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
                alert("Houve um erro ao buscar suas contas.");
                return;
            }
​
        if (accs.length == 0) {
             alert( "Não foi possível obter quaisquer contas! Verifique se o seu"+ 
                    "cliente Ethereum está configurado corretamente."
                  );
            return;
        }
​
        accounts = accs;
        account = accounts[0];
        refreshBalance();
    });
}
​
​
function writeLog(){   
 
    /* Considere ter de gravar o log em um arquivo txt ou BD, conforme
       a natureza de cada aplicativo...*/
    console.log(logFront);
}
```
Perceba que o arquivo é quase o mesmo, apenas inseri uma nova função e modifiquei o comportamento de algumas outras. Abra o arquivo **index.html** (dentro da pasta app) e apague também tudo que tem dentro dele.<br/>
...e escreva o código abaixo (faça as adaptações para o seu projeto)...

```html
<!DOCTYPE html>
<html>
<head>
  <title>Gravando Log na Blockchain</title>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
  <link href="./app.css" rel='stylesheet' type='text/css'>
  <script src="./app.js"></script>  
</head>
<body>
  <h1>GRAVACAO DE LOG</h1>
  <h2>Minha App</h2>
    
  <br>
​
  <label for="amount">Log:</label>
  <input type="text" id="log"></input>
  <input type="hidden" id="amount" placeholder="100"></input>
​
  <br>	
  <label for="receiver">To Address:</label>
  <input type="text" id="receiver" 
       placeholder="e.g., 0x93e66d9baea28c17d9fc393b53e3fbdd76899dae"></input>
  <br><br><button id="send" onclick="sendCoin()">Send</button>
  <span id="status"></span>
</body>
</html>
```
Está finalizado a configuração da DApp. Hor de testar...
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
<img src="http://ap.imagensbrasil.org/images/blockchain-final-1.jpg" width="400"/><br/>
Figura 6 - A app web: A cada clique no botão "Send" grava uma transação na blockchain e envia o log para ser autenticado.

<img src="http://ap.imagensbrasil.org/images/blockchain-final-3.jpg" width="400"/><br/>
Figura 7 - A app web: Após o clique no botão "Send", podemos visualizar a transação sendo gravada no servidor da blockchain.


 
## Finalizando 
Este passos possibilitaram a escrita da transação na Blockchain. Simples adaptação para o propósito de autenticar logs produzidos por uma aplicação, mas que pode ser adaptado para diversas outras finalidades, dependendo da necessidade do desenvolvedor.<br />
<br/>
Disciplina: Construção de Software <br />
Professor: Alexandre Gomes <br />
Aluno: Fábio Leal 
