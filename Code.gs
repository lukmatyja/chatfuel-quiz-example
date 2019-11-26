function doGet(e) {
  
  var questionNumber = parseInt(e.parameter.questionNumber);
  var quizName = e.parameter.quizName;
  
  
  var rows = getRows(quizName);
  
  Logger.log('questionNo: '+questionNumber);
  Logger.log('quizName: '+quizName);
  
  var result = {
    set_attributes: { questionNumber: questionNumber+1 },
    messages: [
      { text: row[0], quick_replies: getQuickReplies(row) }
      ]
  };
  
  var output = JSON.stringify(result);
  
  Logger.log('output: '+output);
  
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}

function getRows(quizName){
  return SpreadsheetApp.getActive().getSheetByName(quizName).getDataRange().getValues();
}

function getQuickReplies(row){
  return [
    {title: row[1], block_names: getBlocks(row[5])},
    {title: row[2], block_names: getBlocks(row[6])},
    {title: row[3], block_names: getBlocks(row[7])},
    {title: row[4], block_names: getBlocks(row[8])}    
    ];
}

function getBlocks(blocks){
  return blocks.split(',');
}
