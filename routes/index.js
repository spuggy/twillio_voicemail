var request = require('request');
var fs = require('fs');

/*
 * GET home page.
 */

exports.index = function(req, res){

  //render the home page so people know the number
	
  res.render('index', { title: 'Express' });
};

exports.leave_message = function(req, res){

	// test twiml
	var xml = '<?xml version="1.0" encoding="UTF-8" ?>' +
              '<Response>' + 
			    '<Say>Hi, please leave a message for Tom. Make sure you say your name.  You can use rude words too, Tom loves those.</Say>' +
			    '<pause/>'+
			    '<Record maxLength="30" action="handle_message" />' +
			  '</Response>';


    res.writeHead(200, { 'Content-Type': 'application/xml' });
	
    res.write(xml) ;
    res.end();
  
 

};

exports.handle_message = function(req, res){

	console.log(req.body.RecordingUrl);

	// say thanks for the message 
	var xml = '<Response>' +
			  '<Say>Thanks for the message.  We will add it to Toms ipod, so he can hear your voice.</Say>'+
			  '</Response>';


    res.writeHead(200, { 'Content-Type': 'application/xml' });
	
    res.write(xml) ;
    res.end();

    //wrangle up some variables so we can copy the message to our local system
    var url = req.body.RecordingUrl;
    var from = req.body.From.substring(1);
    var l = url.lastIndexOf('/')+1;
    var recfilename = url.substring(l);
    var path = '/Users/RSpence1/documents/node/vms/';
    var fname = path+from+'_'+recfilename+'.mp3';
  
     
    //copy the twillio voice mail to our local system
    request(req.body.RecordingUrl+'.mp3').pipe(fs.createWriteStream(fname));

};

