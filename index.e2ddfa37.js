class t extends Phaser.Scene{constructor(){super("gameScene")}init(t){this.mode=t.mode,this.velocityDelta=t.mode}preload(){this.hasWon=!1,this.collectedStars=0,this.secondsLeft=te[this.velocityDelta][1],this.load.image("sky","/gravity-stars/night-sky.png"),this.load.image("platform","/gravity-stars/platform.png"),this.load.image("ground","/gravity-stars/ground.png"),this.load.image("star","/gravity-stars/star.png"),this.load.animation("animationJson","/gravity-stars/data/animations.json"),this.load.spritesheet("dude","/gravity-stars/dude.png",{frameWidth:32,frameHeight:48}),this.score=tn()}cursorCreate(){this.cursors=this.input.keyboard.createCursorKeys(),this.optionCursors=this.input.keyboard.addKeys("P,R"),this.cursors.left.isDown?(this.player.setVelocityX(-80*(this.velocityDelta+4)),this.player.anims.play("left",!0)):this.cursors.right.isDown?(this.player.setVelocityX(80*(this.velocityDelta+4)),this.player.anims.play("right",!0)):(this.player.setVelocityX(0),this.player.anims.play("turn")),this.cursors.space.isDown&&(this.collectedStars>=4?this.player.setDrag(25*this.collectedStars):this.player.setDrag(125-25*this.velocityDelta)),this.cursors.space.isUp&&this.player.setDrag(0),this.cursors.up.isDown&&this.player.setVelocityY(-120*this.velocityDelta),this.cursors.down.isDown&&!this.player.body.touching.down&&this.player.setVelocityY(120*this.velocityDelta),this.optionCursors.P.isDown&&(this.scene.pause("gameScene"),this.scene.launch("pauseScene")),this.optionCursors.R.isDown&&this.scene.restart()}collectStar(t,e){e.disableBody(!0,!0),this.collectedStars+=1,this.scoreText.setText("Stars: "+this.collectedStars),15==this.collectedStars&&this.won()}won(){this.score[this.mode][0]++,ti(this.score),this.hasWon=!0,this.timedEvent.paused=!0,this.titleButton.setText("Finish!"),this.scoreText.setText("Planet's Gravity Restored!"),this.player.body.setGravityY(300),this.velocityDelta=3}reset(){15!==this.collectedStars&&(this.score[this.mode][1]++,ti(this.score),this.scene.stop("gameScene"),this.scene.start("meteorResultScene",{won:!1,secondsLeft:0,starsLeft:15-this.collectedStars,mode:this.mode}))}create(){this.add.image(450,550,"sky");let t=this.add.text(900,915,"Reset",{fill:tl,fontSize:"20px"});t.depth=10,t.setInteractive(),t.on("pointerdown",()=>this.scene.restart()),this.titleButton=this.add.text(775,915,"Title",{fill:tl,fontSize:"20px"}),this.titleButton.depth=10,this.titleButton.setInteractive(),this.titleButton.on("pointerdown",()=>{this.hasWon?4==this.mode&&0==th(this.score).length?(this.scene.stop("gameScene"),this.scene.start("endingScene")):(this.scene.stop("gameScene"),this.scene.start("meteorResultScene",{won:!0,secondsLeft:this.secondsLeft,starsLeft:0,mode:this.mode})):(this.scene.stop("gameScene"),this.scene.start("titleScene"))}),this.level=this.add.text(10,915,te[this.velocityDelta][0]+" Level!",{fill:tl,fontSize:"20px"}),this.level.depth=10,this.platforms=this.physics.add.staticGroup(),this.platforms.create(500,925,"ground"),this.platforms.create(600,750,"platform"),this.platforms.create(50,550,"platform"),this.platforms.create(850,325,"platform"),this.platforms.create(1050,100,"platform"),this.player=this.physics.add.sprite(100,650,"dude"),this.player.setBounce(.1),this.player.setCollideWorldBounds(!0),this.player.body.setGravityY(-300),this.physics.add.collider(this.player,this.platforms,()=>this.reset(this.player)),this.stars=this.physics.add.group({key:"star",repeat:14,setXY:{x:12,y:0,stepX:70}}),this.physics.add.collider(this.stars,this.platforms),this.physics.add.collider(this.stars,this.ground),this.physics.add.overlap(this.player,this.stars,this.collectStar,null,this),this.scoreText=this.add.text(16,16,"Stars: 0",{fontSize:"32px",fill:tl,backgroundColor:"#060d29"}),this.scoreText.setPadding(10),this.timedEvent=this.time.delayedCall(te[this.velocityDelta][1],this.reset,[],this),this.timer=this.add.text(375,915,"You have: ",{fontSize:"20px",fill:"#ff5338"})}update(){this.cursorCreate(),this.hasWon||(this.secondsLeft=this.timedEvent.getRemainingSeconds().toFixed(0),this.timer.setText(`You have: ${this.timedEvent.getRemainingSeconds().toFixed(0)} seconds`))}}class e extends Phaser.Scene{constructor(){super("optionsScene")}preload(){this.score=tn(),this.saveFile=to()}back(){this.scene.stop("optionsScene"),this.scene.start("titleScene")}startStoryline(){this.scene.stop("titleScene"),this.scene.start("storyScene")}updateRecord(){this.record.setText(`
    Easy: Won: ${this.score[1][0]}, Died: ${this.score[1][1]}

    Normal: Won: ${this.score[2][0]}, Died: ${this.score[2][1]}
    
    Hard: Won: ${this.score[3][0]}, Died: ${this.score[3][1]}
    
    Impossible: Won: ${this.score[4][0]}, Died: ${this.score[4][1]}`)}create(){this.add.image(450,550,"background"),this.add.text(350,250,"Options and Stats!",{fontSize:"32px"}),this.add.text(350,350,"Stats:",{fill:tl,fontSize:"25px"}),this.recordText=`
    Easy: Won: ${this.score[1][0]}, Died: ${this.score[1][1]}

    Normal: Won: ${this.score[2][0]}, Died: ${this.score[2][1]}
    
    Hard: Won: ${this.score[3][0]}, Died: ${this.score[3][1]}
    
    Impossible: Won: ${this.score[4][0]}, Died: ${this.score[4][1]}`,this.record=this.add.text(350,375,this.recordText,{fill:tl,fontSize:"20px"}),this.add.text(350,600,"Options:",{fill:tl,fontSize:"25px"}),this.add.text(375,650,"Clear Save",{fill:tf,fontSize:"20px"}).setInteractive().on("pointerdown",()=>{confirm("Do you REALLY want to clear your save?")&&confirm("Last chance, wiping your save irreversible!")&&(ts(),this.saveFile=to(),this.score=tn(),this.updateRecord())}),this.add.text(550,650,"Copy and Enter Save",{fill:tf,fontSize:"20px"}).setInteractive().on("pointerdown",()=>{let t=prompt("Please enter your save file!",this.saveFile);t&&(ta(t),this.saveFile=to(),this.score=tn(),this.updateRecord())}),this.add.text(375,700,"Toggle Music",{fill:tf,fontSize:"20px"}).setInteractive().on("pointerdown",()=>{this.sound.isPlaying("theme")?this.sound.pauseAll():this.sound.resumeAll()});let t=this.add.text(875,915,"Storyline",{fill:tf,fontSize:"20px"});t.setInteractive(),t.on("pointerdown",()=>this.startStoryline());let e=this.add.text(10,915,"Title",{fill:tf,fontSize:"20px"});e.setInteractive(),e.on("pointerdown",()=>this.back())}}class r extends Phaser.Scene{constructor(){super("pauseScene")}back(){this.scene.stop("pauseScene"),this.scene.start("gameScene")}create(){let t=this.cameras.main.worldView.x+this.cameras.main.width/2,e=this.cameras.main.worldView.y+this.cameras.main.height/2;this.add.image(450,550,"background"),this.add.text(t,e-30,"Paused!",{fill:tl,fontSize:"50px"}).setOrigin(.5),this.add.text(t-20,e+30,"Back",{fill:tf,fontSize:"32px"}).setInteractive().on("pointerdown",()=>this.back()).setOrigin(.5)}}class i extends Phaser.Scene{constructor(){super("storyScene")}back(){this.scene.stop("storyScene"),this.scene.start("titleScene")}startOptions(){this.scene.stop("storyScene"),this.scene.start("optionsScene")}create(){this.add.image(450,550,"background"),this.add.text(400,250,"Storyline!",{fontSize:"32px"}),this.add.text(250,350,`Your friend's grandfather Dennis Hope is looking for a successor to his moon, as your friend doesn't care he came to you.

To be a great successor you need to take care when a gravity defying meteor hits the moon. Four of them is about to hit your planet; collect all the stars to reset the gravity to save your planet but do it QUICKLY.

You need save your planet against Small, Medium, Large, Giant meteors. For each meteor, the time and braking power decreases and your speed increases.

Prove your self to conquer the MOON!`,{fill:tl}).setWordWrapWidth(600),this.add.text(10,915,"Options and Stats",{fill:tf,fontSize:"20px"}).setInteractive().on("pointerdown",()=>this.startOptions()),this.add.text(915,915,"Title",{fill:tf,fontSize:"20px"}).setInteractive().on("pointerdown",()=>this.back())}}class n extends Phaser.Scene{constructor(){super("titleScene")}preload(){this.score=tn(),this.load.image("background","/gravity-stars/background.png"),this.load.audio("theme","/gravity-stars/theme_full.ogg")}startGame(t){this.scene.stop("titleScene"),this.scene.start("gameScene",{mode:t})}startOptions(){this.scene.stop("titleScene"),this.scene.start("optionsScene")}startStoryline(){this.scene.stop("titleScene"),this.scene.start("storyScene")}create(){this.sound.get("theme")||this.sound.isPlaying("theme")||(this.music=this.sound.play("theme",{loop:!0})),this.add.image(450,550,"background"),this.add.text(400,250,"Gravity Stars!",{fontSize:"32px"}),[325,425,550,650].forEach((t,e)=>{let r=!1;e+1!==1&&0==this.score[e][0]&&(r=!0);let i=r?"#8a929c":tf;this.add.text(t,350,`${te[e+1][0]}!`,{fill:i}).setInteractive().on("pointerdown",()=>{r||this.startGame(e+1)})}),this.add.text(250,400,"You are a purple dude with a jetpack.\nDo NOT touch the ground; Collect all stars to win that meteor! Finish all meteors to conquer the MOON!\n\nEach meteor increases the speed and decreases braking power.\nEvery star you collect gives you more braking power.\n\nArrow Keys - Control\nSpace - Brakes\nP - Pause\nR - Reset\n\n\nCredits:\n  Game Author and Art - themeowingsage\n  Music - Flo\n  Player and Star Art - Phaser",{fill:tl}).setWordWrapWidth(600);let t=this.add.text(10,915,"Options and Stats",{fill:tf,fontSize:"20px"});t.setInteractive(),t.on("pointerdown",()=>this.startOptions());let e=this.add.text(875,915,"Storyline",{fill:tf,fontSize:"20px"});e.setInteractive(),e.on("pointerdown",()=>this.startStoryline())}}class s extends Phaser.Scene{constructor(){super("meteorResultScene")}init(t){this.won=t.won,this.secondsLeft=t.secondsLeft,this.starsLeft=t.starsLeft,this.mode=t.mode}startTitle(){this.scene.stop("meteorResultScene"),this.scene.start("titleScene")}startNewGame(){this.scene.stop("meteorResultScene"),this.scene.start("gameScene",{mode:this.won?this.mode+1:this.mode})}create(){this.add.image(450,550,"background"),this.add.text(350,350,this.won?"YOU WON!":"You lost :P",{fill:tl,fontSize:"45px"}),this.add.text(375,425,"Title",{fill:tf,fontSize:"20px"}).setInteractive().on("pointerdown",()=>this.startTitle()),this.add.text(475,425,this.won?"Next Meteor":"Play Again",{fill:tf,fontSize:"20px"}).setInteractive().on("pointerdown",()=>this.startNewGame()),this.add.text(375,475,this.won?`with JUST ${this.secondsLeft} seconds left!`:`you had ${this.starsLeft} stars to collect.`,{fill:tl,fontSize:"20px"})}}class o extends Phaser.Scene{constructor(){super("endingScene")}preload(){this.nearRocket=!1,this.load.image("ending-background","/gravity-stars/ending-background.png"),this.load.image("moon","/gravity-stars/moon.png"),this.load.image("rocket","/gravity-stars/rocket.png"),this.load.image("flag","/gravity-stars/flag.png")}startTitle(){this.scene.stop("endingScene"),this.scene.start("titleScene")}create(){this.add.image(500,450,"ending-background"),this.add.text(125,150,"Moon successfully conquered!",{fill:tl,fontSize:"45px"}),this.add.text(175,225,"A impressed Dennis Hope hands you the moon's papers and his rocket, but now the U.S. government is coming for it- Part 2 is yet to come.",{fill:tl,fontSize:"20px"}).setWordWrapWidth(600),this.moon=this.physics.add.staticImage(450,675,"moon"),this.rocket=this.physics.add.staticImage(325,422,"rocket"),this.flag=this.physics.add.staticImage(575,425,"flag"),this.add.text(275,650,"Press G at the rocket to leave!",{fill:tl,fontSize:"20px"}),this.player=this.physics.add.sprite(500,425,"dude"),this.player.setBounce(.8),this.player.setCollideWorldBounds(!0),this.player.body.setGravityY(50),this.physics.add.collider(this.player,this.moon)}update(){this.physics.overlapCirc(325,422,10).length>0?this.nearRocket=!0:this.nearRocket=!1,this.cursors=this.input.keyboard.createCursorKeys(),this.optionCursors=this.input.keyboard.addKeys("G"),this.cursors.left.isDown?(this.player.setVelocityX(-560),this.player.anims.play("left",!0)):this.cursors.right.isDown?(this.player.setVelocityX(560),this.player.anims.play("right",!0)):(this.player.setVelocityX(0),this.player.anims.play("turn")),this.optionCursors.G.isDown&&this.nearRocket&&(this.scene.stop("endingScene"),this.scene.start("titleScene")),this.cursors.up.isDown&&this.player.setVelocityY(-360),this.cursors.down.isDown&&!this.player.body.touching.down&&this.player.setVelocityY(360)}}a=function(t){var e,r,i=function(t){var e=t.length;if(e%4>0)throw Error("Invalid string. Length must be a multiple of 4");var r=t.indexOf("=");-1===r&&(r=e);var i=r===e?0:4-r%4;return[r,i]}(t),n=i[0],s=i[1],o=new p((n+s)*3/4-s),a=0,h=s>0?n-4:n;for(r=0;r<h;r+=4)e=c[t.charCodeAt(r)]<<18|c[t.charCodeAt(r+1)]<<12|c[t.charCodeAt(r+2)]<<6|c[t.charCodeAt(r+3)],o[a++]=e>>16&255,o[a++]=e>>8&255,o[a++]=255&e;return 2===s&&(e=c[t.charCodeAt(r)]<<2|c[t.charCodeAt(r+1)]>>4,o[a++]=255&e),1===s&&(e=c[t.charCodeAt(r)]<<10|c[t.charCodeAt(r+1)]<<4|c[t.charCodeAt(r+2)]>>2,o[a++]=e>>8&255,o[a++]=255&e),o},h=function(t){for(var e,r=t.length,i=r%3,n=[],s=0,o=r-i;s<o;s+=16383)n.push(function(t,e,r){for(var i,n=[],s=e;s<r;s+=3)n.push(u[(i=(t[s]<<16&0xff0000)+(t[s+1]<<8&65280)+(255&t[s+2]))>>18&63]+u[i>>12&63]+u[i>>6&63]+u[63&i]);return n.join("")}(t,s,s+16383>o?o:s+16383));return 1===i?n.push(u[(e=t[r-1])>>2]+u[e<<4&63]+"=="):2===i&&n.push(u[(e=(t[r-2]<<8)+t[r-1])>>10]+u[e>>4&63]+u[e<<2&63]+"="),n.join("")};for(var a,h,f,l,u=[],c=[],p="undefined"!=typeof Uint8Array?Uint8Array:Array,d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",y=0,g=d.length;y<g;++y)u[y]=d[y],c[d.charCodeAt(y)]=y;c["-".charCodeAt(0)]=62,c["_".charCodeAt(0)]=63,f=function(t,e,r,i,n){var s,o,a=8*n-i-1,h=(1<<a)-1,f=h>>1,l=-7,u=r?n-1:0,c=r?-1:1,p=t[e+u];for(u+=c,s=p&(1<<-l)-1,p>>=-l,l+=a;l>0;s=256*s+t[e+u],u+=c,l-=8);for(o=s&(1<<-l)-1,s>>=-l,l+=i;l>0;o=256*o+t[e+u],u+=c,l-=8);if(0===s)s=1-f;else{if(s===h)return o?NaN:1/0*(p?-1:1);o+=Math.pow(2,i),s-=f}return(p?-1:1)*o*Math.pow(2,s-i)},l=function(t,e,r,i,n,s){var o,a,h,f=8*s-n-1,l=(1<<f)-1,u=l>>1,c=5960464477539062e-23*(23===n),p=i?0:s-1,d=i?1:-1,y=+(e<0||0===e&&1/e<0);for(isNaN(e=Math.abs(e))||e===1/0?(a=+!!isNaN(e),o=l):(o=Math.floor(Math.log(e)/Math.LN2),e*(h=Math.pow(2,-o))<1&&(o--,h*=2),o+u>=1?e+=c/h:e+=c*Math.pow(2,1-u),e*h>=2&&(o++,h/=2),o+u>=l?(a=0,o=l):o+u>=1?(a=(e*h-1)*Math.pow(2,n),o+=u):(a=e*Math.pow(2,u-1)*Math.pow(2,n),o=0));n>=8;t[r+p]=255&a,p+=d,a/=256,n-=8);for(o=o<<n|a,f+=n;f>0;t[r+p]=255&o,p+=d,o/=256,f-=8);t[r+p-d]|=128*y};const m="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;function w(t){if(t>0x7fffffff)throw RangeError('The value "'+t+'" is invalid for option "size"');let e=new Uint8Array(t);return Object.setPrototypeOf(e,b.prototype),e}function b(t,e,r){if("number"==typeof t){if("string"==typeof e)throw TypeError('The "string" argument must be of type string. Received type number');return x(t)}return S(t,e,r)}function S(t,e,r){if("string"==typeof t)return function(t,e){if(("string"!=typeof e||""===e)&&(e="utf8"),!b.isEncoding(e))throw TypeError("Unknown encoding: "+e);let r=0|A(t,e),i=w(r),n=i.write(t,e);return n!==r&&(i=i.slice(0,n)),i}(t,e);if(ArrayBuffer.isView(t))return function(t){if(H(t,Uint8Array)){let e=new Uint8Array(t);return B(e.buffer,e.byteOffset,e.byteLength)}return E(t)}(t);if(null==t)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(H(t,ArrayBuffer)||t&&H(t.buffer,ArrayBuffer)||"undefined"!=typeof SharedArrayBuffer&&(H(t,SharedArrayBuffer)||t&&H(t.buffer,SharedArrayBuffer)))return B(t,e,r);if("number"==typeof t)throw TypeError('The "value" argument must not be of type number. Received type number');let i=t.valueOf&&t.valueOf();if(null!=i&&i!==t)return b.from(i,e,r);let n=function(t){var e;if(b.isBuffer(t)){let e=0|I(t.length),r=w(e);return 0===r.length||t.copy(r,0,0,e),r}return void 0!==t.length?"number"!=typeof t.length||(e=t.length)!=e?w(0):E(t):"Buffer"===t.type&&Array.isArray(t.data)?E(t.data):void 0}(t);if(n)return n;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return b.from(t[Symbol.toPrimitive]("string"),e,r);throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function v(t){if("number"!=typeof t)throw TypeError('"size" argument must be of type number');if(t<0)throw RangeError('The value "'+t+'" is invalid for option "size"')}function x(t){return v(t),w(t<0?0:0|I(t))}function E(t){let e=t.length<0?0:0|I(t.length),r=w(e);for(let i=0;i<e;i+=1)r[i]=255&t[i];return r}function B(t,e,r){let i;if(e<0||t.byteLength<e)throw RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(r||0))throw RangeError('"length" is outside of buffer bounds');return Object.setPrototypeOf(i=void 0===e&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,e):new Uint8Array(t,e,r),b.prototype),i}function I(t){if(t>=0x7fffffff)throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes");return 0|t}function A(t,e){if(b.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||H(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);let r=t.length,i=arguments.length>2&&!0===arguments[2];if(!i&&0===r)return 0;let n=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return V(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return X(t).length;default:if(n)return i?-1:V(t).length;e=(""+e).toLowerCase(),n=!0}}function U(t,e,r){let i=!1;if((void 0===e||e<0)&&(e=0),e>this.length||((void 0===r||r>this.length)&&(r=this.length),r<=0||(r>>>=0)<=(e>>>=0)))return"";for(t||(t="utf8");;)switch(t){case"hex":return function(t,e,r){let i=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>i)&&(r=i);let n="";for(let i=e;i<r;++i)n+=K[t[i]];return n}(this,e,r);case"utf8":case"utf-8":return L(this,e,r);case"ascii":return function(t,e,r){let i="";r=Math.min(t.length,r);for(let n=e;n<r;++n)i+=String.fromCharCode(127&t[n]);return i}(this,e,r);case"latin1":case"binary":return function(t,e,r){let i="";r=Math.min(t.length,r);for(let n=e;n<r;++n)i+=String.fromCharCode(t[n]);return i}(this,e,r);case"base64":var n,s;return n=e,s=r,0===n&&s===this.length?h(this):h(this.slice(n,s));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(t,e,r){let i=t.slice(e,r),n="";for(let t=0;t<i.length-1;t+=2)n+=String.fromCharCode(i[t]+256*i[t+1]);return n}(this,e,r);default:if(i)throw TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),i=!0}}function R(t,e,r){let i=t[e];t[e]=t[r],t[r]=i}function T(t,e,r,i,n){var s;if(0===t.length)return -1;if("string"==typeof r?(i=r,r=0):r>0x7fffffff?r=0x7fffffff:r<-0x80000000&&(r=-0x80000000),(s=r*=1)!=s&&(r=n?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(n)return -1;r=t.length-1}else if(r<0){if(!n)return -1;r=0}if("string"==typeof e&&(e=b.from(e,i)),b.isBuffer(e))return 0===e.length?-1:O(t,e,r,i,n);if("number"==typeof e)return(e&=255,"function"==typeof Uint8Array.prototype.indexOf)?n?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):O(t,[e],r,i,n);throw TypeError("val must be string, number or Buffer")}function O(t,e,r,i,n){let s,o=1,a=t.length,h=e.length;if(void 0!==i&&("ucs2"===(i=String(i).toLowerCase())||"ucs-2"===i||"utf16le"===i||"utf-16le"===i)){if(t.length<2||e.length<2)return -1;o=2,a/=2,h/=2,r/=2}function f(t,e){return 1===o?t[e]:t.readUInt16BE(e*o)}if(n){let i=-1;for(s=r;s<a;s++)if(f(t,s)===f(e,-1===i?0:s-i)){if(-1===i&&(i=s),s-i+1===h)return i*o}else -1!==i&&(s-=s-i),i=-1}else for(r+h>a&&(r=a-h),s=r;s>=0;s--){let r=!0;for(let i=0;i<h;i++)if(f(t,s+i)!==f(e,i)){r=!1;break}if(r)return s}return -1}function L(t,e,r){r=Math.min(t.length,r);let i=[],n=e;for(;n<r;){let e=t[n],s=null,o=e>239?4:e>223?3:e>191?2:1;if(n+o<=r){let r,i,a,h;switch(o){case 1:e<128&&(s=e);break;case 2:(192&(r=t[n+1]))==128&&(h=(31&e)<<6|63&r)>127&&(s=h);break;case 3:r=t[n+1],i=t[n+2],(192&r)==128&&(192&i)==128&&(h=(15&e)<<12|(63&r)<<6|63&i)>2047&&(h<55296||h>57343)&&(s=h);break;case 4:r=t[n+1],i=t[n+2],a=t[n+3],(192&r)==128&&(192&i)==128&&(192&a)==128&&(h=(15&e)<<18|(63&r)<<12|(63&i)<<6|63&a)>65535&&h<1114112&&(s=h)}}null===s?(s=65533,o=1):s>65535&&(s-=65536,i.push(s>>>10&1023|55296),s=56320|1023&s),i.push(s),n+=o}return function(t){let e=t.length;if(e<=4096)return String.fromCharCode.apply(String,t);let r="",i=0;for(;i<e;)r+=String.fromCharCode.apply(String,t.slice(i,i+=4096));return r}(i)}function k(t,e,r){if(t%1!=0||t<0)throw RangeError("offset is not uint");if(t+e>r)throw RangeError("Trying to access beyond buffer length")}function C(t,e,r,i,n,s){if(!b.isBuffer(t))throw TypeError('"buffer" argument must be a Buffer instance');if(e>n||e<s)throw RangeError('"value" argument is out of bounds');if(r+i>t.length)throw RangeError("Index out of range")}function $(t,e,r,i,n){W(e,i,n,t,r,7);let s=Number(e&BigInt(0xffffffff));t[r++]=s,s>>=8,t[r++]=s,s>>=8,t[r++]=s,s>>=8,t[r++]=s;let o=Number(e>>BigInt(32)&BigInt(0xffffffff));return t[r++]=o,o>>=8,t[r++]=o,o>>=8,t[r++]=o,o>>=8,t[r++]=o,r}function P(t,e,r,i,n){W(e,i,n,t,r,7);let s=Number(e&BigInt(0xffffffff));t[r+7]=s,s>>=8,t[r+6]=s,s>>=8,t[r+5]=s,s>>=8,t[r+4]=s;let o=Number(e>>BigInt(32)&BigInt(0xffffffff));return t[r+3]=o,o>>=8,t[r+2]=o,o>>=8,t[r+1]=o,o>>=8,t[r]=o,r+8}function D(t,e,r,i,n,s){if(r+i>t.length||r<0)throw RangeError("Index out of range")}function z(t,e,r,i,n){return e*=1,r>>>=0,n||D(t,e,r,4,34028234663852886e22,-34028234663852886e22),l(t,e,r,i,23,4),r+4}function _(t,e,r,i,n){return e*=1,r>>>=0,n||D(t,e,r,8,17976931348623157e292,-17976931348623157e292),l(t,e,r,i,52,8),r+8}b.TYPED_ARRAY_SUPPORT=function(){try{let t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),42===t.foo()}catch(t){return!1}}(),b.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(b.prototype,"parent",{enumerable:!0,get:function(){if(b.isBuffer(this))return this.buffer}}),Object.defineProperty(b.prototype,"offset",{enumerable:!0,get:function(){if(b.isBuffer(this))return this.byteOffset}}),b.poolSize=8192,b.from=function(t,e,r){return S(t,e,r)},Object.setPrototypeOf(b.prototype,Uint8Array.prototype),Object.setPrototypeOf(b,Uint8Array),b.alloc=function(t,e,r){return(v(t),t<=0)?w(t):void 0!==e?"string"==typeof r?w(t).fill(e,r):w(t).fill(e):w(t)},b.allocUnsafe=function(t){return x(t)},b.allocUnsafeSlow=function(t){return x(t)},b.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==b.prototype},b.compare=function(t,e){if(H(t,Uint8Array)&&(t=b.from(t,t.offset,t.byteLength)),H(e,Uint8Array)&&(e=b.from(e,e.offset,e.byteLength)),!b.isBuffer(t)||!b.isBuffer(e))throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;let r=t.length,i=e.length;for(let n=0,s=Math.min(r,i);n<s;++n)if(t[n]!==e[n]){r=t[n],i=e[n];break}return r<i?-1:+(i<r)},b.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},b.concat=function(t,e){let r;if(!Array.isArray(t))throw TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return b.alloc(0);if(void 0===e)for(r=0,e=0;r<t.length;++r)e+=t[r].length;let i=b.allocUnsafe(e),n=0;for(r=0;r<t.length;++r){let e=t[r];if(H(e,Uint8Array))n+e.length>i.length?(b.isBuffer(e)||(e=b.from(e)),e.copy(i,n)):Uint8Array.prototype.set.call(i,e,n);else if(b.isBuffer(e))e.copy(i,n);else throw TypeError('"list" argument must be an Array of Buffers');n+=e.length}return i},b.byteLength=A,b.prototype._isBuffer=!0,b.prototype.swap16=function(){let t=this.length;if(t%2!=0)throw RangeError("Buffer size must be a multiple of 16-bits");for(let e=0;e<t;e+=2)R(this,e,e+1);return this},b.prototype.swap32=function(){let t=this.length;if(t%4!=0)throw RangeError("Buffer size must be a multiple of 32-bits");for(let e=0;e<t;e+=4)R(this,e,e+3),R(this,e+1,e+2);return this},b.prototype.swap64=function(){let t=this.length;if(t%8!=0)throw RangeError("Buffer size must be a multiple of 64-bits");for(let e=0;e<t;e+=8)R(this,e,e+7),R(this,e+1,e+6),R(this,e+2,e+5),R(this,e+3,e+4);return this},b.prototype.toString=function(){let t=this.length;return 0===t?"":0==arguments.length?L(this,0,t):U.apply(this,arguments)},b.prototype.toLocaleString=b.prototype.toString,b.prototype.equals=function(t){if(!b.isBuffer(t))throw TypeError("Argument must be a Buffer");return this===t||0===b.compare(this,t)},b.prototype.inspect=function(){let t="";return t=this.toString("hex",0,50).replace(/(.{2})/g,"$1 ").trim(),this.length>50&&(t+=" ... "),"<Buffer "+t+">"},m&&(b.prototype[m]=b.prototype.inspect),b.prototype.compare=function(t,e,r,i,n){if(H(t,Uint8Array)&&(t=b.from(t,t.offset,t.byteLength)),!b.isBuffer(t))throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===i&&(i=0),void 0===n&&(n=this.length),e<0||r>t.length||i<0||n>this.length)throw RangeError("out of range index");if(i>=n&&e>=r)return 0;if(i>=n)return -1;if(e>=r)return 1;if(e>>>=0,r>>>=0,i>>>=0,n>>>=0,this===t)return 0;let s=n-i,o=r-e,a=Math.min(s,o),h=this.slice(i,n),f=t.slice(e,r);for(let t=0;t<a;++t)if(h[t]!==f[t]){s=h[t],o=f[t];break}return s<o?-1:+(o<s)},b.prototype.includes=function(t,e,r){return -1!==this.indexOf(t,e,r)},b.prototype.indexOf=function(t,e,r){return T(this,t,e,r,!0)},b.prototype.lastIndexOf=function(t,e,r){return T(this,t,e,r,!1)},b.prototype.write=function(t,e,r,i){var n,s,o,a,h,f,l,u;if(void 0===e)i="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)i=e,r=this.length,e=0;else if(isFinite(e))e>>>=0,isFinite(r)?(r>>>=0,void 0===i&&(i="utf8")):(i=r,r=void 0);else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let c=this.length-e;if((void 0===r||r>c)&&(r=c),t.length>0&&(r<0||e<0)||e>this.length)throw RangeError("Attempt to write outside buffer bounds");i||(i="utf8");let p=!1;for(;;)switch(i){case"hex":return function(t,e,r,i){let n;r=Number(r)||0;let s=t.length-r;i?(i=Number(i))>s&&(i=s):i=s;let o=e.length;for(i>o/2&&(i=o/2),n=0;n<i;++n){let i=parseInt(e.substr(2*n,2),16);if(i!=i)break;t[r+n]=i}return n}(this,t,e,r);case"utf8":case"utf-8":return n=e,s=r,q(V(t,this.length-n),this,n,s);case"ascii":case"latin1":case"binary":return o=e,a=r,q(function(t){let e=[];for(let r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(t),this,o,a);case"base64":return h=e,f=r,q(X(t),this,h,f);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return l=e,u=r,q(function(t,e){let r,i;let n=[];for(let s=0;s<t.length&&!((e-=2)<0);++s)i=(r=t.charCodeAt(s))>>8,n.push(r%256),n.push(i);return n}(t,this.length-l),this,l,u);default:if(p)throw TypeError("Unknown encoding: "+i);i=(""+i).toLowerCase(),p=!0}},b.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},b.prototype.slice=function(t,e){let r=this.length;t=~~t,e=void 0===e?r:~~e,t<0?(t+=r)<0&&(t=0):t>r&&(t=r),e<0?(e+=r)<0&&(e=0):e>r&&(e=r),e<t&&(e=t);let i=this.subarray(t,e);return Object.setPrototypeOf(i,b.prototype),i},b.prototype.readUintLE=b.prototype.readUIntLE=function(t,e,r){t>>>=0,e>>>=0,r||k(t,e,this.length);let i=this[t],n=1,s=0;for(;++s<e&&(n*=256);)i+=this[t+s]*n;return i},b.prototype.readUintBE=b.prototype.readUIntBE=function(t,e,r){t>>>=0,e>>>=0,r||k(t,e,this.length);let i=this[t+--e],n=1;for(;e>0&&(n*=256);)i+=this[t+--e]*n;return i},b.prototype.readUint8=b.prototype.readUInt8=function(t,e){return t>>>=0,e||k(t,1,this.length),this[t]},b.prototype.readUint16LE=b.prototype.readUInt16LE=function(t,e){return t>>>=0,e||k(t,2,this.length),this[t]|this[t+1]<<8},b.prototype.readUint16BE=b.prototype.readUInt16BE=function(t,e){return t>>>=0,e||k(t,2,this.length),this[t]<<8|this[t+1]},b.prototype.readUint32LE=b.prototype.readUInt32LE=function(t,e){return t>>>=0,e||k(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+0x1000000*this[t+3]},b.prototype.readUint32BE=b.prototype.readUInt32BE=function(t,e){return t>>>=0,e||k(t,4,this.length),0x1000000*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},b.prototype.readBigUInt64LE=J(function(t){G(t>>>=0,"offset");let e=this[t],r=this[t+7];(void 0===e||void 0===r)&&Y(t,this.length-8);let i=e+256*this[++t]+65536*this[++t]+0x1000000*this[++t],n=this[++t]+256*this[++t]+65536*this[++t]+0x1000000*r;return BigInt(i)+(BigInt(n)<<BigInt(32))}),b.prototype.readBigUInt64BE=J(function(t){G(t>>>=0,"offset");let e=this[t],r=this[t+7];(void 0===e||void 0===r)&&Y(t,this.length-8);let i=0x1000000*e+65536*this[++t]+256*this[++t]+this[++t],n=0x1000000*this[++t]+65536*this[++t]+256*this[++t]+r;return(BigInt(i)<<BigInt(32))+BigInt(n)}),b.prototype.readIntLE=function(t,e,r){t>>>=0,e>>>=0,r||k(t,e,this.length);let i=this[t],n=1,s=0;for(;++s<e&&(n*=256);)i+=this[t+s]*n;return i>=(n*=128)&&(i-=Math.pow(2,8*e)),i},b.prototype.readIntBE=function(t,e,r){t>>>=0,e>>>=0,r||k(t,e,this.length);let i=e,n=1,s=this[t+--i];for(;i>0&&(n*=256);)s+=this[t+--i]*n;return s>=(n*=128)&&(s-=Math.pow(2,8*e)),s},b.prototype.readInt8=function(t,e){return(t>>>=0,e||k(t,1,this.length),128&this[t])?-((255-this[t]+1)*1):this[t]},b.prototype.readInt16LE=function(t,e){t>>>=0,e||k(t,2,this.length);let r=this[t]|this[t+1]<<8;return 32768&r?0xffff0000|r:r},b.prototype.readInt16BE=function(t,e){t>>>=0,e||k(t,2,this.length);let r=this[t+1]|this[t]<<8;return 32768&r?0xffff0000|r:r},b.prototype.readInt32LE=function(t,e){return t>>>=0,e||k(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},b.prototype.readInt32BE=function(t,e){return t>>>=0,e||k(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},b.prototype.readBigInt64LE=J(function(t){G(t>>>=0,"offset");let e=this[t],r=this[t+7];return(void 0===e||void 0===r)&&Y(t,this.length-8),(BigInt(this[t+4]+256*this[t+5]+65536*this[t+6]+(r<<24))<<BigInt(32))+BigInt(e+256*this[++t]+65536*this[++t]+0x1000000*this[++t])}),b.prototype.readBigInt64BE=J(function(t){G(t>>>=0,"offset");let e=this[t],r=this[t+7];return(void 0===e||void 0===r)&&Y(t,this.length-8),(BigInt((e<<24)+65536*this[++t]+256*this[++t]+this[++t])<<BigInt(32))+BigInt(0x1000000*this[++t]+65536*this[++t]+256*this[++t]+r)}),b.prototype.readFloatLE=function(t,e){return t>>>=0,e||k(t,4,this.length),f(this,t,!0,23,4)},b.prototype.readFloatBE=function(t,e){return t>>>=0,e||k(t,4,this.length),f(this,t,!1,23,4)},b.prototype.readDoubleLE=function(t,e){return t>>>=0,e||k(t,8,this.length),f(this,t,!0,52,8)},b.prototype.readDoubleBE=function(t,e){return t>>>=0,e||k(t,8,this.length),f(this,t,!1,52,8)},b.prototype.writeUintLE=b.prototype.writeUIntLE=function(t,e,r,i){if(t*=1,e>>>=0,r>>>=0,!i){let i=Math.pow(2,8*r)-1;C(this,t,e,r,i,0)}let n=1,s=0;for(this[e]=255&t;++s<r&&(n*=256);)this[e+s]=t/n&255;return e+r},b.prototype.writeUintBE=b.prototype.writeUIntBE=function(t,e,r,i){if(t*=1,e>>>=0,r>>>=0,!i){let i=Math.pow(2,8*r)-1;C(this,t,e,r,i,0)}let n=r-1,s=1;for(this[e+n]=255&t;--n>=0&&(s*=256);)this[e+n]=t/s&255;return e+r},b.prototype.writeUint8=b.prototype.writeUInt8=function(t,e,r){return t*=1,e>>>=0,r||C(this,t,e,1,255,0),this[e]=255&t,e+1},b.prototype.writeUint16LE=b.prototype.writeUInt16LE=function(t,e,r){return t*=1,e>>>=0,r||C(this,t,e,2,65535,0),this[e]=255&t,this[e+1]=t>>>8,e+2},b.prototype.writeUint16BE=b.prototype.writeUInt16BE=function(t,e,r){return t*=1,e>>>=0,r||C(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=255&t,e+2},b.prototype.writeUint32LE=b.prototype.writeUInt32LE=function(t,e,r){return t*=1,e>>>=0,r||C(this,t,e,4,0xffffffff,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t,e+4},b.prototype.writeUint32BE=b.prototype.writeUInt32BE=function(t,e,r){return t*=1,e>>>=0,r||C(this,t,e,4,0xffffffff,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},b.prototype.writeBigUInt64LE=J(function(t,e=0){return $(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))}),b.prototype.writeBigUInt64BE=J(function(t,e=0){return P(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))}),b.prototype.writeIntLE=function(t,e,r,i){if(t*=1,e>>>=0,!i){let i=Math.pow(2,8*r-1);C(this,t,e,r,i-1,-i)}let n=0,s=1,o=0;for(this[e]=255&t;++n<r&&(s*=256);)t<0&&0===o&&0!==this[e+n-1]&&(o=1),this[e+n]=(t/s>>0)-o&255;return e+r},b.prototype.writeIntBE=function(t,e,r,i){if(t*=1,e>>>=0,!i){let i=Math.pow(2,8*r-1);C(this,t,e,r,i-1,-i)}let n=r-1,s=1,o=0;for(this[e+n]=255&t;--n>=0&&(s*=256);)t<0&&0===o&&0!==this[e+n+1]&&(o=1),this[e+n]=(t/s>>0)-o&255;return e+r},b.prototype.writeInt8=function(t,e,r){return t*=1,e>>>=0,r||C(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=255&t,e+1},b.prototype.writeInt16LE=function(t,e,r){return t*=1,e>>>=0,r||C(this,t,e,2,32767,-32768),this[e]=255&t,this[e+1]=t>>>8,e+2},b.prototype.writeInt16BE=function(t,e,r){return t*=1,e>>>=0,r||C(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=255&t,e+2},b.prototype.writeInt32LE=function(t,e,r){return t*=1,e>>>=0,r||C(this,t,e,4,0x7fffffff,-0x80000000),this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4},b.prototype.writeInt32BE=function(t,e,r){return t*=1,e>>>=0,r||C(this,t,e,4,0x7fffffff,-0x80000000),t<0&&(t=0xffffffff+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},b.prototype.writeBigInt64LE=J(function(t,e=0){return $(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),b.prototype.writeBigInt64BE=J(function(t,e=0){return P(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),b.prototype.writeFloatLE=function(t,e,r){return z(this,t,e,!0,r)},b.prototype.writeFloatBE=function(t,e,r){return z(this,t,e,!1,r)},b.prototype.writeDoubleLE=function(t,e,r){return _(this,t,e,!0,r)},b.prototype.writeDoubleBE=function(t,e,r){return _(this,t,e,!1,r)},b.prototype.copy=function(t,e,r,i){if(!b.isBuffer(t))throw TypeError("argument should be a Buffer");if(r||(r=0),i||0===i||(i=this.length),e>=t.length&&(e=t.length),e||(e=0),i>0&&i<r&&(i=r),i===r||0===t.length||0===this.length)return 0;if(e<0)throw RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw RangeError("Index out of range");if(i<0)throw RangeError("sourceEnd out of bounds");i>this.length&&(i=this.length),t.length-e<i-r&&(i=t.length-e+r);let n=i-r;return this===t&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(e,r,i):Uint8Array.prototype.set.call(t,this.subarray(r,i),e),n},b.prototype.fill=function(t,e,r,i){let n;if("string"==typeof t){if("string"==typeof e?(i=e,e=0,r=this.length):"string"==typeof r&&(i=r,r=this.length),void 0!==i&&"string"!=typeof i)throw TypeError("encoding must be a string");if("string"==typeof i&&!b.isEncoding(i))throw TypeError("Unknown encoding: "+i);if(1===t.length){let e=t.charCodeAt(0);("utf8"===i&&e<128||"latin1"===i)&&(t=e)}}else"number"==typeof t?t&=255:"boolean"==typeof t&&(t=Number(t));if(e<0||this.length<e||this.length<r)throw RangeError("Out of range index");if(r<=e)return this;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(n=e;n<r;++n)this[n]=t;else{let s=b.isBuffer(t)?t:b.from(t,i),o=s.length;if(0===o)throw TypeError('The value "'+t+'" is invalid for argument "value"');for(n=0;n<r-e;++n)this[n+e]=s[n%o]}return this};const N={};function M(t,e,r){N[t]=class extends r{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${t}]`,this.stack,delete this.name}get code(){return t}set code(t){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:t,writable:!0})}toString(){return`${this.name} [${t}]: ${this.message}`}}}function F(t){let e="",r=t.length,i=+("-"===t[0]);for(;r>=i+4;r-=3)e=`_${t.slice(r-3,r)}${e}`;return`${t.slice(0,r)}${e}`}function W(t,e,r,i,n,s){if(t>r||t<e){let i;let n="bigint"==typeof e?"n":"";throw i=s>3?0===e||e===BigInt(0)?`>= 0${n} and < 2${n} ** ${(s+1)*8}${n}`:`>= -(2${n} ** ${(s+1)*8-1}${n}) and < 2 ** ${(s+1)*8-1}${n}`:`>= ${e}${n} and <= ${r}${n}`,new N.ERR_OUT_OF_RANGE("value",i,t)}G(n,"offset"),(void 0===i[n]||void 0===i[n+s])&&Y(n,i.length-(s+1))}function G(t,e){if("number"!=typeof t)throw new N.ERR_INVALID_ARG_TYPE(e,"number",t)}function Y(t,e,r){if(Math.floor(t)!==t)throw G(t,r),new N.ERR_OUT_OF_RANGE(r||"offset","an integer",t);if(e<0)throw new N.ERR_BUFFER_OUT_OF_BOUNDS;throw new N.ERR_OUT_OF_RANGE(r||"offset",`>= ${+!!r} and <= ${e}`,t)}M("ERR_BUFFER_OUT_OF_BOUNDS",function(t){return t?`${t} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError),M("ERR_INVALID_ARG_TYPE",function(t,e){return`The "${t}" argument must be of type number. Received type ${typeof e}`},TypeError),M("ERR_OUT_OF_RANGE",function(t,e,r){let i=`The value of "${t}" is out of range.`,n=r;return Number.isInteger(r)&&Math.abs(r)>0x100000000?n=F(String(r)):"bigint"==typeof r&&(n=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(n=F(n)),n+="n"),i+=` It must be ${e}. Received ${n}`},RangeError);const j=/[^+/0-9A-Za-z-_]/g;function V(t,e){let r;e=e||1/0;let i=t.length,n=null,s=[];for(let o=0;o<i;++o){if((r=t.charCodeAt(o))>55295&&r<57344){if(!n){if(r>56319||o+1===i){(e-=3)>-1&&s.push(239,191,189);continue}n=r;continue}if(r<56320){(e-=3)>-1&&s.push(239,191,189),n=r;continue}r=(n-55296<<10|r-56320)+65536}else n&&(e-=3)>-1&&s.push(239,191,189);if(n=null,r<128){if((e-=1)<0)break;s.push(r)}else if(r<2048){if((e-=2)<0)break;s.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;s.push(r>>12|224,r>>6&63|128,63&r|128)}else if(r<1114112){if((e-=4)<0)break;s.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}else throw Error("Invalid code point")}return s}function X(t){return a(function(t){if((t=(t=t.split("=")[0]).trim().replace(j,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function q(t,e,r,i){let n;for(n=0;n<i&&!(n+r>=e.length)&&!(n>=t.length);++n)e[n+r]=t[n];return n}function H(t,e){return t instanceof e||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===e.name}const K=function(){let t="0123456789abcdef",e=Array(256);for(let r=0;r<16;++r){let i=16*r;for(let n=0;n<16;++n)e[i+n]=t[r]+t[n]}return e}();function J(t){return"undefined"==typeof BigInt?Q:t}function Q(){throw Error("BigInt not supported")}const Z={type:Phaser.AUTO,scale:{autoCenter:Phaser.Scale.CENTER_BOTH,width:1e3,height:949},physics:{default:"arcade",arcade:{gravity:{y:300},debug:!1}}},tt=new Phaser.Game(Z);tt.scene.add("gameScene",t),tt.scene.add("titleScene",n),tt.scene.add("optionsScene",e),tt.scene.add("storyScene",i),tt.scene.add("meteorResultScene",s),tt.scene.add("pauseScene",r),tt.scene.add("endingScene",o),tt.scene.start("titleScene");const te={1:["Small",35e3],2:["Medium",3e4],3:["Large",25e3],4:["Giant",2e4]},tr={1:[0,0],2:[0,0],3:[0,0],4:[0,0]},ti=t=>{ta(b.from(JSON.stringify(t)).toString("base64"))},tn=()=>{let t;return to()?t=JSON.parse(b.from(to(),"base64").toString()):ti(t=tr),t},ts=()=>{ti(tr)},to=()=>localStorage.getItem("saveFile"),ta=t=>{localStorage.setItem("saveFile",t)},th=t=>Object.entries(t).filter(([t,e])=>0===e[0]).map(([t])=>t),tf="#5399f5",tl="#fff";
//# sourceMappingURL=index.e2ddfa37.js.map
