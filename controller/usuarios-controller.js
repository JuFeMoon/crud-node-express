const path = require('path');

let usuarios = [
    {
        email: 'us1@gmail.com',
        contrasena: '123',
        eliminado: false
    },
    {
        email: 'us2@gmail.com',
        contrasena: '1234',
        eliminado: true
    }
];

function dashboard(req,res) {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
}

function pantallaLogin(req,res) {
    res.sendFile(path.join(__dirname, '../public/html/login.html'));
}

function login(req,res) {
   try{
    let {email, contrasena} = req.body
    let usuarioEncontrado = null;

    for(let i = 0 ; i < usuarios.length ; i++){
        if(
            email == usuarios[i].email
            &&
            contrasena == usuarios[i].contrasena
        ){
            if(usuarios[i].eliminado){
                throw "El usuario se encuentra eliminado.";
            }
            usuarioEncontrado = usuarios[i];

            break
        }
    }

    if(!usuarioEncontrado){
        throw "Combinacion usuario contraseña incorrectos.";
    }

    console.log("inicio correcto");

    req.session.data = usuarioEncontrado;

    req.session.save();

    res.json({ok: true, message: "Inicio de sesion exitoso"});

   }catch(err){
    console.log(err);
    res.json({error: err});
   }
}

function logout(req, res){
    req.session.destroy(() => {
        console.log('Sesion destruida.');
        res.end('Ok');
    });
}

module.exports = {
    pantallaLogin,
    login,
    logout,
    dashboard
}