// function disqus(disqus_shortname,PAGE_URL,PAGE_IDENTIFIER) {
// 	return `
// <div id="disqus_thread"></div>
// <script>
//     /**
//     *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
//     *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
//     /*
//     var disqus_config = function () {
//     this.page.url = ${PAGE_URL};  // Replace PAGE_URL with your page's canonical URL variable
//     this.page.identifier = ${PAGE_IDENTIFIER}; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
//     };
//     */
//     (function() { // DON'T EDIT BELOW THIS LINE
//     var d = document, s = d.createElement('script');
//     s.src = 'https://${disqus_shortname}.disqus.com/embed.js';
//     s.setAttribute('data-timestamp', +new Date());
//     (d.head || d.body).appendChild(s);
//     })();
// </script>
// <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
// `;
// }

function disqus(id) {
	var w = window;
	var d = document;
	var jsUrl = "https://hzn-website.000webhostapp.com/disqus/dist/iDisqus.min.js";
	var cssUrl = "https://hzn-website.000webhostapp.com/disqus/dist/iDisqus.min.css";
	addCss(cssUrl);
    addJs(jsUrl);
    addDisqusConfig();

    function addJs(url) {
		var s = d.createElement("script");
		s.src = url;
		d.querySelector("body").appendChild(s);
	}
	function addCss(url) {
		var l = d.createElement("link");
		l.rel = "stylesheet";
		l.href = url;
		d.querySelector("head").appendChild(l);
	}

	function addDisqusConfig() {
		var instance = w.iDisqus;
		if (instance) {
			var disq = new iDisqus(id, {
				forum: 'houzhenni-com',
				api: 'https://hzn-website.000webhostapp.com/disqus/api',
				site: 'https://www.houzhenni.com',
				mode: 1,
				timeout: 3000,
				init: true,
				autoCreate: false
			});
			return;
		} else {
			setTimeout(addDisqusConfig, 200);
		}
	}
}
module.exports = disqus;