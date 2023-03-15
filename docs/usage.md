| [Home](../README.md) |
|--------------------------------------------|

# Usage

When a dashboard or report containing the C3 Chart widget is loaded, the widget will query the module provided in the widget configuration screen (see Setup section), and will retrieve the data from the specified JSON field in the resulting record. This JSON should be structured in such a way that it is able to be rendered by the C3 Javascript Library. Refer to the [C3 Examples](https://c3js.org/examples.html) and [Reference](https://c3js.org/reference.html) pages for details on what this library can render.

<img src="raw.githubusercontent.com/fortinet-fortisoar/widget-c3-charts/develop/docs/res/chart_record.png" alt="An example record containing chart data" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block;  margin-left: auto; margin-right: auto;">

<img src="raw.githubusercontent.com/fortinet-fortisoar/widget-c3-charts/develop/docs/res/rendered_chart.png" alt="A pie chart rendered by the C3 Chart Widget" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block;  margin-left: auto; margin-right: auto;">