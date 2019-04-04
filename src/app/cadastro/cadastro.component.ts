import { Component, OnInit } from '@angular/core';
import { DespesaService } from '../service/despesa.service';
import { TipoDespesa } from '../model/tipoDespesa';
import { TipoDespesaService } from '../service/tipo-despesa.service';
import { Despesa } from '../model/despesa';
import { AnexoService } from '../service/anexo.service';
import { Anexo } from '../model/anexo';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public tiposDeDespesa: TipoDespesa[];
  public anexoUploaded: Anexo;
  despesaForm: FormGroup;

  constructor(
    private despesaService: DespesaService,
    private tipoDespesa: TipoDespesaService, 
    private anexoService: AnexoService) { }


  ngOnInit() {
    this.iniciarForm();
    this.tipoDespesa.listarTipos().subscribe(
      response => {
        this.tiposDeDespesa = response;
      }
    );
  }

  private iniciarForm() {
    this.despesaForm = new FormGroup({
      id: new FormControl(),
      descricao: new FormControl(),
      valor: new FormControl(),
      dataDespesa: new FormControl(),
      anexo: new FormControl(),
      tipoDespesa: new FormControl(),
    })
  }

  onSubmit(despesa: Despesa) {
    this.despesaService.salvar(despesa).subscribe(
      response => {

      },
      error => {
        console.log('aqui + ', error);
      }
    )
  }

  inputFile(event) {
    if(event.target.files && event.target.files[0]) {
      const anexo = event.target.files[0];
      const formData = new FormData();
      formData.append('anexo', anexo);
      
      this.anexoService.upload(formData).subscribe(
        response => {
          let labelAnexo = document.querySelector('.js-anexo');
          labelAnexo.textContent = 'Comprovamente anexado';
          this.anexoUploaded = response;
        }
      );
    }
  }
}
