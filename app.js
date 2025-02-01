let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1});
}

function exibirMensagemInicial() {
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', 'Escolha um número entre 1 e 10');
}

function gerarNumeroAleatorio() {
    let numeroSorteado = Math.floor(Math.random() * 10 + 1);
    let limiteNumerosArmazenados = listaDeNumerosSorteados.length;

    if (limiteNumerosArmazenados >= 10){
        listaDeNumerosSorteados = [];
    } 

    if (listaDeNumerosSorteados.includes(numeroSorteado)){
        return gerarNumeroAleatorio();
    } else {
       listaDeNumerosSorteados.push(numeroSorteado);
       return numeroSorteado;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (numeroSecreto == chute) {
        const mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${tentativas > 1 ? 'tentativas' : 'tentativa'} :)`;
        exibirTexto('h1', 'ACERTOU!!!');
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (numeroSecreto < chute){
        exibirTexto('p', 'O número secreto é menor que o chute');
        limparCampo();
        tentativas++;
    } else {
        exibirTexto('p', 'O número secreto é maior que o chute');
        limparCampo();
        tentativas++;
    }
}

function reiniciarJogo() {
    tentativas = 1;
    numeroSecreto = gerarNumeroAleatorio();

    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

exibirMensagemInicial();