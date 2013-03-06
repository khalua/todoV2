$(function() {
  $('#new_task').click(show_new_form);
  $('#cancel_task').click(hide_form);
  $('#create_task').click(new_task);
  $('.delete').click(delete_task);
  $('input#is_complete').click(close_task);
 //$('input#is_complete').on('click', '.task_row', close_task);
  //$('.delete').on('click', 'tr', delete_task); -- not sure why this doesn't work

});

function close_task()
{
  var tr = $(this).parent().parent();
  tr.addClass('strikethrough');
  $('.task_row').last().after(tr);


}


function delete_task()
{
  var tr = $(this).parent().parent();
  var id = $(this).parent().next().text();
  var token = $('input[name=authenticity_token]').val();

  tr.fadeOut(800);
  //need to delete from array and map


  $.ajax({
      dataType: 'json',
      type: "post",
      url: "/tasks/" + id,
      data: { _method:'delete', authenticity_token:token }
    });

  return false;
}



function new_task()
{
  var is_complete = $('#is_complete').is(':checked');
  var priority_id = $('#priority_id').val();
  var title = $('#title').val();
  var description = $('#description').val();
  var duedate = $('#duedate').val();
  var address = $('#address').val();
  var token = $('input[name=authenticity_token]').val();

    $.ajax({
      dataType: 'json',
      type: "post",
      url: "/tasks",
      data: {authenticity_token:token, 'task[priority_id]':priority_id,'task[is_complete]':is_complete, 'task[title]':title, 'task[description]':description, 'task[duedate]':duedate, 'task[address]':address}
    }).done(process_task);

  return false;
}

function process_task(task_list)
{
 $('.task_row').remove();
  _.each(task_list, add_task_to_array);
  _.each(tasks, display_task);
}

function add_task_to_array(task)
{

  tasks = _.reject(tasks, function(t){return t.id == task.id;});
  task['value'] = task.priority.value;
  tasks.push(task);
  tasks = _.sortBy(tasks, function(t){ return t.value;}).reverse();
}


function display_task(task)
{
  var tr = $('<tr>');
  var td1 = $('<td>');
  var td2 = $('<td>');
  var td3 = $('<td>');
  var td4 = $('<td>');

  tr.addClass('task_row');
  td2.addClass('color');

  td1.html("<input id='is_complete' name='is_complete' type='checkbox' value='1'>");
  if (task.color === undefined)
      task.color = task.priority.color;
  td2.css('background-color', task.color);
  console.log("background-color: " + task.color );
  td3.text(task.title);
  td4.html("<a href='#' class='button radius tiny alert' id='delete_task'>Delete</a>");
  tr.append([td1, td2, td3, td4]);
  $('tr').last().after(tr);

  add_marker(task.latitude, task.longitude, task.title);
  hide_form();
}


function show_new_form()
{
  $('#update_task').hide();
  $('.form').show();
  $('#create_task').show();
  //$('#is_complete').val('');
  $('#title').val('');
  $('#description').val('');
    var date = moment().format("MM/DD/YYYY");
  $('#duedate').val(date);
  $('#address').val('');
  $('#title').focus();
}

function hide_form()
{
 $('.form').hide();
}

//// Map stuff ////
var map;

function display_map(lat, longitude, zoom)
{
  var mapOptions = {
    center: new google.maps.LatLng(lat, longitude),
    zoom: zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  canvas = $('#map_canvas')[0];
  map = new google.maps.Map(canvas, mapOptions);
}

function add_marker(lat, longitude, title)
{
  var latlng = new google.maps.LatLng(lat, longitude);
  var marker = new google.maps.Marker({position: latlng, map: map, title: title});
}
