---
layout: home
---

  <script>
         {% assign nodes = "" | split: "," %}
         {% assign edges = "" | split: "," %}
      
         {% for o in site.org %}
          {% assign nodes = nodes | push: o.title %}
          {% for t in o.tags %}
             {% assign t = t | downcase %}
	     {% assign nodes = nodes | push: t %}
	     {% capture edge %}{'source':"{{t | slugify}}",'target':"{{o.title}}|{{o.url}}"}{% endcapture %}
	     {% assign edges = edges | push: edge %}
	  {% endfor %}
	 {% endfor %} 
	 
 var nodes = {{nodes | jsonify}};
 var links = [
  {{edges | join: ","}}
]
  </script>


<div class="row">
      <div class="col-sm-9">
       
{% assign all_tags_string = "" %}

{% for o in site.org %}
  {% assign doc_tags_string = o.tags | join: '|' %}
  {% if all_tags_string == "" %}
      {% assign all_tags_string = doc_tags_string %}
  {% else %}
      {% assign all_tags_string = all_tags_string | append: '|' | append: doc_tags_string %}
  {% endif %}    
  {% assign all_tags_array = all_tags_string | split: '|' | sort %}
  {% assign unique_tags = all_tags_array | uniq %}
{% endfor %}



	<div id="cloud">
	  {% for tag in unique_tags %}
	  
	    {% comment %}
	      Count how many times this specific tag appears in the master array
	    {% endcomment %}
	    
	    {% assign tag_count = 0 %}
	    {% for raw_tag in all_tags_array %}
	      {% if raw_tag == tag %}
		{% assign tag_count = tag_count | plus: 1 %}
	      {% endif %}
	    {% endfor %}

	    {% comment %}
	      Display the tag and its count
	    {% endcomment %}
	    
	      <a href="{{site.baseurl}}/tag.html?tag={{ tag | slugify }}" rel="{{ tag | slugify }}" class="tag">
		{{ tag | slugify }} <span class="count">({{ tag_count }})</span>
	      </a>
	  {% endfor %}
	</div>

      </div>

      <div class="col-sm-3" id="list">
        
         {% for o in site.org %}
	  <a href="{{ site.baseurl }}{{ o.url }}"> {{ o.title }}</a> 
	  {% if o.error != "" %}<span style="color:red;font-weight:bold">{{o.error}}</span>{% endif %}<br />
	 {% endfor %}

      </div>

</div> <!-- /row -->

<script>

 jQuery(".tag").click(function(e){
   var rel = jQuery(this).attr('rel');
   jQuery("#list").empty();
   jQuery("#list").append("<h5>"+rel+"</h5>");
   for(var i in links) {
     if(links[i].source == rel) { 
       var targets = links[i].target.split("|");
       
       var link = `<a href="{{site.baseurl}}${targets[1]}">${targets[0]}</a><br />`;
       jQuery("#list").append(link);
       
     }
   }
   e.preventDefault();
 });
</script>


