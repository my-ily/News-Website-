async function fetchAllCategories() {
  const categories = ["business", "sports", "technology", "general"];
  const apiKey = "AD9A0D904B174CA9B607AB7851CF70C7";

  try {
  
    const requests = categories.map(category =>
      fetch(`https://newsapi.org/v2/top-headlines/sources?category=${category}&apiKey=${apiKey}`)
        .then(res => res.json())
        .then(data => ({
          category,
          sources: data.sources || []
        }))
    );

    const results = await Promise.all(requests);

 
    const container = document.getElementById("news-sections");
    let html = "";

    results.forEach(result => {
      if (result.category !== "technology") {
        html += `
          <section class="mb-5">
            <h3 class="text-capitalize fw-bold mb-4">${result.category}</h3>
            <div class="row g-4">
        `;

        result.sources.slice(5, 9).forEach(src => {
          const readingTime = Math.ceil(Math.random() * 10);

          html += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <div class="card news-card h-100 shadow-sm border-0 rounded overflow-hidden">
                <img src="https://www.google.com/s2/favicons?sz=128&domain_url=${src.url}"
                     class="card-img-top p-4" alt="${src.name}">
                <div class="card-body d-flex flex-column">
                  <small class="text-secondary mb-2">
                    <i class="bi bi-person-circle pe-1"></i>${src.name} · ${readingTime} min ago
                  </small>
                  <h5 class="card-title">${src.name}</h5>
                  <p class="card-text flex-grow-1">${src.description || "No description available."}</p>
                  <div class="d-flex justify-content-between align-items-center mt-3">
                    <span class="badge bg-danger">${result.category}</span>
                  </div>
                </div>
              </div>
            </div>
          `;
        });

        html += `</div></section>`;
      }
    });

    container.innerHTML = html;

  
    
    const techRes = await fetch(
      `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=5&apiKey=${apiKey}`
    );
    const techData = await techRes.json();

    const Tec = document.querySelector(".Tec");

    if (techData.articles && techData.articles.length > 0) {
      Tec.innerHTML = `
        <section class="container py-5">
          <div class="text-center mb-5">
            <h2 class="fw-bold">Top 5 Technology News</h2>
            <p class="text-muted">Stay updated with the latest innovations and breakthroughs shaping the future.</p>
          </div>

          <div class="row g-4">
            ${techData.articles
              .map(
                news => `
                  <div class="col-12 col-md-6 col-lg-4">
                    <div class="card border-0 shadow-sm h-100">
                      <img src="${news.urlToImage || "https://via.placeholder.com/400x250"}" 
                           class="card-img-top" 
                           alt="${news.title}">
                      <div class="card-body">
                        <h6 class="fw-semibold">${news.title}</h6>
                        <small class="text-muted">${news.source.name || "Unknown source"} · ${
                  Math.ceil(Math.random() * 5)
                } hours ago</small>
                      </div>
                    </div>
                  </div>
                `
              )
              .join("")}
          </div>
        </section>
      `;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchAllCategories();







async function fetchAll(){
  const apiKey ='af3f7d415d5445c4b551f07d1df6be36';
  const url = `https://newsapi.org/v2/everything?q=keyword&apiKey=${apiKey}`

  try {
    const req = await fetch(url)
    const data = await req.json()
       console.log(data);
    return data.articles
 
    
  } catch (error) {
    console.log(error);
    
  }
}

async function displayNews(){
const news = await fetchAll()
let sport = document.querySelector(".sport")
news.slice(5,9).forEach(news => {
  sport.innerHTML +=`
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card news-card h-100 shadow-sm border-0 rounded overflow-hidden">
        <img src="${news.urlToImage || 'https://via.placeholder.com/350x200'}"  class="card-img-top" alt="Sports">
        <div class="card-body d-flex flex-column">
          <small class="text-secondary mb-2"><i class="bi bi-person-circle pe-1"></i>${news.author || "Unknown author"} · ${Today(news.publishedAt)}</small>
          <h5 class="card-title">${news.title || "No title"}</h5>
          <p class="card-text flex-grow-1">${news.description || "No description available."}.</p>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <span class="badge bg-danger">new</span>
  
          </div>
        </div>
      </div>
    </div>`
});
}
//2025-09-23T14:17:23Z"
function Today(s){
const date = new Date(s)
const opt ={weekday:"short"}
return date.toLocaleDateString("en-US",opt)
}


console.log(Today("2025-09-23"));

displayNews()

