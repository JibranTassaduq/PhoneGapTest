
$(document).ready(function()
{
document.addEventListener('deviceready',onDeviceReady,false);
});
function onDeviceReady () {
// body...

if (localStorage.channel==null || localStorage.channel=='') 
  {

 $('#popupDialog').popup("open");
 console.log('iam here in if ');

  }else
  {

    var channel = localStorage.getItem('channel');
  }
//var channel = "TechGuyWeb";

  //$('#channelNameoptionsinput').attr('value','');

    getPlaylist(channel);
  
   $(document).on('click','#vidlist li',function()
    {
        showvideo($(this).attr('videoId'));
    });
   $('#channelBtnOk').click(function()
   {
      var channel = $('#channelName').val();
      setchannel(channel);
      getPlaylist(channel);

   });

   $('#saveoptions').click(function()
   {
       saveOptions();
   });
   $('#clearchannel').click(function()
   {
    clearChannel();
   });

$(document).on('pageinit' ,  '#options' , function(){

    var channel = localStorage.getItem('channel');
    var maxResults = localStorage.getItem('maxResults');
   // var channeln = "";
    //$('#channelNameoptionsinput').attr('value',channeln);
});

}

function getPlaylist(channel)
{

   $('#vidlist').html('');
   $.get(

    //"https://wwww.googleapis.com/youtube/v3/channels"
             //"https://developers.google.com/youtube/v3/guides/implementation/channels",
             "https://www.googleapis.com/youtube/v3/channels",
    {

    part:'contentDetails',
    forUsername: channel,
    key:'AIzaSyDNMvYEv3_eCfK2ObiRcuG5bPpiae3LN8M'

    },
    function(data)
    {
    console.log(data);
   $.each(data.items,function(i, item)
    {
    //console.log(item);
    playlistId = item.contentDetails.relatedPlaylists.uploads;
    getVideos(playlistId, localStorage.getItem('maxResults'));

    });
    }


    );
}

function getVideos(playlistId,maxResults)
{

   $.get(
    "https://www.googleapis.com/youtube/v3/playlistItems",
        {

        part:'snippet',
        maxResults:maxResults,
        playlistId:playlistId,
        key:'AIzaSyDNMvYEv3_eCfK2ObiRcuG5bPpiae3LN8M'
        },

        function(data)
        {
        //console.log(data);
        var output;
        $.each(data.items,function(i, item)
          {
            id = item.snippet.resourceId.videoId;
            title = item.snippet.title;
            thumb = item.snippet.thumbnails.default.url;
            $('#vidlist').append('<li videoId ="'+id+'"><img src = "'+thumb+'"><h3>'+title+'</h3></li>');
            $('vidlist').listview('refresh');
          });

        }

    );
}


function showvideo(id)
{
   console.log('Playing the video '+id);
   $('#logo').hide();
  var output = '<iframe width="100%" height = "250" src="https://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen></iframe>';
  //var output = '<iframe frameborder="0" width="100%" height="270" src="//www.dailymotion.com/embed/video/x3giyjf" allowfullscreen></iframe>';
  $('#showvideo').html(output); 
}
function setchannel(channel){
   localStorage.setItem('channel',channel);

}

function clearChannel(){
console.log('iam calling');
  localStorage.removeItem('channel');
  $('body').pagecontainer('change','#main',{options});
  //$('#vidlist').html('');
  //$("#vidlist").css({display: "none"});
  $('#popupDialog').popup('open');

}

function saveOptions(){
  var channel = $('#channelNameoptionsinput').val();
  setchannel(channel);
  var maxResults = $('#maxResultoptions').val();
  setMaxResults(maxResults);
  

    $('#channelNameoptionsinput').val('');
    $('#maxResultoptions').val('');

  $('body').pagecontainer('change','#main',{options});
 getPlaylist(channel);


}

function setMaxResults(maxResults)
{
    localStorage.setItem('maxResults',maxResults);


}



