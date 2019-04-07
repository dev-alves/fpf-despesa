import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DespesaService } from '../service/despesa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoDespesa } from '../model/tipoDespesa';
import { TipoDespesaService } from '../service/tipo-despesa.service';
import { Despesa } from '../model/despesa';
import { AnexoService } from '../service/anexo.service';
import { Anexo } from '../model/anexo';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  
  anexoUploaded: Anexo;
  mensagemLabel: string;
  formGroup: FormGroup;
  selectTipoDespesa: TipoDespesa;
  tiposDeDespesa: TipoDespesa[];
  mensagemSucesso: boolean = false;
  mensagemValidators: Object[] = new Array();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private despesaService: DespesaService,
    private tipoDespesaService: TipoDespesaService,
    private anexoService: AnexoService,
  ) {}

  ngOnInit() {
    this.tipoDespesaService.listarTipos().subscribe(
      response => {
        this.tiposDeDespesa = response;
      }
    );
    
    const despesa = this.route.snapshot.data['despesa'];
    this.mensagemLabelComprovante(despesa.anexo !== null ? despesa.anexo : 'Adicionar anexo');

    this.selectTipoDespesa = despesa.tipoDespesa;
    this.formGroup = this.formBuilder.group({
      id: [despesa.id],
      descricao: [despesa.descricao],
      tipoDespesa: null,
      valorDespesa: [despesa.valorDespesa],
      dataDespesa: [despesa.dataDespesa],
    });
  }

  onSubmit(despesa: Despesa) {
    if(this.anexoUploaded !== undefined) {
      if(this.anexoUploaded.nome){
        despesa.anexo = this.anexoUploaded.nome;
      }
    }
    
    this.despesaService.editar(despesa).subscribe(
      response => {
        console.log('response => ', response !== null);
        if(response !== null) {
          if(response.status === 400) {
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
          if(this.mensagemValidators.length > 0) {
            this.fecharMensagensDeErro();
          }
          this.mensagemSucesso = true;
          setTimeout(()=> {
            this.router.navigate(['']);
          }, 2000)
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  mensagemLabelComprovante(msg: string) {
    let labelAnexo = document.querySelector('.js-anexo');
    labelAnexo.textContent = msg;
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
          this.mensagemLabelComprovante('Comprovante anexado');
          this.anexoUploaded = new Anexo();
          this.anexoUploaded.nome = response.nome;
        }
      );
    }
  }

}
