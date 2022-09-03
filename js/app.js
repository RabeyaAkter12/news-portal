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