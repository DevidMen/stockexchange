const myBtn = document.getElementById('btnsearch')
const search = document.getElementById('search')
const result = document.getElementById('result')
const spinner = document.getElementById('spinner')

async function banner() {
    const banner = document.getElementById('banner')
    const urlBanner = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/index`
    const responseBanner = await fetch(urlBanner)
    const dataBanner = await responseBanner.json()
    console.log(dataBanner)
    for (let i = 0; i < dataBanner.length; i++) {
        banner.innerHTML += `<span class="bannerSpan">${dataBanner[i].symbol}</span> <span class="bannerSpan ${Number(dataBanner[i].changesPercentage) > 0 ? 'green' : 'red'}"> ${(dataBanner[i].changesPercentage).toFixed(2)}</span>`
    }
}
banner()


myBtn.addEventListener('click', function() {
    result.innerHTML = ""
    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${search.value}&limit=10&exchange=NASDAQ`
    spinner.classList.add("d-none")
    async function stock() {
        spinner.classList.remove('d-none')
        const response = await fetch(url);
        const data = await response.json()
        console.log(data)

        let list = '';
        for (let i = 0; i < data.length; i++) {


            const urlTwo = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${data[i].symbol}`
            const responseTwo = await fetch(urlTwo);
            const dataTwo = await responseTwo.json()
            list += `
            <li>
                <a href="company.html?symbol=${data[i].symbol}"> 
                    <img src="${dataTwo.profile.image}">${data[i].name}  (${data[i].symbol})
                </a>
                <span id="color" class="${Number(dataTwo.profile.changesPercentage) > 0 ? 'green' : 'red'}">(${Number(dataTwo.profile.changesPercentage).toFixed(2)}%)</span> 
            </li>
            `;
        }
        spinner.classList.add('d-none')
        result.innerHTML = `<ul>${list}</ul>`;

    }
    stock()




})