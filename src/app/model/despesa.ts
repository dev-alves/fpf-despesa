import { TipoDespesa } from "./tipoDespesa";
import { Anexo } from "./anexo";

export class Despesa {
    
    public id;
    public descricao;
    public valor;
    public dataDespesa;
    public anexo: Anexo;
    public tipoDespesa: TipoDespesa
    
}
