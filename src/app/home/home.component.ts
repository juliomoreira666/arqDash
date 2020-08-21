import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  arquivos: any;
  fileToUpload: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getArq();
  }
  getArq(): void {
    this.http
      .get(
        'http://pocuploadfiles-env.eba-g9e8mpfd.sa-east-1.elasticbeanstalk.com/'
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.arquivos = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  postMethod(files: FileList) {
    this.fileToUpload = files.item(0);
    let formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this.http
      .post(
        'http://pocuploadfiles-env.eba-g9e8mpfd.sa-east-1.elasticbeanstalk.com/',
        formData,
        this.httpOptions
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.getArq();
          this.showSuccess();
        },
        (error) => {
          console.log(error);
        }
      );
    return false;
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Arquivo Enviado!',
      detail: 'Lista Atualizada',
    });
  }
}
