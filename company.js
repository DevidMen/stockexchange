const spinner = document.getElementById('spinnerTwo')
async function company() {

    const urlcompany = new URLSearchParams(window.location.search);
    const symbolCompany = urlcompany.get('symbol')
    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbolCompany}`
    const response = await fetch(url);
    const data = await response.json()
    const nameCompany = document.getElementById('nameCompany')
    const descriptionCompany = document.getElementById('descriptionCompany')
    const linkCompany = document.getElementById('linkCompany')
    spinner.classList.remove('d-none')
    console.log(data)

    nameCompany.innerHTML = `<h1>${data.profile.companyName}(${data.profile.sector})</h1> <img src="${data.profile.image}">`

    linkCompany.innerHTML = `<a href="${data.profile.website}"> ${data.profile.website}</a>`

    descriptionCompany.innerHTML = `Stock Price ${data.profile.price}$ <span id="color">(${data.profile.changesPercentage}%)</span> <br>
    ${data.profile.description}}`

    if (Number(data.profile.changesPercentage) > 0) {
        document.getElementById('color').style.color = "green"
    } else { document.getElementById('color').style.color = "red" }
    spinner.classList.add('d-none')
}
company()

async function chart() {

    const urlcompany = new URLSearchParams(window.location.search);
    const symbolCompany = urlcompany.get('symbol')
    spinner.classList.remove('d-none')
    const urlChart = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbolCompany}?serietype=line`
    const response = await fetch(urlChart)
    const data = await response.json()
    console.log(data)
    const date = [];
    const price = [];
    for (let i = data.historical.length - 1; i >= 0; i--) {
        date.push(data.historical[i].date)
        price.push(data.historical[i].close)
    }
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date,
            datasets: [{
                label: 'Stock Price History',
                data: price,
                fill: true,
                borderColor: 'black',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                pointRadius: 0,
            }]
        },
    });

}
chart()