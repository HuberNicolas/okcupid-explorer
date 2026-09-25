// react-apexcharts 1.7 is CommonJS with exports.default; depending on the bundler's interop,
// the default import is the component or the whole exports object. Always export the component.
import * as ReactApexCharts from 'react-apexcharts';

const Chart = ReactApexCharts.default?.default ?? ReactApexCharts.default;

export default Chart;
