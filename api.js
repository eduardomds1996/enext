const API = 'https://dog.ceo/api/';

function listarRacas() {
    axios.get(API + 'breeds/list/all')
        .then(function(resposta) {
            atualizaSelect(resposta.data.message);
            definirInformacoes();
        });
}

function atualizaSelect(racas) {
    let select = document.getElementById('select_todas_racas');
    let options = '<option value="" selected disabled>Selecione a raça</option>';

    for (var chave in racas) {
        options += `<option value="${chave}">${chave.charAt(0).toUpperCase() + chave.slice(1)}</option>`;
    }
    select.innerHTML = options;
}

function buscarImagemDog(raca) {
    let imagem = document.getElementById('imagem');
    axios.get(API + `breed/${raca.toLowerCase()}/images/random`)
        .then(resposta => {
            imagem.style.backgroundImage = "url("+ resposta.data.message +")";
        })
}

function mudarNomedoCachorro(nomeCachorro){
    let h1NomeCachorro = document.getElementById('resultado_nome_cachorro');    
    h1NomeCachorro.innerHTML = nomeCachorro;
}

function mudarCor(cor){
    let h1NomeCachorro = document.getElementById('resultado_nome_cachorro');    
    h1NomeCachorro.style.color = cor;
}
function mudarFonte(fonte){
    let h1NomeCachorro = document.getElementById('resultado_nome_cachorro');   
    h1NomeCachorro.className = ''; 
    h1NomeCachorro.classList.add(fonte);
}

function definirInformacoes() {
    definirSelect('raca', 'select_todas_racas', false);
    definirInput('nome', 'input_nome_cachorro');
    definirSelect('cor', 'select_cor', true);
    definirSelect('fonte', 'select_fontes', true);
    
    if (localStorage.getItem('imagem') !== null) {
        let imagem = document.getElementById('imagem');
        imagem.setAttribute('src', localStorage.getItem('imagem'));
        imagem.style.backgroundImage =  localStorage.getItem('imagem');
    }

    if (localStorage.getItem('data') !== null) {
        let data = document.getElementById('data');
        data.text = localStorage.getItem('data');
    }
}
function definirInput (atributo, idElemento){
    if (localStorage.getItem(atributo) !== null) {
        let h1NomeCachorro = document.getElementById('resultado_nome_cachorro');  
        let input = document.getElementById(idElemento);
        input.value = localStorage.getItem(atributo);
        h1NomeCachorro.innerHTML = localStorage.getItem(atributo);       
       
    }
}
function definirSelect(atributo, idElemento, trigger) {
    if (localStorage.getItem(atributo) !== null) {
        let select = document.getElementById(idElemento);
        select.value = localStorage.getItem(atributo);
        
        if (trigger) {
            var event = document.createEvent('HTMLEvents');
            event.initEvent('change', true, false);
            select.dispatchEvent(event);
        }
    }
}

function mudaAtributo(atributo, valor) {
    localStorage.setItem(atributo, valor);
}

listarRacas();