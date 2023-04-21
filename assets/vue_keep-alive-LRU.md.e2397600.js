import{_ as e,c as a,o as s,a as l}from"./app.0bf84864.js";const k=JSON.parse('{"title":"keep-alive 与 LRU 算法","description":"","frontmatter":{},"headers":[{"level":2,"title":"keep-alive 中的生命周期哪些","slug":"keep-alive-中的生命周期哪些","link":"#keep-alive-中的生命周期哪些","children":[]},{"level":2,"title":"LRU 缓存算法","slug":"lru-缓存算法","link":"#lru-缓存算法","children":[]}],"relativePath":"vue/keep-alive-LRU.md","lastUpdated":1682074257000}'),n={name:"vue/keep-alive-LRU.md"},p=l(`<h1 id="keep-alive-与-lru-算法" tabindex="-1">keep-alive 与 LRU 算法 <a class="header-anchor" href="#keep-alive-与-lru-算法" aria-hidden="true">#</a></h1><ul><li>keep-alive 的实现原理是什么</li><li>与 keep-alive 相关的生命周期函数是什么，什么场景下会进行使用</li><li>keep-alive 的常用属性有哪些</li></ul><p>keep-alive 组件是 vue 的内置组件，用于缓存内部组件实例。这样做的目的在于，keep-alive 内部的组件切回时，不用重新创建组件实例，而直接使用缓存中的实例，一方面能够避免创建组件带来的开销，另一方面可以保留组件的状态。</p><p>keep-alive 具有 include 和 exclude 属性，通过它们可以控制哪些组件进入缓存。另外它还提供了 max 属性，通过它可以设置最大缓存数，当缓存的实例超过该数时，vue 会移除最久没有使用的组件缓存。</p><p>受 keep-alive 的影响，其内部所有嵌套的组件都具有两个生命周期钩子函数，分别是 activated 和 deactivated，它们分别在组件激活和失活时触发。第一次 activated 触发是在 mounted 之后</p><p>在具体的实现上，keep-alive 在内部维护了一个 key 数组和一个缓存对象</p><p>key 数组记录目前缓存的组件 key 值，如果组件没有指定 key 值，则会为其自动生成一个唯一的 key 值</p><p>cache 对象以 key 值为键，vnode 为值，用于缓存组件对应的虚拟 DOM</p><p>在 keep-alive 的渲染函数中，其基本逻辑是判断当前渲染的 vnode 是否有对应的缓存，如果有，从缓存中读取到对应的组件实例；如果没有则将其缓存。</p><p>当缓存数量超过 max 数值时，keep-alive 会移除掉 key 数组的第一个元素。</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#7F848E;font-style:italic;">// keep-alive 内部的声明周期函数</span></span>
<span class="line"><span style="color:#61AFEF;">created</span><span style="color:#ABB2BF;"> () {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">cache</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">Object</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">create</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">null</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">keys</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> []</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#6B737C;">// keep-alive 内部的声明周期函数</span></span>
<span class="line"><span style="color:#B392F0;">created () {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">this</span><span style="color:#B392F0;">.cache </span><span style="color:#F97583;">=</span><span style="color:#B392F0;"> </span><span style="color:#79B8FF;">Object</span><span style="color:#B392F0;">.create(</span><span style="color:#79B8FF;">null</span><span style="color:#B392F0;">)</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">this</span><span style="color:#B392F0;">.keys </span><span style="color:#F97583;">=</span><span style="color:#B392F0;"> []</span></span>
<span class="line"><span style="color:#B392F0;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="keep-alive-中的生命周期哪些" tabindex="-1">keep-alive 中的生命周期哪些 <a class="header-anchor" href="#keep-alive-中的生命周期哪些" aria-hidden="true">#</a></h2><p>keep-alive 是 Vue 提供的一个内置组件，用来对组件进行缓存——在组件切换过程中将状态保留在内存中，防止重复渲染 DOM。</p><p>如果为一个组件包裹了 keep-alive，那么它会多出两个生命周期：deactivated、activated。同时，beforeDestroy 和 destroyed 就不会再被触发了，因为组件不会被真正销毁。</p><p>当组件被换掉时，会被缓存到内存中、触发 deactivated 生命周期；当组件被切回来时，再去缓存里找这个组件、触发 activated 钩子函数。</p><h2 id="lru-缓存算法" tabindex="-1">LRU 缓存算法 <a class="header-anchor" href="#lru-缓存算法" aria-hidden="true">#</a></h2><p>TODO</p>`,17),o=[p];function t(c,r,i,d,B,y){return s(),a("div",null,o)}const u=e(n,[["render",t]]);export{k as __pageData,u as default};
