let input = document.getElementById('tarefa');
let btnAdd = document.getElementById('btn-add');
let main = document.getElementById('areaLista');

function criarElemento(tag, classe, texto){
    let elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    //textContent trata o valor como texto: HTML digitado pelo usuário não é interpretado (evita XSS)
    if (texto) elemento.textContent = texto;
    return elemento;
}

function addTarefa(){
    //Pegar o valor digitado no input, sem espaços nas pontas
    let valorInput = input.value.trim();

    //Se estiver vazio, não adiciona nada
    if (valorInput === ''){
        return;
    }

    let item = criarElemento('div', 'item');

    let icone = criarElemento('span', 'material-symbols-outlined', 'radio_button_unchecked');
    let areaIcone = criarElemento('div', 'item-icone');
    areaIcone.appendChild(icone);

    let nome = criarElemento('div', 'item-nome', valorInput);

    let botaoDeletar = criarElemento('button', 'delete');
    botaoDeletar.appendChild(criarElemento('span', 'material-symbols-outlined', 'delete'));
    botaoDeletar.appendChild(document.createTextNode('Deletar'));
    let areaBotao = criarElemento('div', 'item-botao');
    areaBotao.appendChild(botaoDeletar);

    areaIcone.addEventListener('click', () => marcarTarefa(item, icone));
    nome.addEventListener('click', () => marcarTarefa(item, icone));
    botaoDeletar.addEventListener('click', () => item.remove());

    item.append(areaIcone, nome, areaBotao);

    //Adicionar o item na lista
    main.appendChild(item);

    //Zerar campo input
    input.value = '';
    input.focus();
}

function marcarTarefa(item, icone){
    let concluida = item.classList.toggle('clicado');
    icone.textContent = concluida ? 'check_circle' : 'radio_button_unchecked';

    //Tarefa concluída vai para o fim da lista
    if (concluida){
        main.appendChild(item);
    }
}

btnAdd.addEventListener('click', addTarefa);

input.addEventListener('keyup', function(event){
    //Se teclou Enter
    if (event.key === 'Enter'){
        event.preventDefault();
        addTarefa();
    }
});
