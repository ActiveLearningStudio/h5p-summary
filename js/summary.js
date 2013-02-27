// Will render a Board game.

window.H5P = window.H5P || {};

H5P.Summary = function (options, contentId) {
  if ( !(this instanceof H5P.Summary) )
    return new H5P.Summary(options, contentId);

  var $ = H5P.jQuery;
  var cp = H5P.getContentPath(contentId);

  var texttemplate = '' +
'<div class="summary">' +
'  <div class="summary-intro open">' +
'    <div class="bgi-content">' +
'      <h1><%= title %></h1>' +
'      <p><%= introduction.text %></p>' +
'      <div class="buttons">' +
'        <a class="button bgi-start"><%= introduction.startButtonText %></a>' +
'      </div>' +
'    </div>' +
'  </div>' +
'</div>' +
  '';
  //
  // An internal Object only available to Board games.
  //
  var defaults = {
    title: "",
    background: {
      path: '',
      width: 635,
      height: 500
    },
    introduction: {
      text: "",
      startButtonText: "Start game"
    },
    extras: [],
    progress: {
      enabled: false,
      incremental: true,
      includeFailed: false,
      coords: {"x": 0, "y": 0, "w": 200, "h": 100},
      images: []
    },
    endResults: {
      text: "You scored @score of @total.<br/>That's @percentage%",
      solutionButtonText: "Show solution",
      retryButtonText: "Try again"
    }
  };
  var params = $.extend({}, defaults, options);
  var $myDom, $progress;

  var template = new EJS({text: texttemplate});

  // Update progress meter.
  var _updateProgress = function () {
    if (!$progress) {
      return;
    }

    if (params.progress.images.length > c) {
      $progress.css({
        backgroundImage: 'url(' + cp + params.progress.images[c].path + ')',
        width: params.progress.images[c].width + 'px',
        height: params.progress.images[c].height + 'px'
      });
    }
  };

  var _checkIfFinished = function () {
  };

  var _displayEndGame = function () {
  };

  // Function for attaching the multichoice to a DOM element.
  var attach = function (target) {
    var $target;
    if (typeof(target) === "string") {
      $target = $("#" + target);
    } else {
      $target = $(target);
    }
    // Render own DOM into target.
    $myDom = $target;
    $myDom.html(template.render(params));
    var $boardgame = $('.boardgame', $myDom);
    $boardgame.css({
      backgroundImage: 'url(' + cp + params.background.path + ')',
      width: params.size.width,
      height: params.size.height,
      backgroundSize: params.size.width + 'px ' + params.size.height + 'px'
    });

    // Add click handler to start button.
    if (params.introduction) {
      $('.bgi-start', $boardgame).click(function (ev) {
        $('.boardgame-intro', $boardgame).removeClass('open');
      });
    }

    return this;
  };

  // Masquerade the main object to hide inner properties and functions.
  var returnObject = {
    attach: attach, // Attach to DOM object
    defaults: defaults // Provide defaults for inspection
  };

  return returnObject;
};
