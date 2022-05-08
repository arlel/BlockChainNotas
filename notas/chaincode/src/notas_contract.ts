import { Context, Contract } from 'fabric-contract-api';
import { Nota, listaNotas } from './nota';

export class NotasContract extends Contract {

    public async iniciarLedger(ctx: Context) {
        const notas: Nota[] = listaNotas;

        for (let nota of notas) {
            await ctx.stub.putState(nota.id, Buffer.from(JSON.stringify(nota)));
            console.info(`Nota ${nota.id} creada`);
        }
    }

    public async crearNota(ctx: Context, notaJson: string) {
        const nota: Nota = JSON.parse(notaJson);

        const existe = await this.comprobarExistencia(ctx, nota.id);
        if (existe) throw new Error(`Ya existe una nota con id ${nota.id}`);

        await ctx.stub.putState(nota.id, Buffer.from(JSON.stringify(nota)));
        console.info(`Nota ${nota.id} creada`);
    }

    public async modificarNota(ctx: Context, notaJson: string) {
        const nota: Nota = JSON.parse(notaJson);

        const existe = await this.comprobarExistencia(ctx, nota.id);
        if (!existe) throw new Error(`No existe una nota con id ${nota.id}`);

        await ctx.stub.putState(nota.id, Buffer.from(JSON.stringify(nota)));
        console.info(`Nota ${nota.id} modificada`);
    }

    public async eliminarNota(ctx: Context, id: string) {
        const existe = await this.comprobarExistencia(ctx, id);
        if (!existe) throw new Error(`No existe una nota con id ${id}`);

        await ctx.stub.deleteState(id);
        console.info(`Nota ${id} eliminada`);
    }


    public async consultarNota(ctx: Context, id: string): Promise<string> {
        const bytes = await ctx.stub.getState(id);
        if (!bytes || bytes.length === 0) throw new Error(`Nota ${id} no existe`);

        console.log(bytes.toString());
        return bytes.toString();
    }


    private async obtenerConsulta(ctx: Context, consulta: string): Promise<string> {
        const notas = [];

        let iterator = await ctx.stub.getQueryResult(consulta);
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            notas.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(notas);
    }


    public async consultarPorLegajo(ctx: Context, legajo: string): Promise<string> {
        let consulta = { 'selector': { 'alumno': { 'legajo': parseInt(legajo) } } };
        return await this.obtenerConsulta(ctx, JSON.stringify(consulta));
    }


    private async comprobarExistencia(ctx: Context, id: string): Promise<boolean> {
        const bytes = await ctx.stub.getState(id);
        return bytes && bytes.length > 0;
    }

}
