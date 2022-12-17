export interface Cartarestaurant {
    nombre: string;
    imagen: any;
    secciones: Seccion[];
    menus: Menu[];
}

export interface Seccion {
    nombre: string;
    imagen: any;
    platos: Plato[];
}

export interface Menu {
    nombre: string;
    imagen: any;
    precioMenu: number;
    platos: Plato[];
}

export interface Plato {
    nombre: string;
    descripcion: string;
    precio: number;
}
