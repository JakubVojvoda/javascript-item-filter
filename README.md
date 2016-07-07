# javascript-item-filter
Simple item filter in JavaScript

## Usage:
1. include file `filter.js` in HTML head element
2. call function `filterList(x)`, where `x` is array of object properties:
⋅⋅* `name`: class name of attribute to filter
⋅⋅* `type`: type of attribute (`str` for string type, `num` for numeric type and `enum` for enumeration type)
⋅⋅* e.g. `x = [{name:"nazov", type:"str"}, {name:"cena", type:"num"}, {name:"autor", type:"enum"}]`
3. optional style definition by editing and calling function `styleForm()` 
