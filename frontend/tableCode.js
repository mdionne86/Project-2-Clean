var summaries = [];
for (i = 8; i <= allHeaders.length; i++){
   var obj = {
    destinationRow: 0,
    destinationColumn: i,
    reversedRowCoords: true,
    type: 'sum'
    }

  summaries.push(obj)
}



var hotElement = document.querySelector('#hot');
var hotElementContainer = hotElement.parentNode;
var hotSettings = {
  data: dataObject,
  minSpareRows: 2,
  stretchH: 'all',
  width: 805,
  autoWrapRow: true,
  height: 487,
  maxRows: 958,
  rowHeaders: true,
  colHeaders: allHeaders,
  columnSorting: {
    indicator: true
  },
  autoColumnSize: {
    samplingRatio: 23
  },
  mergeCells: true,
  contextMenu: true,
  filters: true,
  dropdownMenu: true,
  language: 'en-US',
  forceNumeric: true,
  columnSummary: summaries
};

var hot = new Handsontable(hotElement, hotSettings);

/////////////////////////////




console.log(summaries)