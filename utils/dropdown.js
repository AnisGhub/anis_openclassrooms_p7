/**
* Fonction qui ouvre le dropdown en ajoutant la classe "active" à l'élément ingredientDropdown.
*/
function openDropdown(dropdown, dropdowns) {
    // Close all other dropdowns
    closeAllDropdowns(dropdown, dropdowns);
    
    // Add the "active" class to open the dropdown
    dropdown.classList.add('active');
}

/**
* Fonction qui ferme le dropdown en retirant la classe "active" de l'élément ingredientDropdown.
*/
function closeDropdown(dropdown) {
    // Remove the "active" class to close the dropdown
    dropdown.classList.remove('active');
}

/**
* Fonction qui ferme tous les dropdowns en appelant la fonction fermerDropdown.
*/
function closeAllDropdowns(dropdown, dropdowns) {
    // Close the ingredient dropdown
    dropdowns.forEach((dropdownElement) => {
        if (dropdownElement !== dropdown) {
            closeDropdown(dropdownElement);
        }
    });
}

// événements pour les dropdowns

function initDropDown(dropdowns){
    dropdowns.forEach((dropdown) => {
        const dropdownArrow = dropdown.querySelector('.dropdown-arrow');
        const dropdownSearch = dropdown.querySelector('.dropdown-search');
        
        // ouvrir le dropdown quand on clique sur l'icône
        dropdownArrow.addEventListener('click', () => {
            if (dropdown.classList.contains('active')) {
                closeDropdown(dropdown);
            } else {
                openDropdown(dropdown, dropdowns);
            }
        });
        
        // fermer le dropdown quand on clique en dehors du dropdown
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.dropdown')) {
                closeDropdown(dropdown);
            }
        });
        
        // ouvrir le dropdown quand on tape dans l'input
        dropdownSearch.addEventListener('focus', () => {
            openDropdown(dropdown, dropdowns);
        });
    });
}

export {initDropDown};