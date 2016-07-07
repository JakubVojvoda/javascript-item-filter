/*
 * Simple item filter in JavaScript
 * author: Jakub Vojvoda, vojvoda@swdeveloper.sk
 * 2015
 * 
 * file: filter.js 
 * 
 */

function isInInterval(from, to, number) 
{  
  return (from < number && number < to);
}

function isSubstring(str, sub) 
{  
  return (str.toLowerCase().search(sub.toLowerCase()) != -1);
}

function checkedOptions(options) 
{  
  var list = [];

  for (var i = 0; i < options.length; i++) {
    
    if (options[i].checked)
      list.push(options[i].value);
  }
  
  return list;  
}

function filtering(x) 
{
  var items = document.getElementsByClassName("item");
  var element;

  var form = document.forms["filter"];
  var empty = true;
  
  for (var i = 0; i < form.length; i++) {
        
    if ((form[i].type == "text" && form[i].value != null && form[i].value != "") || 
        (form[i].type == "checkbox" && form[i].checked) || 
        (form[i].type == "number" && form[i].value != "")) {
      
      empty = false;
      break;
    }          
  }
  
  for (var i = 0; i < items.length; i++) {
    
    if (empty) {          
      items[i].style.display = "inline-block";
      continue;
    }    
    
    items[i].style.display = "inline-block";
    
    for (var j = 0; j < x.length; j++) {      
      element = items[i].getElementsByClassName(x[j].name);
      
      for (var k = 0; k < element.length; k++) {        
        if (x[j].type == "str") {           
          if (!isSubstring(element[k].textContent, form[x[j].name].value))
            items[i].style.display = "none";
        }          
        else if (x[j].type == "enum") {            
          var list = checkedOptions(form[x[j].name]);
          
          if (list.length < 1)
            continue;
          
          var contains = false;
          
          for (var l = 0; l < list.length; l++) {              
            if (element[k].textContent == list[l])
              contains = true;
          }
          
          if (!contains)
            items[i].style.display = "none";
        } 
        else if (x[j].type == "num") {            
          var from = Number.NEGATIVE_INFINITY;
          var to = Number.POSITIVE_INFINITY;
          
          if (form[x[j].name + "_from"].value != null && form[x[j].name + "_from"].value != "")
            from = parseFloat(form[x[j].name + "_from"].value);
          
          if (form[x[j].name + "_to"].value != null && form[x[j].name + "_to"].value != "")
            to = parseFloat(form[x[j].name + "_to"].value);
          
          if (!isInInterval(from, to, parseFloat(element[k].textContent))) {
            items[i].style.display = "none";
          }
        }          
      }
    }    
  }
  
  return;
}

function filterList(x) {
  var form = document.createElement("form");
  form.setAttribute("name", "filter");
  form.setAttribute("action", "javascript:void(0);");
  form.setAttribute("onsubmit", "filtering(x)");
  form.setAttribute("method", "post");
  form.setAttribute("class", "filter");

  for (var i = 0; i < x.length; i++) {
    
    if (x[i]["type"] == "str") {
      
      var title = document.createElement("span");
      title.setAttribute("class", "input-title-text");
      title.innerHTML = x[i]["name"] + ": ";
      
      var text = document.createElement("input");
      text.setAttribute("type", "text");
      text.setAttribute("name", x[i]["name"]);
      text.setAttribute("class", "filter-text-input");
      
      form.appendChild(title);
      form.appendChild(text);
      
      form.appendChild(document.createElement("br"));         
    }     
    else if (x[i]["type"] == "enum") {
          
      var title = document.createElement("span");
      title.setAttribute("class", "input-title-text");
      title.innerHTML = x[i]["name"] + ": ";
      
      form.appendChild(title);
      
      var v = document.getElementsByClassName(x[i]["name"]);  
      var values = [];
      
      for (var idx = 0; idx < v.length; idx++) {        
        if (values.indexOf(v[idx].textContent) == -1)
          values.push(v[idx].textContent);
      }
      
      values.sort();
      
      for (var index = 0; index < values.length; index++) {        
        var box = document.createElement("input");
        box.setAttribute("type", "checkbox");
        box.setAttribute("name", x[i]["name"]);
        box.setAttribute("value", values[index]);
        box.setAttribute("class", "filter-checkbox-input");
        
        var name = document.createElement("span");
        name.setAttribute("class", "checkbox-text");
        name.innerHTML = values[index];
        
        form.appendChild(box);
        form.appendChild(name);
      }
      
      form.appendChild(document.createElement("br"));         
    }
    
    else if (x[i]["type"] == "num") {
      var title = document.createElement("span");
      title.setAttribute("class", "input-title-text");
      title.innerHTML = x[i]["name"] + ": ";
      
      var from = document.createElement("input");
      from.setAttribute("type", "number");
      from.setAttribute("name", x[i]["name"] + "_from");
      from.setAttribute("class", "filter-number-input");
      
      var to = document.createElement("input");
      to.setAttribute("type", "number");
      to.setAttribute("name", x[i]["name"] + "_to");
      to.setAttribute("class", "filter-number-input");
      
      form.appendChild(title);
      form.appendChild(from);
      form.appendChild(to);
      
      form.appendChild(document.createElement("br"));         
    }
    else {      
      alert("filter: wrong argument type " + x[i]["type"] + " of " + x[i]["name"]);
    }
    
  }

  var button = document.createElement("input");
  button.setAttribute("type", "submit");
  button.setAttribute("value", "Filter");
  button.setAttribute("class", "filter-button");
  form.appendChild(button);

  var reset = document.createElement("input");
  reset.setAttribute("type", "submit");
  reset.setAttribute("onclick", "resetForm(x)");
  reset.setAttribute("value", "Reset");
  reset.setAttribute("class", "filter-button");
  form.appendChild(reset);
  
  form.appendChild(document.createElement("br"));         
  
  document.body.insertBefore(form, document.body.childNodes[0]);
}

function resetForm(x) {
  
  document.getElementsByName("filter")[0].reset();
  filtering(x);
}

function styleForm() {  
  var css_style = 
  ".input-title-text " +
  "  { margin-top: 5px; display: block; color: #055A85; " + 
  "  font-weight: bold; text-transform: capitalize;} " +
  ".filter-text-input " +
  "  { width: 211px; border: 1px solid #055A85; margin: 5px; padding: 2px 0;}" +
  ".filter-number-input " +
  "  { text-align: center; width: 99px; border: 1px solid #055A85; " + 
  "  margin: 5px; padding: 2px 0; }" +
  ".filter-checkbox-input " +
  "  { outline: 1px solid #055A85; margin: 5px; color: #055A85; }" +
  ".checkbox-text " +
  "  { margin-right: 5px; color: #05293B; font-style: italic; }" +
  ".filter-button " + 
  "  { border: 1px solid #055A85; background-color: #055A85; margin: 20px 5px; " +
  "  color: white; font-weight: bold; padding: 5px 15px; }" +
  ".filter-button:hover " + 
  "  { cursor: pointer; color: #D0E4F2; }" + 
  ".filter-button:active " + 
  "  { outline: dotted #055A85; }";
  
  var style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.innerHTML = css_style;
  document.getElementsByTagName("head")[0].appendChild(style);
}
