const row = document.querySelector('.row');

fetch('https://restcountries.com/v3.1/all')
.then((response) =>  response.json())
.then((data) => {
    render(data);
})

function render(data) {
for (let i = 0; i < data.length; i++){

    function formatPopulation(population) {
        if (population >= 1000000000) {
            return (population / 1000000000).toFixed(1) + ' млрд';
        } else if (population >= 1000000) {
            return (population / 1000000).toFixed(1) + ' млн';
        } else if (population >= 1000) {
            return (population / 1000).toFixed(1) + ' тыс';
        } else {
            return population;
        }
    }
    
    

    const languages = data[i].languages ? Object.values(data[i].languages) : [];
    let currArray = [];

if (data[i].currencies) {
    currArray = Object.values(data[i].currencies);
}

const newArray = currArray.map(item => {
    if (item.symbol) {
      return (item.symbol + ' ' + item.name);  
    }
    else {
      return item.name;
    }
}
)

const template = `
<div class="col">
    <div class="card h-100">
        <img src="${data[i].flags.svg}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data[i].name.common}</h5>
            <p class="card-text">${data[i].region}</p>
            <p class="card-text">${formatPopulation(data[i].population)}</p>
            <p class="card-text">${languages.join(', ')}</p>
            <p class="card-text">${newArray.join(', ')}</p>
        </div>
    </div>
</div>
`
row.innerHTML += template;
}
}