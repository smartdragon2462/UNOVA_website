import  products  from '../FakeDB/products_table';

const products1 = products;

const checkFilterIs = (params, product) => {
    var materialCheck = false;
    var SizeCheck     = false;
    var ShapeCheck    = false;
    if(params.material && params.material.size > 0)
    {
        if(params.material.has(product.material)) materialCheck = true;;
    } else {
        materialCheck = true;
    }
    if ( params.size && params.size.size > 0 )
    {
        if(params.size.has(product.size)) SizeCheck = true;;
    } else {
        SizeCheck = true;
    }
    if( params.shape && params.shape.size > 0)
    {
        if(params.shape.has(product.shape)) ShapeCheck = true;
    } else {
        ShapeCheck = true;
    }
    if(materialCheck==true && SizeCheck == true && ShapeCheck == true) return true;
    else return false;
}
const getProducts = (params) => {
    var resultProducts = [];
    if(params == null || params == "") return products1;
    if(params.material.size == 0 && params.size.size == 0 && params.shape.size == 0) return products1;
    for(var i = 0 ; i < products1.length;i++)
    {
        if(checkFilterIs(params, products1[i]) == true)
        {
            resultProducts.push(products1[i]);
        }
    }
    return resultProducts;
}

const getProductWithId = (id) => {
    console.log("sdfsdf");
    for(var i = 0; i < products.length; i++)
    {
        if(products[i].id == id) return products[i];
    }
    return null;
}

export { getProducts, getProductWithId};
