const $body = document.querySelector('body');
const $modalWindow = document.querySelector('.modal-window');
let popupStatus = false;
fetch('../../assets/json/pets.json')
    .then(response => {
        return response.json();

    }).then(data => {
        let pets = data;
        let $sliderItems = document.querySelector('.slider__items');

        $sliderItems.addEventListener('click', (e) => {
            let t = e.target
            if (t.classList.contains('slider__card') || t.parentElement.classList.contains('slider__card')) {
                let name = t.getAttribute('data-card-id') ?? t.parentElement.getAttribute('data-card-id');
                console.log(name)
                preparePopup(pets, name, $modalWindow);
                showPopup();
            }
        })

        $modalWindow.addEventListener('mouseover', (e) => {
            let btnClose = document.querySelector('.popup__button-close');
            if (e.target.classList.contains('modal-window')) {
                btnClose.classList.add('button__hover')
                $modalWindow.style.cursor = 'pointer'
            } else {
                btnClose.classList.remove('button__hover');
                $modalWindow.style.cursor = 'auto';
            }
        });

        $modalWindow.addEventListener('click', (e) => {
            let t = e.target;
            if (t.classList.contains('modal-window') || t.classList.contains('popup__button-close')) {
                showPopup();
            }
        })
    })

function preparePopup(arr, targetElementName, targetPlace) {
    arr.forEach(item => {
        if (item['name'].toLowerCase() == targetElementName) {
            let popup = `<div class="modal-window__wrapper animation-scale">
                         <div class="modal-window__popup popup">
                             <img src="${item['img']}" alt="Pets ${item['name']} photo" class="popup__picture">
                             <div class="popup__right-block">
                                 <h3 class="popup__title">${item['name']}</h3>
                                 <h4 class="popup__second-title">${item['type']} - ${item['breed']}</h4>
                                 <p class="popup__description">${item['description']}</p>

                                 <ul class="popup__data-list data-list">
                                     <li class="data-list__item"><span class="data-list__item-name">Age:</span>&#8194<span>${item['age']}</span>
                                     </li>
                                     <li class="data-list__item"><span
                                             class="data-list__item-name">Inoculations:</span>&#8194<span>${item['inoculations'].join(', ')}</span></li>
                                     <li class="data-list__item"><span
                                             class="data-list__item-name">Diseases:</span>&#8194<span>${item['diseases'].join(', ')}</span></li>
                                     <li class="data-list__item"><span
                                             class="data-list__item-name">Parasites:</span>&#8194<span>${item['parasites'].join(', ')}</span></li>
                                 </ul>
                             </div>
                         </div>

                            <button class="popup__button-close slider-button">x</button>
                        </div>`;
            targetPlace.innerHTML = popup;
        }
    });
}

function showPopup() {
    if (!popupStatus) {
        popupStatus = true;
        $body.classList.add('overflow-hidden');
        $modalWindow.classList.add('d-flex');
    } else {
        popupStatus = false;
        $body.classList.remove('overflow-hidden');
        $modalWindow.classList.remove('d-flex');
    }
}