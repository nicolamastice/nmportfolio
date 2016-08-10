(function($){

  var count = 0;
  var projectContent = [
    { title: 'ARTEFIERA', description: 'Artefiera is the major Italian art fair hosted every year in the city of Bologna. In occasion of his opening party I was ask to realize the identity and the visual of the event. The whole concept had to turn around the topic of sustainability and the promotion of eco-friendly products.'},
    { title: 'DIEGO DALLA PALMA', description: 'Diego dalla Palma, a major Italian brand of beauty products, wanted to launch a new line of cosmetic creams that were created using natural essences. The communication then, was built around the relationship between the plants that provide the active ingredients and the colours that characterize the whole line'},
    { title: 'COMUNE DI PERUGIA', description: 'Project commissioned by Perugia City Council to promote a series of historical documentaries about life in the city during the first decades of the twentieth century. To match the title of the event, “Black and White Perugia”, different frames of the films were converted on a set of optical style illustrations that aimed to convey the feeling of the event.'},
    { title: 'EMERGENCY', description: 'The humanitarian NGO Emergency every year select a number of graphic designers, illustrators and artists to take part of a project aimed to raise funds for the charity. In my case, I was called to realize an illustration related to the costs of the wars in regards of the younger population.'},
    { title: 'DIRTY DROP RECORDS', description: 'Branding and cover art realized for the Italian music producer Dj Scapo in occurrence of the launch of his latest Ep “16 Beats”, which is heavily infused by synthesizers samplings and funk music sonorities.'},
    { title: 'KETEL ONE', description: 'Ketel One, a very known dutch brand of vodka, wanted to realize an interactive infographic that could help the users of his website to create their own brunch and match it with a suggested vodka cocktail. For the project I was ask to create the user interface and the communication banners.'},
    { title: 'SHISHAAH!', description: 'Packaging design for a note brand of electronic cigarettes.'},
  ];



  $.fn.twentytwenty = function(options) {
    var options = $.extend({default_offset_pct: 0.5, orientation: 'horizontal'}, options);
    return this.each(function() {

      var sliderPct = options.default_offset_pct;
      var container = $(this);
      var sliderOrientation = options.orientation;
      var beforeDirection = (sliderOrientation === 'vertical') ? 'down' : 'left';
      var afterDirection = (sliderOrientation === 'vertical') ? 'up' : 'right';


      container.wrap("<div class='twentytwenty-wrapper twentytwenty-" + sliderOrientation + "'></div>");
      container.append("<div class='twentytwenty-overlay'></div>");
      var beforeImg = container.find("img:first");
      var afterImg = container.find("img:last");
      container.append("<div class='twentytwenty-handle'></div>");
      var slider = container.find(".twentytwenty-handle");
      slider.append("<span class='twentytwenty-" + beforeDirection + "-arrow'></span>");
      slider.append("<span class='twentytwenty-" + afterDirection + "-arrow'></span>");
      container.addClass("twentytwenty-container");
      beforeImg.addClass("twentytwenty-before");
      afterImg.addClass("twentytwenty-after");

      var overlay = container.find(".twentytwenty-overlay");
      //overlay.append("<div class='twentytwenty-before-label'></div>");
      //overlay.append("<div class='twentytwenty-after-label'></div>");
      overlay.append("<div class='project-description'><h2>" + projectContent[count].title + "</h2><p>" + projectContent[count].description + "</p></div>");

      count++;

      var calcOffset = function(dimensionPct) {
        var w = beforeImg.width();
        var h = beforeImg.height();
        return {
          w: w+"px",
          h: h+"px",
          cw: (dimensionPct*w)+"px",
          ch: (dimensionPct*h)+"px"
        };
      };

      var adjustContainer = function(offset) {
      	if (sliderOrientation === 'vertical') {
      	  beforeImg.css("clip", "rect(0,"+offset.w+","+offset.ch+",0)");
      	}
      	else {
          beforeImg.css("clip", "rect(0,"+offset.cw+","+offset.h+",0)");
    	}
        container.css("height", offset.h);
      };

      var adjustSlider = function(pct) {
        var offset = calcOffset(pct);
        slider.css((sliderOrientation==="vertical") ? "top" : "left", (sliderOrientation==="vertical") ? offset.ch : offset.cw);
        adjustContainer(offset);
      }

      $(window).on("resize.twentytwenty", function(e) {
        adjustSlider(sliderPct);
      });

      var offsetX = 0;
      var imgWidth = 0;

      slider.on("movestart", function(e) {
        if (((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) && sliderOrientation !== 'vertical') {
          e.preventDefault();
        }
        else if (((e.distX < e.distY && e.distX < -e.distY) || (e.distX > e.distY && e.distX > -e.distY)) && sliderOrientation === 'vertical') {
          e.preventDefault();
        }
        container.addClass("active");
        offsetX = container.offset().left;
        offsetY = container.offset().top;
        imgWidth = beforeImg.width();
        imgHeight = beforeImg.height();
      });

      slider.on("moveend", function(e) {
        container.removeClass("active");
      });

      slider.on("move", function(e) {
        if (container.hasClass("active")) {
          sliderPct = (sliderOrientation === 'vertical') ? (e.pageY-offsetY)/imgHeight : (e.pageX-offsetX)/imgWidth;
          if (sliderPct < 0) {
            sliderPct = 0;
          }
          if (sliderPct > 1) {
            sliderPct = 1;
          }
          adjustSlider(sliderPct);
        }
      });

      container.find("img").on("mousedown", function(event) {
        event.preventDefault();
      });

      $(window).trigger("resize.twentytwenty");
    });
  };

})(jQuery);
