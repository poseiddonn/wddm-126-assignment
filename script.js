const form = document.querySelector(".searchForm");
const input = document.querySelector("#search");

const books = new URL("https://openlibrary.org/search.json");

const sBooks = () => {
  books.search = new URLSearchParams({
    q: input.value,
    fields: "title",
  });

  fetch(books)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sBooks();
});
