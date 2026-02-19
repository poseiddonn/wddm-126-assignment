const app = {};
app.url = new URL("https://openlibrary.org/search.json");
app.elements = {
    form: document.querySelector(".searchForm"),
    input: document.querySelector("#search"),
    title: document.querySelector(".title"),
};
app.init = () => {
    app.formEvent();
};
app.formEvent = () => {
    const { form } = app.elements;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const hide = document.getElementById("results");
        hide?.classList.remove("hide");
        app.sBooks();
    });
};
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", app.init);
}
else {
    app.init();
}
app.sBooks = () => {
    app.url.search = new URLSearchParams({
        author: app.elements.input.value,
        limit: 10,
        fields: "title, author_name",
    });
    clearPage();
    fetch(app.url)
        .then((res) => {
        return res.json();
    })
        .then((data) => {
        const books = data.docs.map((book) => ({
            title: book.title,
            author: book.author_name,
        }));
        books.forEach((books) => {
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
export {};
//# sourceMappingURL=script.js.map