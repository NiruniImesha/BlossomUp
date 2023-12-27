
function doPost(request = {}) {
  const { parameter, postData: { contents, type } = {} } = request;
  const { dataReq = {} } = JSON.parse(contents); //content
  const { fname = {} } = JSON.parse(contents); //function name

  const response = {
    status: "function not found: " + fname, // prepare response in function not found
    data2: dataReq
  }
  switch (fname) { //function selection
    case 'uploadFilesToGoogleDrive':
      var output = JSON.stringify(uploadFilesToGoogleDrive(dataReq.data, dataReq.name, dataReq.type)) //call function with data, name and type from request
      break
    default:
      var output = JSON.stringify(response)
      break
  }
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON); //response to frontend
}

function uploadFilesToGoogleDrive(data, name, type) {
  var datafile = Utilities.base64Decode(data)  // convert to Binary (from Base4) Utilities is native from AppsScript
  var blob = Utilities.newBlob(datafile, type, name); // structure the file
  var folder = DriveApp.getFolderById("1OpwczG3qV0poYLgSlTRfr21Kz0skeyT6"); //select folder to save
  var newFile = folder.createFile(blob); // create and save
  newFile.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); // set permision to anyone to view
  var url = newFile.getUrl() //get the file URL to share
  var id = newFile.getId()
  let obj = { url, id } //prepare object to response
  return obj
}