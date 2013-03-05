$(function() {
  $('#new_task').click(show_new_form);
  $('#cancel_task').click(hide_form);
  $('#create_task').click(new_task);
});

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
      data: {authenticity_token:token, 'task[priority_id]':priority_id,'task[is_complete]':is_complete, 'task[title]':title, 'task[description]':description, 'task[duedate]':'task[duedate]', 'task[address]':address}
    }).done(process_task);

  return false;
}

function process_task(task_list)
{
  _.each(task_list, add_task_to_array);
 // $('ul#tasks').empty();
  _.each(tasks, display_task);
}

function display_task(task)
{
  var li = $('<li>');
  var li1 = $('<li>');
  var li2 = $('<li>');
  var li3 = $('<li>');

  li.addClass('task_title');
  li1.addClass('task_detail');
  li2.addClass('task_detail');
  li3.addClass('task_detail');

  li.text(task.title);
  li1.text(task.description);
  li2.text(task.duedate);
  li3.text("Task complete?  " + task.is_complete);
  li.append([li, li1, li2, li3]);
  $('#tasks').append(li);

  add_marker(task.latitude, task.longitude, task.title);
  hide_form();
}

function add_task_to_array(task)
{
  tasks.push(task);
  tasks = _.sortBy(tasks, function(t){ return t.value;}).reverse();
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
