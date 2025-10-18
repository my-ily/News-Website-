
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
      html += `
        <section class="mb-5">
          <h3 class="text-capitalize fw-bold mb-4">${result.category}</h3>
          <div class="row g-4">
      `;

result.sources.slice(0, 4).forEach(src => {
  html += `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card news-card h-100 shadow-sm border-0 rounded overflow-hidden">
        <img src="https://www.google.com/s2/favicons?sz=128&domain_url=${src.url}"
             class="card-img-top p-4" alt="${src.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${src.name}</h5>
          <p class="card-text flex-grow-1">${src.description || "No description available."}</p>
          <a href="${src.url}" target="_blank" class="btn btn-sm btn-outline-primary mt-auto">Visit</a>
        </div>
      </div>
    </div>
  `;
});


      html += `</div></section>`;
    });

    container.innerHTML = html;

  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

fetchAllCategories();


    // async function displayNews() {
    //   const sources = await fetchApi();
    //   const container = document.getElementById("news-container");
    //   let html = "";

    //   if (sources.length === 0) {
    //     container.innerHTML = `<p class="text-center text-muted">No sources available.</p>`;
    //     return;
    //   }

    //   sources.slice(0, 8).forEach((news,i) => {
    //     html += `
        //   <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        //     <div class="card news-card h-100 shadow-sm border-0 rounded overflow-hidden">

        //       <div class="card-body d-flex flex-column">
        //         <h5 class="card-title">${news[i].name}</h5>
          
    //       </div>
    //     `;
    //   });

    //   container.innerHTML = html;
    // }

    // // تشغيل الدالة عند تحميل الصفحة
    // document.addEventListener("DOMContentLoaded", displayNews);
// // عرض الأخبار الافتراضية عند التحميل
// displayNews(categories.general);

