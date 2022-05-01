import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import { Nota, listaNotas } from './nota';

@Info({ title: 'NotasContract', description: 'Smart contract para gestionar Notas' })
export class NotasContract extends Contract {

    @Transaction()
    public async iniciarLedger(ctx: Context) {
        const notas: Nota[] = listaNotas;

        for (let nota of notas) {
            nota.docType = 'nota';
            await ctx.stub.putState(nota.id, Buffer.from(stringify(sortKeysRecursive(nota))));
            console.info(`Nota ${nota.id} creada`);
        }
    }

    @Transaction()
    public async crearNota(ctx: Context, notaJson: string) {
        const nota: Nota = JSON.parse(notaJson);
        nota.docType = 'nota'

        const existe = await this.comprobarExistencia(ctx, nota.id);
        if (existe) throw new Error(`Ya existe una nota con id ${nota.id}`);

        await ctx.stub.putState(nota.id, Buffer.from(stringify(sortKeysRecursive(nota))));
        console.info(`Nota ${nota.id} creada`);
    }

    @Transaction()
    public async modificarNota(ctx: Context, notaJson: string) {
        const nota: Nota = JSON.parse(notaJson);
        nota.docType = 'nota'

        const existe = await this.comprobarExistencia(ctx, nota.id);
        if (!existe) throw new Error(`No existe una nota con id ${nota.id}`);

        await ctx.stub.putState(nota.id, Buffer.from(stringify(sortKeysRecursive(nota))));
        console.info(`Nota ${nota.id} modificada`);
    }

    @Transaction()
    public async eliminarNota(ctx: Context, id: string) {
        const existe = await this.comprobarExistencia(ctx, id);
        if (!existe) throw new Error(`No existe una nota con id ${id}`);

        await ctx.stub.deleteState(id);
        console.info(`Nota ${id} eliminada`);
    }

    @Transaction(false)
    @Returns('string')
    public async buscarNota(ctx: Context, id: string): Promise<string> {
        const bytes = await ctx.stub.getState(id);
        if (!bytes || bytes.length === 0) throw new Error(`Nota ${id} no existe`);

        console.log(bytes.toString());
        return bytes.toString();
    }

    @Transaction(false)
    @Returns('string')
    public async obtenerTodo(ctx: Context): Promise<string> {
        const notas = [];

        const iterator = await ctx.stub.getStateByRange('', '');
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

    @Transaction(false)
    @Returns('boolean')
    public async comprobarExistencia(ctx: Context, id: string): Promise<boolean> {
        const bytes = await ctx.stub.getState(id);
        return bytes && bytes.length > 0;
    }

}
