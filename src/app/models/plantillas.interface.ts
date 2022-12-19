import { Usuario } from './auth.interface';

export interface Plantilla {
  id?: number;
  nombreArchivo: string;
  firma?: string;
  tipo: string;
  datos: string;
  usuario?: Usuario;
}
