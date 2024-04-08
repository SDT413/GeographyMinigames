import {useEffect, useState} from "react";
import {IProduct} from "@/components/interfaces/Product.interface";
import ProductsService from "@/api/Products.service";

export const useProductGallery = (productId: number) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        const getProducts = async () => {
            const products = await ProductsService.getAllProducts() as IProduct[];
            setProducts(products);
        };
        getProducts().then(r => console.log(r));
    }, []);
    const nextProduct = products.find(product => product.id === productId + 1)?.slug;
    const prevProduct = products.find(product => product.id === productId - 1)?.slug;
    return {
        nextProduct,
        prevProduct
    }
}