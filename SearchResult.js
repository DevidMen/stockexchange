class SearchResult {
    constructor(element) {
        this.element = element

    }
    renderResults(search) {

        const result = this.element
        const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${search}&limit=10&exchange=NASDAQ`

        async function stock() {
            const spinner = document.getElementById('spinner')
            spinner.classList.remove('d-none')
            const response = await fetch(url);
            const data = await response.json()
            let list = '';
            for (let i = 0; i < data.length; i++) {
                const urlTwo = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${data[i].symbol}`
                const responseTwo = await fetch(urlTwo);
                const dataTwo = await responseTwo.json()

                list += `
                <li>
                    <a href="company.html?symbol=${data[i].symbol}"> 
                        <img onerror="this.onerror=null;this.src='https://img.icons8.com/fluency/48/000000/stock-share.png';" src="${dataTwo.profile.image}">${data[i].name}  (${data[i].symbol})
                    </a>
                    <span id="color" class="${Number(dataTwo.profile.changesPercentage) > 0 ? 'green' : 'red'}">(${Number(dataTwo.profile.changesPercentage).toFixed(2)}%)</span> 
                </li>
                `;

            }
            result.innerHTML = `<ul>${list}</ul>`;
            spinner.classList.add('d-none')
        }
        stock()
    }


};