var c=0,c1 = 0;
function setone() {
    c1=1;
    document.getElementById("cc").classList.add('bbox1');
    document.getElementById("cc").classList.remove('bbox');
    
    document.getElementById("classic").innerHTML = "disabled";
    document.getElementById("maze").innerHTML = "disabled";
    document.getElementById("demo").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you have choosen classic game";
    
    document.getElementById("classic").disabled = true;
    document.getElementById("maze").disabled = true;
    console.log("in setone");
    c = 1;
}
function setzero() {
    document.getElementById("cc").classList.add('bbox');
    document.getElementById("cc").classList.remove('bbox1');
    document.getElementById("classic").innerHTML = "disabled";
    document.getElementById("maze").innerHTML = "disabled";
    document.getElementById("demo").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you have choosen maze game";
    document.getElementById("maze").disabled = true;
    document.getElementById("classic").disabled = true;
    console.log("in setzero");
    c1=1;
    c = 0;
}
window.onload = function() {
    var score=0,lives=2;
    var final=0;
    var one1 = function(one) {
        var fire , fear , sahoo;
        one.setup = function() {
            one.createCanvas(400,50);
        }
        one.preload = function() {
            fire = one.loadImage("fire.png");
            fear = one.loadImage("fear.jpg");
            sound = one.loadSound("sound88.wav");
            sahoo = one.loadImage("s.jpeg");
        };
        one.draw = function() {
            one.background(155);
            one.textSize(20);
            one.text("prevScore: "+final,30,30);
            one.text("Score: "+score,180,30);
            one.text("lives: "+lives,30+270,30);
            if(lives==0) {
                one.background(sahoo);
                one.text("prevScore: "+final,260,30);
                if(c==0)
                one.text("HScore: "+localStorage.getItem('hscore'),30,30);
                else if(c==1)
                one.text("HScore: "+localStorage.getItem('hscore1'),30,30);
                one.noLoop();
            }
            
        };
    }
    var two2 = function(two) {
        var food,s,scl=20,food1;
        var sound,fire,fear,prev,sahoo;
        var temp=0;
        two.preload = function() {
            fire = two.loadImage("fire.png");
            fear = two.loadImage("fear.jpg");
            sound = two.loadSound("sound88.wav");
            sahoo = two.loadImage("s.jpeg");
            food1 = two.loadImage("food.jpeg")
        }

        two.draw = function() {
            two.background(sahoo);
            s.death();
            s.update();
            s.show();
            if(s.eat(food)) {
                sound.play();
                two.pickLocation();
            }
            two.image(food1,food.x,food.y,scl,scl);
            var d1 = 0;
            for(var i=0;i<s.tail.length;i++) {
                var pos1 = s.tail[i];
                var d1 = two.dist(food.x,food.y,pos1.x,pos1.y);
                if(d1<1)
                {
                    console.log("found...");
                    //two.background(sahoo);
                    two.background(sahoo);
                    s.death();
                    s.update();
                    s.show();
                    if(s.eat(food)) {
                        sound.play();
                        two.pickLocation();
                    }
                    two.image(food1,food.x,food.y,scl,scl);
                    two.pickLocation();
                    break;
                }
            }
            if(lives==0) {
                two.background(fire);    
                two.noLoop();
            }
        }
        // two.mousePressed = function() {
        //     s.total++; //increases snake length
        // }
        two.snake = function() {
            this.x =0;
            this.y =0;
            this.total = 0;
            temp = 0;
            this.tail = [];

            this.xspeed= 0;
            this.yspeed= 0;

            this.dir = function(x,y) {
                this.xspeed = x;
                this.yspeed = y;
            }

            this.death = function() {
                for(var i=0;i<this.tail.length;i++) {
                  var pos = this.tail[i];
                  var d = two.dist(this.x,this.y,pos.x,pos.y);
                  if(d<1)
                  {
                    lives--;
                    final = this.total;
                    if(localStorage.getItem('hscore')!='undefined' || localStorage.getItem('hscore1')!='undefined')
                    {
                        var hs = localStorage.getItem('hscore');
                        var hs1 = localStorage.getItem('hscore1');
                    }
                    if(c==0) {
                        if(hs<final)
                        localStorage.setItem("hscore", final);
                    }
                    else if(c==1){
                        if(hs1<final)
                        localStorage.setItem("hscore1", final);
                    }
                    this.total = 0;
                    temp = this.total+1;
                    this.tail = []
                  }
                }
            }
            this.arr = function() {
                if(this.x<0) {
                    this.x = two.width-scl;
                }
                if(this.y<0) {
                    this.y = two.height-scl;
                }
                this.x %= (two.width);
                this.y %= (two.height);
            }
            this.update = function() {
                for(var i=0;i<this.tail.length-1;i++)
                {
                    this.tail[i] = this.tail[i+1];
                }
                this.tail[this.total-1] = two.createVector(this.x,this.y,scl,scl,10);
                this.x += this.xspeed*scl;
                this.y += this.yspeed*scl;
                
                if(c==1)
                this.arr();
                this.x = two.constrain(this.x,0,two.width-scl);
                this.y = two.constrain(this.y,0,two.height-scl);
                
            }

            this.show = function() {
                two.fill(200);
                for(var i=0;i<this.total;i++) {
                    two.rect(this.tail[i].x,this.tail[i].y,scl,scl,10);  
                }
                two.fill(200);
                two.image(fear,this.x,this.y,scl,scl);
                score = this.total;
            }
            
            this.eat = function(pos) {
                var d = two.dist(this.x,this.y,pos.x,pos.y);
                if(d<1) {
                  this.total++;
                  temp = this.total;
                  return true;
                }
                else return false;   
            }
            
        }
        two.pickLocation = function() {
            var cols = two.floor(two.width/scl); 
            var rows = two.floor(two.height/scl);
            food = two.createVector(two.floor(two.random(rows)),two.floor(two.random(cols)));
            food.mult(scl);
        }
        
        two.setup = function() {
            two.createCanvas(400,400);
            s = new two.snake();
            two.frameRate(10);
            two.pickLocation();
        }
        
        two.keyPressed = function() {
            if(c1==1)
            if(two.keyCode === two.UP_ARROW)
            {
                if(prev!="down" || temp==0)
                {

                prev = "up";
                s.dir(0,-1);
                }
            }
            else if(two.keyCode === two.DOWN_ARROW)
            {
                if(prev!="up" || temp==0) {
                prev = "down";
                s.dir(0,1);
                }
            }
            else if(two.keyCode === two.RIGHT_ARROW)
            {
                if(prev!="left" || temp==0) {
                prev = "right";
                s.dir(1,0);
                }
            }
            else if(two.keyCode === two.LEFT_ARROW)
            {
                if(prev!="right" || temp==0) {
                prev = "left";
                s.dir(-1,0);
                }
            }
        }
    } 
    var first = new p5(one1,'one1');
    var second = new p5(two2,'two2');
}