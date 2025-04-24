import { Component, OnInit } from '@angular/core';
import { PlayerService }         from '../services/player.service';
import { HealthRecordService }   from '../services/health-record.service';
import { InjuryService }         from '../services/injury.service';
import { RecoveryPlanService }   from '../services/recovery-plan.service';

import { Player }        from '../models/player';
import { HealthRecord }  from '../models/HealthRecord';
import { Injury }        from '../models/injury';
import { RecoveryPlan }  from '../models/recoveryplan';
import { EChartsOption } from 'echarts';




@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css'],

})
export class StatistiqueComponent implements OnInit {

  /* ─────────── DATA ─────────── */
  currentSection = 'bio';
  players:  Player[] = [];
  selectedPlayer: Player|null = null;
  showPlayerList   = false;

  selectedHealthRecord: HealthRecord|null = null;
  injuries: Injury[] = [];
  injuryHistory: Injury[] = [];
  showInjuryHistory = false;

  recoveryPlans: RecoveryPlan[] = [];

  /* ───── KPIs & filtres ───── */
  avgProgress = 0;
  avgDuration = 0;
  activeCount = 0;
  doneCount   = 0;
  planTypeGroups: {type:string;count:number}[] = [];
  selectedTypes = new Set<string>();

  /* ───── Mini‑bar & combo chart ───── */
  barOpts:   EChartsOption = {};
  comboOpts: EChartsOption = {};          // ← sera rempli plus tard

  /* ───── Radar & pie chart ───── */
  radarOpts: EChartsOption = {};
  pieOpts:   EChartsOption = {};
  lineOpts:  EChartsOption = {};

  constructor(
    private playerService:   PlayerService,
    private healthService:   HealthRecordService,
    private injuryService:   InjuryService,
    private recoveryService: RecoveryPlanService ) {}

  /* ============ INIT ============ */
  ngOnInit(){ this.getAllPlayers(); }

  /* ============ NAVIGATION ============ */
  toggleSection(sec:string){
    this.currentSection = sec;
    this.showPlayerList = false;
    if(!this.selectedPlayer) return;
    const id = this.selectedPlayer.id;
    if(sec==='attributes') this.loadHealthRecord(id);
    if(sec==='icon')       { this.loadInjuries(id); this.loadArchivedInjuries(id); }
    if(sec==='traits')     this.loadRecoveryPlans(id);
  }

  /* ============ CRUD DATA ============ */
  private getAllPlayers(){
    this.playerService.getPlayers().subscribe({
      next:d=>{ this.players=d; if(!this.selectedPlayer&&d.length) this.selectPlayer(d[0]); },
      error:e=>console.error(e)
    });
  }

  togglePlayerList(){ this.showPlayerList=!this.showPlayerList; }

  selectPlayer(p:Player){
    this.selectedPlayer=p; this.showPlayerList=false;
    this.loadHealthRecord(p.id);
    this.loadInjuries(p.id);   this.loadArchivedInjuries(p.id);
    this.loadRecoveryPlans(p.id);
  }

  private loadHealthRecord(id:number){
    this.healthService.getHealthRecordById(id).subscribe({
      next:hr=>this.selectedHealthRecord=hr,
      error: ()=>this.selectedHealthRecord=null
    });
  }

  private loadInjuries(id:number){
    this.injuryService.getInjuriesByPlayerId(id).subscribe({
      next: d => {
        this.injuries = d;  // On charge les blessures
        this.computeInjuryStats();  // On appelle la méthode pour calculer les statistiques
      },
      error: () => {
        this.injuries = [];  // En cas d'erreur, on vide les blessures
      }
    });
  }



  private loadArchivedInjuries(id:number){
    this.injuryService.getArchivedInjuries().subscribe({
      next:all=>this.injuryHistory=all.filter(i=>i.player?.id===id),
      error:  ()=>this.injuryHistory=[]
    });
  }
  private loadRecoveryPlans(id:number){
    this.recoveryService.getRecoveryPlansByPlayerId(id).subscribe({
      next:d=>{ this.recoveryPlans=d; this.computeRPStats(); },
      error:()=>{ this.recoveryPlans=[]; this.computeRPStats(); }
    });
  }






  /* ============ STATS + CHARTS ============ */
  private computeRPStats(){
    const n = this.recoveryPlans.length||1;

    /* Moyennes & compteurs */
    this.avgProgress = Math.round(this.recoveryPlans.reduce((s,p)=>s+p.progress,0)/n);
    this.avgDuration = Math.round(this.recoveryPlans.reduce((s,p)=>
        s+(Date.parse(p.estimatedEndDate)-Date.parse(p.startDate))/86400000
      ,0)/n);
    this.activeCount = this.recoveryPlans.filter(p=>p.planStatus==='EN_COURS').length;
    this.doneCount   = this.recoveryPlans.filter(p=>p.planStatus==='TERMINE').length;

    /* Chips types */
    const bucket:Record<string,number>={};
    this.recoveryPlans.forEach(p=> bucket[p.planType]=(bucket[p.planType]||0)+1);
    this.planTypeGroups = Object.entries(bucket).map(([t,c])=>({type:t,count:c}));

    /* Mini bar */
    this.barOpts = {
      tooltip:{trigger:'axis'},
      xAxis:{type:'category',data:['Active','Done','Avg Prog %','Avg Dur j'],
             axisLabel:{color:'#9aa0b5'}},
      yAxis:{type:'value',axisLabel:{color:'#9aa0b5'}},
      series:[{type:'bar',
        data:[this.activeCount,this.doneCount,this.avgProgress,this.avgDuration],
        itemStyle:{color:'#00bfff'}, barWidth:'40%'}]
    };

    /* --------- COMBO (bar+line) GRAND --------- */
    const labels = this.recoveryPlans.length
                 ? this.recoveryPlans.map((_,i)=>'P'+(i+1)) : ['‑'];
    const prog   = this.recoveryPlans.length
                 ? this.recoveryPlans.map(p=>p.progress)    : [0];
    const dur    = this.recoveryPlans.length
                 ? this.recoveryPlans.map(p=>
                     (Date.parse(p.estimatedEndDate)-Date.parse(p.startDate))/86400000
                   ) : [0];

                   this.comboOpts = {
                    backgroundColor: '#14171f',  // Fond sombre
                    animationDuration: 1200,  // Durée de l'animation pour plus de fluidité
                    animationEasing: 'cubicOut',  // Animation fluide

                    tooltip: {
                      trigger: 'axis',
                      backgroundColor: '#1e1e2f',  // Ombre foncée pour le tooltip
                      borderColor: '#00fff755',  // Bordure néon
                      borderWidth: 1,
                      textStyle: {
                        color: '#ffffff',  // Texte en blanc
                        fontFamily: 'Orbitron, sans-serif',  // Police futuriste
                        fontSize: 12  // Taille de la police
                      }
                    },

                    legend: {
                      data: [
                        {
                          name: 'Progress',
                          icon: 'rect',
                          textStyle: { color: '#00fff7', fontWeight: 'bold', fontSize: 13 }  // Progress avec couleur néon cyan
                        },
                        {
                          name: 'Durée(j)',
                          icon: 'rect',
                          textStyle: { color: '#ffae00', fontWeight: 'bold', fontSize: 13 }  // Durée en couleur or néon
                        }
                      ],
                      itemWidth: 14,
                      itemHeight: 8,
                      top: 10
                    },

                    grid: {
                      left: 40,
                      right: 30,
                      bottom: 40,
                      top: 60,
                      containLabel: true
                    },

                    xAxis: {
                      type: 'category',
                      data: labels,
                      axisLine: { lineStyle: { color: '#00fff799' } },  // Lignes en cyan
                      axisLabel: {
                        color: '#9aa0b5',  // Couleur gris clair pour les labels
                        fontFamily: 'Orbitron, sans-serif',  // Police futuriste
                        fontSize: 12  // Taille de la police
                      }
                    },

                    yAxis: [
                      {
                        type: 'value',
                        name: 'Progress %',
                        axisLine: { lineStyle: { color: '#00fff7' } },  // Ligne en cyan
                        splitLine: { lineStyle: { color: '#2c2f38' } },  // Lignes de séparation sombres
                        axisLabel: {
                          color: '#00fff7',  // Texte des labels en cyan
                          fontWeight: 'bold',
                          fontSize: 12  // Taille de la police
                        }
                      },
                      {
                        type: 'value',
                        name: 'Durée (j)',
                        position: 'right',
                        axisLine: { lineStyle: { color: '#ffae00' } },  // Ligne droite en or
                        splitLine: { show: false },  // Aucune ligne de séparation pour la droite
                        axisLabel: {
                          color: '#ffae00',  // Texte en or néon
                          fontWeight: 'bold',
                          fontSize: 12  // Taille de la police
                        }
                      }
                    ],

                    series: [
                      {
                        name: 'Progress',
                        type: 'bar',
                        data: prog,
                        itemStyle: {
                          color: '#00fff7',  // Couleur de la barre en cyan
                          borderRadius: [4, 4, 0, 0],  // Coins arrondis
                          shadowBlur: 10,  // Ombre légère
                          shadowColor: '#00fff777'  // Ombre bleue néon
                        },
                        emphasis: {
                          itemStyle: {
                            color: '#33fffc',  // Effet néon lors du survol
                            shadowBlur: 15  // Ombre accrue
                          }
                        }
                      },
                      {
                        name: 'Durée(j)',
                        type: 'line',
                        yAxisIndex: 1,
                        data: dur,
                        smooth: true,
                        lineStyle: {
                          width: 3,
                          color: '#ffae00'  // Ligne or néon
                        },
                        itemStyle: {
                          color: '#ffae00',  // Couleur or néon
                          borderColor: '#000',  // Bordure sombre
                          borderWidth: 1  // Largeur de la bordure
                        },
                        symbol: 'circle',  // Forme des symboles en cercle
                        symbolSize: 8,  // Taille des symboles
                        emphasis: {
                          itemStyle: {
                            color: '#ffc94b',  // Couleur de survol en or clair
                            borderColor: '#14171f',  // Bordure sombre au survol
                            borderWidth: 2  // Largeur de la bordure au survol
                          }
                        }
                      }
                    ]
                  };
  }





  private computeInjuryStats() {
    // Compteurs
    const typeBucket: Record<string,number> = {};
    const sevBucket:  Record<string,number> = {};
    const timeBucket: Record<string,number> = {};

    this.injuries.forEach(i => {
      typeBucket[i.type]     = (typeBucket[i.type]    || 0) + 1;
      sevBucket[i.severity]  = (sevBucket[i.severity] || 0) + 1;
      const month = new Date(i.date).toISOString().slice(0,7);
      timeBucket[month]      = (timeBucket[month]     || 0) + 1;
    });

    // Préparation des tableaux
    const types  = Object.keys(typeBucket),
          tVals  = types.map(t => typeBucket[t]);
    const sevs   = Object.keys(sevBucket),
          sVals  = sevs.map(s => sevBucket[s]);
    const months = Object.keys(timeBucket).sort(),
          mVals  = months.map(m => timeBucket[m]);

    // 1) Radar (répartition par type)
    this.radarOpts = {
      tooltip: {},
      radar: {
        indicator: types.map((t,i)=>({
          name: t, max: Math.max(...tVals)+1
        }))
      },
      series: [{
        name: 'Types',
        type: 'radar',
        data: [{ value: tVals, name: 'Répartition' }],
        itemStyle: { color: '#00fff7' },
        areaStyle: { opacity: 0.3 }
      }]
    };

    // 2) Pie (gravité)
    this.pieOpts = {
      tooltip: { trigger: 'item' },
      legend: { bottom: 10, textStyle: { color: '#ccc' } },
      series: [{
        name: 'Gravité',
        type: 'pie',
        radius: ['45%','65%'],
        label: { formatter: '{b}: {d}%' },
        data: sevs.map((s,i)=>({ name: s, value: sVals[i] })),
        itemStyle: { borderColor: '#14171f', borderWidth: 2 }
      }]
    };

    // 3) Line (blessures par mois)
    this.lineOpts = {
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: months,
        axisLabel: { color: '#9aa0b5' }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#00fff7' }
      },
      series: [{
        name: 'Blessures/mois',
        type: 'line',
        data: mVals,
        smooth: true,
        lineStyle: { color: '#ffae00', width: 2 },
        itemStyle: { color: '#ffae00' },
        areaStyle: { opacity: 0.1 }
      }]
    };
  }






  /* Filtre chips */
  toggleType(t:string){
    this.selectedTypes.has(t)?this.selectedTypes.delete(t):this.selectedTypes.add(t);
  }
}
