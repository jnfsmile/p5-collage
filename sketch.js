// Photo object to set to collage
let photos = [];
// Loaded images
let images = [];

let counter = 0;
let pct = 0;

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function preload() {
  //images preset from "https://source.unsplash.com/random/200x150"
  let sources = [
    "https://images.unsplash.com/photo-1483737489035-78c01af155f1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=150&fit=crop&s=c26af713172d77061987eb83125756ed",
    "https://images.unsplash.com/uploads/1411156081190e9e751d9/c81ee291?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=150&fit=crop&s=f83903e0cd48d9768402847b36a3ba6c",
    "https://images.unsplash.com/photo-1449748872761-84c7fa2a03e6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=150&fit=crop&s=f307eaf2e2a6bafa810a4f7fe8afe3a1",
    "https://images.unsplash.com/photo-1485819665514-881a8f294f7a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=150&fit=crop&s=a14dfc044338c2210090475390bc3a83",
    "https://images.unsplash.com/photo-1476127424785-8bc850aa6e78?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=150&fit=crop&s=ab9a75251f1fabae7933e43ceb9a5054",
    "https://images.unsplash.com/photo-1483470668053-3d97462011ec?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=150&fit=crop&s=61716cdf597091ad2231696c358f9a2e",
    "https://images.unsplash.com/photo-1487261511427-8f04f406509f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=150&fit=crop&s=8f32f970f050e120012f6bf2b7ad864d",
    "https://images.unsplash.com/photo-1473172707857-f9e276582ab6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=150&fit=crop&s=b2085d459389dfba6c787b911ffe15f2",
    "https://images.unsplash.com/photo-1476051764882-bfd14358a86b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=150&fit=crop&s=c4306564974b9d9d50d76b3fde339881",
    "https://images.unsplash.com/photo-1421936313568-ca9e56e27034?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=150&fit=crop&s=80b4ac1678d61986cbcfe938492fcf47",
    "https://images.unsplash.com/photo-1455154165865-492770ef7232?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=150&fit=crop&s=ae24c41cfe35472cebecd6437127c967"
  ]
  // loading a large number of images
  for (let i=0 ; i < sources.length*8 ; i++) {
    loadImage(sources[i%sources.length], p => images[i]=p, e => console.log(e) );
  }
}

function setup() {
  createCanvas(400, 400);
  noStroke();

  // transform loaded images into Photo objects with random location on canvas
  let intRand = (i, j) => Math.trunc(random(i, j));
  for (let i=0 ; i < images.length ; i++) {
    let p = images[i];
    let ptn = (width/4)/p.width;
    photos.push(new Photo({x: random(width), y: random(height), w: p.width*ptn, l: p.height*ptn, ang: random(-PI/3,PI/3), img: p}));
  }
}

function draw() {
  if (counter >= photos.length) return;

  background(44,255,44);
  // show photos previously added
  for (let i=0 ; i<counter ; i++)
  {
    let photo = photos[i];
    photo.show();
  }

  const photo = photos[counter];

  //draw current new photo, decreasing it's size each step
  photo.show(map(pct, 0, 100, 3, 1));

  pct+=15;
  if (pct>=100) {
    pct = 1;
    counter++;
  }
}
