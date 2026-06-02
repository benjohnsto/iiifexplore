jQuery(document).ready(function(){


  var alltags = [];


  function show() {
    //var cards = shuffle(collections);
    var cards = collections;
    //cards = cards.slice(0,136);
    //console.log(cards);
    cards.forEach((card)=>{
      if(card.Rating > 0) {
      jQuery("#gallery").append(template(card));
      }
    });
    tagCloud();
  }
  
  function byTag(tag) {
    var cards = collections;
    jQuery("#gallery").empty();
    cards.forEach((card)=>{
      if(card.Rating > 0 && card.Tags.includes(tag)) {
          jQuery("#gallery").append(template(card));
      }
    });
  }
  
  function search(query) {
    var cards = collections;
    jQuery("#gallery").empty();
    cards.forEach((card)=>{
      if(card.Rating > 0 && (card.Pedagogy.includes(query) || card.Name.includes(query) || card.Tags.includes(query) )) {
          jQuery("#gallery").append(template(card));
      }
    });
  }  
  
  
function tagCloud() {
  var counts = {};
  var temp = [];
  console.log(alltags.sort());
  //alltags = sort(alltags);
  for(var i=0;i< alltags.length;i++)
  {
    var key = alltags[i];
    counts[key] = (counts[key])? counts[key] + 1 : 1;
  }
  //counts = sort(counts);
  for(i in counts) {
    counts[i] = 14 + (counts[i]*2) + "px";
    jQuery("#cloud").append("<a href='#' class='tag' rel='"+i+"' style='font-size:"+counts[i]+"'>"+i+"</a> ");
  }
   console.log(counts);
} 





  
function doTags(tags) {
  var t = tags.split(',');
  var e = [];
  var h = "<div class='tags'>";
  for(i in t) {
    alltags.push(t[i].trim())
    h += "<a href='#' class='tag' rel='"+t[i].trim()+"'>"+t[i].trim()+"</a>";
  }
  h += "</div>";
  return h;
}

function doRating(rating) {
  var h = "<div class='rating'>";
  for(var x=1;x<=rating;x++) {
    h += "<img src='https://icons.getbootstrap.com/assets/icons/star-fill.svg' style='height:16px'/> ";
  }
  h += "</div>";
  return h;
}
  
function template(o) {
  var icons = [];

  //if(o.InViewer) {   console.log(o);icons.push("<img src='assets/images/viewer.svg' class='icon'/>"); }
  
  //if(o.Detektiiif=='1') { icons.push("<img src='assets/images/detektiiif.webp' class='icon' title='only found with Detektiiif'/>"); }
  //if(o.inViewer=='1') { icons.push("<img src='assets/images/viewer.svg' class='icon' title='IIIF manifest link in Viewer only'/>"); }
  //if(o.IIIFLink=='1') { icons.push("<img src='assets/images/link.svg' class='icon' title='IIIF manifest link visible'/>"); }
  //if(o.IIIFLogo=='1') { icons.push("<img src='assets/images/iiif.svg' class='icon' title='IIIF Logo visible'/>"); }
  //console.log(o);
  var rating = doRating(o.Rating);
  //var tags = doTags(o.Tags);
  return `<div class="card">
     <div class="card-body">
        <h2><a href="${o.URL}" target="_blank">${o['Name']}</a></h2>
        <p>${o.Pedagogy}</p>      
        <p style="color:#666;font-size:0.7em;">${o.Notes}</p>  
        ${rating}              
        <p>${icons.join(' ')}</p>
     </div>
   </div>`;
}
  
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function sortMe(obj) {
  console.log(obj);
  var temp = [];
  for(var i in obj) {
    temp.push(i, obj[i]);
  }
  console.log(temp);
  //return temp;
/*
  const sorted = Object.entries(obj)
    .sort(([,a],[,b]) => a-b)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  return sorted;
*/
}


jQuery(document).on("click",'.tag',function(){
  var tag = jQuery(this).attr('rel');
  byTag(tag);
});

jQuery("#searchform").submit(function(e){
  var q = jQuery('#search').val();
  
  search(q);
  e.preventDefault();
});





show();


});
