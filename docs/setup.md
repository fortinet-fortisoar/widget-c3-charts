| [Home](../README.md) |
|--------------------------------------------|

# Installation

1. To install a solution pack, click **Content Hub** > **Discover**.
2. From the list of solution pack that appears, search for and select `C3 Charts`.
3. Click the `C3 Charts` solution pack card.
4. Click **Install** on the bottom to begin installation.

# Configuration

**Before Configuring the C3 Charts Widget**

The C3 Charts widget required the use of a JSON field in a module to hold the data which will be rendered in the resulting chart. For simplicity's sake, a dedicated custom module and field can be used for this. The steps to set up this module are as follows:

1. Navigate to FortiSOAR's Settings menu
2. Click on "Modules" in the system settings menu to access the module editor. By default the "Create New Module" option will be selected.
3. Enter the singular name for your module, for example "Custom Chart". This will automatically populate the plural name.
4. Click the "Fields Editor" tab
5. Add a text field called "name" and a JSON field called "Chart Data"
6. Navigate back to the "Summary" tab and select the "Name" field from the Display Template menu
7. Click "Save"
8. Click "Publish" once the save is complete and the Publish button is enabled

**Configuring the C3 Charts Widget**
Provide the following details to customize the MITRE ATT&CK Alert Incident Spread Widget to suit your requirements:

| Fields     | Description                              |
| ---------- | ---------------------------------------- |
| Title      | Provide the text which will appear above the rendered chart. |
| Data Source | Select the module in which the data which will be rendered into the chart is stored. Using the example from the above section, this would be "Custom Charts" |
| Field Containing Chart Data | The JSON field from the above module in which the chart data is stored. |
| Record Selection Filter | The filter applied to find the correct record to pull chart data from. For example, if each week a new record called "Weekly Incident Remediations" is created, then when configuring this widget to show the most recent record's data, a filter on the Name field could be applied with that value. |
| Take First Record When Sorted On Field | In a case where the filter in the previous parameter results in multiple records being found, they will be sorted on the field specified here, and the first result will be used  as the chart data source. For example, to select the most recent record matching the filter, the Created On field could be selected, along with the "Descending" radio button. |
| Hide Empty Techniques | An optional toggle to hide all MITRE ATT&CK Techniques from view if they do not have any related Subtechniques, Alerts, or Incidents. |

Once configured, the Edit Widget interface should look similar to the following screenshot:
<img src="raw.githubusercontent.com/fortinet-fortisoar/widget-c3-charts/develop/docs/res/widget_configuration.png" alt="Editing the C3 Charts Widget" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block;  margin-left: auto; margin-right: auto;">
