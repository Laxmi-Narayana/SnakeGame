function snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
  
    this.total = 0;
    this.tail = []; 
    
    this.dir = function(x,y) {
      this.xspeed = x;
      this.yspeed = y;
    }
  
    this.death = function() {
      for(var i=0;i<this.tail.length;i++) {
        var pos = this.tail[i];
        var d = dist(this.x,this.y,pos.x,pos.y);
        if(d<1)
        {
          this.total = 0;
          this.tail = []
        }
      }
    }
    
    this.update = function() { 
      for(var i=0;i<this.tail.length-1;i++)
      {
        this.tail[i] = this.tail[i+1];
      }
      this.tail[this.total-1] = one1.createVector(this.x,this.y,scl,scl,10);
  
      this.x += this.xspeed*scl;
      this.y += this.yspeed*scl;
      
      this.x = constrain(this.x,0,width-scl);
      this.y = constrain(this.y,0,height-scl);
    }
      
    this.show = function() {
      fill(200);
      for(var i=0;i<this.total;i++) {
        rect(this.tail[i].x,this.tail[i].y,scl,scl,10);  
      }
      fill(200);
      image(bg,this.x,this.y,scl,scl);
    }
    
    this.eat = function(pos) {
      var d = dist(this.x,this.y,pos.x,pos.y);
      if(d<1) {
        this.total++;
        return true;
      }
      else return false;   
    }
  }