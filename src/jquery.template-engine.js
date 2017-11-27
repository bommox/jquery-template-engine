(function ($) {
    var get = data => path => ("$." + path).split(".").reduce((a,b) => (typeof a === 'string') ? ({$:data})[a][b] : a[b]);
    
    var trim = text => (text !== undefined) ? ("" + text).trim() : "";
    var norma = text => trim(text).toLowerCase();
    
    // xTemplate core
    $.templateEngine = {}
    $.templateEngine._formatters = {}
    $.templateEngine.addFormatter = (name, formatter) => {
      $.templateEngine._formatters[norma(name)] = formatter
    }
    $.fn.templateEngine = function(data) {
      var init = +new Date()
      
      var _get = get(data);   
      
      var getData = function(key) {      
        var result = undefined;
        try { result = _get(key)} 
        catch (e){ /*console.error("Cannot get key " + key, data)*/ }
        return  result
      }
      window.getD = getData
  
      // Delete temp items
      $(this).find("[data-te-temp]").remove()
      // first expand loops
      $(this).find("[data-te-for]").each(function() {
        var forConfig = $(this).hide().data('te-for').split(" of ");
        var arrData = getData(forConfig[1]);
        var html = $(this).html();
        if (Array.isArray(arrData)) {
          for (var idx=arrData.length -1; idx>=0; idx--) {
            var $newItem = $(html).attr('data-te-temp', 'true');
            $newItem.data('te-for-index', idx)
            var origKey = $newItem.data('te-v');
            if (origKey) {
              $newItem.data('te-v', origKey.replace(forConfig[0] + ".", forConfig[1] + "." + idx + "."))
            } 
            $newItem.find("[data-te-v]").each(function() {
              var origKey = $(this).data('te-v');
              $(this).data('te-v', origKey.replace(forConfig[0] + ".", forConfig[1] + "." + idx + "."))
            })
            $(this).after($newItem);
          }
        }
  
      })
      // then conditionals
      $(this).find("[data-te-ifnot]").each(function(){
        $(this).hide()
        var cond = $(this).data('te-ifnot');
        var val = getData(cond);
        var show = false;
        if (!val ||
            Array.isArray(val) && val.length == 0) {
            show = true;
        }
        if (show) $(this).show()
      })
      
      // and then values
      $(this).find("[data-te-v]").each(function() {
        var _key = $(this).data('te-v');
        var key = trim(_key.split("|")[0])
        var value = getData(key);
        var formatter = $.templateEngine._formatters[norma(_key.split("|")[1])];
        if (formatter) {
          value = formatter(value)
        } 
        $(this).text(value || "@" + key);
      })
      
      //metrics
      var time = (+ new Date()) - init;
      if (console.debug) console.debug("Template in " + time + "ms")
    }
  })(jQuery)
  