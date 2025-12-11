const form = document.querySelector(".searchForm");
const input = document.querySelector("#search");
const title = document.querySelector(".title");

const books = new URL("https://openlibrary.org/search.json");

const sBooks = () => {
  books.search = new URLSearchParams({
    q: input.value,
    limit: 50,
    fields: "title, author_name",
  });
  clearPage();
  fetch(books)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const books = data.docs.map((book) => ({
        title: book.title,
        authors: book.author_name,
      }));
      books.forEach((books) => {
        const bookTitle = document.createElement("li");
        bookTitle.textContent = books.title;
        title.appendChild(bookTitle);
      });
    });
};

const clearPage = () => {
  title.innerHTML = "";
  input.value = "";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sBooks();
});
