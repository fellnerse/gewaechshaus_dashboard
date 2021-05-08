<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
const color = 'black'
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    title: {
      type: String,
      default: '',
    },
    timeunit: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default() {
        return {
          pointHitRadius: 20,
          responsive: true,
          maintainAspectRatio: false,
          lineTension: 0,
          legend: {
            position: 'bottom',
            display: true,
            color,
            labels: {
              fontColor: color,
            },
          },
          title: {
            display: this.title.length > 0,
            text: this.title,
            fontColor: color,
            fontSize: 20,
          },
          scales: {
            xAxes: [
              {
                type: 'time',
                // distribution: 'series',
                time: {
                  unit: this.timeunit,
                  tooltipFormat: 'HH:mm DD.MM',
                  displayFormats: {
                    millisecond: 'HH:mm:ss.SSS',
                    second: 'HH:mm:ss',
                    minute: 'HH:mm',
                    hour: 'HH[h]',
                  },
                },
                gridLines: {
                  display: false,
                  color,
                },
                ticks: {
                  fontColor: color,
                  source: 'auto',
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                },
                ticks: {
                  precision: 0,
                  beginAtZero: false,
                  fontColor: color,
                },
              },
            ],
          },
          elements: {
            line: {
              tension: 0,
            },
          },
        }
      },
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
}
</script>

<style>
.chartWrapper {
  position: relative;
}

.chartWrapper > canvas {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
}

.chartAreaWrapper {
  width: 600px;
  overflow-x: scroll;
}
</style>
