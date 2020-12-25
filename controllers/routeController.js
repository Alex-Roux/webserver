

const main_index = (req, res) => {
    res.render("index", { title: "Home"});
}

const main_page2 = (req, res) => {
    res.render("page2", { title: "Page 2"});
}

module.exports = {
    main_index,
    main_page2
}