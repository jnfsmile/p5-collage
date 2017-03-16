const Photo = function(props) {
  // coordinates
  this.x = props.x;
  this.y = props.y;
  // size
  this.w = props.w;
  this.l = props.l;
  //rotation
  this.ang = props.ang;
  // p5Image object
  this.img = props.img;

  this.show = function(p=1) {
    translate(this.x+this.w/2, this.y+this.l/2);
    rotate(this.ang);
    image(this.img, -this.w, -this.l, this.w*p, this.l*p);
    rotate(-(this.ang));
    translate(-(this.x+this.w/2), -(this.y+this.l/2));
  }
}
