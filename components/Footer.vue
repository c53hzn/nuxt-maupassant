<template>
  <footer>
    <p>Powered by Nuxt.js | Theme Maupassant <br>
    	Adapted by  
    	<a href="https://github.com/c53hzn" target="_blank" class="no-decor-link">
    		<strong>Jenny HOU</strong>
	    	<i class="fa fa-github font-20"></i>
	    </a>
    </p>
    <div class="go-top" @click="toTop" :class="{'go-top-hidden': isHidden}">
        <div class="arrow"></div>
        <div class="stick"></div>
    </div>
  </footer>
</template>

<script type="text/javascript">
export default {
	data() {
		return {
			isHidden: true
		}
	},
	methods: {
		toTop: function() {
			document.querySelector(".container-main").scrollIntoView({behavior: 'smooth'})
		}
	},
	mounted: function() {
		var that = this;
		if (process.client) {
			(function(w) {
				w.addEventListener("scroll", function(){
					if (w.scrollY > 199) {
						that.isHidden = false;
					} else {
						that.isHidden = true;
					}
				});
			})(window);
		}
	}
}
</script>
