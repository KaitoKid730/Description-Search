let dictionary = [];

fetch('all.json')
.then(response => response.json())
.then(data => {
    for (let i = 0; i < data.length; i++) {
        let entry = {
            term: data[i].name,
            definition: data[i].description
        };
        dictionary.push(entry);
    }
});


function searchDictionary() {
    const searchTerm = document.querySelector('.search-input').value.trim().toLowerCase();
    const resultsContainer = document.querySelector('.results-container');
    
    if (searchTerm === '') {
        resultsContainer.innerHTML = '';
        return;
    }
    
    const filteredTerms = dictionary.filter(entry => entry.term.toLowerCase() === searchTerm);
    
    if (filteredTerms.length > 0) {
        resultsContainer.innerHTML = '';
        filteredTerms.forEach(entry => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
            <h3>${entry.term}</h3>
            <p>${entry.definition}</p>
            <button class="copy-button" onclick="copyToClipboard(this)">Copy</button>
            `;
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found</p>';
    }
}


function copyToClipboard(button) {
    const resultItem = button.parentElement;
    const term = resultItem.querySelector('h3').textContent;
    const definition = resultItem.querySelector('p').textContent;
    const textToCopy = `${definition}`;
    
    const tempInput = document.createElement('input');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}
