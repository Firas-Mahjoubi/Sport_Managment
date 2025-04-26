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
   showInjuriesModal = false;



  recoveryPlans: RecoveryPlan[] = [];

  selectedPeriod: 'jour' | 'semaine' | 'mois' = 'mois'; // <-- période sélectionnée




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

  gaugeOpts!: EChartsOption;
  heatmapOpts!: EChartsOption;
  boxplotOpts!: EChartsOption;
   showAllInjuries: any;

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


  closeModals() {
    this.showInjuryHistory = false;
    this.showAllInjuries   = false;
  }
  openAll() {
    this.showAllInjuries  = true;
    this.showInjuryHistory = false;
  }
  openHistory() {
    this.showInjuryHistory = true;
    this.showAllInjuries  = false;
  }


  /* ============ STATS + CHARTS ============ */
private computeRPStats() {
  const n = this.recoveryPlans.length || 1;

  /* Moyennes & compteurs */
  this.avgProgress = Math.round(this.recoveryPlans.reduce((s, p) => s + p.progress, 0) / n);
  this.avgDuration = Math.round(this.recoveryPlans.reduce((s, p) =>
    s + (Date.parse(p.estimatedEndDate) - Date.parse(p.startDate)) / 86400000, 0) / n);
  this.activeCount = this.recoveryPlans.filter(p => p.planStatus === 'EN_COURS').length;
  this.doneCount = this.recoveryPlans.filter(p => p.planStatus === 'TERMINE').length;

  /* Chips types */
  const bucket: Record<string, number> = {};
  this.recoveryPlans.forEach(p => bucket[p.planType] = (bucket[p.planType] || 0) + 1);
  this.planTypeGroups = Object.entries(bucket).map(([t, c]) => ({ type: t, count: c }));

  /* Mini bar */
  this.barOpts = {
    backgroundColor: '#0a0f1c',
    tooltip: { trigger: 'axis', backgroundColor: '#1c1f2e', borderColor: '#00bfff88', textStyle: { color: '#ffffff' }},
    xAxis: {
      type: 'category',
      data: ['Active', 'Done', 'Avg Prog %', 'Avg Dur j'],
      axisLabel: { color: '#9aa0b5', fontFamily: 'Orbitron, sans-serif' },
      axisLine: { lineStyle: { color: '#00bfff99' } }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#9aa0b5', fontFamily: 'Orbitron, sans-serif' },
      splitLine: { lineStyle: { color: '#2c2f38' } }
    },
    series: [{
      type: 'bar',
      data: [this.activeCount, this.doneCount, this.avgProgress, this.avgDuration],
      itemStyle: {
        color: '#00bfff',
        borderRadius: [6, 6, 0, 0],
        shadowBlur: 10,
        shadowColor: '#00bfff77'
      },
      barWidth: '35%'
    }]
  };

  /* Grand combo bar + line */
  const labels = this.recoveryPlans.length ? this.recoveryPlans.map((_, i) => 'P' + (i + 1)) : ['‑'];
  const prog = this.recoveryPlans.length ? this.recoveryPlans.map(p => p.progress) : [0];
  const dur = this.recoveryPlans.length ? this.recoveryPlans.map(p =>
    (Date.parse(p.estimatedEndDate) - Date.parse(p.startDate)) / 86400000
  ) : [0];

  this.comboOpts = {
    backgroundColor: '#0a0f1c',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e1e2f',
      borderColor: '#00fff799',
      textStyle: { color: '#ffffff', fontFamily: 'Orbitron, sans-serif' }
    },
    legend: {
      data: ['Progress', 'Durée(j)'],
      textStyle: { color: '#00fff7', fontWeight: 'bold' },
      top: 10,
      itemGap: 20
    },
    grid: { left: 50, right: 50, bottom: 50, top: 70, containLabel: true },
    xAxis: {
      type: 'category',
      data: labels,
      axisLine: { lineStyle: { color: '#00fff799' } },
      axisLabel: { color: '#9aa0b5', fontFamily: 'Orbitron, sans-serif' }
    },
    yAxis: [
      {
        type: 'value',
        name: 'Progress %',
        axisLine: { lineStyle: { color: '#00fff7' } },
        splitLine: { lineStyle: { color: '#2c2f38' } },
        axisLabel: { color: '#00fff7', fontWeight: 'bold' }
      },
      {
        type: 'value',
        name: 'Durée (j)',
        position: 'right',
        axisLine: { lineStyle: { color: '#ffae00' } },
        splitLine: { show: false },
        axisLabel: { color: '#ffae00', fontWeight: 'bold' }
      }
    ],
    series: [
      {
        name: 'Progress',
        type: 'bar',
        data: prog,
        itemStyle: {
          color: '#00fff7',
          borderRadius: [6, 6, 0, 0],
          shadowBlur: 15,
          shadowColor: '#00fff799'
        },
        emphasis: {
          itemStyle: {
            color: '#33fffc',
            shadowBlur: 20
          }
        }
      },
      {
        name: 'Durée(j)',
        type: 'line',
        yAxisIndex: 1,
        data: dur,
        smooth: true,
        lineStyle: { width: 4, color: '#ffae00' },
        itemStyle: { color: '#ffae00', borderColor: '#000', borderWidth: 1 },
        symbol: 'circle',
        symbolSize: 10,
        emphasis: {
          itemStyle: {
            color: '#ffc94b',
            borderColor: '#14171f',
            borderWidth: 2
          }
        }
      }
    ]
  };
}


/* ============ NOUVEAUX GRAPHIQUES FUTURISTES POUR INJURIES - MODIFIÉ ============ */
private computeInjuryStats() {
  // 1) Agrégations
  const typeCount: Record<string, number> = {};
  const zoneSeveritySum: Record<string, number> = {};
  const zoneCount: Record<string, number> = {};
  const daySeveritySum: Record<string, number> = {};
  const dayCount: Record<string, number> = {};
  const weekSeveritySum: Record<string, number> = {};
  const weekCount: Record<string, number> = {};
  const monthSeveritySum: Record<string, number> = {};
  const monthCount: Record<string, number> = {};

  this.injuries.forEach(inj => {
    const severityValue = ({ LEGER:3, MODERE:6, GRAVE:9 }[inj.severity] || 0);
    const d = new Date(inj.date);

    // Type de blessures (Pie Chart)
    typeCount[inj.type] = (typeCount[inj.type] || 0) + 1;

    // Gravité par zone (Radar Chart)
    zoneSeveritySum[inj.zoneAffectee] = (zoneSeveritySum[inj.zoneAffectee] || 0) + severityValue;
    zoneCount[inj.zoneAffectee] = (zoneCount[inj.zoneAffectee] || 0) + 1;

    // Gravité moyenne par jour
    const dayKey = d.toISOString().split('T')[0];
    daySeveritySum[dayKey] = (daySeveritySum[dayKey] || 0) + severityValue;
    dayCount[dayKey] = (dayCount[dayKey] || 0) + 1;

    // Gravité moyenne par semaine
    const week = this.getWeekNumber(d);
    const weekKey = `${week}/${d.getFullYear()}`;
    weekSeveritySum[weekKey] = (weekSeveritySum[weekKey] || 0) + severityValue;
    weekCount[weekKey] = (weekCount[weekKey] || 0) + 1;

    // Gravité moyenne par mois
    const mY = `${d.getMonth()+1}/${d.getFullYear()}`;
    monthSeveritySum[mY] = (monthSeveritySum[mY] || 0) + severityValue;
    monthCount[mY] = (monthCount[mY] || 0) + 1;
  });

  // 2) Préparation des données
  const pieData = Object.entries(typeCount).map(([name,value])=>({ name, value }));

  const zones = Object.keys(zoneSeveritySum);
  const radarIndicator = zones.map(z=>({ name: z, max: 10 }));
  const radarValues = zones.map(z=> zoneSeveritySum[z]/zoneCount[z] );
  const radarData = [{ name: 'Gravité moyenne', value: radarValues }];

  const sortedDays = Object.keys(dayCount).sort();
  const sortedWeeks = Object.keys(weekCount).sort();
  const sortedMonths = Object.keys(monthCount).sort((a,b)=>{
    const [ma,ya]=a.split('/').map(Number), [mb,yb]=b.split('/').map(Number);
    return ya===yb ? ma-mb : ya-yb;
  });

  const lineDataDay = sortedDays.map(d => ({
    date: d,
    severity: daySeveritySum[d]/dayCount[d]
  }));

  const lineDataWeek = sortedWeeks.map(w => ({
    week: w,
    severity: weekSeveritySum[w]/weekCount[w]
  }));

  const lineDataMonth = sortedMonths.map(m => ({
    month: m,
    severity: monthSeveritySum[m]/monthCount[m]
  }));

  // 3) Charts agrandis

  // --- Pie Chart ---
  this.pieOpts = {
    title: {
      text: 'Répartition des types de blessures',
      subtext: '(%)',
      left: 'center',
      textStyle:{ color:'#0ff', fontFamily:'Orbitron', fontSize:18 },
      subtextStyle:{ color:'#0fa', fontFamily:'Orbitron', fontSize:16 }
    },
    tooltip:{ trigger:'item', formatter:'{b}: {c} ({d}%)' },
    legend:{
      orient:'vertical', left:'left',
      data: pieData.map(p=>p.name),
      textStyle:{ color:'#0ff', fontFamily:'Orbitron' }
    },
    series:[{
      type:'pie', radius:'65%',
      data: pieData,
      label:{ show:true, formatter:'{b}: {d}%', color:'#fff', fontFamily:'Orbitron' },
      labelLine:{ lineStyle:{ color:'#0ff' } },
      itemStyle:{ shadowBlur:20, shadowColor:'#0ff' }
    }],
    color:['#39FF14','#0FF','#FF1493','#FF0']
  };

  // --- Radar Chart ---
  this.radarOpts = {
    title:{
      text:'Gravité moyenne par zone',
      subtext:'(0–10)',
      left:'center',
      textStyle:{ color:'#0ff', fontFamily:'Orbitron', fontSize:18 },
      subtextStyle:{ color:'#0fa', fontFamily:'Orbitron', fontSize:16 }
    },
    tooltip:{ show:true },
    radar:{
      indicator: radarIndicator,
      shape:'circle',
      radius: '70%',
      axisLine:{ lineStyle:{ color:'rgba(0,255,255,0.3)' } },
      splitLine:{ lineStyle:{ color:'rgba(0,255,255,0.2)' } }
    },
    series:[{
      name:'Gravité',
      type:'radar',
      data: radarData,
      itemStyle:{ color:'rgba(0,255,255,0.3)', shadowBlur:25, shadowColor:'#0ff' },
      lineStyle:{ color:'#0ff', width:3 },
      areaStyle:{ color:'rgba(0,255,255,0.1)' }
    }]
  };

  // --- Line Chart Jour/Semaine/Mois ---
  this.lineOpts = {
    baseOption: {
      timeline: {
        axisType: 'category',
        autoPlay: false,
        playInterval: 3000,
        data: ['Par Jour', 'Par Semaine', 'Par Mois'],
        label: { color: '#0ff', fontFamily: 'Orbitron' }
      },
      title: {
        text: 'Gravité moyenne',
        subtext: 'Jour / Semaine / Mois',
        left: 'center',
        textStyle:{ color:'#0ff', fontFamily:'Orbitron', fontSize:18 },
        subtextStyle:{ color:'#0fa', fontFamily:'Orbitron', fontSize:16 }
      },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', boundaryGap: false, axisLabel:{ color:'#9aa0b5' }, axisLine:{ lineStyle:{ color:'#0ff' } } },
      yAxis: {
        type: 'value',
        min:0, max:10,
        name:'Gravité (0–10)',
        nameLocation:'middle',
        nameTextStyle:{ color:'#0ff', fontFamily:'Orbitron' },
        axisLine:{ lineStyle:{ color:'#0ff' } },
        axisLabel:{ color:'#9aa0b5' },
        splitLine:{ lineStyle:{ color:'#2c2f38' } }
      },
      series: [{ type:'line', smooth:true, symbol:'circle', symbolSize:8 }]
    },
    options: [
      {
        title: { text: 'Gravité Moyenne par Jour' },
        xAxis: { data: lineDataDay.map(d=>d.date) },
        series: [{ data: lineDataDay.map(d=>d.severity), areaStyle:{ color:'rgba(57,255,20,0.2)' }, lineStyle:{ color:'#39FF14', width:3 } }]
      },
      {
        title: { text: 'Gravité Moyenne par Semaine' },
        xAxis: { data: lineDataWeek.map(w=>w.week) },
        series: [{ data: lineDataWeek.map(w=>w.severity), areaStyle:{ color:'rgba(0,255,255,0.2)' }, lineStyle:{ color:'#0FF', width:3 } }]
      },
      {
        title: { text: 'Gravité Moyenne par Mois' },
        xAxis: { data: lineDataMonth.map(m=>m.month) },
        series: [{ data: lineDataMonth.map(m=>m.severity), areaStyle:{ color:'rgba(255,20,147,0.2)' }, lineStyle:{ color:'#FF1493', width:3 } }]
      }
    ]
  };
}

// Fonction pour récupérer le numéro de semaine d'une date
private getWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
  return Math.ceil((((date.getTime() - yearStart.getTime())/86400000)+1)/7);
}










// Helper pour calculer moyenne
private average(arr: number[]): number {
  if (!arr.length) return 0;
  return Math.round(arr.reduce((sum, val) => sum + val, 0) / arr.length);
}







  /* Filtre chips */
  toggleType(t:string){
    this.selectedTypes.has(t)?this.selectedTypes.delete(t):this.selectedTypes.add(t);
  }
}


