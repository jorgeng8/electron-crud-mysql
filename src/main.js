const {BrowserWindow, Notification} = require('electron')
const {getConnection} = require('./database')
// el proceso principal es para resalizar tareas que requieran el sistema operativo como la base de datos
async function createProduct(product){ //tiene que poner async para que funcione await
    
    try {
        const conn = await getConnection();
    product.price = parseFloat(product.price)
    const result = await conn.query('INSERT INTO product SET ?', product) // se pone await xq es asincrono
    //console.log(result)

    new Notification({
        title:'electron mysql',
        body:'new product saved succesfully'
    }).show();//hay que configurar el sistema operativo

    product.id = result.insertId;
    return product;

    } catch (error) {
        console.log(error)
    }
}

async function getProducts(){
    const conn= await getConnection();
    const results= await conn.query('SELECT * FROM product ORDER BY id DESC')
    console.log(results)
    return results
}


async function deleteProductFun(id){
    
    const conn= await getConnection();
    const results=await conn.query('DELETE FROM product WHERE id=?', id);
    console.log(results);
    return results
}

async function getProductById(id){
    const conn= await getConnection();
    const results=await conn.query('SELECT * FROM product WHERE id=?', id);
    console.log(results);
    return results[0]//se guarda todos los datos del regist del id
}

async function updateProduct(id, product){
    const conn= await getConnection();
    const results=await conn.query('UPDATE product SET ? WHERE id=?', [product, id]);
    console.log(results);
    //return results[0]//se guarda todos los datos del regist del id
}

let window

function createWindow(){
    window = new BrowserWindow({ //ventana
        width: 800,
        height:600,
        webPreferences:{
            nodeIntegration:true //permite importar modulos de node en la ventana
        }
    })
    window.loadFile('src/ui/index.html')
}

module.exports={
    createWindow,
    createProduct,
    getProducts,
    deleteProductFun,
    getProductById,
    updateProduct
}

//https://www.youtube.com/watch?v=0h2LBY5M8y4 tutorial de aqui