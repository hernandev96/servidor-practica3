import createExpress from 'express';
import {db_users} from './bd/bbdd.js';
import cors from 'cors';
import morgan from 'morgan';
const server=createExpress();
const CORS=cors();
var database_users=db_users;
/**Settings */
server.set('port','3000');



/**Middlewares */
server.use(CORS);
server.use(createExpress.json());
server.use(createExpress.text());
server.use(morgan('dev'));
server.use(createExpress.json());





/* API REST */
server.get('/usuario/:id',(req,res)=>{
    const {id}=req.params;
    const user=database_users.find((user)=>user.id==id);
    if(!user){
        res.status(404).send();
    }
    else{
        res.send(user);
    }
});

server.get('/usuarios',(req,res)=>{
    console.log("Se solicitaron todos los usuarios ");
    res.send(database_users);
});

server.post('/usuario/add/user',(req,res)=>{
    var user=req.body;
    
    var aux={
        'id':0,
        'status':'ok'
    }
    try{
        var userObject=JSON.parse(user);
        userObject.id=database_users.length+1;
        console.log(database_users.push(userObject));
        console.log(database_users);
        res.send(JSON.stringify(aux));
        console.log("Se guardo de manera correcta en la base de datos el usuario");
    }catch(error){
        res.send({
            'id':0,
            'status':'error'
        });
    }
    
});

server.delete('/usuario/delete/:id',(req,res)=>{
    console.log(req.params);
    const identificador=req.params.id;
    console.log(typeof(identificador)+' Ese es el tipo del id: '+identificador);
    var indice=0;
    var aux=[];
    var estado={
        status:"ok"
    };
    var encontrado=false;
    for(var i=0;i<database_users.length;i++){
        if(database_users[i].id==identificador){
            indice=i;
            console.log("Index encontrado: "+indice);
            encontrado=true;
        }else{
            aux.push(database_users[i]);
        }
    }
    database_users=aux;
    console.table(database_users);
    if(encontrado){
       
        res.send(estado);
    }else{
        estado.status="error";
        res.send(estado);
    }
    
});

server.put('/usuario/update',(req,res)=>{
    var user=req.body;
    var userObject=JSON.parse(user);
    var encontrado=false;
    var aux={
        'id':0,
        'status':'ok'
    }
    var index=0;
    for(var i=0;i<database_users.length;i++){
        if(database_users[i].id==userObject.id){
            index=i;
            encontrado=true;
            break;
        }
    }
    console.log(database_users);
    if(encontrado){
        database_users[index]=userObject;
        console.table(database_users);
        res.send(JSON.stringify(aux));
    }else{
        res.status(400).send();
    }
    
});


/*  */
server.use(createExpress.static('static'));
server.listen(server.get('port'),()=>{
    console.log("El servidor se puso en marcha a la espera de peticiones");
});




