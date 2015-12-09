$(document).ready(function() {

  // Place JavaScript code here...
  $('#file-input').fileinput({
	    resizeImage: true,
	    maxImageWidth: 200,
	    maxImageHeight: 200,
	    resizePreference: 'width'
	});
  var btnCust = '<button type="button" class="btn btn-default" title="Add picture tags" ' + 
    'onclick="alert(\'Call your custom code here.\')">' +
    '<i class="glyphicon glyphicon-tag"></i>' +
    '</button>'; 

    $("#input-1").fileinput({
        previewFileType: "image",
        browseClass: "btn btn-success",
        browseLabel: "Pick Image",
        browseIcon: "<i class=\"glyphicon glyphicon-picture\"></i> ",
        removeClass: "btn btn-danger",
        removeLabel: "Delete",
        removeIcon: "<i class=\"glyphicon glyphicon-trash\"></i> ",
        uploadClass: "btn btn-info",
        uploadLabel: "Upload",
        uploadIcon: "<i class=\"glyphicon glyphicon-upload\"></i> ",
        overwriteInitial: true,
	    maxFileSize: 10000,
	    showClose: false,
        allowedFileExtensions: ["jpg", "png", "gif"],
        maxImageWidth: 250,
        maxImageHeight: 250
        // initialPreview: [
        //     '<img src="uploadPImg/'+userPic+'" class="file-preview-image" alt="Your Avatar" title="Your Avatar">',
        // ],
	    // showCaption: false,
        // defaultPreviewContent: '<img src="uploadPImg/'+userPic+'" alt="Your Avatar" style="width:180px">',
        // layoutTemplates: {main2: '{preview} {remove} {upload} {browse}'},
        // uploadUrl: "/account/upload/"
    });
    $("#input-2").fileinput({
                maxFileCount: 10,
                // showPreview: false,
                // uploadUrl: "/sharing/uploadfiles/"+userUploadID,
                // allowedFileExtensions: ["txt", "md", "ini", "text"],
    });
    $("#input-3").fileinput({
        maxFileCount: 10,
        showPreview: false,
        uploadUrl: "/sharing/uploadfiles/"+userUploadID,
        allowedFileExtensions: ["mp4", "mov", "avi"],
    });
    $("#input-4").fileinput({
        maxFileCount: 10,
        showPreview: false,
        uploadUrl: "/sharing/uploadfiles/"+userUploadID,
        // allowedFileExtensions: ["zip", "rar", "gz", "tgz"],
    });
    
});
function nameSelectFoo() {
        var selIndex = document.getElementById("NameSelect").selectedIndex;
        console.log(usersList);
        document.getElementById("demo").innerHTML = "You selected: " + usersList[selIndex].email;
}