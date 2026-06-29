

let data = new Promise((resolve, reject) => {
    let k = fetch('../../assets/json/pets.json');

    resolve(k)
});

// data.then(response => response.json()).then(result => console.log(result))
data.then(response => {
    console.log((response.json()));
})