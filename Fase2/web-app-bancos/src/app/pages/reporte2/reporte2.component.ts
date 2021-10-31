import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { AlertaResponse } from 'src/app/services/interfaces/alerta-response';
import { RankingBanksResponse } from 'src/app/services/interfaces/ranking-banks-response';
import { RequesterService } from 'src/app/services/requester.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-reporte2',
  templateUrl: './reporte2.component.html',
  styleUrls: ['./reporte2.component.css']
})
export class Reporte2Component implements OnInit {

  private alerta:AlertaResponse = {
    bandera: false,
    mensaje: '',
    duracion: 0,
  };
  private rankingBank: RankingBanksResponse[] = [];
  private dataSource = new MatTableDataSource(this.rankingBank);
  private displayedColumns: string[] = ['name',
  'julio20',
  'agosto20',
  'septiembre20',
  'octubre20',
  'noviembre20',
  'diciembre20',
  'enero21',
  'febrero21',
  'marzo21',
  'abril21',
  'mayo21',
  'junio21',
  'julio21'];
  get DisplayedColumns():string[] {
    return this.displayedColumns;
  }
  get DataSource():MatTableDataSource<any> {
    return this.dataSource;
  }
  constructor(
    private appiService: RequesterService,
    private cookieService: CookieService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  set Alerta(al:AlertaResponse) {
    this.alerta.bandera = al.bandera;
    this.alerta.mensaje = al.mensaje;
    this.alerta.duracion = al.duracion;
  }
  get Alerta():AlertaResponse {
    return this.alerta;
  }
  openSnackBar(msj:string) {
    this._snackBar.open(msj, 'Cerrar', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  getData(): void {
    this.appiService.ranking(this.cookieService.get('token'))
    .subscribe(res => {
      if (res.status === 'success' && res.data) {
        this.rankingBank = res.data;
        console.log(this.rankingBank);
        this.dataSource = new MatTableDataSource(this.rankingBank);
        return;
      }
      console.log('algo')
      this.openSnackBar('Cod -' + ( res.code || ' 100 » ') + (res.message || 'Algo salió muy mal, inténtalo de nuevo'));
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
