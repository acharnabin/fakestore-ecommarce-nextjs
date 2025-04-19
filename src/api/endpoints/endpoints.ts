
export const BASE_URL="https://fakestoreapi.com"

export const endpoints={
    products:{
        list:"/products",
        details:(id:number)=>`/products/${id}`,
        category:"/products/categories",
        categoryProducts:(cat:string)=>`products/category/${cat}`
    },
    auth:{
        login:"auth/login"
    }
}

