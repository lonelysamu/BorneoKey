// Language Selector==========================================
    $("#lang_select").on("change",function() {
        var id=$("#lang_select").val();
        console.log("Selected : "+id);
    });

// Subject Selector===========================================
    $("#sub_sel").on("change",function() {
        var id=$("#sub_sel").val();
        console.log("Subject : "+id);
    });

// Subject Level Selector===========================================
    $("#sub_lvl_sel").on("change",function() {
        var id=$("#sub_lvl_sel").val();
        console.log("Subject Level : "+id);
    });

// Subject Method Selector===========================================
    $("#sub_method_sel").on("change",function() {
        var id=$("#sub_method_sel").val();
        console.log("Subject Method : "+id);
    });

// Subject Focus Selector===========================================
    $("#sub_focus_sel").on("change",function() {
        var id=$("#sub_focus_sel").val();
        console.log("Subject Focus : "+id);
    });

// Generate Questions===============================================
    $("#q_generate").on("click",function() {
        // Get Subject
            var s_id = Number.isInteger(parseInt($("#sub_sel").val())) ? $("#sub_sel").val() : 0;
        // Get Level
            var l_id = Number.isInteger(parseInt($("#sub_lvl_sel").val())) ? $("#sub_lvl_sel").val() : 0;
        // Get Method
            var m_id = Number.isInteger(parseInt($("#sub_method_sel").val())) ? $("#sub_method_sel").val() : 0;
        // Get Focus
            var f_id= Number.isInteger(parseInt($("#sub_focus_sel").val())) ? $("#sub_focus_sel").val() : 0;
        
        console.log("======================================");
        console.log("=       GENERATING QUESTIONS         =");
        console.log("======================================");
        console.log("1. Subject = " + s_id);
        console.log("2. Level = "   + l_id);
        console.log("3. Method = "  + m_id);
        console.log("4. Focus = "   + f_id);        
        console.log("======================================");
        
        var doc_id="";

            switch(parseInt(s_id)) {
                case 0:
                    doc_id = "";
                    break;
                case 1:
                    doc_id = "M"+l_id;
                    break;
                case 2:
                    doc_id = "Sc"+l_id;
                    break;
                case 3:
                    doc_id = "Eng"+l_id;
                    break;

            }
        console.log("Doc ID : "+doc_id);
        var questions = db.collection("subjects")
                          .doc(doc_id)
                          .get()
                          .then(function(qS) {
                              var data = qS.data();
                              prepareQuestions(m_id,f_id,data,1);
                          });
    });


    function prepareQuestions(_method,_focus,_data,_amount) {
        var q = _data.d_eq;
        q = JSON.parse(q);
        q = q.q;
        console.log(q);
        // txt variable to store questions (q) and solutions (s) generated
        var txt_q = "";
        var txt_s = "";

        // Generate _amount number of Questions
        for(var i = 0; i<_amount;i++) {
        // First get a random index from the banks list
            var idx = Math.floor(Math.random() * q.length);
            
        // Get the question and solution and rules (if any)

            var current_q =  q[idx].str;     
            var current_s =  q[idx].sol;     
            var current_r =  q[idx].rule;   
            
        // Replace the variables with values ---------------
            // Get variables 
                var var_types = q[idx].var.split(",");
                var var_val = Array(var_types.length);
                var diff = _data.d_diff.split(",");

            // Set variables
                for (var j = 0;j<var_types.length;j++) {
                    
                // A Variable Number-----------------------------------------------------------------------------------------
                    if(var_types[j].charAt(1) == "X") {
                        // Get a value between two values
                        var_val[j] = Math.floor(Math.random() * (10**diff[1])) + (10**(diff[0]-1));
                        // Checks rules in case got certain ones in place
                            if(var_types[j].charAt(2) == "2") {
                                switch(q[idx].rule) {
                                    case "":
                                        break;
                                    case ">":
                                        if(var_val[j] <= var_val[j-1]) {
                                            var_val[j] += (var_val[j-1]-var_val[j])+Math.floor(Math.random() * (10**diff[0]));
                                        }
                                        break;
                                    case "<":
                                        if(var_val[j] >= var_val[j-1]) {
                                            var_val[j] -= (var_val[j]-var_val[j-1])-Math.floor(Math.random() * (10**diff[0]));
                                        }
                                        break;
                                    case "=":
                                        if(var_val[j] !== var_val[j-1]) {
                                            var_val[j] = var_val[j-1];
                                        }
                                        break;

                                }
                            }
                        // Replaces for the answer-----
                        current_s = current_s.replace(var_types[j],var_val[j]);
                    }   
                    
                // A Variable Object-----------------------------------------------------------------------------------------
                    if(var_types[j].charAt(1) == "O") {
                        // Get a value between two values
                        if(var_types[j].length == 2) {
                            // Last one was random
                            if(var_types[j-1].charAt(1) == "O") {
                                var_val[j] = var_val[j-1];
                            } else {
                            // Random block
                                var_val[j] = obj_list[Math.floor(Math.random() * obj_list.length)]+'s';
                            }
                        }
                        // Checks rules in case got certain ones in place
                            if(var_types[j].charAt(2) == "2") {
                                if(var_val[j] == var_val[j-1]) {
                                    var_val[j] = obj_list[Math.floor(Math.random() * obj_list.length)]+'s';
                                }
                            } 
                    }  
                // A Variable Object-----------------------------------------------------------------------------------------
                    if(var_types[j].charAt(1) == "P") {
                        // Get a value between two values
                        var_val[j] = people_list[Math.floor(Math.random() * people_list.length)];
                        // Checks rules in case got certain ones in place
                            if(var_types[j].charAt(2) == "2") {
                                if(var_val[j] == var_val[j-1]) {
                                    var_val[j] = people_list[Math.floor(Math.random() * people_list.length)];
                                }
                            }
                }   
                
            // Replace the values received into the question
                current_q = current_q.replaceAll(var_types[j],var_val[j]);   
            
                            
            }

            current_q = current_q.replace("$ANS","____");
            txt_q += `  <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Question ${i+1}</h5>
                                <p class="card-text">${current_q}</div>
                            </div>
                        </div>                        
                        `;
            txt_s += `  <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Question ${i+1}</h5>
                                <p class="card-text">${current_s}</div>
                            </div>
                        </div>                        
                        `;
        }


        $("#questions").html(txt_q);
        $("#answers").html(txt_s);

    }