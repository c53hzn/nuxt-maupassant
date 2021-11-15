<template>
  <div class="comment-btn" :class="{'desk-comment-btn': isDesk, 'comment-btn-hidden': isHidden}">
		<i style="transform: translateY(-2px);" class="fa fa-commenting"></i>
  </div>
</template>

<script type="text/javascript">
export default {
	name: "Comment-Button",
	data() {
		return {
			isHidden: true
		}
	},
	props: {
		isDesk: {
			type: Boolean
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
<style type="text/css">
.comment-btn {
	position: fixed;
	right: 20px;
	bottom: 90px;
	padding-left: 6px;
	width: 38px;
	height: 38px;
	font-size: 24px;
	color: gray;
	background-color: rgba(249, 249, 249, 1);
	border: 1px solid gray;
	border-radius: 3px;
	cursor: pointer;
	opacity: 0.6;
	transition: opacity .3s;
	display: none;
}
.desk-comment-btn {
	display: block;
}
@media all and (max-width: 768px) {
	.comment-btn {
		display: block;
	}
}
.comment-btn:hover {
	opacity: 1;
}
.comment-btn-hidden {
	opacity: 0;
	display: none;
}
</style>