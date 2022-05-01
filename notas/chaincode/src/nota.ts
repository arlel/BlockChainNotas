import { Property, Object } from "fabric-contract-api";
@Object()
export class Nota {
    @Property()
    public docType?: string;

    @Property()
    public id: string;

    @Property()
    public nota: number;

    @Property()
    public fecha: number;

    @Property()
    public alumno: Alumno;

    @Property()
    public instancia: Instancia;

    @Property()
    public observaciones: string;
}

export class Alumno {
    public legajo: number;
    public nombre: string;
    public apellido: string;
    public añoCursado: number;
}

export class Instancia {
    nombre: string;
    identificador: number;
}


export const listaNotas = [
    {
        id: 'NOTA-1',
        nota: 7,
        fecha: Date.now(),
        alumno: {
            legajo: 1234,
            nombre: 'Juan',
            apellido: 'Perez',
            añoCursado: 2022,
        },
        instancia: {
            nombre: 'Parcial',
            identificador: 1,
        },
        observaciones: 'Bien'
    },
    {
        id: 'NOTA-2',
        nota: 10,
        fecha: Date.now(),
        alumno: {
            legajo: 5678,
            nombre: 'María',
            apellido: 'Fernández',
            añoCursado: 2022,
        },
        instancia: {
            nombre: 'Parcial',
            identificador: 1,
        },
        observaciones: 'Excelente'
    }
];