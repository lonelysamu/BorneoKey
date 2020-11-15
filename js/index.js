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
            var s_id = $("#sub_sel").val();
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
    });