import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormationService } from 'src/app/formation.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Registering necessary components of Chart.js

declare global {
  interface Window {
    radarChartInstance: Chart | undefined;
  }
}

@Component({
  selector: 'app-tacticstatestique',
  templateUrl: './tacticstatestique.component.html',
  styleUrls: ['./tacticstatestique.component.css']
})
export class TacticstatestiqueComponent implements OnInit, AfterViewInit {

  formationData: any = {};  // Data structure to hold formation percentages
  trainingFocusData: any = {}; // Data for the radar chart (most used TrainingFocus)

  constructor(private formationService: FormationService) { }

  ngOnInit(): void {
    // Fetch formation data when the component is initialized
    this.formationService.getFormationPercentage().subscribe((data) => {
      this.formationData = data;
      this.drawBarChart(); // Draw the bar chart with the fetched data
    });

    // Fetch training focus data for radar chart
    this.formationService.getTrainingFocusData().subscribe((data) => {
      this.trainingFocusData = data;
      this.drawRadarChart(); // Draw the radar chart with the fetched data
    });
  }

  ngAfterViewInit(): void {
    // Wait for the view to be initialized before attempting to render the chart
    this.drawBarChart();
    this.drawRadarChart();
  }

  drawBarChart(): void {
    // Only draw the chart if formation data exists
    if (!this.formationData || Object.keys(this.formationData).length === 0) {
      return; // Exit if no data is available
    }

    const canvas = <HTMLCanvasElement>document.getElementById('barChart');
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      const labels = Object.keys(this.formationData);  // Get the formation names (keys)
      const values = Object.values(this.formationData); // Get the percentages (values)

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,  // Use formation names as labels
          datasets: [{
            label: 'Formation Percentages',  // Dataset label
            data: values,  // Percentages of the formations
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', // Pastel colors for bars
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)', // Darker border colors for the bars
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true, // Ensure the chart is responsive
          plugins: {
            title: {
              display: true,
              text: 'Formation Percentage Chart',  // Title text
              font: {
                size: 20
              },
              padding: {
                top: 20,
                bottom: 30
              }
            },
            legend: {
              position: 'top',
              labels: {
                boxWidth: 20,
                boxHeight: 20,
                font: {
                  size: 14
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,  // Ensures the bars start at 0
              ticks: {
                stepSize: 5,
                font: {
                  size: 15
                }
              }
            },
            x: {
              ticks: {
                font: {
                  size: 15
                }
              }
            }
          },
          layout: {
            padding: {
              left: 300,
              right: 400,
              top: 30,
              bottom: 30
            }
          }
        }
      });
    }
  }

  drawRadarChart(): void {
    const radarCanvas = <HTMLCanvasElement>document.getElementById('radarChart');
    const ctxRadar = radarCanvas.getContext('2d');
    
    if (!ctxRadar) {
      console.error('Radar chart canvas context not found!');
      return; // Exit if the canvas context is not available
    }
  
    // Check if trainingFocusData is populated
    if (!this.trainingFocusData || Object.keys(this.trainingFocusData).length === 0) {
      console.error('No data available for radar chart!');
      return; // Exit if there's no data to plot
    }
  
    // Destroy any existing radar chart instance before creating a new one
    if (window['radarChartInstance']) {
      window['radarChartInstance'].destroy();  // Destroy existing chart to prevent canvas reuse issues
    }
  
    // Extract labels (e.g., 'DEFENSE', 'ATTACK', etc.)
    const radarLabels = Object.keys(this.trainingFocusData); 
  
    // Define color for each formation
    const formationColors = [
      'rgba(255, 99, 132, 0.2)',  // Color for 5-3-2
      'rgba(54, 162, 235, 0.2)',  // Color for 4-4-2
      'rgba(75, 192, 192, 0.2)',  // Color for 4-3-3
      'rgba(153, 102, 255, 0.2)'  // Color for 3-5-2
    ];
  
    const formationNames = ['5-3-2', '4-4-2', '4-3-3', '3-5-2'];
  
    // Create datasets for each formation, based on training focus data
    const radarDatasets = formationNames.map((formation, index) => {
      const data = radarLabels.map(focus => this.trainingFocusData[focus][formation]);
  
      return {
        label: formation, 
        data: data, 
        fill: true, 
        backgroundColor: formationColors[index], 
        borderColor: formationColors[index].replace('0.2', '1'),  // Darker border color for each dataset
        pointBackgroundColor: formationColors[index].replace('0.2', '1'), // Same color for points
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: formationColors[index].replace('0.2', '1')
      };
    });
  
    // Create the radar chart
    window['radarChartInstance'] = new Chart(ctxRadar, {
      type: 'radar',
      data: {
        labels: radarLabels, // Labels for the radar chart (e.g., 'DEFENSE', 'ATTACK')
        datasets: radarDatasets // The data for each formation
      },
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        },
        scales: {
          r: {
            min: 0, // Set the minimum value of the scale to 0
            max: 100, // Set the maximum value of the scale to 100
            ticks: {
              stepSize: 25, // Control the step size of ticks
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 14
              }
            }
          },
          title: {
            display: true,
            text: 'Training Focus Usage by Formation', // Title text
            font: {
              size: 18
            }
          }
        }
      }
    });
  }
  
}
