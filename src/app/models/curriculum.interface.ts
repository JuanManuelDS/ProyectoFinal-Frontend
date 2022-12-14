export interface Curriculum {
  datos: Datos;
}

export interface Datos {
  nombre: string;
  ciudad: string;
  nacimiento: string;
  telefono: string;
  email: string;
  presentacion: string;
  imagen: any;
}

export interface Experiencia {
  empresa: string;
  localidad: string;
  descripcion: string;
  inicio: string;
  fin: string;
}

export interface Estudio {
  year: string;
  titulo: string;
  establecimiento: string;
  descripcion: string;
}

export interface Conocimiento {
  conocimiento: string;
}

export interface Idioma {
  idioma: string;
  escrito: string;
  oral: string;
}

export interface DatosInteres {
  dato: string;
}
