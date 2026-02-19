const app:any = {};

app.url = new URL("https://openlibrary.org/search.json");

app.elements = {
  form: document.querySelector(".searchForm") as HTMLFormElement,
  input: document.querySelector("#search") as HTMLInputElement,
  title: document.querySelector(".title") as HTMLUListElement,
};

app.init = () => {
  app.formEvent();
};

app.formEvent = () => {
  const {form, input} = app.elements;
  form.addEventListener("submit", (e:Event) => {
    e.preventDefault();
    const hide = document.getElementById("results");
    hide?.classList.remove("hide");
    app.sBooks();
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", app.init);
} else {
  app.init();
}

app.sBooks = () => {
  app.url.search = new URLSearchParams({
    author: app.elements.input.value as any,
    limit: 10 as any,
    fields: "title, author_name",
  });

  clearPage();

  fetch(app.url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const books = data.docs.map((book:any) => ({
        title: book.title,
        author: book.author_name,
      }));
      books.forEach((books:any) => {
        const bookTitle = document.createElement("li");
        bookTitle.textContent = books.title;
        app.elements.title.appendChild(bookTitle);
      });
    });
};

const clearPage = () => {
  const { title, input } = app.elements;
  title.innerHTML = "";
  input.value = "";
};
