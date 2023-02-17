$(document).ready(function(){
    var current_row=null;
    $("#add_record").click(function(){
      $("#modal_frm").modal();
    });
    
    $("#frm").submit(function(event){
      event.preventDefault();
      $.ajax({
        url:"../php/profile.php",
        type:"post",
        data:$("#frm").serialize(),
        beforeSend:function(){
          $("#frm").find("input[type='submit']").val('Loading...');
        },
        success:function(res){
          if(res){
            if($("#uid").val()=="0"){
              $("#tbody").append(res);
            }else{
              $(current_row).html(res);
            }
          }else{
            alert("Failed Try Again");
          }
          $("#frm").find("input[type='submit']").val('Submit');
          clear_input();
          $("#modal_frm").modal('hide');
        }
      });
    });
    
    $("body").on("click",".edit",function(event){
      event.preventDefault();
      current_row=$(this).closest("tr");
      $("#modal_frm").modal();
      var id=$(this).closest("tr").attr("uid");
      var name=$(this).closest("tr").find("td:eq(0)").text();
      var gender=$(this).closest("tr").find("td:eq(1)").text();
      var contact=$(this).closest("tr").find("td:eq(2)").text();
      
      $("#action").val("Update");
      $("#uid").val(id);
      $("#name").val(name);
      $("#gender").val(gender);
      $("#contact").val(contact);
    });
    
    $("body").on("click",".delete",function(event){
      event.preventDefault();
      var id=$(this).closest("tr").attr("uid");
      var cls=$(this);
      if(confirm("Are You Sure")){
        $.ajax({
          url:"../php/profile.php",
          type:"post",
          data:{uid:id,action:'Delete'},
          beforeSend:function(){
            $(cls).text("Loading...");
          },
          success:function(res){
            if(res){
              $(cls).closest("tr").remove();
            }else{
              alert("Failed TryAgain");
              $(cls).text("Try Again");
            }
          }
        });
      }
    });
    
    function clear_input(){
      $("#frm").find(".form-control").val("");
      $("#action").val("Insert");
      $("#uid").val("0");
    }
  });