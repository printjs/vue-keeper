# vue-keeper
event plus with vue.js
**vue-keeper uses its own event queue, and not the Vue itself.** 

##Installation 
npm install vue-keeper --save-dev

##how to import
```
import keeper from 'vue-keeper';
//or
var keeper  = require('vue-keeper');

Vue.use(keeper);
```
If you use `<script>` to introduce vue-keeper. Can directly look at the next step.

##how to use
```
var vm = new Vue();

//register
Vue.keeper.on('event-example',function(info){});//Global use
vm.keeper.on('event-example',function(info){});//Instantiation use
created() {
  this.keeper.on('event-example', this.addTodo);
  this.keeper.once('event-example',function(){
    console.log('This event will only trigger once')
  });
}

//trigger
Vue.keeper.emit('event-example',"message");//Global use
vm.keeper.emit("event-example","message");//Instantiation use

methods: {
  trigger:function(message) {
    this.keeper.emit("event-example",message);
  }
}

//destory
beforeDestroy() {
  this.keeper.off('event-example');
}
```

##api
###on
```
Vue.keepr.on(event,function(params){})
//params is not necessary.
```
###once
Ditto，this event will only trigger once

###emit
```
Vue.keepr.emit(event,params);
//params is not necessary.
```
###off
```
Vue.keepr.off(event);
```
