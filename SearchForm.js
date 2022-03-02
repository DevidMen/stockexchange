class SearchForm {
    constructor(element) {
        this.element = element
    }
    onSearch(callback) {
        const formdiv = this.element
        formdiv.innerHTML = `<input type="search" id="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"/>    
        <button id="btnsearch" type="button" class="btn btn-outline-primary">search</button>
        <br>
        <div class="spinner-border d-none " id="spinner" role="status">
                <span class="visually-hidden">Loading...</span>

        </div>`


        const myBtn = document.getElementById('btnsearch')

        myBtn.addEventListener('click', function() {
            const search = document.getElementById('search').value
            callback(search)
        })
    }
}