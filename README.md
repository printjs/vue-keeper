# vue-keeper
event plus with vue.js
**vue-keeper uses its own event queue, and not the Vue itself.** 

##Installation 
npm install vue-keeper --save-dev

##how to import
```
import keeper from 'vue-keeper';
//or
var keeper = require('vue-keeper');

Vue.use(keeper);
```
If you use `<script>` to introduce vue-keeper. Can directly look at the next step.

##how to use
```
var vm = new Vue();

//register
Vue.keeper.on(listener-name,'event-example',function(info){});//Global use
vm.keeper.on(listener-name,'event-example',function(info){});//Instantiation use
created() {
  this.keeper.emit('event-example',"message");
  this.keeper.once(listener-name,'event-example',function(){
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
  this.keeper.off(listener-name);
}
```

##api
###on
```
Vue.keepr.on(listener-name,event,function(params,event-name){})
//params is not necessary.
//event-name is necessary
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
Vue.keepr.off(listener-name);
```
