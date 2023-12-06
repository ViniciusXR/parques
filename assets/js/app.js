//Função que irá buscar a query string da página e depois irá chamar a função de construir a página 
window.addEventListener("load", () => {

    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    ConstruirPagina(id);
});

const destaque = document.getElementById("destaque");
const remover = document.getElementById("remover");
const rDestaque = document.getElementById("rDestaque");
const album = document.getElementById("album");
const descricao = document.getElementById("descricao");
const local = document.getElementById("local");
const dataAl = document.getElementById("data");
const cardTitulo = document.querySelectorAll("#CardT");
const cardDesc = document.querySelectorAll(".card-text");
const modalT = document.querySelectorAll(".ModalT");
const modalD = document.querySelectorAll(".ModalD");
const alerta = document.getElementById("alerta");
const imagemDes = document.getElementById("foto_Destaque");
const imagem1 = document.getElementById("imagem1");
const imagem2 = document.getElementById("imagem2");
const imagem3 = document.getElementById("imagem3");
const imagem4 = document.getElementById("imagem4");
const imagem5 = document.getElementById("imagem5");
const imagem6 = document.getElementById("imagem6");
const imagem7 = document.getElementById("imagem7");
const imagem8 = document.getElementById("imagem8");
const imagem9 = document.getElementById("imagem9");
const imagem10 = document.getElementById("imagem10");
const imagem11 = document.getElementById("imagem11");
const imagem12 = document.getElementById("imagem12");
const Mimagem1 = document.getElementById("Modalimagem1");
const Mimagem2 = document.getElementById("Modalimagem2");
const Mimagem3 = document.getElementById("Modalimagem3");
const Mimagem4 = document.getElementById("Modalimagem4");
const Mimagem5 = document.getElementById("Modalimagem5");
const Mimagem6 = document.getElementById("Modalimagem6");
const Mimagem7 = document.getElementById("Modalimagem7");
const Mimagem8 = document.getElementById("Modalimagem8");
const Mimagem9 = document.getElementById("Modalimagem9");
const Mimagem10 = document.getElementById("Modalimagem10");
const Mimagem11 = document.getElementById("Modalimagem11");
const Mimagem12 = document.getElementById("Modalimagem12");
const textoModal = document.getElementById("exampleModalLabel");


//Função que irá construir dinamicamente a página, a partir de dados obtibos da API JSON Server
function ConstruirPagina(id) {

    fetch("https://jsonservertrabalho--viniciusramalh2.repl.co/album")
        .then(response => response.json())
        .then(data => {
            data.forEach((alb) => {
                if (alb.id == id) {
                    document.title = alb.nome;
                    album.innerHTML = alb.nome;
                    descricao.innerHTML = alb.descricao;
                    local.innerHTML = alb.local;
                    dataAl.innerHTML = alb.data;
                    cardTitulo.forEach((card) => {
                        card.innerHTML = alb.cardT;
                    });
                    cardDesc.forEach((card) => {
                        card.innerHTML = alb.cardD;
                    });
                    modalT.forEach((card) => {
                        card.innerHTML = alb.nome;
                    });
                    modalD.forEach((card) => {
                        card.innerHTML = alb.local;
                    });
                    imagemDes.src = alb.imagens[0];
                    imagem1.src = alb.imagens[0];
                    imagem2.src = alb.imagens[1];
                    imagem3.src = alb.imagens[2];
                    imagem4.src = alb.imagens[3];
                    imagem5.src = alb.imagens[4];
                    imagem6.src = alb.imagens[5];
                    imagem7.src = alb.imagens[6];
                    imagem8.src = alb.imagens[7];
                    imagem9.src = alb.imagens[8];
                    imagem10.src = alb.imagens[9];
                    imagem11.src = alb.imagens[10];
                    imagem12.src = alb.imagens[11];
                    Mimagem1.src = alb.imagens[0];
                    Mimagem2.src = alb.imagens[1];
                    Mimagem3.src = alb.imagens[2];
                    Mimagem4.src = alb.imagens[3];
                    Mimagem5.src = alb.imagens[4];
                    Mimagem6.src = alb.imagens[5];
                    Mimagem7.src = alb.imagens[6];
                    Mimagem8.src = alb.imagens[7];
                    Mimagem9.src = alb.imagens[8];
                    Mimagem10.src = alb.imagens[9];
                    Mimagem11.src = alb.imagens[10];
                    Mimagem12.src = alb.imagens[11];
                    textoModal.innerHTML = alb.nome;
                }
            })
        })

    fetch("https://jsonservertrabalho--viniciusramalh2.repl.co/destaques")
        .then(response => response.json())
        .then(data => {

            let url = document.URL;

            url = url.substring((url.length - 4), url.length);

            for (let i = 0; i < data.length; i++) {

                if (url == data[i].link.substring((data[i].link.length - 4), data[i].link.length)) {
                    destaque.checked = true;
                    destaque.disabled = true;

                    remover.style.display = "inline";
                }
            }
        })
}

//Função que faz um POST na API JSON Server e envia informações da nova foto em destaque
destaque.addEventListener("click", () => {

    fetch("https://jsonservertrabalho--viniciusramalh2.repl.co/destaques", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            imagem: imagemDes.src.substring((imagemDes.src.length - 21), imagemDes.src.length),
            link: document.URL.substring((document.URL.length - 15), document.URL.length)
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("A imagem foi adicionada ao carrossel")
            alerta.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>A imagem foi adicionada ao corrossel da página principal!</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`
        })
        .catch(error => {
            console.error('Erro ao inserir foto de destaque via API JSONServer:', error);
        });
})

//Função que trata o click do checkbox Remover Foto do Carrossel
rDestaque.addEventListener("click", () =>{
    let id = 0;

    fetch("https://jsonservertrabalho--viniciusramalh2.repl.co/destaques")
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < data.length; i++) {

                if ((document.URL.substring((document.URL.length - 15), document.URL.length)) == data[i].link) {
                    id = data[i].id;
                    RemoverDestaque(id);
                }
            }
        })
})

//Função que faz um DELETE na API JSON Server e remove a foto em destaque do carrossel
function RemoverDestaque(id) {
    fetch(`https://jsonservertrabalho--viniciusramalh2.repl.co/destaques/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log("Destaque removido com sucesso!")
            alerta.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>A imagem foi removida do corrossel da página principal!</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`
        })
        .catch(error => {
            console.error('Erro ao remover destaque via API JSONServer:', error);
            displayMessage("Erro ao remover destaque");
        });
}