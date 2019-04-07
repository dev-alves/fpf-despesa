import { Component, OnInit } from '@angular/core';
import { DespesaService } from '../service/despesa.service';
import { TipoDespesa } from '../model/tipoDespesa';
import { TipoDespesaService } from '../service/tipo-despesa.service';
import { Despesa } from '../model/despesa';
import { AnexoService } from '../service/anexo.service';
import { Anexo } from '../model/anexo';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public tiposDeDespesa: TipoDespesa[];
  public anexoUploaded: Anexo;
  formGroup: FormGroup;
  public mensagemValidators: Object[] = new Array();
  public mensagemSucesso: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private despesaService: DespesaService,
    private tipoDespesaService: TipoDespesaService, 
    private anexoService: AnexoService) { }


  ngOnInit() {
    this.iniciarForm();
    this.tipoDespesaService.listarTipos().subscribe(
      response => {
        this.tiposDeDespesa = response;
      }
    );
  }

  private iniciarForm() {
    this.formGroup = this.formBuilder.group({
      id: null,
      descricao: null,
      tipoDespesa: null,
      valorDespesa: null,
      dataDespesa: null,
    });
  }

  onSubmit(despesa: Despesa) {
    if(this.anexoUploaded !== undefined) {
      if(this.anexoUploaded.nome){
        despesa.anexo = this.anexoUploaded.nome;
      }
    }
    
    this.despesaService.salvar(despesa).subscribe(
      response => {
       if(response !== null) {
         if(response.status === 400){
           this.mensagemSucesso = false;
           this.mensagemValidators = new Array();
           response.error.forEach(element => {
             this.mensagemValidators.push({
               mensagem: element.defaultMessage,
               field: element.field
             });
          });
         }
      } else {
        this.mensagemLabelComprovante('Anexar comprovante');
        this.formGroup.reset();
        this.fecharMensagensDeErro();
        this.mensagemSucesso = true;
      }
      },
      error => {
        console.log(error);
      }
    )
  }
  
  fecharMensagemSucesso() {
    this.mensagemSucesso = false;
  }

  fecharMensagensDeErro() {
    this.mensagemValidators = new Array();
  }

  inputFile(event) {
    if(event.target.files && event.target.files[0]) {
      const anexo = event.target.files[0];
      const formData = new FormData();

      formData.append('anexo', anexo);
      
      this.anexoService.upload(formData).subscribe(
        response => {
          this.mensagemLabelComprovante('Comprovamente anexado');
          this.anexoUploaded = new Anexo();
          this.anexoUploaded.nome = response.nome;
        }
      );
    }
  }

  mensagemLabelComprovante(msg: string) {
    let labelAnexo = document.querySelector('.js-anexo');
    labelAnexo.textContent = msg;
  }
}
