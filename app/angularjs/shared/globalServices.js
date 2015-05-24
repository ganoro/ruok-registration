angular.module('bzUtilities', [])
.service('metaSvc', function(){
	var title = '';
	var metaDescription = '';
	var metaKeywords = '';
	return {
		getTitle: function() { 
			return title; 
		},
		getMetaDescription: function() { 
			return metaDescription; 
		},
		getMetaKeywords: function() { 
			return metaKeywords; 
		},
		setTitle: function(newTitle) { 
			title = newTitle; 
		},
		setMetaDescription: function(description) {
			metaDescription = description;
		},
		setMetaKeywords: function(keywords) {
			metaKeywords = keywords;
		},
		resetTitle: function() {
			title = '';
		},
		resetMeta: function() {
			metaDescription = '';
			metaKeywords = '';
		},
	};
});