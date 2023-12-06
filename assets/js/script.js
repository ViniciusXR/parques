// --------------------------------------------------
// Cria o mapa baseado na API Mapbox e adiciona no 
// elemento de id: map        
// --------------------------------------------------
mapboxgl.accessToken = 'pk.eyJ1IjoidnhyODkiLCJhIjoiY2xwajBzdTg5MDRmajJrcnY4ZnNucGs4OCJ9.TUYGn9dmPXyVpVRs24Jhdg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-43.93861782522479, -19.925777403423364],
    zoom: 2
});

fetch("https://jsonservertrabalho--viniciusramalh2.repl.co/parques")
    .then(response => response.json())
    .then(data => {
        // ----------------------------------------------
        // Adiciona marcadores para os parques nacionais
        // ----------------------------------------------
        data.forEach((uni) => {
            let popup = new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<h3><a href="${uni.url}" target="_blank">${uni.descricao}</a></h3><br>
                    ${uni.endereco} <br> ${uni.cidade}`);
            const marker = new mapboxgl.Marker({ color: uni.cor })
                .setLngLat(uni.latlong)
                .setPopup(popup)
                .addTo(map);
        })
    })

// ----------------------------------------------
// Adiciona um marcador com nossa posição no mapa
function processarGeo(local) {
    let popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h3> Você está aqui! </h3>`);
    const marker = new mapboxgl.Marker({ color: 'deepskyblue' })
        .setLngLat([local.coords.longitude, local.coords.latitude])
        .setPopup(popup)
        .addTo(map);
}

navigator.geolocation.getCurrentPosition(processarGeo, () => { alert('Erro ao obter localização.') })

//Função que irá carregar as fotos do carousel
window.addEventListener("load", () => {
    fetch("https://jsonservertrabalho--viniciusramalh2.repl.co/destaques")
        .then(response => response.json())
        .then(data => {
            let str = '';

            for (let i = 0; i < data.length; i++) {

                if (i == 0) {
                    str += `<div class="carousel-item active" data-bs-interval="10000">
                        <a href="${data[i].link}"><img id="imagem1" src="${data[i].imagem}" class="d-block w-100 foto"
                                alt="Imagem do Carousel"></a>
                        <div class="carousel-caption d-none d-md-block">
                        </div>
                    </div>`
                }
                else {
                    str += `<div class="carousel-item" data-bs-interval="2000">
                <a href="${data[i].link}"><img id="imagem1" src="${data[i].imagem}" class="d-block w-100 foto"
                        alt="Imagem do Carousel"></a>
                <div class="carousel-caption d-none d-md-block">
                </div>
                </div>`
                }

            }
            let carr = document.getElementById("carrossel");

            carr.innerHTML += str;
        })
})

