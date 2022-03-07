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
            if (!data.ok) {
                result.innerHTML = `No company match with your search`
                spinner.classList.add('d-none')
            }
            let list = '';
            for (let i = 0; i < data.length; i++) {

                const companyUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${data[i].symbol}`
                const responseCompany = await fetch(companyUrl);
                const dataCompany = await responseCompany.json()


                const mark = data[i].name;
                const toMarkName = mark.replace(new RegExp(search, "gi"), (match) => `<span style="background-color:yellow;">${match}</span>`);
                const markSymbol = data[i].symbol;
                const toMarkSymbol = markSymbol.replace(new RegExp(search, "gi"), (match) => `<span style="background-color:yellow;">${match}</span>`);

                list += `
        <div id="resultContainer">
                <div>
                    <a href="company.html?symbol=${data[i].symbol}"> 
                        <img onerror="this.onerror=null;this.src='https://img.icons8.com/fluency/48/000000/stock-share.png';" src="${dataCompany.profile.image}">${toMarkName}(${toMarkSymbol})
                    </a>
                    <span id="color" class="${Number(dataCompany.profile.changesPercentage) > 0 ? 'green' : 'red'}">(${Number(dataCompany.profile.changesPercentage).toFixed(2)}%)</span> 
              </div>
              <div class="btnContainer">
                    <button id="btnCompare type="button" class="btnCompare btn btn-outline-primary">Compare</button>
              </div>
         </div>
                `;


                result.innerHTML = `${list}`;

            }

            spinner.classList.add('d-none')
        }
        stock()
    }
};