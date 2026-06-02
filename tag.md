---
layout: tag
---

<script>
         {% assign tagcloud = "" | split: "," %}
      
         {% for o in site.org %}
	  {% for t in o.tags %}
	    {% assign tap = "" | split: "," %}
	    {% assign tap = tap | push: t %}
	    {% assign tap = tap | push: o.url %}
	    {% assign tap = tap | push: o.title %}
	    {% assign tagcloud = tagcloud | push: tap %}
	  {% endfor %}
	 {% endfor %}
	 
	 var tags = {{ tagcloud | jsonify}};
</script>


  
<div class="row">
      
      <div class="col-sm-12">
      
      <h1 id="tagtitle">The Tag</h1>

       <div id="results"></div>



      </div>
</div> <!-- /row -->


<script>

  var vars = getURLValues();
  if (typeof vars.tag !== 'undefined') {
     
	  var results = document.getElementById("results");
	  var tag = vars.tag;
	  jQuery("#tagtitle").text(tag);
	  for(i in tags) {
	    if(tags[i][0] == tag) { 
	       jQuery("#results").append(`<a href="{{site.baseurl}}${tags[i][1]}" class='tag'>${tags[i][2]}</a>`);
	    }
	  }


  }


  
    /*************************
     * get the url vars
     ***********************************/
   function getURLValues() {
        var search = window.location.search.replace(/^\?/, '').replace(/\+/g, ' ');
        var values = {};
        if (search.length) {
            var part, parts = search.split('&');

            for (var i = 0, iLen = parts.length; i < iLen; i++) {
                part = parts[i].split('=');
                values[part[0]] = window.decodeURIComponent(part[1]);
            }
        }
        return values;
    }  
</script>
