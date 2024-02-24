const servicesCardsContainer = document.querySelector('.services__cards');
const servicesCards = [
    {
        id: 1, title: 'Haydovchi Sertifikat Ta\'limi', text: 'Yetuk haydovchiga aylanish.', src: 'what-we-do-Icon1'
    },
    {
        id: 2,
        title: 'ADR Sertifikat Ta\'limi',
        text: 'Xavfsiz yuklarni olib o\'tish uchun ko\'nikmang.',
        src: 'what-we-do-Icon2'
    },
    {
        id: 3,
        title: 'ADR TANK Sertifikat Ta\'limi',
        text: 'Xavfli materiallarni sementlarida olib o\'tishda ixtisoslashingiz.',
        src: 'what-we-do-Icon3'
    },
    {
        id: 4,
        title: 'Menejer Sertifikat Ta\'limi',
        text: 'O\'zlashtirish va yetkazib berish sohasida boshqarishni o\'rganing.',
        src: 'what-we-do-Icon4'
    },
];

function renderServicesCards() {
    const fragment = document.createDocumentFragment();
    servicesCards.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('services__card');
        card.innerHTML = `
            <img alt="image" src="assets/images/svg/${element.src}.svg">
            <div class="line"></div>
            <div class="card-info">
                <h3>${element.title}</h3>
                <p>${element.text}</p>
            </div>
        `;
        fragment.appendChild(card);
    });
    servicesCardsContainer.innerHTML = '';
    servicesCardsContainer.appendChild(fragment);
}

renderServicesCards();
