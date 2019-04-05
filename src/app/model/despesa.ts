import { TipoDespesa } from "./tipoDespesa";
import { Anexo } from "./anexo";

export class Despesa {
    
    public id: number;
    public descricao: string;
    public valorDespesa: number;
    public dataDespesa: Date;
    public anexo: Anexo;
    public tipoDespesa: TipoDespesa
    
}
