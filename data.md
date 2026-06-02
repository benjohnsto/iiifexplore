---
layout: json
---
         {% assign nodes = "" | split: "," %}
         {% assign edges = "" | split: "," %}
      
         {% for o in site.org %}
          {% assign nodes = nodes | push: o.title %}
          {% for t in o.tags %}
             {% assign t = t | downcase %}
	     {% assign nodes = nodes | push: t %}
	     {% capture edge %}{'source':{{t}}','target':'{{o.title}}'}{% endcapture %}
	     {% assign edges = edges | push: edge %}
	  {% endfor %}
	 {% endfor %} 
	 
 var nodes = {{nodes | jsonify}};
 var links = [
  {{edges | join: ","}}
]

