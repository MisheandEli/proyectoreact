export interface IPerson {
    id?: number | null,
    nombre: string,
    apellido: string,
    direccion: string,
    telefono: number,
    correo: string,
    createdAt: Date | null,
    updatedAt: Date | null
}

export class Person implements IPerson {
    public id: null; 
    public nombre: string;
    public apellido: string;
    public direccion: string;
    public telefono: number;
    public correo: string;
    public createdAt!: Date | null;
    public updatedAt!: Date | null;
    // public name: string;
    // public address: string;
    // public phone: number; 
    // public createdAt!: Date | null;
    // public updatedAt!: Date | null;

    constructor(){
        this.id = null; 
        this.nombre = "";
        this.apellido = "";
        this.direccion = "";
        this.telefono = 0; 
        this.correo = "";
        this.createdAt = null;
        this.updatedAt = null;
    }
}

// export const { setData, setPersons } = personSlice.actions

// export default personSlice.reducer