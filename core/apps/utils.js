'use strict';

var $ = require('jquery');
var Marionette = require('backbone.marionette');

function _dropdownUpdate(btnGroup, val, label) {
    var inp = btnGroup.find('input');

    // Save the selected option into a hidden input tag.
    inp.val(val);

    // Trigger a change event in case there are any listeners.
    inp.trigger('change');

    // Set the dropdown label with the selected value.
    var labelText = (label.length > 30) ? (label.substring(0, 30) + '...') : label;
    btnGroup.find('.btn-group-label').html(labelText);
}

// Sets the selected dropdown option.
function _dropdownSetSelected(elem) {
    var btnGroup = elem.parents('.btn-group');
    var selectedLink = btnGroup.find('a[selected]');

    if (selectedLink.length > 0) {
        // Get the value and label:
        var val = selectedLink.attr('data-value');
        var label = selectedLink.html();
    } else {
        // It's not set, find the first one and set it as the selected one:
        btnGroup.find('a').first().attr('selected', 'selected');
        _dropdownSetSelected(elem);
    }
    _dropdownUpdate(btnGroup, val, label);
}

function _utils_isNumber(n) {
    return /^-?\d+(\.\d+)?$/.test(n);
}

// Debouncing helper function.
// This is needed for events that happens many times in a short amount of time and
// we only want one of them to get through (to reduce resource usage and potential
// problems, for example when doing some intensive processing, like redrawing
// charts on canvas)
// See more: http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
function debounce(func, threshold, execAsap) {
    var timeout; // Handle to setTimeout async task (detection period).

    // Return the new debounced function which executes the original function
    // only once until the detection period expires.
    return function debounced() {
        var self = this;
        var args = arguments;

        // The detection function. it will be executed if/when the threshold expires.
        function delayed() {
            // If we're executing at the end of the detection period:
            if (!execAsap) {
                func.apply(self, args);
            }
            // Clear timeout handle:
            timeout = null;
        };

        // Stop any current detection period.
        if (timeout) {
            clearTimeout(timeout);
        }
        // Otherwise, if we're not already waiting and
        // we're executing at the beginning of the detection period,
        else if (execAsap) {
            // Execute it now:
            func.apply(self, args);
        }

        // Reset the detection period:
        timeout = setTimeout(delayed, threshold || 100);
    };
}


module.exports = {
    // Returns true if 'n' is a number.
    //
    // We can't use jQuery.isNumeric() since it accepts hex.
    // And we can't use underscore's isNumber() either, since it fails on strings, it would require a parseInt()
    // but that might return NaN which is a number, which would require an isNaN(), and that's too much code, so
    // a regex is simpler.
    isNumber: function(n) {
        return _utils_isNumber(n);
    },

    isNumberOrNull: function(n) {
        return n == null || _utils_isNumber(n);
    },

    debounce: debounce,

    // Bind the links of the Bootstrap dropdown to an action.
    //
    // All parameters are optional, but for complex forms (e.g. embedded sub-sections with dynamic drop-downs)
    // the proper scoping of the events has to be controlled via the prefix and/or namespace parameter!
    //
    // prefix   : jquery selector put in front, like something referencing the root element of the embedded form section.
    // callback : your click handler
    // namespace: for the click event. Use this if additional more restrictive event scoping is needed.

    dropdownBindLinks: function(prefix, callback, namespace) {
        var self = this;
        var root = '.btn-tlx-group li a';
        var eventName = 'click';
        var context = document;
        if(typeof prefix != 'undefined' && prefix != null) {
            if (typeof prefix === 'string') {
                root = prefix + ' ' + root;
            } else {
                context = prefix;
            }
        }

        if(typeof namespace != 'undefined' && namespace != null) {
            eventName += '.' + namespace;
        }

        $(root, context).off(eventName).on(eventName, function() {
            self.dropdownSelectOptionClick($(this));

            if(typeof callback != 'undefined' && callback != null) {
                callback($(this));
            }
        });
    },

    // An option was selected, do the DOM changes and save the value in a hidden field.
    dropdownSelectOptionClick: function(opt) {
        // Clear the old selected item:
        var a = opt.parent().siblings().find('a');
        a.attr('selected', false);
        a.parent().removeClass('active');

        // Set the selected item as active:
        opt.attr('selected', true);
        opt.parent().addClass('active');

        _dropdownSetSelected(opt);
    },

    // Skips Marionette errors which are deemed insignificant.  Use with care.
    skipSillyMarionetteError: function(func) {
        try {
            func();
        }
        catch(e) {
            // Discards silly Marionette error.
            if (e instanceof Marionette.Error) {
                console.log(e);
            }
            else {
                throw e;
            }
        }
    },

    // Waits for the selector under the given view to become ready in the DOM, then executes the callback function.
    waitFor: function(view, selector, callback) {
        var waitForSelector = function() {
            if (view.$el.find(selector).ready()) {
                callback();
            }
            else {
                setTimeout(waitForSelector, 10);
            }
        };
        setTimeout(waitForSelector, 10);
    }
};
