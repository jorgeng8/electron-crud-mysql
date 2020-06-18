const productForm=document.getElementById('productForm')
//proceso app.js que se llama desde el html 
const {remote } = require('electron')

const main=remote.require('./main.js')


const productName=document.getElementById('name')
const productPrice=document.getElementById('price')
const productDescription=document.getElementById('description')
const productsList =document.getElementById('products')

let products=[]
let editStatus=false // cuando se presiona el boton editar cambia a true y despues cuando se guarda actualiza el registro en vez de crear uno nuevo 
let editProductId=''//string vacio

productForm.addEventListener('submit',async (e)=>{
    e.preventDefault();//cancelar el evento por defecto de refrescar la pagina
    //console.log(productName.value)
    //console.log(productPrice.value)
    //console.log(productDescription.value)
    const newProduct={
    name:productName.value,
    price:productPrice.value,
    description:productDescription.value
    }
    if (!editStatus) {//si no va a editar
        const result= await main.createProduct(newProduct);//crea un nuevo registro
    console.log(result)
    }else{
        await main.updateProduct(editProductId, newProduct)//updatea el registro
        editStatus=false // cuando se presiona el boton editar cambia a true y despues cuando se guarda actualiza el registro en vez de crear uno nuevo 
        editProductId=''//string vacio
    }
    

    productForm.reset();//reinicia los formularios
    productName.focus();//enfoca el cursor

    getProducts();
})

async function deleteProduct(id){

    const respuesta=confirm('estas seguro de querer borrar esto?')
    if (respuesta) {
        await main.deleteProductFun(id);//llama de main.js la funcion
        await getProducts();//vuelve a llamar los productos que estan en la base de datos
    }
    return;
}

async function editProduct(id){

    const product= await main.getProductById(id)
    productName.value=product.name
    productPrice.value=product.price
    productDescription.value=product.description//se llena los datos al formulario
    editStatus=true
    editProductId=product.id;
}

function renderProducts(products){
    productsList.innerHTML="";
    products.forEach(product => {
        productsList.innerHTML +=
        '<div class="card card-body my-2" animated fadeInLeft>'+
        '<h4>'+product.name+'</h4>'+
        '<p>'+product.description+'</p>'+
        '<p>'+product.price+'</p>'+
        '<h3>'+product.price+'</h3>'+
        '<p><button class="btn btn-danger" onclick="deleteProduct('+product.id +')">'+

        'DELETE</button><button class="btn btn-secondary" onclick="editProduct('+product.id +')">'+'EDIT</button></p>'+
        '</div>';
            //productsList.innerHTML +='<div>${product.name}</div>'; //no funciona?
        
    });
}

const getProducts = async () => {
    products=await main.getProducts();
    renderProducts(products); //renderiza los productos cuando inicia la aplicacion
}

async function init(){
    await getProducts();
}

init();