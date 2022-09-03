const loadDataAll = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`

  try {
    const res = await fetch(url)
    const data = await res.json()
    displayData(data.data.news_category);
  }
  catch (error) {
    alert('The answer is not correct')
  }
}

const displayData = allCategoryNews => {

  const categoryPlace = document.getElementById('navbar-category')
  allCategoryNews.forEach(news => {

    const newsDiv = document.createElement('newsDiv')
    newsDiv.innerHTML = `
       <a id="show-news-length" onclick="showAllDetails('${news.category_id}')" class="nav-link" href="#">${news.category_name}</a>
       `;
    categoryPlace.appendChild(newsDiv)
  });
}

//<------------ show all details -------------> 

const showAllDetails = async (id) => {
  loadSpinnerBulen(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  try {
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data.data)
  }
  catch (error) {
    alert('The answer is not correct')
  }
}



// <--------------- display detail ------------>

const displayDetails = categoryId => {
  categoryId.sort((a, b) => {
    return b.total_view - a.total_view
  })

  const showNews = document.getElementById('show-news').innerText = categoryId.length
  const placeCard = document.getElementById('cards-container')
  placeCard.innerHTML = '';
  categoryId.forEach(id => {
    // console.log(id);
    const cardsDiv = document.createElement('div')
    cardsDiv.classList.add('col')
    cardsDiv.innerHTML = `;
        <div class="card mb-4" style="max-width: 980px;">
  <div class="row g-0">
    <div class="col-md-4 ml-8">
      <img src="${id.thumbnail_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-6">
      <div class="card-body">
        <h5 class="card-title">${id.title}</h5>
        <p class="card-text cards">${id.details}</p>
        <div class="d-flex justify-content-around align-items-center">
       <div> <img class="img-fluid img" src="${id.author.img}" alt="">  ${id.author.name ? id.author.name : "No found name"}</div>
       <div> 
      <p> <i class="fa-solid fa-eye"></i>
      ${id.total_view ? id.total_view : '1.3M '}</p>
       </div>
       <div>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star-half-stroke"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        </div> 
       <button onclick="detailModal('${id._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">  Details
       <i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  </div>
</div>
        `;
    placeCard.appendChild(cardsDiv)
  })
  loadSpinnerBulen(false);
}
