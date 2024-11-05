import { Producto } from "./Producto";

export interface RespuestaProducto{
    products: Producto[];
    total: number;
    skip: number | null ;
    limit: number;

}