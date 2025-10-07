document.querySelector("button").addEventListener("click", getTopNews);

function getTopNews() {
  // using this news api https://newsapi.org/docs/get-started#top-headlines
  const apiKey = "93139ab4ad9f4c77a2d157685db92600";

  let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  let req = new Request(url);
  fetch(req)
    .then((res) => {
      console.log(res);
      return res.json();
    })

    .then((data) => {
      for (let i = 0; i < 3 && i < data.articles.length; i++) {
        addArticle(data.articles[i]);
      }

      console.log("news api sends info on articles");
      // here I want to include author, description, publishedAt, title, url, urlToImage
      console.log(data);

      // need to figure out how to put these two side by side...maybe create three divs and then display flex
      // article zero
      function addArticle(article) {
        const newArticle = document.createElement("div");
        const template = document.querySelector("#template");
        newArticle.innerHTML = template.innerHTML;
        template.parentElement.insertBefore(newArticle, template);

        newArticle.querySelector("h3").innerText = ` ${article.title} ${new Date(
          article.publishedAt
        ).toLocaleDateString()} `;
        newArticle.querySelector("h4").innerText = ` ${article.description} `;

        const imgUrl = article.urlToImage;
        const divImage = newArticle.querySelector("div");

        // creating button for the article
        const button = document.createElement("button");
        button.textContent = "Read more";

        // Make the button clickable and open the URL
        button.addEventListener("click", () => {
          window.open(article.url, "_blank"); // open full article in new tab
        });

        //append the button to the div
        newArticle.appendChild(button);

        // now create an <img> element
        const img = document.createElement("img");
        img.src = imgUrl; // set image src
        img.alt = "article image"; // optional alt text...not sure if I want to leave this

        // append the image to the div
        divImage.appendChild(img);
      }

      // I had a lot of help from Michael for this project!
      ////////////////////////////////////////////////////////////////////////////////
    })

    .catch((err) => {
      console.error("error", err);
    });
}
