let petsData = fetch("../../assets/json/pets.json");
let cardBlock = document.querySelector(".slider-block--popup");
let popup = document.querySelector(".popup");
let popupContent;
let isPopupOpen = false;

petsData
  .then((response) => response.json())
  .then((result) => {
    let pets = result;

    cardBlock.addEventListener("click", (event) => {
      let card = event.target.closest(".slider__card");
      if (card) openPopup(pets, card);
    });

    popup.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup") && isPopupOpen) closePopup();
    });

    function openPopup(pets, card) {
      let cardID = card.getAttribute("data-pet-id");
      let petData = pets[cardID];
      let btnClose;

      popup.innerHTML = `<div class="popup__content">
      <img src="${petData.img}" alt="${petData.name}'s picture" class="popup__picture">
      <div class="popup__info-block">
        <h3 class="popup__pet-name section-title">${petData.name}</h3>
        <span class="popup__pet-type title-h3">${petData.type} - ${petData.breed}</span>
        <p class="popup__description">${petData.description}</p>
        <ul class="popup__info-list">
          <li>Age: <span>${petData.age}</span></li>
          <li>Inoculations: <span>${Array.isArray(petData.inoculations) ? petData.inoculations.join(", ") : petData.inoculations}</span></li>
          <li>Diseases: <span>${Array.isArray(petData.diseases) ? petData.diseases.join(", ") : petData.diseases}</span></li>
          <li>Parasites: <span>${Array.isArray(petData.parasites) ? petData.parasites.join(", ") : petData.parasites}</span></li>
        </ul>
      </div>
      <button class="popup__btn-close">
        <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z"
            fill="#292929" />
        </svg>
      </button>
    </div>`;

      popupContent = document.querySelector(".popup__content");
      btnClose = document.querySelector(".popup__btn-close");
      popup.classList.add("d-flex");

      popupContent.classList.add("fade-in");
      body.classList.add("overflow-dis");
      popupContent.addEventListener(
        "animationend",
        () => {
          popupContent.classList.remove("fade-in");
          btnClose.addEventListener("click", closePopup, { once: true });
          isPopupOpen = true;
        },
        { once: true },
      );
    }

    function closePopup() {
      popupContent.classList.add("fade-out");

      popupContent.addEventListener(
        "animationend",
        () => {
          popup.classList.remove("d-flex");
          body.classList.remove("overflow-dis");
          isPopupOpen = false;
        },
        { once: true },
      );
    }
  });
