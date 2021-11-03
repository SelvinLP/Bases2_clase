import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { AlertaResponse } from 'src/app/services/interfaces/alerta-response';
import { RankingBanksResponse } from 'src/app/services/interfaces/ranking-banks-response';
import { RequesterService } from 'src/app/services/requester.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-reporte2',
  templateUrl: './reporte2.component.html',
  styleUrls: ['./reporte2.component.css']
})
export class Reporte2Component implements OnInit {
  @ViewChild("chart") chart: ChartComponent = new ChartComponent();
  public chartOptions: Partial<ChartOptions> | any;

  private alerta: AlertaResponse = {
    bandera: false,
    mensaje: '',
    duracion: 0,
  };
  
  constructor(
    private appiService: RequesterService,
    private cookieService: CookieService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  set Alerta(al: AlertaResponse) {
    this.alerta.bandera = al.bandera;
    this.alerta.mensaje = al.mensaje;
    this.alerta.duracion = al.duracion;
  }
  get Alerta(): AlertaResponse {
    return this.alerta;
  }
  openSnackBar(msj: string) {
    this._snackBar.open(msj, 'Cerrar', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
  valoresGrafica(datos:RankingBanksResponse[]): void {
    console.log(datos);
    const tmp: { name: string; data: number[] }[]  = [];
    datos.forEach((e) => {
      tmp.push({
        name: e.name,
        data: [
          e.julio20,
          e.agosto20,
          e.septiembre20,
          e.octubre20,
          e.noviembre20,
          e.diciembre20,
          e.enero21,
          e.febrero21,
          e.marzo21,
          e.abril21,
          e.mayo21,
          e.junio21,
          e.julio21,
        ]
      })
    }
    );
    console.log(tmp);
    this.chartOptions = {
      series: tmp,
      chart: {
        height: 550,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: [
        "#77B6EA",
        "#545454",
        "#DB5656",
        "#BCDB56",
        "#9F56DB",
        "#56D3DB",
        "#806923",
        "#FF992E",
        "#64455A",
        "#797979",
        "#8C9153",
        "#539181",
        "#CD0000",
        "#4E39FF",
        "#73001F",
        "#E02BC0",
      ],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Ranking bancario Julio 2020 - Julio 2021",
        align: "left"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#E2E2E2", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ["Julio20", "Agosto20", "Sept20", "Oct20", "Nov20", "Dic20", "Enero21", "Feb21", "Mar21", "Abr21", "May21", "Jun21", "Julio21"],
        title: {
          text: "Mes"
        }
      },
      yaxis: {
        title: {
          text: "Posición"
        },
        min: 0,
        max: 15,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: false,
        offsetY: 0,
        offsetX: -0
      }
    };
  }

  getData(): void {
    this.appiService.ranking(this.cookieService.get('token'))
      .subscribe(res => {
        if (res.status === 'success' && res.data) {
          this.valoresGrafica(res.data);
          return;
        }
        console.log('algo')
        this.openSnackBar('Cod -' + (res.code || ' 100 » ') + (res.message || 'Algo salió muy mal, inténtalo de nuevo'));
      });
  }
}
