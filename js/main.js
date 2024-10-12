

function fetchNews(category) {
   fetch(`https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=a1a5ac026cfe40acb68d14cf20ea65d9`)
   .then(response => response.json())
   .then(data => {
       const newsContainer = document.querySelector('.newsContainer');
       const hImg = document.querySelector('.h-img')
       let articleCol = "";
       let imagArr = [];
       let currentImageIndex = 0;
       if (data.status === "ok" && data.totalResults > 0) {
           data.articles.forEach(article => {
            if (article.title !== '[Removed]' &&  article.urlToImage) {
               articleCol += `
               <div class="col article">
                   <h2>${article.title}</h2>
                   <p>${article.description}</p>
                    <img src="${article.urlToImage}" alt="News Image">
                   <a href="${article.url}" target="_blank">اقرأ المزيد</a>
               </div>
               `};
               imagArr.push(article.urlToImage);
           });
           if (imagArr.length > 0) {
            setInterval(() => {
                hImg.innerHTML = `<img src="${imagArr[currentImageIndex]}" alt="News Image">`;
                currentImageIndex = (currentImageIndex + 1) % imagArr.length; // الانتقال للصورة التالية أو العودة للأولى
            }, 3000);  // التغيير كل 3 ثواني
        }
       } else {
           articleCol += `<p>لا مزيد من الأخبار</p>`;
       }

       newsContainer.innerHTML = articleCol;
   })
   .catch(error => console.error('Error:', error));
}

// Load default category
fetchNews('general');

// Add event listeners to category buttons
let catego = document.querySelectorAll('.category');
catego.forEach(button => {
   button.addEventListener('click', function() {
       let category = button.getAttribute('data-category');
       fetchNews(category);
   });
});



function fetchtitles(category) {
   fetch(`https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=a1a5ac026cfe40acb68d14cf20ea65d9`)
   .then(response => response.json())
   .then(data => {
       const titlesNews = document.querySelector('.titlesNews');
        titlesNews.innerHTML= "";

       if (data.status === "ok" && data.totalResults > 0) {
           data.articles.forEach(article => {
            if (article.title !== '[Removed]' ) {
               titlesNews.innerHTML += `
               <div class=" col-title article">
                   <h2>${article.title}</h2>
               </div>
               `;
           }
           });
       } else {
         titlesNews.innerHTML += `<p>لا مزيد من الأخبار</p>`;
       }
   })
   .catch(error => console.error('Error:', error));
};
fetchtitles('general');

let secbusiness = document.getElementById('business');
secbusiness.addEventListener('click' , function(){
    fetchNews('business')
} )


function displayTime(){
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    document.getElementById('dateTime').innerHTML = `${time} ◷ . ${date} ▦`;
    
}
setInterval(displayTime , 1000);
