//Criando variáveis de manilpulacão

const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPausaBt = document.querySelector('#start-pause');
const iniciarPausarBt = document.querySelector('#start-pause span');
const iconPlayPauseBt = document.querySelector('.app__card-primary-button img');
const tempoNaTela = document.querySelector('#timer');

const musicaFocuInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sons/play.wav');
const pausePlay = new Audio('./sons/pause.mp3');
const beepPlay = new Audio('./sons/beep.mp3')

musica.loop = true;
let tempoDecorridoSegundos = 1500;
let intervaloId = null;


//Criar evento par aouvir a música
musicaFocuInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})



//Adiconar evento de lcick no botão foco
focoBt.addEventListener('click', () => {
    tempoDecorridoSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');

});
curtoBt.addEventListener('click', () => {
    tempoDecorridoSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');

});

longoBt.addEventListener('click', () => {
    tempoDecorridoSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');

});

function alterarContexto(contexto) {
    //Alterando tempo
    mostrarTempo();
    //Alterando foco dos botões
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    //algterando imagens
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    //Alterando título 
    switch (contexto) {
        case 'foco':
            title.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;
        case 'descanso-curto':
            title.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break;

        case 'descanso-longo':
            title.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

//Função para o emporizador "contagem regressiva"

const contagemRegressiva = () => {
    if (tempoDecorridoSegundos <= 0) {
        beepPlay.play()
        zerar();
        alert('Tempo finalizado!');
        return;
    }
    tempoDecorridoSegundos -= 1
    mostrarTempo();
}
//O evento de click só pode ser feito apos a função criada dentroda cosntante ser
//caregada
startPausaBt.addEventListener('click', iniciarPausar);

function iniciarPausar() {
    if (intervaloId) {
        pausePlay.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarPausarBt.textContent = 'Pausar';
    iconPlayPauseBt.setAttribute('src', './imagens/pause.png');

}
function zerar() {
    clearInterval(intervaloId);
    iniciarPausarBt.textContent = 'Começar';
    intervaloId = null;
    iconPlayPauseBt.setAttribute('src', './imagens/play_arrow.png');
}

//FUNÇÃO PARA MOSTAR O TEMPO NA TELA
function mostrarTempo(){
    const tempo = new Date(tempoDecorridoSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;

}
mostrarTempo();