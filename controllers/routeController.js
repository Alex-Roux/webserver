

const mainIndex = (req, res) => {
    res.render("index", { title: "Home"});
};

const mainPage2 = (req, res) => {
    res.render("page2", { title: "Page 2"});
};

module.exports = {
    mainIndex,
    mainPage2
};