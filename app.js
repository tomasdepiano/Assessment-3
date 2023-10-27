import express from "express";
import session from "express-session";
import lodash from "lodash";
import morgan from "morgan";
import nunjucks from "nunjucks";
import ViteExpress from "vite-express";

const app = express();
const port = "8000";

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  session({ secret: "ssshhhhh", saveUninitialized: true, resave: false })
);

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

const MOST_LIKED_FOSSILS = {
  aust: {
    img: "/img/australopith.png",
    name: "Australopithecus",
    num_likes: 584,
  },
  quetz: {
    img: "/img/quetzal_torso.png",
    name: "Quetzal",
    num_likes: 587,
  },
  steg: {
    img: "/img/stego_skull.png",
    name: "Stegosaurus",
    num_likes: 598,
  },
  trex: {
    img: "/img/trex_skull.png",
    name: "Tyrannosaurus Rex",
    num_likes: 601,
  },
};

export const OTHER_FOSSILS = [
  {
    img: "/img/ammonite.png",
    name: "Ammonite",
  },
  {
    img: "/img/mammoth_skull.png",
    name: "Mammoth",
  },
  {
    img: "/img/ophthalmo_skull.png",
    name: "Opthalmosaurus",
  },
  {
    img: "/img/tricera_skull.png",
    name: "Triceratops",
  },
];

app.get("/top-fossils", (req, res) => {
  res.render("top-fossils.html.njk", {
    MOST_LIKED_FOSSILS,
    name: req.session.userName,
  });
});

app.get("/random-fossil.json", (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
});

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});

app.get("/", (req, res) => {
  res.render("homepage.html.njk");
});

app.get("/get-name", (req, res) => {
  const { name } = req.query;
  req.session.userName = name;
  res.redirect("top-fossils");
  console.log(name);
});

app.get("/base", (req, res) => {
  res.render("base.html.njk");
});

app.post("/like-fossil", (req, res) => {
  const { selectedFossil } = req.body;
  req.body.selectedFossil = selectedFossil;
  console.log(selectedFossil);

  if (MOST_LIKED_FOSSILS[selectedFossil]) {
    MOST_LIKED_FOSSILS[selectedFossil].num_likes += 1;
  }
  res.render("thank-you.html.njk", {
    name: req.session.userName,
  });

  console.log(req.body.selectedFossil);
});
