export interface Listado {
  titulo: string;
  imagen: any;
  items: Item[];
}

export interface Item {
  unidades: number;
  item: string;
  precio: number;
}
