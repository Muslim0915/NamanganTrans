const teamCards = document.querySelector('.team__cards');

const teamMembers = [
    {id: 1, title: 'Mr.Bahromjon', text: 'Bosh direktor', image: 'url(assets/images/png/teen.png)'},
    {id: 2, title: 'Mr.Baxtiyor', text: 'Direktor', image: 'url(assets/images/png/teen.png)'},
    {id: 3, title: 'Mr.Ibrokhim', text: 'Bosh muhandis', image: 'url(assets/images/png/teen.png)'},
]

function renderCards() {
    const fragment = document.createDocumentFragment(); // Создаем фрагмент для добавления всех элементов сразу

    teamMembers.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.backgroundImage = element.image;
        card.innerHTML = `
            <div class="card__social-icons">
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-telegram"></i>
            </div>
            <div class="card__content">
                <div class="card-title">
                    ${element.title}
                </div>
                <div class="card-text">
                    ${element.text}
                </div>
            </div>
        `;
        fragment.appendChild(card); // Добавляем созданный элемент в фрагмент
    });

    teamCards.appendChild(fragment); // Добавляем фрагмент со всеми элементами в teamCards
}


renderCards();
