const app: any = {};

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
  const { form } = app.elements;
  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
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
      if (data.docs.length > 0) {
        const books = data.docs.map((book: any) => ({
          title: book.title,
          author: book.author_name,
        }));
        books.forEach((books: any) => {
          const bookTitle = document.createElement("li");
          bookTitle.textContent = books.title;
          app.elements.title.appendChild(bookTitle);
        });
        const hide = document.getElementById("results");
        hide?.classList.remove("hide");
        const error = document.getElementById("error");
        error?.classList.add("hide");
      } else {
        const error = document.getElementById("error");
        error?.classList.remove("hide");
        const hide = document.getElementById("results");
        hide?.classList.add("hide");
      }
    });
};

const clearPage = () => {
  const { title, input } = app.elements;
  title.innerHTML = "";
  input.value = "";
};
