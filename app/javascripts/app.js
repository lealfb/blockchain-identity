/* UNB
   Mestrado em Computacao Aplicada - Engenharia de Software
   Disciplina: Construcao de software
   Prof.: Alexandre Gomes
   Aluno: Alan S. C. Mazuco 
   11/Jun/2016 
*/

var accounts;
var account;
var balance;
var logFront;


function setStatus(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
};

//Esta funcao realiza um refresh na pagina
function refreshBalance() {
    logFront = document.getElementById("log").value;
    setStatus("" + logFront);
    writeLog();
};

function sendCoin() {

    /* capturando os valores da tela e envaindo ao blockchain para gravacao.
       ...o " pulo do gato", que realmente interessa para o sucesso da App.*/
    var meta = MetaCoin.deployed();
    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    //Atualizacao momentanea via Ajax...
    setStatus("Inicializando a transacao... (espere)");

    meta.sendCoin(receiver, amount, {from: account}).then(function() {
        
        setStatus("Transacao completada!");
    
        /*
           Ateh aqui, o codigo cumpre com a solicitacao do professor:
           - O que interessa eh abrir um espaco na blochchain e gravar
             uma transacao;
           - A partir daih, dispara-se um log, proveniente da APP, que
             pode ser acompanhado no console do browser.
        */

        //Atualiza a tela
        refreshBalance();
	

        }).catch(function(e) {
            console.log(e);    
        });
     };

    window.onload = function() {
        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
                alert("Houve um erro ao buscar suas contas.");
                return;
            }

        if (accs.length == 0) {
             alert("Não foi possível obter quaisquer contas! Verifique se o seu cliente Ethereum está configurado corretamente.");
            return;
        }

        accounts = accs;
        account = accounts[0];
        refreshBalance();
    });
}


function writeLog(){   
 
    /* Considere ter de gravar o log em um arquivo txt ou BD, conforme
       a natureza de cada aplicativo...*/
    console.log(logFront);
}
