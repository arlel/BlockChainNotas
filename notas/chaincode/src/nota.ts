export class Nota {
    public id: string;
    public nota: number;
    public fecha: number;
    public alumno: Alumno;
    public instancia: Instancia;
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
        fecha: 1651372465,
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
        fecha: 1651372465,
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