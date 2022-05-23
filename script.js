// aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Constraint = Matter.Constraint,
    Body = Matter.Body,
    Bodies = Matter.Bodies

const engine = Engine.create()
const render = Render.create({
    element: document.body,
    engine: engine,
})

engine.world.gravity.y = 0.098//Gravity

/* ここにコードを追加していく */
var queryString = window.location.search;
var GET = new Object();
if(queryString){
  queryString = queryString.substring(1);
  var parameters = queryString.split('&');

  for (var i = 0; i < parameters.length; i++) {
    var element = parameters[i].split('=');

    var paramName = decodeURIComponent(element[0]);
    var paramValue = decodeURIComponent(element[1]);

    GET[paramName] = paramValue;
  }
}
console.log(GET)

var bones = []
var N=8
if ("N" in GET){
    if (1<=parseInt(GET["N"])){
        //console.log(parseInt(GET["N"]))
        N=parseInt(GET["N"])
    }
}
//console.log(N)

var dist=0
var length=400/(N+dist)//50
var Top=400
for (let i=0; i<N; i+=1){
    bones.push(
        Bodies.rectangle(i*(length+dist)+Top,50, length, 5,
        {
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0,
            dencity: -1,
            collisionFilter: -1,
            restitution: 1,
            Bounds: 1,
        })
    )
    World.add(engine.world, [bones[i]])
}

//0番目を固定
const anchor=Constraint.create({
    pointA: {x: length*-0.5,y: 0},
    bodyA: bones[0],
    pointB: {x: Top,y: 50},
    length: dist,
})
World.add(engine.world, anchor)

var anchors=[]
for (let i=1; i<N; i+=1){
    anchors.push(
        Constraint.create({
            pointA: {x: length*0.5,y: 0},
            bodyA: bones[i-1],
            pointB: {x: length*-0.5,y: 0},
            bodyB: bones[i],
            length: 2,           
        })
    )
    World.add(engine.world, anchors[i-1])
}

Engine.run(engine)
Render.run(render)
